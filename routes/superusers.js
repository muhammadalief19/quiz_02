var express = require("express");
const User = require("../model/user");
var router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    let id = req.session.userId;
    let data = await User.find(id);
    if (data.length > 0) {
      if (data[0].level_users != 1) {
        res.redirect("/logout");
      } else {
        res.render("users/super", {
          title: "Users",
          email: data[0].email,
        });
      }
    } else {
      res.status(401).json({
        error: "user tidak ada",
      });
    }
  } catch (error) {
    res.status(501).json({
      error: "Butuh akses login",
    });
  }
});

module.exports = router;
