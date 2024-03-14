var express = require("express");
var router = express.Router();
var Pemilik = require("../model/pemilik");

let title = "Pemilik";

// route index
router.get("/", async (req, res, next) => {
  let rows = await Pemilik.getAll();
  res.render("pemilik/index", {
    data: rows,
    title: title,
  });
});

// route create page
router.get("/create", async (req, res, next) => {
  res.render("pemilik/create", { title: title });
});

// route store
router.post("/store", async (req, res, next) => {
  try {
    let { nama_pemilik, alamat, nomer_hp } = req.body;

    let data = { nama_pemilik, alamat, nomer_hp };
    await Pemilik.store(data);
    req.flash("success", "Berhasil menyimpan data");
    res.redirect("/pemilik");
  } catch (error) {
    req.flash("error", "Terjadi kesalahan");
    res.redirect("/pemilik");
  }
});

// route edit
router.get("/edit/:id", async (req, res, next) => {
  let { id } = req.params;
  const rows = await Pemilik.find(id);
  res.render("pemilik/update", {
    data: rows[0],
    title: title,
  });
});

// route update
router.post("/update/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    let { nama_pemilik, alamat, nomer_hp } = req.body;

    let data = { nama_pemilik, alamat, nomer_hp };
    await Pemilik.update(id, data);
    req.flash("success", "Berhasil mengupdate data");
    res.redirect("/pemilik");
  } catch (error) {
    req.flash("error", "Terjadi kesalahan");
    res.redirect("/pemilik");
  }
});

// route delete
router.get("/delete/:id", async (req, res, next) => {
  let { id } = req.params;

  await Pemilik.delete(id);
  req.flash("success", "Berhasil Menghapus Data");
  res.redirect("/pemilik");
});

module.exports = router;
