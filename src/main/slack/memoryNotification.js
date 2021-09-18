const request = require('request');

// import dotenv
const dotenv = require('dotenv');
dotenv.config();

const URL = process.env.URL;

const memoryNotification = async function(){
    try {
      console.log('here')
      const payload = {"text": "The Memory threshold has been met or exceeded"}
      console.log('here2')
      (await request({
        url: URL,
        method: 'POST',
        body: payload,
        json: true
      }))
    } catch(e){
      console.log('this is our error', e)
    }
}

export default memoryNotification