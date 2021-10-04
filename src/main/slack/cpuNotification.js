const request = require('request');
require('dotenv').config();

const URL = process.env.URL;

const cpuNotification = async function() {
  try {
    const payload = {"text": "The CPU threshold has been met or exceeded"};
    await request({
      url: URL,
      method: 'POST',
      body: payload,
      json: true
    });
  } catch(err){
    console.log('cpuNotification ERR: ', err);
  }
};

export default cpuNotification;
