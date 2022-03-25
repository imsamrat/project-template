import React, { useState, Fragment, useEffect } from "react";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faAngleDown, faTrash, faEdit, faPlay, faAngleUp, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from "react-router-dom";

const CustomAccordion = (props) => {
    const [expand, setExpand] = useState(false);

    const handleOnClick = () => {
        setExpand(!expand);
    }

    useEffect(() => {
        if (props.isExpand) {
            setExpand(props.isExpand.status);
        }
    }, [props.isExpand])

    const handleEdit = (event) => {
        event.stopPropagation();

        if (props.handleEdit) {
            props.handleEdit({ id: props.id, label: props.label, formValue: props.formValue, module: props.module });
        }
    }

    const handleDelete = (event) => {
        event.stopPropagation();
        if (props.handleDelete) {
            props.handleDelete({ id: props.id, moduleId: props.module, label: props.label, title: props.title });
        }
    }


    return (
        <div className={"custom-accordion-component " + useLocation().pathname === '/' ? 'shadow' : ""}>
            <Accordion expanded={expand} >
                <AccordionSummary
                    onClick={() => handleOnClick()}
                    expandIcon={
                        props.icon === "milestone" ?
                            <FontAwesomeIcon icon={expand ? faChevronDown : faChevronDown} />
                            :
                            props.icon === "module" ?
                                <FontAwesomeIcon icon={faPlay} />
                                :
                                <FontAwesomeIcon icon={expand ? faMinus : faPlus} />
                    }
                    className="indicator"
                    aria-controls="panel1a-content"
                    id="panel1a-header"


                >
                    <div className="w-100">
                        <div className="d-flex justify-content-between">
                            <h5 className="milestone-title mb-0">{props.title}</h5>
                            {props.actionIcon &&
                                <div className="d-flex justify-content-end">

                                    <FontAwesomeIcon onClick={event => handleEdit(event)} icon={faEdit} />
                                    <FontAwesomeIcon className="ml-3" onClick={event => handleDelete(event)} icon={faTrash} />
                                </div>
                            }
                        </div>
                        {props.minute || props.modulePart ?
                            <div className="d-flex flex-row meta">
                                <p className="mb-0 mr-2 sub-milestone-title">{props.minute} &#9679;</p>
                                <p className="sub-milestone-title">{props.modulePart}</p>
                            </div>
                            : <Fragment></Fragment>}
                    </div>
                </AccordionSummary>
                <div className="accordion-custom-details">
                    <AccordionDetails>
                        {props.children}
                    </AccordionDetails>
                </div>
            </Accordion>
        </div >
    )
}

export default CustomAccordion;