const runBuild = require('./db_build');
runBuild((err, res) => {
    console.log("DATABASE CREATED", err, res);
});