import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import formService from "../../services/formService";
import FormResponseCollector from "../Common/FormResponseCollector";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";
import swal from "@sweetalert/with-react";
import FormSubmissionConfirmation from "./FormSubmissionConfirmation";
import formPermissionIllustration from '../../assets/images/form-permission.png'
import parse from 'html-react-parser';
import { queryClient } from "../..";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    overflow: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: 20,
    maxWidth: 543,
  },
};

const GeneralForm = ({
  activeForms,
  submittedCriteriaList,
  setSubmittedCriteriaList,
}) => {
  const [form, setForm] = useState({});
  const { pathname } = useLocation();
  const [openDialog, setOpenDialog] = useState(false);
  const [formPermission, setFormPermission] = useState({
    required: false,
    isGranted: false,
    quote: null,
  });
  const handleClickClose = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    if (!activeForms?.length) return;

    const activeForm = activeForms.find((f) => f.route === pathname);

    activeForm &&
      formService.getFormById(activeForm?.formId).then((res) => {
        setForm({
          ...res?.data?.data,
          formCriteriaId: activeForm._id,
          formCriteriaTitle: activeForm?.title,
          formCriteriaDescription: activeForm?.description,
        });
        setFormPermission({
          required: activeForm?.hasPermissionQuote,
          isGranted: false,
          quote: activeForm?.permissionQuote,
        });
        setOpenDialog(true);
      });
  }, [activeForms?.length, pathname]);

  const onSuccess = () => {
    handleClickClose();
    setSubmittedCriteriaList([...submittedCriteriaList, form.formCriteriaId]);
    queryClient.refetchQueries("open-general-form-criteria");
    swal(<FormSubmissionConfirmation />, {className: 'form-success-alert'})
  };

  return (
    <section>
      <div>
        <Modal isOpen={openDialog} style={customStyles}>
          <div className="modal-form-detail-contain-body p-3">
            <div className="modal-form-detail-contain">
              <div className="text-right">
                <FontAwesomeIcon
                  className="form-close-icon"
                  icon={faTimes}
                  onClick={(event) => handleClickClose(event)}
                  style={{ cursor: "pointer" }}
                />
              </div>
              {console.log("formPermission", formPermission)}
              {!formPermission?.required || formPermission?.isGranted ? (
                <>
                  <h4 className="form-title">{form?.formCriteriaTitle}</h4>
                  <p className="mb-4 form-description">
                    {form?.formCriteriaDescription}
                  </p>
                  <div className="modal-form-detail-contain-body">
                    <FormResponseCollector
                      formSchema={form?.formSchema}
                      uiOrderSchema={form?.uiOrderSchema}
                      formCriteriaId={form?.formCriteriaId}
                      formId={form?._id}
                      onSuccess={onSuccess}
                    />
                  </div>
                </>
              ) : (
                <div className="p-md-3 p-1 text-center form-component">
                  <img src={formPermissionIllustration} alt="" />
                  <h4 className="mt-4 mb-2 pb-1 permission-title">Do you have few seconds for a survey?</h4>
                  <p className="mb-4 pb-2 permission-quote">{parse(formPermission?.quote || "")}</p>
                  <div classNam="text-right ">
                    <button
                      onClick={(event) => handleClickClose(event)}
                      className="btn later-btn px-4 mr-2"
                    >
                      Later
                    </button>
                    <button
                      onClick={() => setFormPermission({ isGranted: true })}
                      className="btn next-btn px-4"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </section>
  );
};

export default GeneralForm;
