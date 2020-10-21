// const express = require('express');
// const businessesController = require('../controllers/notificationsController.js');

// const router = express.Router();

// router.get('/:category', businessesController.getBusinesses, (req, res) => {
//   /* include lat and lon in query string
//    *
//    * example url where 'restaurants' is the category:
//    * http://localhost:5000/businesses/restaurants?lat=40.712775&lon=-74.005973
//    *
//    * server response from the url above should be an array of 5 objects.
//    * each object contains information on a restaurant
//    *
//    * see yelp api documentation for all valid categories
//    */

//   const { businesses } = res.locals;
//   res.status(200).json(businesses);
// });

// module.exports = router;
