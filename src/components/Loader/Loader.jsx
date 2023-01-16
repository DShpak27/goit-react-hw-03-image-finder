import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import css from './Loader.module.scss';

function Loader(props) {
    return (
        <div className={css.Loader}>
            <ThreeCircles
                height="100"
                width="100"
                color="#3f51b5"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=""
            />
        </div>
    );
}

export default Loader;
