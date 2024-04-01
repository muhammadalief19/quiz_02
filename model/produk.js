var connection = require("../config/db");

class Produk {
  static async getAll() {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT pr.*, p.* FROM produk as pr JOIN pemilik as p ON p.id_pemilik = pr.id_pemilik ",
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  static async store(data) {
    return new Promise((resolve, reject) => {
      connection.query("INSERT INTO produk set ? ", data, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async find(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT pr.*, p.* FROM produk as pr JOIN pemilik as p ON p.id_pemilik = pr.id_pemilik WHERE id_produk = " +
          id,
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  }

  static async update(id, data) {
    return new Promise((resolve, reject) => {
      connection.query(
        "UPDATE produk set ? WHERE id_produk = " + id,
        data,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  static async delete(id) {
    return new Promise((resolve, reject) => {
      connection.query(
        "DELETE FROM produk WHERE id_produk = " + id,
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  }
}

module.exports = Produk;
