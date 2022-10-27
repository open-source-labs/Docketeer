<<<<<<< HEAD
const request = require('request');
=======
const axios = require('axios');
>>>>>>> 68822a4 (Get the html to show up on the electron app. Still need to get the react to mount the html id)

const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK;

const memoryNotification = async function () {
  try {
    const payload = { text: 'The Memory threshold has been met or exceeded' };
    await axios.post(SLACK_WEBHOOK, {
      body: payload,
      json: true
    });
  } catch (err) {
    console.log('memoryNotification ERR: ', err);
  }
};

export default memoryNotification;
