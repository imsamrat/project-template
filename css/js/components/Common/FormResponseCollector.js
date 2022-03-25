import React, { useState } from "react";
import formService from "../../services/formService";
import Form from "@rjsf/core";

const FormResponseCollector = ({
  formSchema = "{}",
  uiOrderSchema = "{}",
  onSuccess = () => {},
  onFailure = () => {},
  buttonLabel = "Submit",
  clearForm = true,
  editable= false,
  formResponseId,
  initialFormData = {},
  ...rest
}) => {
  const [formData, setFormData] = useState(() => initialFormData);
  const handleSubmit = () => {
      if(editable) {
        formService.updateFormResponse(formResponseId, formData)
        .then((res) => {
            onSuccess(res.data, formData)
          })
          .catch((err) => onFailure(err));
      }else{
        formService
        .storeFormResponse({...formData, ...rest})
        .then((res) => {
          clearForm && setFormData({})
          onSuccess(res.data, formData)
        })
        .catch((err) => onFailure(err));
      }
    
  };

  return (
    <Form
      onSubmit={handleSubmit}
      schema={JSON.parse(formSchema)}
      uiSchema={JSON.parse(uiOrderSchema)}
      onChange={(newFormData) => setFormData(newFormData.formData)}
      formData={formData}
      submitButtonMessage={buttonLabel}
    />
  );
};

export default FormResponseCollector;
