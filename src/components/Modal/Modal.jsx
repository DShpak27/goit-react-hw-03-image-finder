import React, { Component } from 'react';
import propTypes from 'prop-types';
import { createPortal } from 'react-dom';
import css from './Modal.module.scss';

export default class Modal extends Component {
    static propTypes = {
        onEscBtn: propTypes.func.isRequired,
        onOverlayClick: propTypes.func.isRequired,
        imageToShow: propTypes.object.isRequired,
    };

    componentDidMount() {
        document.querySelector('html').style.overflow = 'hidden';
        window.addEventListener('keydown', this.escapeListener);
    }

    componentWillUnmount() {
        document.querySelector('html').style.overflow = 'visible';
        window.removeEventListener('keydown', this.escapeListener);
    }

    escapeListener = evt => {
        if (evt.code === 'Escape') {
            this.props.onEscBtn();
        }
    };

    handleOverlayClick = evt => {
        if (evt.target === evt.currentTarget) {
            this.props.onOverlayClick();
        }
    };

    render() {
        const modalRoot = document.querySelector('#modal-root');

        return createPortal(
            <div
                id="backdrop"
                className={css.Overlay}
                onClick={this.handleOverlayClick}
            >
                <div className={css.Modal}>
                    <img
                        className={css.Modal__img}
                        src={this.props.imageToShow.largeImageURL}
                        alt={this.props.imageToShow.tags}
                        loading="lazy"
                    />
                </div>
            </div>,
            modalRoot
        );
        // return (
        //     <div className={css.Overlay} onClick={this.handleOverlayClick}>
        //         <div className={css.Modal}>
        //             <img
        //                 className={css.Modal__img}
        //                 src={this.props.imageToShow.largeImageURL}
        //                 alt={this.props.imageToShow.tags}
        //                 loading="lazy"
        //             />
        //         </div>
        //     </div>
        // );
    }
}
