import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CustomButton from '../Custom/CustomButton';
import flagIcon from './../../assets/icons/homepage/flag.png';
const courseContentData = [
    {
        semester: 1,
        milestone: 'Introduction to Computer and Scratch Programming'
    },
    {
        semester: 1,
        milestone: 'Introduction to Programming Language'
    },
    {
        semester: 1,
        milestone: 'Basic Data Structures'
    },
    {
        semester: 2,
        milestone: 'Introduction to Algorithms'
    },
    {
        semester: 2,
        milestone: 'OOP and Python Programming'
    },
    {
        semester: 3,
        milestone: 'Database Management'
    },
    {
        semester: 3,
        milestone: 'Server, deploy, and Cloud computing'
    },
    {
        semester: 3,
        milestone: 'English and Professionalism for Programmers'
    },
    {
        semester: 4,
        milestone: 'Final Project'
    },
    {
        semester: 4,
        milestone: 'Job/Intern Hunting'
    },
]
const gridArea = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
// Course content overview section
const CourseContent = (props) => {
    
    const id = props?.courseDetail?._id;

    return (
        <div className="course-content-component pt-3 pt-md-4 pb-5 mt-3">
            <div className="container">
                <h4 className="text-center mb-5 mt-4 section-title">
                    কোর্সে যা কিছু আছে
                </h4>
                <div className="row">
                    <div className="col-md-9 mx-auto">
                        <h3 className='text-center quote-text'>হার্ডওয়ার্ক করবে তুমি। যত্ত লাগুক কনটেন্ট, সাপোর্ট আর গাইডলাইন দিবো আমরা। হিসাব বরাবর <span role={'img'} aria-label='hand-shake'>🤝</span> হিসাব পাক্কা <span role={'img'} aria-label='bicep'>💪</span> </h3>
                    </div>
                    <div className="col-md-9 mx-auto semester-row">
                        <div className="row my-5">
                            <div className="col-4">
                                <div className="semester my-3">
                                    <span className='one'></span>
                                    <h4>Semester 1</h4>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="semester my-3">
                                    <span className='two'></span>
                                    <h4>Semester 2</h4>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="semester my-3">
                                    <span className='three'></span>
                                    <h4>Semester 3</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="milestones-map">
                    {
                        courseContentData.map(({ semester, milestone }, index) =>
                            <div style={{ gridArea: gridArea[index] }} className={`milestone milestone-${index + 1}`} key={milestone}>
                                <span className={`semester-pointer semester-${semester}`}>
                                    {index + 1}
                                    {
                                        courseContentData.length - 1 === index &&
                                        <img src={flagIcon} alt="" />
                                    }
                                </span>
                                <span className={`dashed-line ${index % 2 === 0 ? 'even' : 'odd'}`}></span>
                                <p>{milestone}</p>
                            </div>
                        )
                    }
                </div>
                <div className="text-center">
                    <CustomButton variant='contained'><Link to={"/course-details/"+ id} className='text-white' style={{textDecoration: "none"}}>Course Details</Link></CustomButton>
                </div>
            </div>
        </div>
    );
};

export default CourseContent;