const request = require('request');

const cpuNotification = async function(){
  try {
    console.log('here')
    const payload = {"text": "The CPU threshold has been met or exceeded"}
    console.log('here2')
    (await request({
      url: 'https://hooks.slack.com/services/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',
      method: 'POST',
      body: payload,
      json: true
    }))
  } catch(e){
    console.log('this is our error', e)
  }
}


const memoryNotification = async function(){
  try {
    console.log('here')
    const payload = {"text": "the memory threshold has been met or exceeded"}
    console.log('here2')
    (await request({
      url: 'https://hooks.slack.com/services/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',
      method: 'POST',
      body: payload,
      json: true
    }))
  } catch(e){
    console.log('this is our error', e)
  }
}
// testing();
// function message(){
//     function testing()
//     return testing;
// }
export default { cpuNotification, memoryNotification }
// export default cpuNotification;
// export default memoryNotification;
