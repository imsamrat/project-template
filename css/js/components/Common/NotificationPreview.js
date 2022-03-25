import React, { useState, useEffect } from 'react';
import emptyNotification from './../../assets/images/icons/empty-notification.png';
import { Link } from 'react-router-dom';
import announcementIcon from '../../assets/images/icons/announcement.png'
import notificationIcon from '../../assets/images/icons/notification-type-icon.svg'
import assignmentNotificationIcon from '../../assets/images/icons/assignment-notification.png'
import parse from 'html-react-parser';
import { boldBanglaNumber } from '../../utilities/boldBanglaNumber';
// import seenNotificationIcon from '../../assets/images/icons/seen-annoucement.png'

import moment from "moment";
import { useSelector } from 'react-redux'
import firebase from "../../utilities/firebase/firebase";


// Cart Preview
const NotificationPreview = (props) => {

    const [notificationList, setNotificationList] = useState([]);

    const userData = useSelector(state => state.user).data;

    const fetchNextNotification = () => {
        // Fetch next notification
        if (userData?.email && userData?.role === "student") {

            let courseId = [];
            userData?.parchasedCourse && userData.parchasedCourse.forEach(element => {
                if (element?.courseId?._id) {
                    courseId.push(element?.courseId?._id);
                }
            });

            const lastVisible = notificationList[notificationList.length - 1];

            if (courseId?.length === 0) {
                courseId.push("unPurchase");
            }

            courseId.push("all");
            courseId.push(userData?._id);

            const db = firebase.firestore().collection("notification");
            db.where('topic', 'array-contains-any', courseId).orderBy("time", "desc").startAfter(lastVisible?.time)
                .limit(5).get().then(function (querySnapshot) {

                    let tempList = [];
                    querySnapshot.forEach(function (doc) {
                        tempList.push({
                            _id: doc?.id,
                            ...doc.data()
                        });

                    });
                    setNotificationList([
                        ...notificationList,
                        ...tempList
                    ]);

                }, function (error) {
                    console.log("firebase error", error)
                });
        }

    }

    const intialFetchNotification = () => {

        if (userData?.email && userData?.role === "student") {

            let courseId = [];
            userData?.parchasedCourse && userData.parchasedCourse.forEach(element => {
                if (element?.courseId?._id) {
                    courseId.push(element?.courseId?._id);
                }
            });

            if (courseId?.length === 0) {
                courseId.push("unPurchase");
            }

            courseId.push("all");
            courseId.push(userData?._id);

            const db = firebase.firestore().collection("notification");
            db.where('topic', 'array-contains-any', courseId).orderBy("time", "desc")
                .limit(5).get().then(function (querySnapshot) {
                    let tempList = [];
                    querySnapshot.forEach(function (doc) {
                        tempList.push({
                            _id: doc?.id,
                            ...doc.data()
                        });

                    });
                    setNotificationList(tempList);

                }, function (error) {
                    console.log("firebase error", error)
                });

        }
    }


    const handleScroll = (event) => {
        const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
        if (scrollTop > 10) {
            fetchNextNotification();
        }
    }

    useEffect(() => {

        intialFetchNotification()
    }, [userData?.email]);


    useEffect(() => {
        if (props.notificationToggle) {
            intialFetchNotification()

        }

    }, [props.notificationToggle])


    return (
        <div className="cart notifications">
            <div>
                {(notificationList?.length > 0) ?

                    <div className="cart-items-wrapper pt-2">
                        <div className="items" style={{ overflowY: "scroll", height: 284 }} onScroll={handleScroll}>
                            {notificationList.map(notification => (
                                <Link exact to={notification?.type === "announcement" ? `/announcements?redirect=${notification?.announcementId}` : (notification?.redirect ? "/" + notification?.redirect : '#')} query={{ notification }} key={notification?._id} className={`d-flex align-items-start px-4 py-2  ${(notification?.type === 'notification' && !notification?.redirect) ? 'prevent-redirect' : ''} `}
                                >
                                    <img src={notification?.type === "announcement" ? announcementIcon : notification.title === "New assignment has been released" ? assignmentNotificationIcon : notificationIcon} alt="" />
                                    <div className="ml-2">
                                        <h5 className="mb-1">{parse(boldBanglaNumber(notification.title))}</h5>
                                        {<small className="mb-1">{parse(boldBanglaNumber(notification.title)) === "Welcome!" ? "To Phitron" : moment(notification.time).fromNow()}</small>}

                                    </div>
                                </Link>
                            ))}

                        </div>
                    </div>
                    :
                    <div className="text-center py-4 cart-wrapper">

                        <img src={emptyNotification} alt="" />
                        <p className="mt-4 px-5" style={{ fontWeight: 'normal', whiteSpace: 'nowrap' }}>No Notification for you</p>

                    </div>
                }
            </div>
        </div>
    );
};

export default NotificationPreview;
