/* eslint-disable implicit-arrow-linebreak */
import store from '../../renderer/store';
import * as categories from '../../constants/notificationCategories';

let state;

// TODO: on pause
// recovered using git cat-file -p 8c28dd0d7f85611500a4d2eae82fe0a48e37deab
const sentNotifications = {};

/**
 * The amount of seconds to wait before resend notification
 * when container problem has not been addressed
 */
const RESEND_INTERVAL = 60;

const getTargetStat = (containerObject, notificationSettingType) => {
  if (notificationSettingType === categories.MEMORY)
    return parseFloat(containerObject.mp.replace('%', ''));
  if (notificationSettingType === categories.CPU)
    return parseFloat(containerObject.cpu.replace('%', ''));
  if (notificationSettingType === categories.POWER) return 1;
};

const getContainerObject = (containerList, containerId) => {
  for (let i = 0; i < containerList.length; i += 1) {
    const containerObject = containerList[i];
    if (containerObject.cid === containerId) return containerObject;
  }
  // container not present in container list (ex: running or stopped lists)
  return undefined;
};

const isContainerInSentNotifications = (notificationType, containerId) => {
  if (sentNotifications[notificationType]) {
    // return true if the notificationType key in sentNotification contains our containerId
    return Object.prototype.hasOwnProperty.call(
      sentNotifications[notificationType],
      containerId,
    );
  }
  // return false since container's notification category is not present
  return false;
};

const sendNotification = () => {
  // request notification
  // fetch // https://cors-anywhere.herokuapp.com/
  fetch('http://localhost:5000/event', {
    method: 'POST',
    headers: {
      'Content-Type': 'Application/JSON',
    },
    body: JSON.stringify({
      mobileNumber: state.phoneNumber,
      triggeringEvent: 'test message',
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Data from nofication service: ', data);
    })
    .catch((err) => console.log('send notification fetch ERROR: ', err));
};

/**
 * Returns the DateTime the last notification was sent per notification type, per containerId
 * @param {String} notificationType
 * @param {String} containerId
 */
const getLatestNotificationDateTime = (notificationType, containerId) =>
  sentNotifications[notificationType][containerId];

/**
 *
 * @param {Set} notificationSettingsSet
 * @param {String} type
 * @param {Array} containerList
 */
const checkForNotifications = (
  notificationSettingsSet,
  notificationType,
  containerList,
  triggeringValue,
) => {
  // console.log('*** In checkForNotifications ***');
  // scan notification settings
  notificationSettingsSet.forEach((containerId) => {
    // console.log('*** current containerId ***: ', containerId);
    // console.log('containerList', containerList, 'containerId', containerId);

    // if container is seen in eith runningList or stoppedList
    const containerObject = getContainerObject(containerList, containerId);
    if (containerObject) {
      // console.log('container ' + containerId + ' included in ', containerList);
      // gets the stat/metric on the container that we want to test
      const stat = getTargetStat(containerObject, notificationType);
      // if the stat should trigger rule
      if (stat > triggeringValue) {
        // if the container is in sentNotifications object
        if (isContainerInSentNotifications(notificationType, containerId)) {
          // get the time from the sentNotifications object
          const notificationLastSent = getLatestNotificationDateTime(
            notificationType,
            containerId,
          );
          // if resend interval has been met
          if (
            Math.floor((Date.now() - notificationLastSent) / 1000) >
            RESEND_INTERVAL
          ) {
            // send nofication
            console.log(
              `** Notification test. ${notificationType} was at ${stat}`,
            );
          } else {
            // resend interval not yet met
            console.log(
              `** Resend Interval Not Met. ${notificationType} is at ${stat}.\nLast sent notification time: ${notificationLastSent}`,
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
            `** Notification test. ${notificationType} was at ${stat}`,
          );
        }
      }
      // else, remove container from sentNotifications if it is in there
      if (isContainerInSentNotifications(notificationType, containerId)) {
        delete sentNotifications[notificationType][containerId];
      }
      console.log(
        `${notificationType} of ${stat} is not gt ${triggeringValue} for container ${containerId}`,
      );
    }
  });
};

export default function start() {
  setInterval(() => {
    // get current state
    state = store.getState();

    // console.log('runningList', state.lists.runningList);
    // console.log('stoppedList', state.lists.stoppedList);
    // console.log('memoryNotificationList', state.lists.memoryNotificationList);
    // console.log('stoppedNotificationList', state.lists.stoppedNotificationList);

    //
    checkForNotifications(
      state.lists.memoryNotificationList,
      categories.MEMORY,
      state.lists.runningList,
      80,
    );
    checkForNotifications(
      state.lists.cpuNotificationList,
      categories.CPU,
      state.lists.runningList,
      80,
    );
    checkForNotifications(
      state.lists.stoppedNotificationList,
      categories.POWER,
      state.lists.stoppedList,
      0,
    );

    // iterate through runningList
    // state.runningList.
  }, 10000);
}
