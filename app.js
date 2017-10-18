var defaultSubreddit = "aww";
var redditcom = "https://www.reddit.com";
var currentCategory = "Hot";
var currentSub = defaultSubreddit;
var i = 1;
var currentPage = 1;
var maxPage = 5;
searchHandler();

function showSub(sub) {
    var opt = document.getElementById("select");
    currentCategory = opt.options[opt.selectedIndex].value;
    var c;
    switch(currentCategory){
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
    c.limit(13).fetch(function(res) {
        // res contains JSON parsed response from Reddit
        for(var j = 1; j <= 12; j++) {
            var myData = res.data.children[j].data;
            var pic = decodeHtml(myData.preview.images[0].resolutions[1].url);
            var picID = "pic" + j;
            var aID = "a" + j;
            var permalink = myData.permalink;
            var ref = redditcom + permalink;
            document.getElementById(picID).src = pic;
            document.getElementById(picID).title = myData.title;
            document.getElementById(aID).href = ref;
            i++;
        }
    });
}

function showPage(sub, category) {
    switch(category){
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
    var limit = (12 * (currentPage)) + 1;
    c.limit(limit).fetch(function(res) {
        // res contains JSON parsed response from Reddit
        for(var j = 1; j <= 12; j++) {
            var myData = res.data.children[i].data;
            var pic = decodeHtml(myData.preview.images[0].resolutions[1].url);
            var picID = "pic" + j;
            var aID = "a" + j;
            var permalink = myData.permalink;
            var ref = redditcom + permalink;
            document.getElementById(picID).src = pic;
            document.getElementById(picID).title = myData.title;
            document.getElementById(aID).href = ref;
            i++;
        }
    });
}

function paginationNext() {
    if(currentPage !== 5) {
        currentPage++;
        showPage(currentSub, currentCategory);
        document.getElementById("numberPage").innerHTML = currentPage + " / " + maxPage;
    }
}
function paginationBack() {
    if(currentPage !== 1) {
        currentPage--;
        i = ((currentPage - 1) * 12) + 1;
        showPage(currentSub, currentCategory);
        document.getElementById("numberPage").innerHTML = currentPage + " / " + maxPage;
    }
}


function searchHandler() {
    i = 1;
    currentPage = 1;
    currentSub = document.getElementById('search-text').value || currentSub;
    showSub(currentSub);
    document.getElementById("numberPage").innerHTML = currentPage + " / " + maxPage;
}