import React from 'react';

class Pagination extends React.Component {
    /**
     * Constructor
     * @param {object} props    class's properties
     */
    constructor(props) {
        super(props);
    }

    /**
     * Handler for next page on pagination mechanism.
     */
    handleNext() {
        this.props.switchNextPage();
    }

    /**
     * Handler for prevoius page on pagination mechanism.
     */
    handlePrev() {
        this.props.switchPrevPage();
    }

    /**
     * render
     */
    render() {
        var currentPage = this.props.currentPage;
        const handleNext = this.handleNext.bind(this); 
        const handlePrev = this.handlePrev.bind(this);  
        return (
            <div id="pagination">
                <img src="./images/back.png" onClick={handlePrev} id="back" />
                <span id="numberPage">{currentPage} / 5</span>
                <img src="./images/next.png" onClick={handleNext} id="next" />
            </div>
        );
    }
}
export default Pagination;
