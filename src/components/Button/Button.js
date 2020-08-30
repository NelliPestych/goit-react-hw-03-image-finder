import React from 'react';
import PropTypes from 'prop-types';
import { button } from './Button.module.css';

const Button = ({ onClick }) => (
    <button className={button} onClick={onClick} type="button">
        Load More
    </button>
);

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default Button;
