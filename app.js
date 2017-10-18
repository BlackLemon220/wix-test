var defaultSubreddit = "aww";
var redditcom = "https://www.reddit.com";
searchHandler(defaultSubreddit);

function showSub(sub) {
    var opt = document.getElementById("select");
    var category = opt.options[opt.selectedIndex].value;
    var c;
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
    c.limit(13).fetch(function(res) {
        // res contains JSON parsed response from Reddit
        for(var i = 1; i <= 12; i++) {
            var myData = res.data.children[i].data;
            var pic = decodeHtml(myData.preview.images[0].resolutions[1].url);
            var picID = "pic" + i;
            var aID = "a" + i;
            var permalink = myData.permalink;
            var ref = redditcom + permalink;
            document.getElementById(picID).src = pic;
            document.getElementById(picID).title = myData.title;
            document.getElementById(aID).href = ref;
        }
    });
}

function searchHandler(sub) {
    sub = document.getElementById('search-text').value || sub;
    showSub(sub);
}