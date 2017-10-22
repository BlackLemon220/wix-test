import React from 'react';

class Pagination extends React.Component {
    constructor(props) {
        super(props);
    }

    handleNext() {
        this.props.switchNextPage();
    }

    handlePrev() {
        this.props.switchPrevPage();
    }

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
