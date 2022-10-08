/* eslint-disable implicit-arrow-linebreak */
import { ipcRenderer } from 'electron';
import store from '../../renderer/store';
import * as categories from '../../constants/notificationCategories';
// object that holds what notifications have been sent
import memoryNotification from '../../main/slack/memoryNotification.js';
import cpuNotification from '../../main/slack/cpuNotification.js';
const dotenv = require('dotenv');
dotenv.config();
const sentNotifications = {};
let state;

// The amount of seconds to wait before resend notification when container problem has not been addressed
const RESEND_INTERVAL = 60; // seconds

const getTargetStat = (containerObject, notificationSettingType) => {
  // note: this was previously returning an error because each conditional was trying to access a property on the containerObject that did not exist
  // e.g., containerObject.mp, containerObject.cpu, etc.
  // fix was to change it to actual properties, like containerObject.MemPerc, containerObject.CPUPerc, etc.
  if (notificationSettingType === categories.MEMORY)
    return parseFloat(containerObject.MemPerc.replace('%', ''));
  if (notificationSettingType === categories.CPU)
    return parseFloat(containerObject.CPUPerc.replace('%', ''));
  if (notificationSettingType === categories.STOPPED) return 1;
};

const getContainerObject = (containerList, containerId) => {
  for (let i = 0; i < containerList.length; i += 1) {
    const containerObject = containerList[i];
    // note: this conditional was previously checking for containerObject.cid === containerId, but cid is not a property on containerObject, resulting in undefined being returned every time.
    // changed from containerObject.cid to containerObject.ID
    if (containerObject.ID === containerId) return containerObject;
  }
  // container not present in container list (ex: running or stopped notificationList)
  return undefined;
};

const isContainerInSentNotifications = (notificationType, containerId) => {
  if (sentNotifications[notificationType]) {
    // return true if the notificationType key in sentNotification contains our containerId
    return Object.prototype.hasOwnProperty.call(
      sentNotifications[notificationType],
      containerId
    );
  }
  // return false since container's notification category is not present
  return false;
};

const constructNotificationMessage = (
  notificationType,
  stat,
  triggeringValue,
  containerId
) => {
  let message = '';
  switch (notificationType) {
    case categories.STOPPED:
      message = `Container with ID of ${containerId} has stopped`;
      break;
    case categories.CPU || categories.MEMORY:
      message = `${notificationType} alert for container with ID of ${containerId}. 
        Current Value: ${stat};
        Alert Setting: ${triggeringValue}`;
      break;
    default:
      message = `${notificationType} alert for container with ID of ${containerId}. 
        Current Value: ${stat}; 
        Alert Setting: ${triggeringValue}`;
      break;
  }

  return message;
};

// this function will make a request that will trigger a notification
const sendNotification = async (
  notificationType,
  containerId,
  stat,
  triggeringValue,
  containerObject
) => {
  // Pull the current state, note we do this within this function as opposed to accessing the global state variable in the file because contact preferences may have been updated since the initialization of state variable in the file.
  const currentState = store.getState();
  const contactPreference = currentState.session.contact_pref;
  const email = currentState.session.email;
  // If the user's contact preferences are set to phone
  if (contactPreference === 'phone') {
    // Construct the message body which will be used to send a text
    const body = {
      mobileNumber: state.session.phone,
      triggeringEvent: constructNotificationMessage(
        notificationType,
        stat,
        triggeringValue,
        containerId
      )
    };

    // On the ipcRenderer object (Inter-Process Communication), emit an event 'post-event' with the body
    return await ipcRenderer.invoke('post-event', body);
  }

  // Else if the user's contact preferences are set to email, or null (default to email)

  const date = new Date();
  const dateString = date.toLocaleDateString();
  const timeString = date.toLocaleTimeString();
  const type =
    notificationType === 'CPU'
      ? notificationType
      : notificationType.toLowerCase();
  const stopped = type === 'stopped' ? 'true' : 'false';

  const body = {
    email,
    containerName:
      stopped === 'true' ? containerObject.Names : containerObject.Name,
    time: timeString,
    date: dateString,
    stopped,
    percent: stat,
    type,
    threshold: triggeringValue
  };

  await ipcRenderer.invoke('email-event', body);
};

