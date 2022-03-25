import { Skeleton } from '@material-ui/lab';
import React from 'react';

// Course content Skeleton preloader
const CourseContentSkeleton = () => {
    return (
        <div className="container course-content-skeleton my-5 pt-3 pt-md-5">
            <div className="row">
                <div className="col-md-12 mb-3">
                    <Skeleton variant="rect" className="skeleton-course-name" />
                </div>
                 <div className="col-lg-8 pr-lg-4 pr-md-4">
                    <Skeleton className="skeleton-video-player" animation="wave" variant="rect" height={432} />
                    <div className="row mt-4">
                        <div className="col-md-6">
                            <Skeleton variant="rect"  className="mb-1 skeleton-module-title" height={16} width={422} />
                            <Skeleton variant="rect" className="skeleton-module-title" height={16} width={340} />
                        </div>
                        <div className="col-md-6 my-3 my-md-0 text-right d-flex justify-content-end">
                            <Skeleton variant="rect" className="mr-1 skeleton-btn disabled"  height={42} width={128} />
                            <Skeleton variant="rect" className="skeleton-btn" height={42} width={128} />
                        </div>
                    </div>
                 </div>
                 <div className="col-lg-4 pl-lg-0">
                        <Skeleton variant="rect" height={16} width={165}/>
                        {
                            [1,2,3,4,5].map((item, index) => 
                                <div 
                                    key={index} 
                                    className="my-3 p-4 skeleton-milestone" 
                                   
                                >
                                    <Skeleton variant="rect" animation="wave" className="mb-1" height={16} width={165}/>
                                    <Skeleton variant="rect" animation="wave" className="mb-1" height={16} width={110}/>
                                </div>
                            )
                        }
                        
                 </div>
            </div>
        </div>
    );
};

export default CourseContentSkeleton;