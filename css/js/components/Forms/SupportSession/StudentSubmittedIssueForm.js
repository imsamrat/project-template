import React, { useState } from "react";
import swal from "sweetalert";
import supportSession from "../../../services/supportSessionService";
import moment from "moment";

const StudentSubmittedIssueForm = (props) => {
    const [formData, setFormData] = useState({
        issue: "",
        sessionType: "",
    });

    const [sessionRunning, setSessionRunning] = useState(true);


    const [tagActive, setTagActive] = useState({
        id: -1,
        active: false,
        value: ""
    })

    const [disable, setDisable] = useState(false);

    const handleOnChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleClick = (id, value) => {
        let tempTagActive = tagActive;


        if (tempTagActive.id === id) {
            if (tagActive.active === false) {
                setTagActive({
                    id,
                    active: true,
                    value
                })
                setFormData({
                    ...formData,
                    sessionType: value
                })
            }
            else {

                setTagActive({
                    id,
                    active: false,
                    value
                })

                setFormData({
                    ...formData,
                    sessionType: ""
                })
            }



        }
        else {
            setTagActive({
                id,
                active: true,
                value
            })

            setFormData({
                ...formData,
                sessionType: value
            })

        }

    }

    const handleCloseModal = () => {
        if (props?.handleCloseModal) {
            props.handleCloseModal();
        }
    };

    console.log("sessionRunning", sessionRunning)

    const handleSubmit = () => {
        setDisable(true);
        
        const tempFormData = { ...formData };
        if(!tempFormData?.sessionType) {
            tempFormData.sessionType = props?.formData?.sessionTypeList?.[0]
        }
        supportSession.addStudentIssue(tempFormData).then(response => {
            setSessionRunning(response.data?.data?.isRunningSession);
            if (props.handleSetMeetLinkAndSerial) {
                props.handleSetMeetLinkAndSerial({
                    ...props.formData,
                    meetLink: response.data?.data?.sessionLink,
                    serial: response.data?.data?.serial,
                    sessionId: response.data?.data?.sessionId,
                    isSerial: response?.data?.data?.isSerial,
                    instructor: response?.data?.data?.instructor,
                    sessionEventInfo: response?.data?.data?.sessionEventInfo,
                    approxTime: response?.data?.data?.approxTime,
                    currentSerial: response?.data?.data?.currentSerial
                })
            }


            setDisable(false);
        }).catch(error => {
            swal("", error?.response?.data?.message, "error");
            props.handleCloseModal();
            setDisable(false);
        })


    }

    return (
        <div className="student-submitted-issue-form p-3 mt-1">
            {sessionRunning ?

                <div>


                    <div className="d-flex justify-content-between mb-1">
                        <h6 className="title-message">সাপোর্ট সেশন</h6>
                        <span className="ash-div">{moment(props?.formData?.sessionEventInfo?.startDate)?.format("DD MMM,  YYYY")}</span>
                    </div>

                    <span className="pink-div">{props?.formData?.sessionEventInfo?.title}</span>

                    <div className="mb-3 pr-3 mt-2 pb-1 pt-3">
                        {
                            props?.formData?.sessionTypeList?.map((eachItem, key) => <span onClick={(event) => handleClick(key, eachItem)} style={{ cursor: "pointer", backgroundColor: eachItem?.backgroundColor }} className={`tag-button p-2 mr-2 ${(tagActive?.id === key && tagActive?.active) ? "tag-active" : ""}`}> {eachItem?.title} </span>)
                        }
                    </div>

                    <div className="d-flex justify-content-between mb-2">
                        <h6 className="title-message">তোমার প্রশ্নটি লিখো</h6>
                        <span>{formData?.issue?.length}/250</span>
                    </div>

                    <textarea spellcheck="false" maxlength="250" onChange={event => handleOnChange(event)} name="issue" className="issue-submit-box p-2 mb-3">
                        {formData?.issue}
                    </textarea>

                    <div className="d-flex justify-content-between mb-3">
                        <div>
                            <h6 className="">সেশন শুরু</h6>
                            <span className="light-green-div">{moment(props?.formData?.sessionEventInfo?.startDate)?.format("LT")}</span>
                        </div>

                        <div>
                            <h6>সেশন শেষ</h6>
                            <span className="pink-div">{moment(props?.formData?.sessionEventInfo?.endDate)?.format("LT")}</span>
                        </div>

                    </div>

                    <div className="text-center">
                        <button onClick={() => handleCloseModal()} className="btn cancel-button mr-2">Cancel</button><button onClick={() => handleSubmit()} className="btn submit-button ml-2" disabled={disable || formData.issue?.length === 0 } >Submit</button>
                    </div>
                </div>
                :
                <div className="text-center">
                    <h4>ধন্যবাদ ! </h4>
                    <h4>আপনার ইস্যুটি গ্রহণ করা হয়েছে । </h4>
                </div>
            }
        </div>

    )
}

export default StudentSubmittedIssueForm;