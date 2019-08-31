const url = '/fetchNews';

const fetchNews = () => {
    fetch(url)
        .then(response => response.json())
        .then(json => console.log("fetch json", json))
        .catch(error => console.error(error));
}

(function () {
    fetchNews();
})();