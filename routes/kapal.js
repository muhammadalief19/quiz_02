const express = require("express");
const router = express.Router();
const Kapal = require("../model/kapal");

let title = "kapal";

router.get("/", async (req, res, next) => {
  let rows = await Kapal.getAll();
  res.render("kapal/index", { data: rows, title });
});

router.get("/create", (req, res) => {
  res.render("kapal/create", { title });
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
  res.render("kapal/update", {
    id: id,
    nama_alat: rows[0].nama_alat,
    title,
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
