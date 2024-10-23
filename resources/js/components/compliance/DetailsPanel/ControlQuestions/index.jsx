import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import Question from './Question';
import { Chip, Stack } from '@mui/material';


const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .01)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const ControlQuestions = () => {

    const [expanded, setExpanded] = React.useState('panel1');

    const { control_questions } = useSelector((state) => ({
        control_questions: state.compliance.control_questions,
    }));

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <>
            {
                _.size(control_questions) > 0 ? 
                _.map(control_questions, question => {
                    return (
                        <Accordion key={`question-${question.question_id}`} expanded={expanded === `${question.question_id}`} onChange={handleChange(`${question.question_id}`)}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <Stack direction="row" spacing={1}>
                                <Typography>{`${question.question.name}`}</Typography>
                                {question.question.required == 1 && <Chip label={`Required`} color="error"  size="small" variant="outlined" />}
                                <Chip label={`${question.status}`} size="small" variant="outlined" />
                            </Stack>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Question question={question} expanded={expanded === `${question.question_id}`} />
                            </AccordionDetails>
                        </Accordion>
                    )
                })
                : <Alert severity="info">Questions not found.</Alert>
            }
        </>
    );
}

export default ControlQuestions;