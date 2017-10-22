import React from 'react';

class Pagination extends React.Component {
    constructor(props) {
        super(props);
    }

    // handleNext() {
    //     let newPageNumber =2 ; //calculate
    //     this.props.onSwitchPage(newPageNumber);
    // }

    render() {
        var currentPage = this.props.currentPage;
        // const handleNext = this.handleNext.bind(this);   onClick={handleNext}
        return (
            <div id="pagination">
                <img src="./images/back.png" id="back" />
                <span id="numberPage">{currentPage} / 5</span>
                <img src="./images/next.png" id="next" />
            </div>
        );
    }
}
export default Pagination;
