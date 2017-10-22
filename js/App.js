import React from 'react';
import ReactDom from 'react-dom';
import Top from './Top.js';
import Gallery from './Gallery.js';
import Pagination from './Pagination.js';
import './reddit.min.js'; // puts 'reddit' on the window to work with the reddit API

// Const variable declarations
const MAX_PAGES = 5;
const NUMBER_IMAGES_PER_PAGE = 12;
const DEFAULT_SUBREDDIT = "aww";
const REDDIT_COM = "https://www.reddit.com";

class App extends React.Component {
    /**
     *  Constructor
     */
    constructor() {
        super();
        // State variable declaration

        this.state = {
            hasImages: false,
            currentPage: 1,
            currentCategory: "Hot",
            currentSub: DEFAULT_SUBREDDIT,
            firstImage: "",
            lastImage: "",
        };
    }

    /**
     * Decoding string:
     * I took this function from:
     * "https://stackoverflow.com/questions/7394748/whats-the-right-way-to-decode-a-string-that-has-special-html-entities-in-it"
     * Reddit's URLs being received with 'amp;' which disturbs viewing the image.
     * @param   {[URL]} html [All images URLs]
     * @returns {[URL]} [[The same URL without 'amp;']]
     */
    decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    /**
     * Returns with a Promise an array of images with their URL, post URL, code, title and number.
     * @param {string} subreddit        subreddit to show.
     * @param {string} category         category to show.
     * @param {string} beforeOrAfter    when pagination activates, i need to fetch before / after an image to show.
     * @param {string} imageCode        the image code which fetching before or after.
     */
    getReddit(subreddit, category, beforeOrAfter, imageCode) {
        return new Promise((resolve, reject) => {
            let myRedditApi;
            subreddit = subreddit || DEFAULT_SUBREDDIT;
            switch (category) {
                case 'Hot':
                    myRedditApi = reddit.hot(subreddit).limit(NUMBER_IMAGES_PER_PAGE + 1);
                    break;
                case 'Top':
                    myRedditApi = reddit.top(subreddit).limit(NUMBER_IMAGES_PER_PAGE + 1);
                    break;
                default:
                    myRedditApi = reddit.hot(subreddit).limit(NUMBER_IMAGES_PER_PAGE + 1);
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
                for (let j = 1; j <= NUMBER_IMAGES_PER_PAGE; j++) { 
                    // j = 1 to 12, because first data ( [0] ) is not an image!
                    var myData = res.data.children[j].data;
                    if(myData.preview.images[0].resolutions.length < 2) continue;
                    arrayOfImages.push({
                        picUrl: this.decodeHtml(myData.preview.images[0].resolutions[1].url),
                        postUrl: REDDIT_COM + myData.permalink,
                        title: myData.title,
                        name: myData.name,
                        number: j,
                    });
                }
                resolve(arrayOfImages);
            });
        });
    }

    /**
     * Setting App's state. After this function automatically invoked render.
     * @param {Array} arrayOfImages     Array of images with their URL, post URL, code, title and number.
     * @param {number} numPage          The current page number (pagination).
     * @param {string} currentSub       The current subreddit.
     * @param {string} currentCategory  The current category.
     */
    mySetState(arrayOfImages, numPage, currentSub, currentCategory) {
        this.setState({
            hasImages: true,
            images: arrayOfImages,
            currentPage: numPage,
            lastImage: arrayOfImages[NUMBER_IMAGES_PER_PAGE - 1].name,
            firstImage: arrayOfImages[0].name,
            currentSub: currentSub,
            currentCategory: currentCategory,
        });
    }

    /**
     * Invokes getReddit() and waiting Promise to return the arrayOfImages.
     */
    componentDidMount() {
        const {currentSub, currentCategory, hasImages} = this.state;
        if (!hasImages) {
            this.getReddit(currentSub, currentCategory)
            .then((arrayOfImages) => {
                this.mySetState(arrayOfImages, 1, currentSub, currentCategory);
            });
        }
    }

    /**
     * Handler for prevoius page on pagination mechanism.
     */
    switchPrevPage() {
        var {currentSub, currentCategory, currentPage , firstImage} = this.state;
        if (currentPage !== 1) {
            currentPage--;
            this.getReddit(currentSub, currentCategory, "before", firstImage)
            .then((arrayOfImages) => {
                this.mySetState(arrayOfImages, currentPage, currentSub, currentCategory);
            });
        }
    }

    /**
     * Handler for next page on pagination mechanism.
     */
    switchNextPage() {
        var {currentSub, currentCategory, currentPage , lastImage} = this.state;
        if (currentPage !== MAX_PAGES) {
            currentPage++;
            this.getReddit(currentSub, currentCategory, "after", lastImage)
            .then((arrayOfImages) => {
                this.mySetState(arrayOfImages, currentPage, currentSub, currentCategory);
            });
        }
    }

    /**
     * Handler for new search for subreddit and category.
     */
    makeNewSearch() {
        const currentSub = document.getElementById('search-text').value || currentSub;
        const currentCategory = document.getElementById('select').value;
        this.getReddit(currentSub, currentCategory)
        .then((arrayOfImages) => {
            this.mySetState(arrayOfImages, 1, currentSub, currentCategory);
        });
    }

    /**
     *  render
     */
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