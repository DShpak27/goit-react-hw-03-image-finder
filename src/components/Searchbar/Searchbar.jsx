import React, { Component } from 'react';
import propTypes from 'prop-types';
import { ReactComponent as FinderIcon } from '../../icons/find-icon.svg';
import css from './Searchbar.module.scss';

export default class Searchbar extends Component {
    static propTypes = { onSubmit: propTypes.func.isRequired };

    state = {
        query: '',
    };

    componentDidMount() {
        const restoredState = JSON.parse(localStorage.getItem('state'));
        if (restoredState) {
            this.setState({ query: restoredState.query });
        }
    }

    handleInputChange = evt => {
        this.setState({ query: evt.target.value });
    };

    handleFormSubmit = evt => {
        evt.preventDefault();
        const query = evt.currentTarget.elements.imageFinder.value
            .trim()
            .toLowerCase();
        this.props.onSubmit(query); //Передаємо запрос до батька
    };

    handleResetClick = () => {
        this.setState({ query: '' });
        this.props.onResetButton();
    };

    render() {
        return (
            <header className={css.Searchbar}>
                <form
                    className={css.SearchForm}
                    onSubmit={this.handleFormSubmit}
                >
                    <button type="submit" className={css['SearchForm-button']}>
                        <FinderIcon width={20} height={20} />
                    </button>

                    <input
                        className={css['SearchForm-input']}
                        name="imageFinder"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={this.state.query}
                        onChange={this.handleInputChange}
                    />
                    <button
                        type="button"
                        className={css['SearchForm-button']}
                        onClick={this.handleResetClick}
                    >
                        <span className={css.resetLabel}>RESET</span>
                    </button>
                </form>
            </header>
        );
    }
}
