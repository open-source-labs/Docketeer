const axios = require('axios');

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
  