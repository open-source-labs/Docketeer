const request = require('request');
require('dotenv').config();

const URL = process.env.URL;

const memoryNotification = async function() {
  try {
    const payload = {"text": "The Memory threshold has been met or exceeded"};
    await request({
      url: URL,
      method: 'POST',
      body: payload,
      json: true
    });
  } catch(err){
    console.log('memoryNotification ERR: ', err);
  }
};

export default memoryNotification;
