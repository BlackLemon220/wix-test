reddit.hot('aww').limit(5).fetch(function(res) {
// res contains JSON parsed response from Reddit
  console.log(res.data.children[0].data.preview.images[0].resolutions[0].url);
  document.getElementById("pic1").src = res.data.children[1].data.preview.images[0].resolutions[0].url;
});