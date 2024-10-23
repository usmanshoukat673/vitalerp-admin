import React, { useCallback, useEffect, useState } from "react";
import { extractIds, extractIdsFromDomains } from "../../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { setControlQuestions } from "../../../../actions";
import axiosInstance from "../../../../api/api";
import FormControl from '@mui/material/FormControl';
import { TextField, Typography } from '@mui/material';
import { debounce } from '../../../../utils/debounce';

/**
 * Renders the question justification box component.
 *
 * @param {Object} question - The question object.
 * @return {JSX.Element} The rendered question justification box component.
 */
const QuestionJustificationBox = ({ question }) => {

    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);
    const [justification, setJustification] = useState('');

    const { control_questions, details_panel_type, parent_domain, sub_domain, parent_sections } = useSelector((state) => ({
        control_questions: state.compliance.control_questions,
        details_panel_type: state.compliance.details_panel_type,
        parent_domain: state.compliance.parent_domain,
        sub_domain: state.compliance.sub_domain,
        parent_sections: state.leftnav.parent_sections,
    }));

    useEffect(() => {
        setJustification(question?.justification || '');
    }, [question]);
    
    const getSections = () => {
        let sections = [];
        switch (details_panel_type) {
            case 'standard':
                sections = extractIdsFromDomains(parent_sections)
                break;

            case 'domain':
                sections = extractIds(parent_domain);
                break;

            case 'sub_domain':
                sections = sub_domain ? [sub_domain.id] : [];
                break;

            case 'control':
                break;

            default:
                break;
        }

        return sections;
    }

    /**
     * Saves the justification for a question.
     *
     * @param {string} text - The justification text to save.
     * @return {Promise<void>} A promise that resolves when the justification is saved.
     */
    const saveJustification = (text) => {
        // save changes 
        axiosInstance.post(`/api/user/compliance/company-control-question/update-justification`, {
            id: question?.id,
            justification: text
        })
            .then(e => {
                let copy_control_questions = [...control_questions];
                let index = copy_control_questions.findIndex(que => que.id === question?.id);
                if (index !== -1) {
                    copy_control_questions[index].justification = text;
                    dispatch(setControlQuestions(copy_control_questions));
                }
            })
            .catch(error => {
                console.error('Error saving justification:', error);
            });

        clearErrors('justification');
    };

    const debouncedSaveJustification = useCallback(debounce(saveJustification, 600), []);

    // handle change event needs to after debounce 
    const handleChange = (event) => {
        const text = event.target.value;
        setJustification(text);  // Update the TextField immediately
        debouncedSaveJustification(text);
      };

    const clearErrors = (field) => {
        if (errors.length > 0 && errors[0].hasOwnProperty(field)) {
            const newErrors = [...errors];
            delete newErrors[0][field];
            setErrors(newErrors);
        }
    }

    return (
        <FormControl sx={{ m: 1, minWidth: 450 }} size="small">
            <Typography>Justification:</Typography>
            <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={justification}
                    onChange={handleChange}
                    className="build__input"
                />
        </FormControl>
    )
}

export default QuestionJustificationBox;