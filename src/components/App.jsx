import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar.jsx';
import searchService from '../services/searchService.js';
import Loader from './Loader/Loader.jsx';
import Button from './Button/Button.jsx';
import Modal from './Modal/Modal.jsx';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import isEqual from 'lodash.isequal';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from './App.module.scss';

const INITIAL_STATE = {
    data: [],
    totalFound: 0,
    status: 'idle',
    query: '',
    page: 1,
    showModal: false,
    chosenImageIndex: null,
    onErrorMessage: '',
};

export default class App extends Component {
    state = {
        data: [],
        totalFound: 0,
        status: 'idle',
        query: '',
        page: 1,
        showModal: false,
        chosenImageIndex: null,
        onErrorMessage: '',
    };

    componentDidMount() {
        const restoredState = JSON.parse(localStorage.getItem('state'));
        if (restoredState) {
            this.setState({ ...restoredState });
        }
    }

    componentDidUpdate(_, prevState) {
        if (!isEqual(this.state, prevState)) {
            localStorage.setItem('state', JSON.stringify(this.state));
        }
    }

    handleButtonSubmit = query => {
        if (query === '') {
            this.setState({ ...INITIAL_STATE });
            return Notify.info('Try to type you neet to find!', {
                width: '450px',
                timeout: 1500,
                fontSize: '30px',
                position: 'center-center',
                showOnlyTheLastOne: true,
            });
        }
        this.setState({ status: 'pending' });
        searchService.currentQuery = query;
        searchService.pageNumber = 1;
        searchService
            .fetchImages()
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
            })
            .then(data => {
                if (data.hits.length === 0) {
                    this.setState({
                        data: data.hits,
                        totalFound: data.total,
                        page: 1,
                        query: query,
                        status: 'nothing found',
                    });
                } else {
                    this.setState({
                        data: data.hits,
                        totalFound: data.total,
                        page: 1,
                        query: query,
                        status: 'resolved',
                    });
                }
            })
            .catch(error => {
                this.setState({
                    status: 'error',
                    onErrorMessage: error.message,
                });
            });
    };

    handleButtonLoadMore = () => {
        if (
            this.state.totalFound /
                (searchService.resultsPerPage * (this.state.page + 1)) <
            1
        ) {
            return Notify.info('No more images to display', {
                width: '450px',
                timeout: 1500,
                fontSize: '30px',
                position: 'center-center',
                showOnlyTheLastOne: true,
            });
        }

        this.setState({ status: 'pending' });
        searchService.currentQuery = this.state.query;
        searchService.pageNumber = this.state.page + 1;
        searchService
            .fetchImages()
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
            })
            .then(data => {
                return this.setState(prevState => {
                    return {
                        data: [...prevState.data, ...data.hits],
                        page: prevState.page + 1,
                        status: 'resolved',
                    };
                });
            })
            .catch(error => {
                this.setState({
                    status: 'error',
                    onErrorMessage: error.message,
                });
            });
    };

    handleGalleryImageClick = idx => {
        this.setState({ showModal: true, chosenImageIndex: idx });
    };

    closeModal = () => {
        this.setState({ showModal: false });
    };

    handleResetBtn = () => {
        this.setState({ ...INITIAL_STATE });
    };

    render() {
        const { status } = this.state;

        switch (status) {
            case 'pending':
                return (
                    <div className={css.App}>
                        <Searchbar
                            initialValue={this.state.query}
                            onSubmit={this.handleButtonSubmit}
                            onResetButton={this.handleResetBtn}
                        />
                        <Loader />
                    </div>
                );

            case 'resolved':
                return (
                    <div className={css.App}>
                        <Searchbar
                            initialValue={this.state.query}
                            onSubmit={this.handleButtonSubmit}
                            onResetButton={this.handleResetBtn}
                        />
                        <ImageGallery
                            imageSet={this.state.data}
                            onImageClick={this.handleGalleryImageClick}
                        />
                        <Button onBtnClick={this.handleButtonLoadMore}>
                            Load more
                        </Button>
                        {this.state.showModal && (
                            <Modal
                                imageToShow={
                                    this.state.data[this.state.chosenImageIndex]
                                }
                                onEscBtn={this.closeModal}
                                onOverlayClick={this.closeModal}
                            />
                        )}
                    </div>
                );

            case 'nothing found':
                return (
                    <div className={css.App}>
                        <Searchbar
                            initialValue={this.state.query}
                            onSubmit={this.handleButtonSubmit}
                            onResetButton={this.handleResetBtn}
                        />
                        <div className={css.notification}>
                            <span>
                                Sorry! But nothing found for your request!
                            </span>
                            <span>Try change the requested word.</span>
                        </div>
                    </div>
                );

            case 'error':
                return (
                    <div className={css.App}>
                        <Searchbar
                            initialValue={this.state.query}
                            onSubmit={this.handleButtonSubmit}
                            onResetButton={this.handleResetBtn}
                        />
                        <div className={css.notification}>
                            <span>{this.state.onErrorMessage}</span>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className={css.App}>
                        <Searchbar
                            initialValue={this.state.query}
                            onSubmit={this.handleButtonSubmit}
                            onResetButton={this.handleResetBtn}
                        />
                    </div>
                );
        }
    }
}
