import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bar, form, button, label, input } from './Searchbar.module.css';

export default class SearchBar extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };

    state = { query: '' };

    handleChange = event => {
        this.setState({ query: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();

        this.props.onSubmit(this.state.query);

        this.setState({
            query: '',
        });
    };

    render() {
        const { query } = this.state;
        return (
            <header className={bar}>
                <form className={form} onSubmit={this.handleSubmit}>
                    <button type="submit" className={button}>
                        <span className={label}>Search</span>
                    </button>

                    <input
                        className={input}
                        type="text"
                        autoComplete="off"
                        placeholder="Search images and photos"
                        value={query}
                        onChange={this.handleChange}
                    />
                </form>
            </header>
        );
    }
}
