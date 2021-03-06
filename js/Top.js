import React from 'react';

class Top extends React.Component {
    /**
     * Constructor
     * @param {object} props    class's properties
     */
    constructor(props) {
        super(props);
    }

    /**
     * Handler for new search.
     */
    handleSearch() {
        this.props.makeNewSearch();
    }

    /**
     * render
     */
    render() {
        const handleSearch = this.handleSearch.bind(this);
        return (
            <div id='search-box'>    
                <div id='search-form'>
                    <input id="search-text" placeholder="Search" type="text" />
                    <select id="select">
                        <option value="Hot">Hot</option>
                        <option value="Top">Top</option>
                    </select>
                    <button id="search-button" onClick={handleSearch} ><span>Search</span></button>
                </div>
            </div>
        );
    }
}
export default Top;
