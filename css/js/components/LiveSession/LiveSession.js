import React, { useState } from "react";
import CustomModal from "../../components/Custom/CustomModal";
import StudentSubmittedIssueForm from "../../components/Forms/SupportSession/StudentSubmittedIssueForm";
import JoinSupportSessionForm from "../../components/Forms/SupportSession/JoinSupportSessionForm";
import supportSessionService from "../../services/supportSessionService";
import moment from "moment";

const LiveSession = () => {
  const [modalClose, setModalClose] = useState({ status: false });
  const [openModal, setOpenModal] = useState({ edit: false });
  const [formData, setFormData] = useState({
    meetLink: "",
    serial: 0,
    sessionTypeList: [],
  });

  const handleSetMeetLinkAndSerial = (data) => {
    setFormData(data);
  };

  const getSupportSerial = () => {
    supportSessionService.getStudentSupportSerial().then((response) => {
      setFormData({
        serial: response?.data?.data?.serial,
        meetLink: response?.data?.data?.sessionLink,
        sessionTypeList: response?.data?.data?.sessionTypeList,
        sessionId: response?.data?.data?.sessionId,
        sessionEventInfo: response?.data?.data?.sessionEventInfo,
        isSerial: response?.data?.data?.isSerial,
        isRunningSession: response?.data?.data?.isRunningSession,
        instructor: response?.data?.data?.instructor,
        approxTime: response?.data?.data?.approxTime,
        isFormOpen: response?.data?.data?.isFormOpen,
        currentSerial: response?.data?.data?.currentSerial,
        
      });
    });
  }

  const handleOpenModal = () => {
   
      getSupportSerial();
      setOpenModal({
        edit: true,
      });
    
  };

  const handleCloseModal = () => {
    setModalClose({
      status: false,
    });
  };


  return (
    <>
      <CustomModal
        editMode
        closeModal={modalClose}
        openModal={openModal}
        customStyle={{
          minWidth: formData?.meetLink ? "25%" : "35%",
          width: "unset",
        }}
        noheading
      >
        
        <>
        {formData?.meetLink ? (
          <JoinSupportSessionForm
            formData={formData}
            handleCloseModal={handleCloseModal}
            getSupportSerial={getSupportSerial}
          />
        ) : (
          formData?.isFormOpen ?
          <StudentSubmittedIssueForm
            formData={formData}
            handleSetMeetLinkAndSerial={handleSetMeetLinkAndSerial}
            handleCloseModal={handleCloseModal}
          />
          : <h4 className="text-center p-4">এখন কোন সেশন চলছে না ।</h4>
        )} </> 
      </CustomModal>
      <span style={{ cursor: "pointer" }} className="text-white px-2" onClick={() => handleOpenModal()}>Support</span>
      {/* <span
        className="live-session-component"
        onClick={() => handleOpenModal()}
      >
        <span className="live-session-red-circle"></span>
      </span> */}
    </>
  );
};

export default LiveSession;
