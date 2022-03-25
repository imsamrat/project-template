import React from "react";

import courseService from "../../services/Admin/CourseManagement/courseService";
import homeCmsService from "../../services/Admin/homeCms/homeCmsService";
import HeroArea from "../../components/HomeComponents/HeroArea";
import Notice from "../../components/HomeComponents/Notice";
import { useQuery } from "react-query";
const CourseProcess = React.lazy(() => import(/* webpackPrefetch: true */"../../components/HomeComponents/CourseProcess"));
const CourseInformation = React.lazy(() => import(/* webpackPrefetch: true */"../../components/HomeComponents/CourseInformation"));
const CourseContent = React.lazy(() => import(/* webpackPrefetch: true */"../../components/HomeComponents/CourseContent"));
const FrequentlyAsked = React.lazy(() => import(/* webpackPrefetch: true */"../../components/HomeComponents/FrequentlyAsked"));
const Instructors = React.lazy(() => import(/* webpackPrefetch: true */"../../components/HomeComponents/Instructors"));


// Home page
const Home = () => {
    document.title = "Phitron";
    const homeCMSData = useQuery('homeCms', homeCmsService.getHomeCmsData, {
        cacheTime: 1000 * 60 * 24,
        staleTime: 1000 * 60 * 15
    });
    const courseDetail = useQuery('publicCourse', courseService.getPublicCourseDetail, {
        cacheTime: 1000 * 60 * 24,
        staleTime: 1000 * 60 * 10
    });
   
    return (
        <>
            <HeroArea
                courseDetail={courseDetail?.data?.data?.data?.course}
                slider={homeCMSData?.data?.data?.data?.slider}
            />
            <Notice
                courseDetail={courseDetail?.data?.data?.data?.course}
                notice={homeCMSData?.data?.data?.data?.notice}
            />
            <CourseContent 
            courseDetail={courseDetail?.data?.data?.data?.course} 
            />
            <CourseInformation
                courseSpecialties={homeCMSData?.data?.data?.data?.courseSpecialties}
                courseDetail={courseDetail?.data?.data?.data?.course}
            />
            <CourseProcess relatedInfos={homeCMSData?.data?.data?.data?.relatedInfos}/>
            <FrequentlyAsked />
            <Instructors
                author={homeCMSData?.data?.data?.data?.author}
                courseDetail={courseDetail?.data?.data?.data?.course}
            />
        </>
    )
}

export default React.memo(Home);