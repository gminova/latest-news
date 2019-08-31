const https = require("https");
const http = require("http");

const fetchNews = (url, cb) => {
    if (!url) {
        cb("No URL was found");
    } else {
        let protocol = url.startsWith("https") ? https : http;
        protocol.get(url, res => {
            let data = "";
            res.on("data", chunk => {
                data += chunk;
            });
            res
                .on("end", () => {
                    const body = JSON.parse(data);
                    const statusCode = res.statusCode;
                    cb(null, {
                        statusCode,
                        body
                    });
                })
                .on("error", err => cb(err));
        });
    }
};

module.exports = fetchNews;