/**
 * Returns the DateTime the last notification was sent per notification type, per containerId
 * @param {String} notificationType
 * @param {String} containerId
 */
const getLatestNotificationDateTime = (notificationType, containerId) =>
  sentNotifications[notificationType][containerId];

/**
 * Checks to see if a notification should be sent based on notification container is subscribed to
 * @param {Set} notificationSettingsSet
 * @param {String} type
 * @param {Array} containerList
 */
const checkForNotifications = (
  notificationSettingsSet,
  notificationType,
  containerList,
  triggeringValue
) => {
  // scan notification settings
  notificationSettingsSet.forEach((containerId) => {
    // check container metrics if it is seen in either runningList or stoppedList
    const containerObject = getContainerObject(containerList, containerId);

    if (containerObject) {
      console.log(triggeringValue);
      // gets the stat/metric on the container that we want to test
      const stat = getTargetStat(containerObject, notificationType);
      console.log(stat);
      // if the stat should trigger rule
      if (stat > triggeringValue) {
        // if the container is in sentNotifications object
        if (isContainerInSentNotifications(notificationType, containerId)) {
          // get the time from the sentNotifications object
          const notificationLastSent = getLatestNotificationDateTime(
            notificationType,
            containerId
          );
          // calculate time between now and last notification sent time
          const spentTime = Math.floor(
            (Date.now() - notificationLastSent) / 1000
          );

          // check if enough time (RESEND_INTERVAL) has passed since laster notification sent.
          if (spentTime > RESEND_INTERVAL) {
            // send nofication
            sendNotification(
              notificationType,
              containerId,
              stat,
              triggeringValue,
              containerObject
            );
            console.log(
              `** Notification SENT. ${notificationType} 
              containerId: ${containerId} 
              stat: ${stat} 
              triggeringValue: ${triggeringValue} 
              spentTime: ${spentTime}`
            );
            console.log('sentNofications: ', sentNotifications);

            // update date.now in object that stores sent notifications
            sentNotifications[notificationType][containerId] = Date.now();
          } else {
            console.log(
              `** Resend Interval Not Met. ${notificationType} is at ${stat}.\n
              Last sent notification time: ${notificationLastSent}`
            );
          }
        } else {
          // Container not in sentNotifications.
          // Add it with time as now and send notification.
          if (sentNotifications[notificationType]) {
            sentNotifications[notificationType][containerId] = Date.now();
          } else {
            sentNotifications[notificationType] = { [containerId]: Date.now() };
          }
          memoryNotification();
          cpuNotification();
          console.log(
            `** Notification SENT. ${notificationType} 
            containerId: ${containerId} 
            stat: ${stat} 
            triggeringValue: ${triggeringValue}`
          );
        }
      } else {
        // since metric is under threshold, remove container from sentNotifications if present
        // this reset
        if (isContainerInSentNotifications(notificationType, containerId)) {
          delete sentNotifications[notificationType][containerId];
        }
      }
    }
  });
};

export default function start() {
  setInterval(() => {
    // get current state
    state = store.getState();
    // check if any containers register to memory notification exceed triggering memory value
    checkForNotifications(
      state.notificationList.memoryNotificationList,
      categories.MEMORY,
      state.containersList.runningList,
      state.session.mem_threshold // triggering value
    );
    // check if any containers register to cpu notification exceed triggering cpu value
    checkForNotifications(
      state.notificationList.cpuNotificationList,
      categories.CPU,
      state.containersList.runningList,
      state.session.cpu_threshold // triggering value
    );
    // check if any containers register to stopped notification trigger notification
    checkForNotifications(
      state.notificationList.stoppedNotificationList,
      categories.STOPPED,
      state.containersList.stoppedList,
      0 // triggering value
    );
  }, 10000);
}
