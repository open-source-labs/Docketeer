const axios = require('axios');

const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK;

const cpuNotification = async function () {
  try {
    const payload = { text: 'The CPU threshold has been met or exceeded' };
    await axios.post(SLACK_WEBHOOK, {
      body: payload,
      json: true
    });
  } catch (err) {
    console.log('cpuNotification ERR: ', err);
  }
};

export default cpuNotification;
