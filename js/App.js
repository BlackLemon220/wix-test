import React from 'react';
import ReactDom from 'react-dom';
import Top from './Top.js';
import Gallery from './Gallery.js';
import Pagination from './Pagination.js';
import './reddit.min.js'; // puts 'reddit' on the window to work with the reddit API

const MAX_PAGES = 5;
const NUMBER_IMAGES = 12;
const defaultSubreddit = "aww";
const redditcom = "https://www.reddit.com";

class App extends React.Component {
    constructor() {
        super();
        // Variable declaration

        this.state = {
            hasImages: false,
            currentPage: 1,
            currentCategory: "Hot",
            currentSub: defaultSubreddit,
            firstImage: "",
            lastImage: "",
        };
    }

    decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    getReddit(subreddit, category, beforeOrAfter, imageCode) {
        return new Promise((resolve, reject) => {
            let myRedditApi;
            switch (category) {
                case 'Hot':
                    myRedditApi = reddit.hot(subreddit).limit(NUMBER_IMAGES + 1);
                    break;
                case 'Top':
                    myRedditApi = reddit.top(subreddit).limit(NUMBER_IMAGES + 1);
                    break;
                default:
                    myRedditApi = reddit.hot(subreddit).limit(NUMBER_IMAGES + 1);
                    break;
            }
            //if / else if statement for pagination:
            if (beforeOrAfter === "after") {
                myRedditApi = myRedditApi.after(imageCode);
            } 
            else if (beforeOrAfter === "before") {
                myRedditApi = myRedditApi.before(imageCode);
            }
            myRedditApi.fetch((res) => {
                let arrayOfImages = [];
                // Loop for all 12 images, getting their urls from res object.
                for (let j = 1; j <= NUMBER_IMAGES; j++) { // 
                    var myData = res.data.children[j].data;
                    if(myData.preview.images[0].resolutions.length < 2) continue;
                    arrayOfImages.push({
                        picUrl: this.decodeHtml(myData.preview.images[0].resolutions[1].url),
                        postUrl: "https://www.reddit.com" + myData.permalink,
                        title: myData.title,
                        name: myData.name,
                        number: j,
                    });
                }

                resolve(arrayOfImages);
            });
        });
    }

    componentDidMount() {
        const {currentSub, currentCategory, hasImages} = this.state;
        if (!hasImages) {
            this.getReddit(currentSub, currentCategory)
            .then((arrayOfImages) => {
                this.setState({
                    hasImages: true,
                    images: arrayOfImages,
                    lastImage: arrayOfImages[NUMBER_IMAGES - 1].name,
                    firstImage: arrayOfImages[0].name,
                });
            });
        }
    }
    switchPrevPage() {
        const {currentSub, currentCategory, currentPage , firstImage} = this.state;
        if (currentPage !== 1) {
            this.getReddit(currentSub, currentCategory, "before", firstImage)
            .then((arrayOfImages) => {
                this.setState({
                    hasImages: true,
                    images: arrayOfImages,
                    currentPage: currentPage - 1,
                    lastImage: arrayOfImages[NUMBER_IMAGES - 1].name,
                    firstImage: arrayOfImages[0].name,
                });
            });
        }
    }
    switchNextPage() {
        const {currentSub, currentCategory, currentPage , lastImage} = this.state;
        if (currentPage !== MAX_PAGES) {
            this.getReddit(currentSub, currentCategory, "after", lastImage)
            .then((arrayOfImages) => {
                this.setState({
                    hasImages: true,
                    images: arrayOfImages,
                    currentPage: currentPage + 1,
                    lastImage: arrayOfImages[NUMBER_IMAGES - 1].name,
                    firstImage: arrayOfImages[0].name,
                });
            });
        }
    }
    makeNewSearch() {
        const currentSub = document.getElementById('search-text').value;
        const currentCategory = document.getElementById('select').value;
        this.getReddit(currentSub, currentCategory)
        .then((arrayOfImages) => {
            this.setState({
                hasImages: true,
                images: arrayOfImages,
                lastImage: arrayOfImages[NUMBER_IMAGES - 1].name,
                firstImage: arrayOfImages[0].name,
                currentPage: 1,
                currentSub: currentSub,
                currentCategory: currentCategory,
            });
        });
    }

    render() {
        const {hasImages , images, currentPage} = this.state;
        const switchNextPage = this.switchNextPage.bind(this);
        const switchPrevPage = this.switchPrevPage.bind(this);
        const makeNewSearch = this.makeNewSearch.bind(this);
        return (
            <div>
                <Top makeNewSearch={makeNewSearch} />
                {hasImages && <Gallery images={images} />}
                {hasImages && <Pagination currentPage={currentPage} switchNextPage={switchNextPage} switchPrevPage={switchPrevPage} />}
            </div>
        );
    }
}
export default App;