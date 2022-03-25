import Image from 'material-ui-image';
import React, { useEffect, useState } from 'react';
import ModalVideo from 'react-modal-video';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { addToCart } from '../../actions/cartAction';
import certificateImg from '../../assets/icons/homepage/star.svg';
import semesterImg from '../../assets/icons/homepage/semester.svg';
import timeImg from '../../assets/icons/homepage/calendar.svg';
import authService from '../../services/authService';
import cartService from '../../services/cartService';
import EnrollnowButton from './EnrollnowButton';
import moment from 'moment'
import LottieAnimation from './Lottie';
import playButton from '../../animations/play-button.json'
import getImage from '../../utilities/getImage';
import { engToBanglaNumber } from '../../utilities/engToBnaglaNumber';
import CustomButton from '../Custom/CustomButton';
// Course info card
const PreviewCard = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [today, setToday] = useState(moment().toISOString())
    const history = useHistory();
    const { _id, thumbnail, courseId, title, certificateAvailability, timeDuration, enrolledStudents, price, usd, registrationStartDate, registrationEndDate, courseOverviewVideoLink, totalAssignment, totalQuiz, totalVideo } = props.courseDetail || {};
    function getTimeRemaining(endtime) {
        // const seconds = Math.floor( (total/1000) % 60 );
        // const minutes = Math.floor( (total/1000/60) % 60 );
        // const hours = Math.floor( (total/(1000*60*60)) % 24 );
        // const days = Math.floor( total/(1000*60*60*24) );
        const diff = moment.duration(moment(endtime).diff(moment(today)))
        const days = parseInt(diff.asDays());
        const hours = parseInt(diff.asHours()) - days * 24;
        const minutes = parseInt(diff.asMinutes()) - (days * 24 * 60 + hours * 60);

        return {
            days: days > 0 ? days : 0,
            hours: hours > 0 ? hours : 0,
            minutes: minutes > 0 ? minutes : 0,
        };
    }
    useEffect(() => {

        setInterval(() => {
            setToday(moment().toISOString())
        }, 60000)

    }, [])

    const cartData = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const buyNow = () => {
        if (!authService.getCurrentUser()?.user) {
            // swal("", "You must signed in to do this action", "info");
            history.push('/login')
            return
        }

        addToReduxCart(_id, courseId, title, price, usd, thumbnail)
        history.push('/checkout')
    }
    const addToReduxCart = (id, courseId, title, price, usd, thumbnail) => {
        if (!authService.getCurrentUser()?.user) {
            swal("", "You must signed in to do this action", "info");
            return
        }

        if (cartData?.find(item => item._id === id)) {
            swal("", "Course already added", "warning")
        } else {
            dispatch(addToCart({ _id: id, courseId, title, price, usd, thumbnail, registrationStartDate, registrationEndDate }))
            cartService.updateCartToLocalStorage(authService.getCurrentUser()?.user?._id, cartData)
        }
    }
    useEffect(() => {
        const user = authService.getCurrentUser()?.user?._id;
        cartData?.length > 0 && user && cartService.updateCartToLocalStorage(user, cartData)
    }, [cartData?.length])

    return (
        <>
            {
                today < registrationEndDate ?
                    <div className="enroll-card preview-card shadow p-3 p-md-4 p-lg-3 pb-md-5">
                        {
                            props.courseDetail?.title && (
                                <>

                                    <ModalVideo channel={courseOverviewVideoLink?.includes('//youtu') ? 'youtube' : 'vimeo'} isOpen={isOpen} videoId={
                                        courseOverviewVideoLink
                                            .replace("https://vimeo.com/", "")
                                            ?.replace("https://www.youtube.com/", "")
                                            ?.replace("https://youtube.com/", "")
                                            ?.replace("https://youtu.be/", "")
                                            ?.replace("/", "")
                                    } onClose={() => setIsOpen(false)} />

                                    <div className="preview text-center p-2">
                                        <Image style={{ paddingTop: 0 }} className="img-fluid w-100 lazy-image" src={getImage(thumbnail)} alt={title} />
                                        <div onClick={() => setIsOpen(true)} className="play-icon">
                                            <LottieAnimation lottie={playButton} w="250" h="250" />
                                        </div>
                                    </div>

                                    {
                                        <>
                                            <div className="status d-flex justify-content-around text-center mt-2">
                                                <div>
                                                    <img src={timeImg} alt="Time" />
                                                    <h4>{timeDuration}</h4>
                                                    <p>Month</p>
                                                </div>
                                                <div>
                                                    <img src={semesterImg} alt="Enrolled" />
                                                    <h4>3</h4>
                                                    {/* <h4>{(Number(enrolledStudents) + Number(props?.statistic?.enrolled)) || 0}</h4> */}
                                                    <p>Semester</p>
                                                </div>
                                                <div>
                                                    <img src={certificateImg} alt="Certificate" />
                                                    <h4>{certificateAvailability ? "Yes" : "No"}</h4>
                                                    <p>Certificate</p>
                                                </div>
                                            </div>
                                            <div className="count d-flex justify-content-between text-center mt-2">
                                                <div className="mb-1 mb-sm-0">
                                                    <img src={require('../../assets/images/icons/video.png')} alt="Time" />
                                                    <p>{totalVideo} Videos</p>
                                                </div>
                                                <div className="mb-1 mb-sm-0">
                                                    <img src={require('../../assets/images/icons/quiz.png')} alt="Enrolled" />
                                                    <p>{totalQuiz} Quizes</p>
                                                </div>
                                                <div className="mb-1 mb-sm-0">
                                                    <img src={require('../../assets/images/icons/assignment.png')} alt="Certificate" />
                                                    <p>{totalAssignment} Assignment</p>
                                                </div>
                                            </div>

                                            <h3 className="price mt-3 mb-2 text-left"> ৳ {engToBanglaNumber(price || 0)}</h3>
                                        </>
                                    }
                                    {
                                        (
                                            !(today >= registrationStartDate && today <= registrationEndDate)

                                        ) ?


                                            // !(registrationEndDate < today && registrationStartDate < today) &&
                                            // <div className="calender d-flex align-items-center text-white">
                                            //     <img src={calenderImg} alt="Calender" />
                                            //     <div className="ml-md-2">
                                            //         <p className="m-0">Enrollment Start <strong>{Moment(registrationStartDate).format("DD MMM YYYY")}</strong></p>
                                            //         <p className="m-0">Enrollment End <strong>{Moment(registrationEndDate).format("DD MMM YYYY")}</strong></p>
                                            //     </div>
                                            // </div>

                                            <div></div>
                                            :
                                            <>
                                                {
                                                    !props.noAddToCart &&
                                                    <CustomButton
                                                        variant='contained'
                                                        onClick={() => addToReduxCart(_id, courseId, title, price, usd, thumbnail)}
                                                    >

                                                        {cartData?.find(item => item._id === _id) ? "Already added cart" : "Add to Cart"}

                                                    </CustomButton>
                                                }
                                                {/* <button
                                        onClick={buyNow}
                                        className="btn btn-outline"
                                    >Buy Now</button> */}
                                                <EnrollnowButton fullWidth rounded courseDetail={props.courseDetail}
                                                // label="Buy Now" 
                                                />
                                                {/* <div className="mt-2">
                                        <div className="d-flex flex-wrap align-items-center justify-content-between my-2 pt-3">
                                            <h6 className="p-0  m-0 font-weight-bold " style={{ fontSize: 13 }}>Payment Method:</h6>
                                            <img height={30} src={bkashIcon} alt="" />
                                            <img className=" img-fluid" src={require('../../assets/images/icons/sslcommerce.png')} alt="" />
                                            <img className='img-fluid' src={require('../../assets/images/icons/stripe.png')} alt="" />
                                        </div>
                                        <p style={{
                                            fontFamily: 'Hind Siliguri',
                                            fontWeight: 'bold',
                                            fontSize: 16,
                                            margin: 0
                                        }}><img src={require('../../assets/images/icons/bkash.svg')} alt="" /> Manual bKash: <span style={{ color: '#295CAB' }}>০১৩০৮৫৪৩৭৬৮ (মার্চেন্ট অ্যাকাউন্ট)</span></p>
                                    </div> */}
                                            </>
                                    }
                                </>
                            )
                        }


                    </div> :
                    <Image style={{ paddingTop: 0 }} className="img-fluid w-100 lazy-image" src={getImage(thumbnail)} alt={title} />
            }
        </>
    );
};

export default PreviewCard;