const dbConnection = require("./db_connection");
const fs = require("fs");

const sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();

const runDbBuild = () =>
    new Promise((resolve, reject) => {
        dbConnection.query(sql, (err, res) => {
            if (err) reject(err);
            console.log("Database being built... please, wait.");
            resolve(true);
        });
    });
module.exports = { runDbBuild };