import React from 'react';
import propTypes from 'prop-types';
import css from './ImageGallery.module.scss';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem.jsx';

function ImageGallery({ imageSet, onImageClick }) {
    return (
        <ul className={css.ImageGallery}>
            {imageSet.map((imageItem, idx) => {
                return (
                    <ImageGalleryItem
                        key={imageItem.id}
                        smallImgUrl={imageItem.webformatURL}
                        description={imageItem.tags}
                        onImageClick={() => {
                            onImageClick(idx);
                        }}
                    />
                );
            })}
        </ul>
    );
}

ImageGallery.propTypes = {
    imageSet: propTypes.arrayOf(propTypes.object).isRequired,
    onImageClick: propTypes.func.isRequired,
};

export default ImageGallery;
