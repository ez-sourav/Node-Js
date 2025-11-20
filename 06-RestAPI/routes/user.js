const express = require("express");
const {
  handelGetAllUsers,
  handelGetUserById,
  handelUpdateUserById,
  handelDeleteUserById,
  handelCreateNewUser,
} = require("../controllers/user");
const router = express.Router();

// router.get("/users", async (req, res) => {
//   const allDbUsers = await User.find({});

//   const html = `
//     <ul>
//     ${allDbUsers
//       .map(
//         (user) =>
//           `<li> <b> ${user.firstName} ${user.lastName} </b> - ${user.email}</li>`
//       )
//       .join("")}
//     </ul>
//     `;
//   res.send(html);
// });

router.route("/").get(handelGetAllUsers).post(handelCreateNewUser);

// if route same so we can do this type
router
  .route("/:id")
  .get(handelGetUserById)
  .patch(handelUpdateUserById)
  .delete(handelDeleteUserById);

module.exports = router;
