const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  port: "3306",
  password: "Root@123", 
  database: "myproject",
});

db.connect((error) => {
  if (error) {
    console.log("DB not connected");
    return; 
  } else {
    console.log("DB connected");
  }
});
module.exports = db;