let url = '/fetchNews?=world';

//all articles ready to append to the DOM will be pushed here
let stories = [];
//each article will be an instance of the article constructor
function article() {
    this.title = undefined,
        this.snippet = undefined,
        this.img = undefined,
        this.url = undefined,
        this.author = undefined,
        this.date = undefined,
        this.paragraph = undefined,
        this.source = undefined
}

//isolate filtering of original response
const filterResponse = (json) => {
    if (JSON.parse(json[0]).statusCode === 200) {
        const news = JSON.parse(json[0]).body.response.docs;
        console.log(news);

        news.map(a => {
            let story = new article();
            story.title = a.headline.main;
            story.snippet = a.snippet;
            story.img = "https://www.nytimes.com/" + a.multimedia[0].url;
            story.url = a.web_url;
            story.author = a.byline.original;
            story.date = a.pub_date.split("T")[0];
            story.paragraph = a.lead_paragraph;
            story.source = a.source;
            stories.push(story);
        });
    }

    if (JSON.parse(json[1]).statusCode === 200) {
        const news2 = JSON.parse(json[1]).body;
    }

}

const fetchNews = () => {
    fetch(url)
        .then(response => response.json())
        .then(json => filterResponse(json))
        .catch(error => console.error(error));
}

(function () {
    fetchNews();
})();

const search = document.querySelector('.search__btn');
search.onclick = function () {
    let userInput = document.querySelector('.search__input').value.toString();
    url = `/fetchNews?=${userInput}`;
    fetchNews();
}

