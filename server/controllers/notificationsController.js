// const fetch = require('node-fetch');

// const favoritesController = {};

// favoritesController.addPhoneNumber = async (req, res, next) => {
//   const { user_email } = req.params;
//   const { yelp_id } = req.body;

//   const isolateUserId = `SELECT users.user_id
//   FROM users
//   WHERE users.email = $1`;

//   const isolateActivityId = `SELECT activities.activities_id FROM activities WHERE yelp_id = $1`;

//   const baseRequest = `
//   DELETE FROM favorites 
//   WHERE user_id = $1 AND activities_id = $2`;

//   try {
//     // get the userid from db using the email
//     const userId = await db.query(isolateUserId, [user_email]);
//     // get activity id from db using yelp_id
//     const activityId = await db.query(isolateActivityId, [yelp_id]);
//     // delete favorite row using the two ids above.
//     await db.query(baseRequest, [
//       userId.rows[0].user_id,
//       activityId.rows[0].activities_id,
//     ]);
//     return next();
//   } catch (e) {
//     return next(e);
//   }
// };

// module.exports = favoritesController;
