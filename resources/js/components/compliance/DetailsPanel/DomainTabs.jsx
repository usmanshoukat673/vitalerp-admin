import React from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DomainDocuments from "./DomainDocuments";
import DomainControls from "./DomainControls";
import DomainActivities from './DomainActivities'
import ExcludedControls from "./DomainControls/ExcludedControls";
import NotApplicableControls from "./DomainControls/NotApplicableControls";
import ControlMappings from "./ControlMappings";
import { useSelector } from "react-redux";

const DomainTabs = () => {

    const [value, setValue] = React.useState('1');

    const { domain_controls, domain_documents, domain_activities } = useSelector((state) => ({
        domain_controls: state.compliance.domain_controls,
        domain_documents: state.compliance.domain_documents,
        domain_activities: state.compliance.domain_activities,
    }));

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="Domains Tabs">
                        <Tab label={`Controls (${_.size(domain_controls)})`} value="1" />
                        <Tab label={`Documents (${_.size(domain_documents)})`} value="2" />
                        <Tab label="Not Applicable" value="3" />
                        <Tab label="Exclusions" value="4" />
                        <Tab label="Control Mappings" value="5" />
                        <Tab label={`Activity Log (${_.size(domain_activities)})`} value="6" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <DomainControls />
                </TabPanel>
                 <TabPanel value="2">
                    <DomainDocuments />
                </TabPanel>
                 <TabPanel value="3">
                    <NotApplicableControls />
                </TabPanel>
                <TabPanel value="4">
                    <ExcludedControls />
                </TabPanel>
                <TabPanel value="5">
                    <ControlMappings />
                </TabPanel>
                <TabPanel value="6">
                    <DomainActivities />
                </TabPanel>
            </TabContext>
        </Box>
    );
}

export default DomainTabs;