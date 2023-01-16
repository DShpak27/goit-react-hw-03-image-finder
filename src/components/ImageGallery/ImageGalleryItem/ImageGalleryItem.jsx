import React from 'react';
import propTypes from 'prop-types';
import css from './ImageGalleryItem.module.scss';

function ImageGalleryItem({ smallImgUrl, description, onImageClick }) {
    return (
        <li className={css.ImageGalleryItem}>
            <img
                className={css['ImageGalleryItem-image']}
                src={smallImgUrl}
                alt={description}
                onClick={onImageClick}
            />
        </li>
    );
}

ImageGalleryItem.propTypes = {
    smallImgUrl: propTypes.string.isRequired,
    description: propTypes.string.isRequired,
};

export default ImageGalleryItem;
