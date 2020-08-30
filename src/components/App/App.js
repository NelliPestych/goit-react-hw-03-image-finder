import React, { Component } from 'react';
import { error } from '@pnotify/core';
import imagesApi from '../../services/apiService';
import mapper from '../../helpers/mapper';
import styles from './App.module.css';
import ImageGallery from '../ImageGallery/ImageGallery';
import Searchbar from '../Searchbar/Searchbar';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';

export default class App extends Component {
    state = {
        images: [],
        isLoading: false,
    };

    componentDidMount() {
        this.fetchImages();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.images.length > 12) {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth',
            });
        }
    }

    fetchImages = query => {
        if (query && typeof query === 'string') {
            this.setState({ images: [] });
            imagesApi.currentQuery = query;
            imagesApi.resetPage();
        }
        imagesApi
            .fethImages()
            .then(res => {
                if (res.length === 0) {
                    error('No result with your query!');
                }
                this.setState(state => ({
                    images: [...state.images, ...mapper(res)],
                }));
            })
            .catch(err => error(err))
            .finally(() => {
                this.setState({ isLoading: false });
            });
    };

    getNewImgHandler = () => {
        this.setState({ isLoading: true });
        this.fetchImages();
    };

    render() {
        const { images, isLoading } = this.state;
        const alt = imagesApi.currentQuery;

        return (
            <div className={styles.container}>
                <Searchbar onSubmit={this.fetchImages} />
                <>
                    {images.length > 0 ? (
                        <>
                            <ImageGallery images={images} alt={alt} />
                            <div className={styles.loadingWrap}>
                                {isLoading ? <Loader type="ThreeDots" /> : <Button onClick={this.getNewImgHandler} />}
                            </div>
                        </>
                    ) : (
                        <Loader type="Oval" />
                    )}
                </>
            </div>
        );
    }
}
