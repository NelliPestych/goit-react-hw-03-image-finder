import React from 'react';
import PropTypes from 'prop-types';
import { img } from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ src, alt }) => (
    <img src={src} alt={alt} className={img} />
);

ImageGalleryItem.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
