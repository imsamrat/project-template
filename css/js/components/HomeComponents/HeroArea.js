import React from 'react'
import Image from 'material-ui-image';
import { Carousel } from 'react-bootstrap'
import getImage from '../../utilities/getImage';
import CustomButton from '../Custom/CustomButton';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import EnrollnowButton from '../Common/EnrollnowButton';

// Banner/hero section
const HeroArea = (props) => {
    return (
        <section className="hero-area py-5">
            <div className="container">
                <Carousel interval={5500} pause={false} controls={false} fade>
                    {
                        props.slider?.map(({ title, description, image, _id }) => (
                            <Carousel.Item key={_id}>
                                <div className="row align-items-center h-100">
                                    <div className="col-md-7 my-5">
                                        <div className="mx-3">
                                            <h4 className='label'>CSE Fundamentals:</h4>
                                            <h2>
                                                {title}
                                            </h2>
                                            <p className="my-5 description">{description}</p>
                                            <div className='btn-container'>
                                                <EnrollnowButton courseDetail={props.courseDetail} />
                                                <Button>
                                                    <Link to={`/course-details/${props?.courseDetail?._id}`} className='see-outline-btn'>See course outline</Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-5 my-5">
                                        <Image style={{ backgroundColor: 'unset' }} className="img-fluid" src={getImage(image)} alt={title} />
                                    </div>
                                </div>
                            </Carousel.Item>
                        ))
                    }

                </Carousel>

            </div>
        </section>
    )
}

export default HeroArea
