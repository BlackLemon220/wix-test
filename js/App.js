import React from 'react';
import ReactDom from 'react-dom';
import Top from './Top.js';
import Gallery from './Gallery.js';
import Pagination from './Pagination.js';
import './reddit.min.js'; // puts 'reddit' on the window to work with the reddit API

const MAX_PAGE = 5;
const NUMBER_IMAGES = 12;

class App extends React.Component {
    constructor() {
        super();
        // Variable declaration
        var defaultSubreddit = "aww";
        var redditcom = "https://www.reddit.com";
        var currentCategory = "Hot";
        var currentSub = defaultSubreddit;

        var firstImage;
        var lastImage;

        this.state = {
            hasImages: false,
            currentPage: 1,
            // current subreddit
            // current page
            // category
            // 
        };
    }

    // getInitialState() {
    //     return 
    // }
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
                case 'Random':
                    myRedditApi = reddit.random(subreddit).limit(NUMBER_IMAGES + 1);
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
                        // divStyle: "url('" + pic + "')",
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
        const {hasImages} = this.state;
        if (!hasImages) {
            this.getReddit(this.currentSub, this.currentCategory)
            .then((arrayOfImages) => {
                this.setState({
                    hasImages: true,
                    images: arrayOfImages,
                });
            });

            // let myReddit = getReddit(this.currentSub, this.currentCategory);
            // <Gallery sub={currentSub} category={currentCategory} firstImage={} lastImage={}/>
            // <Pagination numberPage={currentPage}/>
        }
    }

    switchPage(newPageNumber) {
        // do things.... in the end call this.setState() with another array of images
    }

    render() {
        const {hasImages , images, currentPage} = this.state;
        // const switchPage = this.switchPage.bind(this);
        return (
            <div>
                <Top />
                {hasImages && <Gallery images={images} />}
                {hasImages && <Pagination currentPage={currentPage} />}
            </div>
        );
    }
}
export default App;
/*
                {hasImages && <Pagination numberPage={currentPage}/>}
                firstImage = document.getElementById("pic1").name;
            lastImage = document.getElementById("pic12").name;
            {hasImages && <Pagination currentPage={currentPage} onSwitchPage={switchPage} />}
            
*/