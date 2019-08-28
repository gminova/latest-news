const news = require('./../model/index');

exports.get = (req, res) => {
    res.render('news', { activePage: { news: true }, fruits });
};