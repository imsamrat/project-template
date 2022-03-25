import { Skeleton } from '@material-ui/lab';
import React from 'react';

// Student Dashboard Skeleton Preloader
const SuccessStudentSkeleton = () => {
    return (
        <>

            <div className="py-1 py-md-2 success-student-skeleton student-dashboard-skeleton">
                <div className="course-details-header"
                    style={{ backgroundColor: "#D6D6D6" }}
                >
                    <div className="container text-white">
                        <div className="row text-white mt-1 mt-md-5 pt-5 pb-md-5">
                            <div className="col-md-6 py-4 text-center">
                                <h1>
                                    <center>
                                    <Skeleton animation="wave" variant="rect" height={34} className="skeleton-title title mb-4" width={220} />
                                    </center>
                                    
                                </h1>
                                <h1>
                                    <Skeleton animation="wave" variant="rect" height={24} className="skeleton-title title small my-2" />
                                    <Skeleton animation="wave" variant="rect" height={24} className="skeleton-title title small" />
                                </h1>



                            </div>

                        </div>

                    </div>

                </div>
                <div className="container ">
                    <div className="row mb-4 pt-4">

                        {
                            [1, 2, 3, 4, 5, 6].map((item, index) => (

                                <div key={index} className="col-md-6 my-md-2 enrolled-course">
                                    <div
                                        className="card  border-0"
                                        style={{ backgroundColor: " #F1F1F1" }}
                                    >
                                        <div className="card-body p-0 m-0">
                                            <div className="row">
                                                <div className="col-lg-5 p-0">
                                                    <Skeleton animation="wave" className="skeleton-thumbnail" variant="rect" />
                                                </div>
                                                <div className="col-lg-7 mt-4 mt-mb-0">
                                                    <div className="p-4 pb-2">
                                                        <Skeleton animation="wave" variant="rect"  height={22} />
                                                        <Skeleton animation="wave" variant="rect"  height={22} className="my-2"/>
                                                        <Skeleton animation="wave" variant="rect"  height={22}  />
                                                        <Skeleton variant="rect" className="mb-5 my-2" width={204} height={22} />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="card-footer m-0 p-0">
                                            <Skeleton animation="wave" variant="rect" height={50} className="skeleton-title" />
                                        </div>
                                    </div>
                                </div>

                            ))
                        }


                    </div>
                </div>


            </div>
        </>


    );
};

export default SuccessStudentSkeleton;