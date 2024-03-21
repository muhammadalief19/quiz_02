const express = require("express");
const router = express.Router();
const Kapal = require("../model/kapal");
const Dpi = require("../model/dpi");
const Pemilik = require("../model/pemilik");
const AlatTangkap = require("../model/alat-tangkap");

let title = "Kapal";

router.get("/", async (req, res, next) => {
  let rows = await Kapal.getAll();
  res.render("kapal/index", { data: rows, title });
});

router.get("/create", async (req, res) => {
  let dpi = await Dpi.getAll();
  let pemilik = await Pemilik.getAll();
  let alat = await AlatTangkap.getAll();
  res.render("kapal/create", { title, dpi, pemilik, alat });
});

router.post("/store", async (req, res, next) => {
  try {
    const data = req.body;
    await Kapal.store(data);
    req.flash("success", "Berhasil menyimpan data");
    res.redirect("/kapal");
  } catch (error) {
    console.log(error);
    req.flash("error", "Gagal menyimpan data");
    res.redirect("/kapal");
  }
});

router.get("/edit/:id", async (req, res, next) => {
  const id = req.params.id;
  let rows = await Kapal.find(id);
  let dpi = await Dpi.getAll();
  let pemilik = await Pemilik.getAll();
  let alat = await AlatTangkap.getAll();
  res.render("kapal/update", {
    data: rows[0],
    title,
    dpi,
    pemilik,
    alat,
  });
});

router.post("/update/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await Kapal.update(id, data);
    req.flash("success", "Berhasil mengupdate data");
    res.redirect("/kapal");
  } catch (error) {
    console.log(error);
    req.flash("error", "Gagal menyimpan data");
    res.redirect("/kapal");
  }
});

router.get("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await Kapal.delete(id);
    req.flash("success", "Berhasil menghapus data");
    res.redirect("/kapal");
  } catch (error) {
    req.flash("error", "Gagal menghapus data");
    res.redirect("/kapal");
  }
});

module.exports = router;
