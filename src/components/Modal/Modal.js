import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { overlay, modal } from './Modal.module.css';

export default class Modal extends Component {
    static propTypes = {
        src: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyPress);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyPress);
    }

    handleKeyPress = event => {
        if (event.code !== 'Escape') return;

        this.props.onClick();
    };

    render() {
        const { src, alt, onClick } = this.props;
        return (
            <div className={overlay} onClick={onClick}>
                <div className={modal}>
                    <img src={src} alt={alt} />
                </div>
            </div>
        );
    }
}
