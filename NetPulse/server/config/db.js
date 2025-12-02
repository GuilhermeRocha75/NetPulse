const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "127.0.0.1:3306",
    user: "root",
    password: "root",
    database: "netpulse_db"
});

module.exports = pool;
