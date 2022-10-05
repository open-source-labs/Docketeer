const request = require('request');
// require('dotenv').config();

const SLACK_WEBHOOK = process.env.SLACK_WEBHOOK;

const cpuNotification = async function () {
  try {
    const payload = { text: 'The CPU threshold has been met or exceeded' };
    await request({
      url: SLACK_WEBHOOK,
      method: 'POST',
      body: payload,
      json: true
    });
  } catch (err) {
    console.log('cpuNotification ERR: ', err);
  }
};

export default cpuNotification;
