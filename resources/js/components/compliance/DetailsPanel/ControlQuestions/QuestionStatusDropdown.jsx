import React, { useEffect, useState } from "react";
import { extractIds, extractIdsFromDomains } from "../../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { setControlQuestions } from "../../../../actions";
import axiosInstance from "../../../../api/api";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { Typography } from "@mui/material";

/**
 * Renders a dropdown component for selecting the status of a question in the compliance details panel.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.question - The question object containing the status.
 * @return {JSX.Element} The rendered dropdown component.
 */
const QuestionStatusDropdown = ({ question }) => {

    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);
    const [question_status, setQuestionStatus] = useState('');

    const { control_questions, details_panel_type, parent_domain, sub_domain, parent_sections } = useSelector((state) => ({
        control_questions: state.compliance.control_questions,
        details_panel_type: state.compliance.details_panel_type,
        parent_domain: state.compliance.parent_domain,
        sub_domain: state.compliance.sub_domain,
        parent_sections: state.leftnav.parent_sections,
    }));

    useEffect(() => {
        if (question && question.status) {
            setQuestionStatus(question.status);
        }
    }, [question]);

    /**
     * Function to get sections based on details panel type.
     * 
     * @return {Array} The array of sections based on the details panel type.
     */
    const getSections = () => {
        let sections = [];
        if (details_panel_type) {
            switch (details_panel_type) {
                case 'standard':
                    sections = extractIdsFromDomains(parent_sections)
                    break;

                case 'domain':
                    sections = extractIds(parent_domain);
                    break;

                case 'sub_domain':
                    sections = [sub_domain?.id ?? ''];
                    break;

                case 'control':
                    break;

                default:
                    break;
            }
        }

        return sections;
    }

    /**
     * Handles the change event of the question status dropdown.
     *
     * @param {Event} event - The change event object.
     * @return {Promise<void>} A promise that resolves when the changes are saved.
     */
    const handleChange = (event) => {
        setQuestionStatus(event.target.value);
        // save changes 
        axiosInstance.post(`/api/user/compliance/company-control-question/update-status`, {
            id: question?.id ?? '',
            question_status: event.target.value,
        })
            .then(e => {
                let copy_control_questions = [...control_questions];
                let index = _.findIndex(control_questions, que => {
                    return que.id === question?.id;
                });
                copy_control_questions[index] = {
                    ...copy_control_questions[index],
                    status: event.target.value,
                };
                dispatch(setControlQuestions(copy_control_questions));
            });

        clearErrors('question_status');
    };

    /**
     * Clears the error for a specific field if it exists.
     *
     * @param {string} field - The field to clear the error for.
     * @return {void}
     */
    const clearErrors = (field) => {
        if (errors.length > 0 && errors[0]?.hasOwnProperty(field)) {
            const updatedErrors = errors.map(err => {
                delete err[field];
                return err;
            });
            setErrors(updatedErrors);
        }
    }

    return (
        <FormControl sx={{ m: 1, minWidth: 350 }} size="small">
            <Typography>Status:</Typography>
            <Select
                id="question_status_dropdown"
                value={question_status}
                onChange={handleChange}
            >
                <MenuItem value={`Implemented`}>Implemented</MenuItem>
                <MenuItem value={`Partially Implemented`}>Partially Implemented</MenuItem>
                <MenuItem value={`Not Implemented`}>Not Implemented</MenuItem>
                <MenuItem value={`Excluded`}>Excluded</MenuItem>
                <MenuItem value={`Not Applicable`}>Not Applicable</MenuItem>
            </Select>
        </FormControl>
    )
}

export default QuestionStatusDropdown;