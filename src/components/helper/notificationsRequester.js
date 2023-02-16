/* eslint-disable implicit-arrow-linebreak */

import * as categories from "../../redux/constants/notificationCategories";
const sentNotifications = {};
// The amount of seconds to wait before resend notification when container problem has not been addressed
const RESEND_INTERVAL = 60; // seconds

const getTargetStat = (containerObject, notificationSettingType) => {
  if (notificationSettingType === categories.MEMORY)
    return parseFloat(containerObject.MemPerc.replace("%", ""));
  if (notificationSettingType === categories.CPU)
    return parseFloat(containerObject.CPUPerc.replace("%", ""));
  if (notificationSettingType === categories.STOPPED) return 1;
};

const getContainerObject = (containerList, containerId) => {
  for (let i = 0; i < containerList.length; i += 1) {
    const containerObject = containerList[i];
    if (containerObject.ID === containerId) return containerObject;
  }
  return undefined; // Container not present in container list (ex: running or stopped notificationList)
};

const isContainerInSentNotifications = (notificationType, containerId) => {
  if (sentNotifications[notificationType]) {
    // Return true if the notificationType key in sentNotification contains our containerId
    return Object.prototype.hasOwnProperty.call(
      sentNotifications[notificationType],
      containerId
    );
  }
  return false; // Return false since container's notification category is not present
};

const constructNotificationMessage = (
  notificationType,
  stat,
  triggeringValue,
  containerId
) => {
  let message = "";
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

// This function will make a request that will trigger a notification
const sendNotification = async (
  state,
  notificationType,
  containerId,
  stat,
  triggeringValue,
  containerObject
) => {
  // Pull the current state, note we do this within this function as opposed to accessing the global state variable in the file because contact preferences may have been updated since the initialization of state variable in the file.
  const currentState = state;
  const contactPreference = currentState.sessions.contact_pref;
  const email = currentState.sessions.email;
  // If the user's contact preferences are set to phone
  if (contactPreference === "phone") {
    // Construct the message body which will be used to send a text
    const body = {
      mobileNumber: state.sessions.phone,
      triggeringEvent: constructNotificationMessage(
        notificationType,
        stat,
        triggeringValue,
        containerId
      ),
    };

    // On the ipcRenderer object (Inter-Process Communication), emit an event 'post-event' with the body
    return await window.nodeMethod.rendInvoke("post-event", body);
  }

  // Else if the user's contact preferences are set to email, or null (default to email)
  const date = new Date();
  const dateString = date.toLocaleDateString();
  const timeString = date.toLocaleTimeString();
  const type =
    notificationType === "CPU"
      ? notificationType
      : notificationType.toLowerCase();
  const stopped = type === "stopped" ? "true" : "false";

  const body = {
    email,
    containerName:
      stopped === "true" ? containerObject.Names : containerObject.Name,
    time: timeString,
    date: dateString,
    stopped,
    percent: stat,
    type,
    threshold: triggeringValue,
  };

  await window.nodeMethod.rendInvoke("email-event", body);
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
  state,
  notificationSettingsSet,
  notificationType,
  containerList,
  triggeringValue
) => {
  // Scan notification settings
  notificationSettingsSet.forEach((containerId) => {
    // Check container metrics if it is seen in either runningList or stoppedList
    const containerObject = getContainerObject(containerList, containerId);

    if (containerObject) {
      // Gets the stat/metric on the container that we want to test
      const stat = getTargetStat(containerObject, notificationType);
      // If the stat should trigger rule
      if (stat > triggeringValue) {
        // If the container is in sentNotifications object
        if (isContainerInSentNotifications(notificationType, containerId)) {
          // Get the time from the sentNotifications object
          const notificationLastSent = getLatestNotificationDateTime(
            notificationType,
            containerId
          );
          // Calculate time between now and last notification sent time
          const spentTime = Math.floor(
            (Date.now() - notificationLastSent) / 1000
          );

          // Check if enough time (RESEND_INTERVAL) has passed since laster notification sent.
          if (spentTime > RESEND_INTERVAL) {
            // Send nofication
            sendNotification(
              state,
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
            console.log("sentNofications: ", sentNotifications);

            // Update date.now in object that stores sent notifications
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
          console.log(
            `** Notification SENT. ${notificationType} 
            containerId: ${containerId} 
            stat: ${stat} 
            triggeringValue: ${triggeringValue}`
          );
        }
      } else {
        // Since metric is under threshold, remove container from sentNotifications ... if present this reset
        if (isContainerInSentNotifications(notificationType, containerId)) {
          delete sentNotifications[notificationType][containerId];
        }
      }
    }
  });
};

export default function start(state) {
  setInterval(() => {
    // let state = useAppSelector((state) => state);
    // Check if any containers register to memory notification exceed triggering memory value
    checkForNotifications(
      state,
      state.notifications.memoryNotificationList,
      categories.MEMORY,
      state.containers.runningList,
      state.sessions.mem_threshold // triggering value
    );
    // Check if any containers register to cpu notification exceed triggering cpu value
    checkForNotifications(
      state,
      state.notifications.cpuNotificationList,
      categories.CPU,
      state.containers.runningList,
      state.sessions.cpu_threshold // triggering value
    );
    // Check if any containers register to stopped notification trigger notification
    checkForNotifications(
      state,
      state.notifications.stoppedNotificationList,
      categories.STOPPED,
      state.containers.stoppedList,
      0 // Triggering value
    );
  }, 10000);
}
