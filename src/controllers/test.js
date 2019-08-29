exports.get = (req, res) => {
    //set deliberate typo tue instead of true
    res.render('test', { activePage: { test: tue } });
};