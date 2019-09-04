let url = '/fetchNews?=world';

//all stories ready to append to the DOM will be pushed here
let stories = [];
//each story will be an instance of the article constructor
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

const renderStory = e => {
    const story = document.createElement("article");
    story.classList.add("story");

    const title = document.createElement("h2");
    title.classList.add("story__title");
    title.textContent = e.title;
    story.appendChild(title);

    const snippet = document.createElement("span");
    snippet.classList.add("story__snippet");
    snippet.textContent = e.snippet;
    story.appendChild(snippet);

    const link = document.createElement("a");
    link.classList.add("story__link");
    link.href = e.url;
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
    story.appendChild(link);
    
    const img = document.createElement("img");
    img.classList.add("story__img");
    img.src = e.img;
    img.alt = "Story image";
    link.appendChild(img);

    const author = document.createElement("h3");
    author.classList.add("story__author");
    author.textContent = e.author;
    story.appendChild(author);

    const date = document.createElement("h4");
    date.classList.add("story__date");
    date.textContent = e.date;
    story.appendChild(date);

    const paragraph = document.createElement("p");
    paragraph.classList.add("story__paragraph");
    paragraph.textContent = e.paragraph;
    story.appendChild(paragraph);

    const source = document.createElement("h5");
    source.classList.add("story__source");
    source.textContent = "Source: " + e.source;
    story.appendChild(source);

    return story;
}

//isolate filtering of original response
const filterResponse = (json) => {
    if (JSON.parse(json[0]).statusCode === 200) {
        const news = JSON.parse(json[0]).body.response.docs;

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
        const news2 = JSON.parse(json[1]).body.articles;

        news2.map(a => {
            let story = new article();
            story.title = a.title;
            story.snippet = a.description;
            story.img = a.urlToImage;
            story.url = a.url;
            story.author = a.author;
            story.date = a.publishedAt.split("T")[0];
            story.paragraph = a.content;
            story.source = a.source.name;
            stories.push(story);
        });
    }

    //render all stories
    const container = document.querySelector(".main__container");
    stories.map(story => container.appendChild(renderStory(story)));
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

