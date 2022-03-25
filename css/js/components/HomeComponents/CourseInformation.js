import React from 'react'
import smileImg from './../../assets/images/homepage/smile.png';
import { engToBanglaNumber } from '../../utilities/engToBnaglaNumber';
import EnrollnowButton from '../Common/EnrollnowButton';
import getImage from "../../utilities/getImage";

const CourseInformation = ({ courseDetail, courseSpecialties }) => {
    return (
        <section className="course-information-component">
            <div className="container">
                <h4 className='text-center my-5 section-title'>এই কোর্সের বিশেষত্ব কি?</h4>
                <div className="card-container">
                    {
                        courseSpecialties?.map(({ image, title, description }, i) => (
                            <div key={title} className={`info-card text-center card-${i + 1}`}>
                                <img src={getImage(image)} alt="" />
                                <h3>{engToBanglaNumber(i + 1)}. {title}</h3>
                                <p>{description}</p>
                            </div>
                        ))
                    }
                    <div className="info-card text-center card-7">
                        <img src={smileImg} className="img-fluid" alt="" />
                    </div>
                </div>
                <div className="text-center my-5">
                    <EnrollnowButton courseDetail={courseDetail} />
                </div>
            </div>
        </section>
    )
}

export default CourseInformation;
