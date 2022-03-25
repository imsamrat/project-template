import React, { useState } from 'react';
import Image from 'material-ui-image';
import facebookIcon from './../../assets/icons/homepage/instructors/Facebook.svg';
import youtubeIcon from './../../assets/icons/homepage/instructors/youtube.svg';
import instragramIcon from './../../assets/icons/homepage/instructors/instagram.svg';
import linkedinIcon from './../../assets/icons/homepage/instructors/linkedin.svg';
import getImage from "../../../src/utilities/getImage";

const InstructorsSingle = ({ instructor, index }) => {
    const { name, quote, image, facebook, linkedin, youtube, instragram } = instructor || {}

    const [fullQuote, setFullQuote] = useState(false);
    return (
        <div className="row my-4 py-4">
            <div className={`col-md-5 order-1 order-md-${index % 2 === 0 ? 1 : 2}`}>
                <div className="text-center text-md-left mb-4">
                    <Image style={{ all: 'unset' }} alt="..." className="instructor-image img-fluid lazy-image" src={getImage(image)} />
                </div>
            </div>
            <div className={`col-md-7 order-2 order-md-${index % 2 === 0 ? 2 : 1}`}>
                <div className="d-flex px-3 flex-column justify-content-center h-100">
                    <h2 className="mb-4 text-center text-md-left instructor-name">
                        {name}
                    </h2>
                    {
                        quote.length > 360 ?
                            <p className="mb-4 quote">
                                {fullQuote ? quote : quote.slice(0, 360) + '...'}
                                <span onClick={() => setFullQuote(!fullQuote)} className="see-more-btn"> {fullQuote ? 'See less' : 'See more'}</span>
                            </p>
                            : <p className="mb-4 quote">
                                {quote}
                            </p>
                    }

                    <div className="text-center  text-md-left">
                        <a className="mr-2" href={facebook} target="_blank" rel="noopener noreferrer">
                            <img src={facebookIcon} alt="" />
                        </a>
                        <a className="mr-2" href={linkedin} target="_blank" rel="noopener noreferrer">
                            <img src={linkedinIcon} alt="" />
                        </a>
                        <a className="mr-2" href={instragram} target="_blank" rel="noopener noreferrer">
                            <img src={instragramIcon} alt="" />
                        </a>
                        <a href={youtube} target="_blank" rel="noopener noreferrer">
                            <img src={youtubeIcon} alt="" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorsSingle;