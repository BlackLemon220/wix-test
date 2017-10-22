// Imports
import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import './reddit.min';


ReactDom.render(
    <App />,
    document.getElementById('wholeApp')
);

function nextClick() {
    if(currentPage !== maxPage) {
        currentPage++;
        showImages("after", lastImage);
        paginationShow();
    }
}

function nextClick() {
    if(currentPage !== 1) {
        currentPage--;
        showImages("before", firstImage);
        paginationShow();
    }
}

// Gallery show
function showImages(beforeOrAfter, imageCode) {
    var category = document.getElementById("select").value;
    var sub = document.getElementById('search-text').value || defaultSubreddit;
}