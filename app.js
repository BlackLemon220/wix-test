reddit.hot('aww').limit(12).fetch(function(res) {
// res contains JSON parsed response from Reddit
  //console.log(res.data.children[0].data.preview.images[0].resolutions[0].url);
    for(var i = 1; i <= 12; i++) {
        var pic = decodeHtml(res.data.children[i].data.preview.images[0].resolutions[1].url);
        var picID = "pic" + i;
        var aID = "a" + i;
        document.getElementById(picID).src = pic;
        document.getElementById(picID).title = res.data.children[i].data.title;
        var permalink = res.data.children[i].data.permalink;
        var ref = "https://www.reddit.com" + permalink;
        document.getElementById(aID).href = ref;
    }
    console.log(res.data.children[1].data);
});

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}