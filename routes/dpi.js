const express = require("express");
const router = express.Router();
const Dpi = require("../model/dpi");

let title = "DPI";

router.get("/", async (req, res, next) => {
  let rows = await Dpi.getAll();
  res.render("dpi/index", { data: rows, title });
});

router.get("/create", (req, res) => {
  res.render("dpi/create", { title });
});

router.post("/store", async (req, res, next) => {
  try {
    const dpiData = req.body;
    await Dpi.store(dpiData);
    req.flash("success", "Berhasil menyimpan data DPI");
    res.redirect("/dpi");
  } catch (error) {
    console.log(error); // Tambahkan ini
    req.flash("error", "Gagal menyimpan data DPI");
    res.redirect("/dpi");
  }
});

router.get("/edit/:id", async (req, res, next) => {
  const id = req.params.id;
  let rows = await Dpi.find(id);
  res.render("dpi/update", {
    id: id,
    nama_dpi: rows[0].nama_dpi,
    luas: rows[0].luas_dpi,
    title,
  });
});

router.post("/update/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const dpiData = req.body;
    await Dpi.update(id, dpiData);
    req.flash("success", "Berhasil mengupdate data DPI");
    res.redirect("/dpi");
  } catch (error) {
    console.log(error);
    req.flash("error", "Gagal menyimpan data DPI");
    res.redirect("/dpi");
  }
});

router.get("/delete/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    await Dpi.delete(id);
    req.flash("success", "Berhasil menghapus data DPI");
    res.redirect("/dpi");
  } catch (error) {
    req.flash("error", "Gagal menghapus data DPI");
    res.redirect("/dpi");
  }
});

module.exports = router;
