import React from 'react';

class Top extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div id='search-box'>    
                <div id='search-form'>
                    <input id="search-text" placeholder="Search" type="text" />
                    <select id="select">
                        <option value="Hot">Hot</option>
                        <option value="Top">Top</option>
                        <option value="Random">Random</option>
                    </select>
                    <button id="search-button"><span>Search</span></button>
                </div>
            </div>
        );
    }
}
export default Top;
