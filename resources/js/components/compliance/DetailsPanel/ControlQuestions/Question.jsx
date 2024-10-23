import React from "react";
import { withRouter } from "react-router-dom";
import { Box, TextField, Typography } from '@mui/material';
import QuestionStatusDropdown from "./QuestionStatusDropdown";
import QuestionJustificationBox from "./QuestionJustificationBox";
import ControlQuestionsComments from "./Comments";

/**
 * Renders a question component with a status dropdown and a justification box.
 *
 * @param {Object} question - The question object containing the question details.
 * @return {JSX.Element} The rendered question component.
 */
const Question = ({ question, expanded }) => {

    return (
        <div>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box>
                    <QuestionStatusDropdown question={question} />
                </Box>
            </Box>

            <Box>
                <ControlQuestionsComments expanded={expanded} question={question} />
            </Box>
        </div>
    )
}

export default withRouter(Question);