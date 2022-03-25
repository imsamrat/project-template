import { Skeleton } from '@material-ui/lab';
import React from 'react';

// Course details/overview page skeleton preloader
const CourseOverviewSkeleton = () => {
    return (
        <>
            <div className="course-overview-skeleton">
                <div className="course-details-header"
                    style={{ backgroundColor: "#D6D6D6" }}
                >
                    <div className="container text-white">
                        <div className="row text-white mt-1 mt-md-5 pt-5 pb-md-5">
                            <div className="col-md-6 py-4">
                                <h1>
                                    <Skeleton animation="wave" variant="rect" height={34} className="skeleton-title" />
                                </h1>
                                <h1>
                                    <Skeleton animation="wave" variant="rect" height={34} className="skeleton-title small"/>
                                </h1>


                                <div className="instructor d-flex align-items-center mt-2 mt-md-5">
                                    <Skeleton variant="circle" height={52} width={52} />
                                    <div className="ml-3">
                                        <h6>
                                            <Skeleton animation="wave" variant="rect" height={14} width={108} />
                                        </h6>
                                        <p className="small m-0">
                                            <Skeleton animation="wave" variant="rect" height={14} width={87} />
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

                {/* header end */}
                <div className="container course-details-section">
                    <div className="row my-4 my-md-5">
                        <div className="col-lg-7 order-1 order-lg-0">
                            <div className="prerequisite">
                                    <Skeleton animation="wave" variant="rect" height={34} className="mb-2 skeleton-sub-title" />
                                    <Skeleton animation="wave" variant="rect" height={34} className="skeleton-sub-title small" />

                            </div>

                            {/* What will you learn */}
                            <div className="course-criteria-section course-criterias my-3 my-md-5">

                                <div className="list-unstyled row">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                                        <div className="col-md-6" key={i}>
                                            <div className="mb-4">
                                                <Skeleton animation="wave" variant="rect" height="14" className="skeleton-topic" />
                                                <Skeleton animation="wave" variant="rect"  height="14" className="skeleton-topic small" />
                                            </div>
                                            
                                        </div>
                                    ))}

                                </div>
                            </div>
                            <div>
                                <Skeleton animation="wave" height={34} className="skeleton-sub-title" />
                                {
                                    [1, 2, 3, 4, 5].map(i =>
                                        <div key={i}
                                            style={{ backgroundColor: "#F1F1F1" }}
                                            className="my-4 p-3"
                                        >
                                            <Skeleton animation="wave" hight={14}  className="mb-1 skeleton-bar" />
                                            <Skeleton hight={14} className="skeleton-bar small" />

                                        </div>
                                    )
                                }


                            </div>
                            <div className="review-and-feedback mt-md-5 ">
                                <Skeleton animation="wave" variant="rect" className="skeleton-sub-title" height={34} />
                                <div className="row pt-5">
                                    <div className="col-md-5 text-center">
                                        <Skeleton animation="wave" variant="rect" height={146} />
                                    </div>
                                    <div className="col-md-7">
                                        {
                                            [1, 2, 3, 4, 5].map(i =>
                                                <Skeleton key={i} animation="wave"  height={10} className="mb-4" />
                                            )
                                        }

                                    </div>
                                </div>
                                <div className="row mt-md-5">
                                    <div className="col-md-12">

                                        <div className="reviews">
                                            {
                                                [1, 2, 3].map(i =>
                                                    <div key={i} className="my-5 single-review">
                                                        <div className="meta row">
                                                            <div className="col-md-6">
                                                                <div className="d-flex">
                                                                    <Skeleton  variant="circle" width={53} height={53} />
                                                                    <div className="pl-3 mt-2">
                                                                        <Skeleton animation="wave" variant="rect" width={167} height={14} className="mb-2" />
                                                                        <Skeleton animation="wave" variant="rect" width={150} height={14} />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="comment mt-md-4">
                                                            <Skeleton animation="wave" variant="rect"className="skeleton-comment mb-2" />
                                                            <Skeleton animation="wave" variant="rect" className="skeleton-comment small" />
                                                        </div>
                                                    </div>)

                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 pl-md-5 preview-card-container order-0 order-lg-1 mb-5">
                            {/* Preview card */}
                            <div className="enroll-card preview-card  p-3 p-md-4 p-lg-3 pb-md-5"
                                style={{ backgroundColor: '#E9E9E9' }}
                            >
                                <Skeleton animation="wave" variant="rect" className="skeleton-thumb" height={258} />


                                <div className="status px-3 d-flex justify-content-between text-center my-4">
                                    {
                                        [1, 2, 3].map(i =>
                                            <div key={i} className="skeleton-status">
                                                <Skeleton animation="wave" variant="rect" className="skeleton-icon" height={57} width={57} />
                                                <h4>
                                                    <Skeleton height={12} width={85} />
                                                </h4>
                                                <p> <Skeleton height={12} width={54} /></p>
                                            </div>
                                        )
                                    }

                                </div>
                                <div className="count d-flex justify-content-between text-center mt-3 mb-5">
                                    {
                                        [1, 2, 3].map(i => <Skeleton key={i} variant="rect" className="skeleton-count" height={40} />)
                                    }

                                </div>

                                <Skeleton animation="wave" variant="rect" className="skeleton-btn" height={60} />

                            </div>
                        </div>


                    </div>

                </div>
            </div>
        </>
    );
};

export default CourseOverviewSkeleton;