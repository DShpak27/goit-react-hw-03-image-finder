import React from 'react';
import propTypes from 'prop-types';
import css from './Button.module.scss';

function Button({ onBtnClick, children }) {
    return (
        <button className={css.Button} type="button" onClick={onBtnClick}>
            {children}
        </button>
    );
}

Button.propTypes = {
    onBtnClick: propTypes.func.isRequired,
    children: propTypes.string.isRequired,
};

export default Button;
