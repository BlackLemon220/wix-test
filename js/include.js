/**
 * Decoding string:
 * I took this function from:
 * "https://stackoverflow.com/questions/7394748/whats-the-right-way-to-decode-a-string-that-has-special-html-entities-in-it"
 * Reddit's URLs being received with 'amp;' which disturbs viewing the image.
 * @param   {[URL]} html [All images URLs]
 * @returns {[URL]} [[The same URL without 'amp;']]
 */
function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}