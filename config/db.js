var mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_quiz_2",
});

connection.connect((err) => {
  if (!!err) {
    console.log(err);
  } else {
    console.log("Connection Success");
  }
});

module.exports = connection;
