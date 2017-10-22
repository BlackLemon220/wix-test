import React from 'react';

class Gallery extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const images = this.props.images;
        return (
            <div id="contents">
                <ul className="images">
                    {
                        images.map(function(image) {
                            let imageStyle = {backgroundImage: 'url('+image.picUrl+')'};
                            return (<li>
                                <a href={image.postUrl} target="_blank">
                                    <div name={image.name} style={imageStyle} title={image.title} alt={image.title}></div>
                                </a>
                            </li>)
                        })
                    }
                    
                </ul>
            </div>
        );
    }
}
export default Gallery;