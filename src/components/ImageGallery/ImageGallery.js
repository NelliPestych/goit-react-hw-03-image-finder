import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { list, item } from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from '../Modal/Modal';

export default class ImageGallery extends Component {
    static propTypes = {
        images: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                smallImg: PropTypes.string.isRequired,
            }),
        ).isRequired,
        alt: PropTypes.string.isRequired,
    };

    state = {
        isModalOpen: false,
        modalImg: '',
    };

    openModalHandler = event => {
        const { img } = event.currentTarget.dataset;
        this.setState({ modalImg: img, isModalOpen: true });
    };

    closeModalHandler = event => {
        if (!event || event.currentTarget === event.target)
            this.setState({ isModalOpen: false });
    };

    render() {
        const { isModalOpen, modalImg } = this.state;
        const { images, alt } = this.props;
        return (
            <>
                <ul className={list}>
                    {images.map(({ id, smallImg, bigImg }) => (
                        <li
                            key={id}
                            className={item}
                            onClick={this.openModalHandler}
                            data-img={bigImg}
                        >
                            <ImageGalleryItem src={smallImg} alt={alt} />
                        </li>
                    ))}
                </ul>
                {isModalOpen && (
                    <Modal
                        src={modalImg}
                        alt={alt}
                        onClick={this.closeModalHandler}
                    />
                )}
            </>
        );
    }
}
