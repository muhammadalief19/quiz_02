const express = require("express");
const router = express.Router();
const AlatTangkap = require("../model/alat-tangkap");

let title = "Alat Tangkap";

router.get("/", async (req, res, next) => {
  let rows = await AlatTangkap.getAll();
  res.render("alat-tangkap/index", { data: rows, title });
});

router.get("/create", (req, res) => {
  res.render("alat-tangkap/create", { title });
});

router.post("/store", async (req, res, next) => {
  try {
    const data = req.body;
    await AlatTangkap.store(data);
    req.flash("success", "Berhasil menyimpan data");
    res.redirect("/alat-tangkap");
  } catch (error) {
    console.log(error);
    req.flash("error", "Gagal menyimpan data");
    res.redirect("/alat-tangkap");
  }
});

router.get("/edit/:id", async (req, res, next) => {
  const id = req.params.id;
  let rows = await AlatTangkap.find(id);
  res.render("alat-tangkap/update", {
    id: id,
    nama_alat: rows[0].nama_alat,
    title,
  });
});

router.post("/update/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    await AlatTangkap.update(id, data);
    req.flash("success", "Berhasil mengupdate data");
    res.redirect("/alat-tangkap");
  } catch (error) {
    console.log(error);
    req.flash("error", "Gagal menyimpan data");
    res.redirect("/alat-tangkap");
  }
});

router.get("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await AlatTangkap.delete(id);
    req.flash("success", "Berhasil menghapus data");
    res.redirect("/alat-tangkap");
  } catch (error) {
    req.flash("error", "Gagal menghapus data");
    res.redirect("/alat-tangkap");
  }
});

module.exports = router;
