var express = require("express");
var router = express.Router();

var bcrypt = require("bcrypt");
const User = require("../model/user");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Dashboard" });
});

router.get("/register", function (req, res, next) {
  res.render("auth/register");
});
router.get("/login", function (req, res, next) {
  res.render("auth/login");
});

router.post("/saveusers", async (req, res) => {
  let { email, password } = req.body;
  let enkripsi = await bcrypt.hash(password, 10);
  let data = {
    email,
    password: enkripsi,
  };
  await User.store(data);
  req.flash("success", "Registrasi Berhasil !");
  res.redirect("/login");
});

router.post("/log", async (req, res) => {
  let { email, password } = req.body;
  try {
    let data = await User.login(email);
    if (data.length > 0) {
      let enkripsi = data[0].password;
      let cek = await bcrypt.compare(password, enkripsi);
      if (cek) {
        req.session.userId = data[0].id_users;
        if (data[0].level_users == 1) {
          req.flash("success", "Berhasil Login");
          res.redirect("/superusers");
        } else if (data[0].level_users == 2) {
          req.flash("success", "Berhasil Login");
          res.redirect("/users");
        } else {
          res.redirect("/login");
        }
      } else {
        req.flash("error", "Email / password salah");
        res.redirect("/login");
      }
    } else {
      req.flash("error", "Akun tidak ditemukan");
      res.redirect("/login");
    }
  } catch (error) {
    res.redirect("/login");
    req.flash("error", "Error pada fungsi");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/login");
    }
  });
});

module.exports = router;
