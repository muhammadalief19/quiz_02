var connection = require("../config/db");

class Kapal {
  static async getAll() {
    return new Promise((resolve, reject) => {
      connection.query(
        "SELECT kapal.*, alat_tangkap.*, dpi.*, pemilik.* FROM kapal JOIN alat_tangkap ON kapal.id_alat = alat_tangkap.id_alat JOIN pemilik ON kapal.id_pemilik = pemilik.id_pemilik JOIN dpi ON kapal.id_dpi = dpi.id_dpi",
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
      connection.query("INSERT INTO kapal set ? ", data, (err, result) => {
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
        "SELECT kapal.*, alat_tangkap.*, dpi.*, pemilik.* FROM kapal JOIN alat_tangkap ON kapal.id_alat = alat_tangkap.id_alat JOIN pemilik ON kapal.id_pemilik = pemilik.id_pemilik JOIN dpi ON kapal.id_dpi = dpi.id_dpi WHERE id_identitas_kapal = " +
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
        "UPDATE kapal set ? WHERE id_identitas_kapal = " + id,
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
        "DELETE FROM kapal WHERE id_identitas_kapal = " + id,
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

module.exports = Kapal;
