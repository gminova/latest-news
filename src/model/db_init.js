const { runDbBuild } = require('./db_build');

runDbBuild((err) => {
    if(err) throw new Error ('Unable to build to database', err);
});