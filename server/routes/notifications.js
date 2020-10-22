const express = require("express");
const notificationsController = require("../controllers/notificationsController.js");

const router = express.Router();

router.post("/mobile", notificationsController.postMobile, (req, res) => {
<<<<<<< HEAD
    console.log("received POST mobile number request");
    res.status(200).json("verification code has been sent");
  });
  
  // add router for checking the verification code the user provides
  
router.post("/event", notificationsController.postEvent, (req, res) => {
    console.log("received POST triggering event request");
    res.status(200).json("Triggering event is successfully received");
});
  
module.exports = router;
  
=======
  console.log("received POST mobile number request");
  res.status(200).json("verification code has been sent");
});

// add router for checking the verification code the user provides

router.post("/event", notificationsController.postEvent, (req, res) => {
  console.log("received POST triggering event request");
  res.status(200).json("Triggering event is successfully received");
});

module.exports = router;
>>>>>>> 1f30e94cd5a051484f637cd0258c6ceb6bcb86c9
