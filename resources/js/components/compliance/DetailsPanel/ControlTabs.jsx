import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ControlDocuments from './ControlDocuments';
import ControlActivities from './ControlActivities';
import ControlComments from './ControlComments';
import { useSelector } from 'react-redux';
import ControlMappings from './ControlMappings';
import ControlQuestions from './ControlQuestions';
import DOMPurify from 'dompurify';

const ControlTabs = () => {
    const [value, setValue] = React.useState('1');

    const { control_info, control_mappings, control_activities, control_questions } = useSelector((state) => ({
        control_info: state.compliance.control_info,
        control_mappings: state.compliance.control_mappings,
        control_activities: state.compliance.control_activities,
        control_questions: state.compliance.control_questions,
    }));

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const sanitizedHtml = (text) => {
        if (!_.isEmpty(text)) {
            return DOMPurify.sanitize(text);
        }
        return '';
    }

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="Controls Tabs">
                        <Tab label={`Documents (${control_info.documents_count})`} value="1" />
                        <Tab label="Additional Information" value="2" />
                        <Tab label={`Control Mappings (${_.size(control_mappings)})`} value="3" />
                        <Tab label={`Questionnaire (${_.size(control_questions)})`} value="4" />
                        <Tab label={`Activity Log (${_.size(control_activities)})`} value="5" />
                        <Tab label="Comments" value="6" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <ControlDocuments />
                </TabPanel>
                <TabPanel value="2">
                    <div dangerouslySetInnerHTML={{ __html: sanitizedHtml(control_info?.control?.control?.additional_info) }}></div>
                </TabPanel>
                <TabPanel value="3" >
                    <ControlMappings />
                </TabPanel>
                <TabPanel value="4" >
                    <ControlQuestions />
                </TabPanel>
                <TabPanel value="5" >
                    <ControlActivities />
                </TabPanel>
                <TabPanel value="6" >
                    <ControlComments />
                </TabPanel>
            </TabContext>
        </Box>
    );
}

export default ControlTabs;