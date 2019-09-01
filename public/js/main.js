let url = '/fetchNews?=world';

const fetchNews = () => {
    fetch(url)
        .then(response => response.json())
        .then(json => console.log("fetch json", json))
        .catch(error => console.error(error));
}

(function () {
    fetchNews();
})();

const search = document.querySelector('.search__btn');
search.onclick = function() {
    let userInput = document.querySelector('.search__input').value.toString();
    url = `/fetchNews?=${userInput}`;
    fetchNews();
}