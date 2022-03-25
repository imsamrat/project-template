import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addToCart } from '../../actions/cartAction';
import authService from '../../services/authService';
import cartService from '../../services/cartService';
import EnrollNow from "../../components/EnrollNow/EnrollNow";
import moment from 'moment'
import { useQuery } from 'react-query';
import courseService from '../../services/Admin/CourseManagement/courseService';
import preFetchPage from '../../utilities/preFetchPage';
import { styled } from "@material-ui/styles";
import CustomButton from '../Custom/CustomButton';
import WaitingEnroll from '../WaitingEnroll/WaitingEnroll';

const EnrollnowButton = (props) => {

    const {
        _id,
        courseId,
        slug,
        title,
        price,
        usd,
        thumbnail,
        registrationStartDate,
        registrationEndDate
    } = props.courseDetail || {};

    const MuiButton = styled(CustomButton)({
        background: props.rounded ? 'linear-gradient(86.89deg, #343C97 -111.91%, #31C4F3 79.41%)' : '#FF428D',
        borderRadius: props.rounded && 41,
        '&:hover': {
            background: props.rounded ? 'linear-gradient(86.89deg, #343C97 -111.91%, #31C4F3 79.41%)' : '#FF428D',
            '&:before': {
                transform: props.rounded ? 'translate(-50%,-50%) scale(0)' : 'translate(-50%,-50%) scale(1)'
            }
        }
    })

    const { isSuccess, data: courseProgress } = useQuery(['getNextForHome', _id], () => _id && courseService.getNextUnitOfCourse(_id), {
        cacheTime: 1000 * 60 * 24,
        staleTime: 1000 * 60
    });

    const label = props.label || "Enroll Now";

    const [today, setToday] = useState(moment().toISOString())
    const cartData = useSelector(state => state.cart);
    const userData = useSelector(state => state.user).data || { profileImage: "" };
    const dispatch = useDispatch();
    const history = useHistory();
    const [modalIsOpen, setIsOpen] = useState(false);
    const alreadyEnrolled = typeof userData?.parchasedCourse === 'object' && userData?.parchasedCourse?.find(item => {
        return item?.courseId?._id === _id
    });

    const buyNow = () => {
        if (alreadyEnrolled) {
            if (courseProgress?.data?.data?.nextUnitType) {
                window && window.localStorage.setItem("courseId", _id)
                window && window.localStorage.setItem("courseName", title)
                history.push("/" + slug + "/" + courseProgress?.data?.data?.nextUnitType + "/" + courseProgress?.data?.data?.nextUnitSlug)
            }
        } else if (userData?.lastOrdered === "pending") {
            history.push('/checkout')
            return;
        } else if ((authService.getCurrentUser()?.user?._id) && registrationEndDate < today) {
            setIsOpen(true)
            return;
        } else if ((authService.getCurrentUser()?.user?._id) && registrationStartDate > today) {
            setIsOpen(true)
            return;
        } else {
            addToReduxCart(_id, courseId, title, price, usd, thumbnail, registrationStartDate, registrationEndDate);
        }

    }
    const handleModalClose = () => {
        setIsOpen(false)
    }
    useEffect(() => {

        setInterval(() => {
            setToday(moment().toISOString())
        }, 60000)

    }, [])



    const addToReduxCart = (id, courseId, title, price, usd, thumbnail) => {

        if (cartData?.find(item => item._id === id)) {
            // swal("", "Course already added", "warning")
        }

        else {
            if (authService.getCurrentUser()?.user?._id) {
                cartService.updateCartToLocalStorage(authService.getCurrentUser()?.user?._id, cartData)
            } else {
                cartService.updateCartToLocalStorage("anonymous", [{ _id: id, courseId, title, price, usd, thumbnail, registrationStartDate, registrationEndDate }])
            }
            dispatch(addToCart({ _id: id, courseId, title, price, usd, thumbnail, registrationStartDate, registrationEndDate }))
        }
        if (!authService.getCurrentUser()?.user) {

            // swal("", "You must signed in to do this action", "info");
            setIsOpen(true)
            return
        }
        history.push('/checkout')
    }


    return (
        <>
            {(modalIsOpen &&
                registrationStartDate <= today
                &&
                (registrationEndDate >= today))
                ?
                <EnrollNow
                    modalIsOpen={modalIsOpen}
                    handleModalClose={handleModalClose}

                />
                :
                <WaitingEnroll
                    registered={!!authService.getCurrentUser()?.user}
                    modalIsOpen={modalIsOpen}
                    handleModalClose={handleModalClose}
                />
            }
            {

                <MuiButton
                    variant="contained"
                    fullWidth={props.fullWidth}
                    onMouseEnter={() => preFetchPage(courseProgress?.data?.data?.nextUnitType)}
                    disabled={!_id || (alreadyEnrolled && !courseProgress?.data?.data?.nextUnitType)}
                    // className={label === "Enroll Now" ? `btn francy-btn ${userData?.lastOrdered === "pending" ? "btn-warning-rounded" : "btn-danger"}` : `btn  ${userData?.lastOrdered === "pending" ? "btn-warning-rounded" : "btn-outline"}`}
                    onClick={() => buyNow()}
                >
                    {alreadyEnrolled ? (!courseProgress?.data?.data?.nextUnitType ? "Already Enrolled" : (courseProgress?.data?.data?.startCourse ? "Start Course" : "Continue Course")) : (userData?.lastOrdered === "pending" ? "Payment Under review" : label)}
                </MuiButton>

                // : <button disabled={!_id} onClick={event => handleOnClick(event)}         className={label === "Enroll Now" ? "btn  btn-danger francy-btn " : "btn btn-outline"} 
                // >{label}</button>



            }

        </>
    );
};

export default EnrollnowButton;