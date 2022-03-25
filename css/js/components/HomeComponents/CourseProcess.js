import React from 'react';
import { Image } from 'react-bootstrap';
import laptopBoyImg from './../../assets/images/homepage/laptop-boy.png';
import laptopGirlImg from './../../assets/images/homepage/laptop-girl.png';
import { engToBanglaNumber } from '../../utilities/engToBnaglaNumber';

const CourseProcess = ({ relatedInfos }) => {
    return (
        <section className='course-process-component'>
            <div className="container pt-3">
                <h3 className="text-center mt-2 mb-5 section-title">এই কোর্স কিভাবে কাজ করবে?</h3>
                <div className="row my-5">

                    <div className="col-md-5">
                        <div className="text-center p-3">
                            <Image className='img-fluid' src={laptopBoyImg} alt="" />
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="p-3">
                            {relatedInfos?.slice(0, 3)?.map((eachItem, key) => (
                                <div key={key} className="course-process-step my-4">
                                    <span>{engToBanglaNumber(key + 1)}</span>
                                    <h3> {eachItem?.info} </h3>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
                <div className="row py-5">
                    <div className="col-md-7 order-2 order-md-1">
                        <div className="p-3">
                            {relatedInfos?.slice(3, 6)?.map((eachItem, key) => (
                                <div key={key} className="course-process-step my-4">
                                    <span>{engToBanglaNumber(key + 4)}</span>
                                    <h3> {eachItem?.info} </h3>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-md-5 order-1 order-md-2">
                        <div className="text-center p-3">
                            <Image className='img-fluid' src={laptopGirlImg} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CourseProcess;