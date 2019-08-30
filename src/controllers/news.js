exports.get = (req, res) => {
    res.render('news', { activePage: { news: true } });
};