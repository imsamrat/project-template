import { Skeleton } from '@material-ui/lab';
import React from 'react';

// Student Dashboard Skeleton Preloader
const StudentDashboardSkeleton = () => {
    return (
        <div className="container py-1 py-md-5 my-5 student-dashboard-skeleton">
            <div className="row mb-4 pt-4">
                <div className="col-md-12 mb-4">
                    <Skeleton animation="wave" className="enrolled-courses"  variant="rect"  height={34} />
                </div>
                {
                    [1, 2].map((item, index) => (

                        <div key={index} className="col-md-6 my-md-2 enrolled-course">
                            <div 
                                className="card  border-0"
                                style={{ backgroundColor:" #F1F1F1"}} 
                            >
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-lg-5 pr-md-0">
                                            <Skeleton animation="wave" className="skeleton-thumbnail" variant="rect"  />
                                        </div>
                                        <div className="col-lg-7 mt-2 mt-mb-0">
                                            <Skeleton animation="wave"  variant="rect" width={252} height={22} />
                                            <Skeleton variant="rect" className="mb-5 my-2" width={204} height={22} />

                                            <Skeleton animation="pulse" className="skeleton-btn mt-5 mt-mb-0"  variant="rect" width={134} height={38} />

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    ))
                }


            </div>

            <div className="row mb-3 ">
                <div className="col-md-12 mb-4">
                    <Skeleton  animation="wave" className="available-courses" variant="rect" height={34} />
                </div>
                {
                    [1, 2].map((item, index) => (

                        <div key={index} className="col-md-6 my-md-2 enrolled-course">
                            <div 
                                className="card  border-0"
                                style={{ backgroundColor:" #F1F1F1"}} 
                            >
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-lg-5 pr-md-0">
                                            <Skeleton animation="wave" className="skeleton-thumbnail" variant="rect" />
                                        </div>
                                        <div className="col-lg-7 mt-2 mt-mb-0">
                                            <Skeleton animation="wave"  variant="rect" width={252} height={22} />
                                            <Skeleton variant="rect" className="mb-5 my-2" width={204} height={22} />

                                            <Skeleton animation="pulse" className="skeleton-btn mt-5 mt-mb-0"  variant="rect" width={134} height={38} />

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    ))
                }


            </div>
        </div>

    );
};

export default StudentDashboardSkeleton;