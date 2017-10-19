var defaultSubreddit = "aww";
var redditcom = "https://www.reddit.com";
var currentCategory = "Hot";
var currentSub = defaultSubreddit;
var currentPage = 1;
var maxPage = 5;
var imageNumber = 12;
var firstImage;
var lastImage;
searchHandler();

/**
 * showSub changes all images according to the parameters.
 * @param {string} sub           [subreddit. By defatult was set to "aww"]
 * @param {string} categorty     [The select/option value. By default was set to "Hot"]
 * @param {string} beforeOrAfter [Works when pagination activates, value of "after" and "before.
 *                               Otherwize, undefined.]
 * @param {string} imageCode     [Works when pagination activates, value of first / last image of last run.
 *                               Otherwize, undefined.]
 */
function showSub(sub, categorty, beforeOrAfter, imageCode) {
    var c;
    // Although "Hot" is by default, i've added it to a 'case' just for more readable code.
    switch(categorty){
        case 'Hot':
            c = reddit.hot(sub).limit(imageNumber + 1);
            break;
        case 'Random':
            c = reddit.hot(sub).limit(imageNumber + 1);
            break;
        case 'Top':
            c = reddit.top(sub).limit(imageNumber + 1);
            break;
        default:
            c = reddit.hot(sub).limit(imageNumber + 1);
            break;
    }
    // if / else if statement for pagination:
    if(beforeOrAfter === "after") c = c.after(imageCode);
    else if(beforeOrAfter === "before") c = c.before(imageCode);
    c.fetch(function(res) {
        // Loop for all 12 images, getting their urls from res object.
        for(var j = 1; j <= imageNumber; j++) {
            var myData = res.data.children[j].data;
            if(myData.preview.images[0].resolutions.length < 2) continue;
            var pic = decodeHtml(myData.preview.images[0].resolutions[1].url);
            var picID = "pic" + j;
            var aID = "a" + j;
            var permalink = myData.permalink;
            var ref = redditcom + permalink;
            document.getElementById(picID).src = pic;
            document.getElementById(picID).title = myData.title;
            document.getElementById(aID).href = ref;
            if(j === 1) firstImage = myData.name;
            if(j === imageNumber) lastImage = myData.name;
        }
    });
}
/**
 * Activates when "Next" button is clicked.
 */
function paginationNext() {
    if(currentPage !== maxPage) {
        currentPage++;
        showSub(currentSub, currentCategory, "after", lastImage);
        document.getElementById("numberPage").innerHTML = currentPage + " / " + maxPage;
    }
}
/**
 * Activates when "Back" button is clicked.
 */
function paginationBack() {
    if(currentPage !== 1) {
        currentPage--;
        showSub(currentSub, currentCategory, "before", firstImage);
        document.getElementById("numberPage").innerHTML = currentPage + " / " + maxPage;
    }
}
/**
 * Activates when search button is clicked. On startup, it being.
 * 'currentSub' gets its value from the search input box. If empty, gets its last \ default sub.
 */
function searchHandler() {
    currentPage = 1;
    currentSub = document.getElementById('search-text').value || currentSub;
    var opt = document.getElementById("select");
    currentCategory = opt.options[opt.selectedIndex].value;
    showSub(currentSub, currentCategory);
    document.getElementById("numberPage").innerHTML = currentPage + " / " + maxPage;
}