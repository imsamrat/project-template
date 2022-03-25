import React from 'react';

const Preloader = () => {
    return (
        <div className="page-loader">
            <div className="fake-header"></div>
            <div className="fake-page-body">

                <div className="preloader rocket-preloader">
                    <div className="rocket"></div>
                </div>

            </div>
        </div>
    );
};

export default Preloader;