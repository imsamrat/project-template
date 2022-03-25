import React from "react";
import instructorImg from './../../assets/images/homepage/instructor.png';
import EnrollnowButton from "../Common/EnrollnowButton";
import InstructorsSingle from "./InstructorsSingle";
import getImage from "../../utilities/getImage";

// About Instructor section
const Instructors = ({ author, courseDetail }) => {
    return (
        <section className="about-instructor-component p-sm-5 mt-5">
            <div className="container pb-5">
                <h3 className="section-title english text-center mb-5">Faculty</h3>
                {
                    author?.map((instructor, i) => <InstructorsSingle key={i} index={i} instructor={instructor} />)
                }
                <div className="text-center">
                    <EnrollnowButton courseDetail={courseDetail} />
                </div>
            </div>
        </section>
    )
}

export default Instructors;