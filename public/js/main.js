const url = 'https://api.ratesapi.io/api/latest';

const fetchNews = () => {
    fetch(url)
        .then(response => response.json())
        .then(json => console.log("fetch json", json))
        .catch(error => console.error(error));
}

(function () {
    fetchNews();
})();