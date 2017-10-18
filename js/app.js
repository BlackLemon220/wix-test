var defaultSubreddit = "aww";
var redditcom = "https://www.reddit.com";
var currentCategory = "Hot";
var currentSub = defaultSubreddit;
var i = 1;
var currentPage = 1;
var maxPage = 5;
var imageNumber = 12;
searchHandler();

function showSub(sub, categorty, limit) {
    var c;
    switch(categorty){
        case 'Hot':
            c = reddit.hot(sub);
            break;
        case 'Top':
            c = reddit.top(sub);
            break;
        case 'New':
            c = reddit.new(sub);
            break;
        default:
            c = reddit.hot(sub);
            break;
    }
    c.limit(limit).fetch(function(res) {
        for(var j = 1; j <= imageNumber; j++) {
            var myData = res.data.children[i].data;
            var pic = decodeHtml(myData.preview.images[0].resolutions[1].url);
            var picID = "pic" + j;
            var aID = "a" + j;
            var permalink = myData.permalink;
            var ref = redditcom + permalink;
            document.getElementById(picID).src = pic;
            document.getElementById(picID).title = myData.title;
            document.getElementById(aID).href = ref;
            ++i;
        }
    });
}
function paginationNext() {
    if(currentPage !== maxPage) {
        currentPage++;
        var limit = (imageNumber * (currentPage)) + 1;
        showSub(currentSub, currentCategory, limit);
        document.getElementById("numberPage").innerHTML = currentPage + " / " + maxPage;
    }
}
function paginationBack() {
    if(currentPage !== 1) {
        currentPage--;
        i = ((currentPage - 1) * imageNumber) + 1;
        var limit = (imageNumber * (currentPage)) + 1;
        showSub(currentSub, currentCategory, limit);
        document.getElementById("numberPage").innerHTML = currentPage + " / " + maxPage;
    }
}
function searchHandler() {
    i = 1;
    currentPage = 1;
    currentSub = document.getElementById('search-text').value || currentSub;
    var opt = document.getElementById("select");
    currentCategory = opt.options[opt.selectedIndex].value;
    var limit = (i * imageNumber) + 1;
    showSub(currentSub, currentCategory, limit);
    document.getElementById("numberPage").innerHTML = currentPage + " / " + maxPage;
}