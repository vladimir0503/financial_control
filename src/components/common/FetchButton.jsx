import React from 'react'
import Loader from './Loader';

const FetchButton = ({ isLoading, handleSubmit, text }) => {
    return (
        <button className="btn" onClick={handleSubmit}>
            {isLoading ? <Loader /> : text}
        </button>
    );
};

export default FetchButton;