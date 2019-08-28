const express = require("express"); //Handle routes & serve templates
const path = require("path"); //Access and interact with the file system

const app = express();

//set up port
app.set("port", process.env.PORT || 3000);

//set up server
const server = app.listen(app.get("port"), function () {
    console.log("Express server listening on port " + server.address().port);
});

module.exports = server;