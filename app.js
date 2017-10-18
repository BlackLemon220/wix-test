var defaultSub = "aww";
var redditcom = "https://www.reddit.com";
showSub(defaultSub);
function showSub(sub) {
    reddit.top(sub).limit(13).fetch(function(res) {
        // res contains JSON parsed response from Reddit
        console.log(res);
        for(var i = 1; i <= 12; i++) {
            var pic = decodeHtml(res.data.children[i].data.preview.images[0].resolutions[1].url);
            var picID = "pic" + i;
            var aID = "a" + i;
            document.getElementById(picID).src = pic;
            document.getElementById(picID).title = res.data.children[i].data.title;
            var permalink = res.data.children[i].data.permalink;
            var ref = redditcom + permalink;
            document.getElementById(aID).href = ref;
        }
        });
}

function searchHandler() {
    var sub = document.getElementById('search-text').value;
    showSub(sub);
}