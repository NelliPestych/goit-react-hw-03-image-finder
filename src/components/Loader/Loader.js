import React from 'react';
import LoaderSpinner from 'react-loader-spinner';
import PropTypes from 'prop-types';

const Loader = ({ type }) => (
    <LoaderSpinner
        type={type}
        color="#00BFFF"
        height={100}
        width={100}
        timeout={0}
    />
);

Loader.defaultProps = {
    type: 'ThreeDots',
};

Loader.propTypes = {
    type: PropTypes.string,
};

export default Loader;
