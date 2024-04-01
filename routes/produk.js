const express = require("express");
const router = express.Router();
var fs = require("fs");
var multer = require("multer");
var path = require("path");
const User = require("../model/user");
const Produk = require("../model/produk");
const Pemilik = require("../model/pemilik");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/foto-produk");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

let title = "Produk";

router.get("/", async (req, res, next) => {
  try {
    let id = req.session.userId;
    let data = await User.find(id);

    if (data.length > 0) {
      let rows = await Produk.getAll();
      res.render("produk/index", {
        data: rows,
        title,
      });
    } else {
      res.redirect("/dpi");
      console.log(data);
    }
  } catch (error) {
    res.redirect("/login");
  }
});

router.get("/create", async (req, res, next) => {
  let rows = await Pemilik.getAll();
  res.render("produk/create", {
    title,
    pemilik: rows,
  });
});

router.post("/store", upload.single("foto_produk"), (req, res, next) => {
  try {
    let { nama_produk, harga_produk, id_pemilik } = req.body;
    let data = {
      nama_produk,
      harga_produk,
      id_pemilik,
      foto_produk: req.file.filename,
    };
    Produk.store(data);
    req.flash("success", "Berhasil menyimpan data");
    res.redirect("/produk");
  } catch (error) {
    req.flash("error", "Gagal menyimpan data");
    res.redirect("/produk");
  }
});

router.get("/edit/(:id)", async (req, res, next) => {
  let id = req.params.id;

  let pemilik = await Pemilik.getAll();
  let rows = await Produk.find(id);

  res.render("produk/update", {
    id,
    pemilik,
    produk: rows[0],
    title,
  });
});

router.post(
  "/update/(:id)",
  upload.single("foto_produk"),
  async (req, res, next) => {
    let id = req.params.id;
    let fileBaru = req.file ? req.file.filename : null;
    let rows = await Produk.find(id);
    const namaFileLama = rows[0].foto_produk;

    if (fileBaru && namaFileLama) {
      const filePathLama = path.join(
        __dirname,
        "../public/images/foto-produk",
        namaFileLama
      );

      fs.unlinkSync(filePathLama);
    }
    try {
      let { nama_produk, harga_produk, id_pemilik } = req.body;
      let foto_produk = fileBaru || namaFileLama;
      let data = {
        nama_produk,
        harga_produk,
        id_pemilik,
        foto_produk,
      };
      Produk.update(id, data);
      req.flash("success", "Berhasil mengupdate data");
      res.redirect("/produk");
    } catch (error) {
      req.flash("error", "Gagal mengupdate data");
      res.redirect("/produk");
    }
  }
);

router.get("/delete/(:id)", async (req, res, next) => {
  let id = req.params.id;
  let rows = await Produk.find(id);
  const namaFileLama = rows[0].foto_produk;

  if (namaFileLama) {
    const filePathLama = path.join(
      __dirname,
      "../public/images/foto-produk",
      namaFileLama
    );

    fs.unlinkSync(filePathLama);
  }

  try {
    await Produk.delete(id);
    req.flash("success", "Berhasil menghapus data");
    res.redirect("/produk");
  } catch (error) {
    req.flash("error", "Gagal menghapus data");
    res.redirect("/produk");
  }
});

module.exports = router;
