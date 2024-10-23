import React from "react";
import ControlInfo from "./ControlInfo";
import ControlDescription from "./ControlDescription";
import ControlTabs from "./ControlTabs";
import { Box, Typography } from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Col, Row } from "react-bootstrap";
import AssignControl from "./ControlAssignment/AssignControl";
import DeligateControl from "./ControlAssignment/DeligateControl";

/**
 * Renders the control details panel.
 *
 * @return {JSX.Element} The rendered control details panel.
 */
const ControlDetailsPanel = () => {
    return (
        <>
            <Row style={{ padding: '10px 0px' }}>
                <Col>
                    <Typography sx={{ fontWeight: 400, fontSize: '16px', margin: '0px' }} variant="h6" gutterBottom>
                        Control Info
                    </Typography>
                </Col>
            </Row>
            <Row>
                <Col xm="6">
                    <ControlInfo />
                </Col>
                <Col xm="6">
                    <ControlDescription />
                </Col>
            </Row>
            <Row>
                <Col>
                    <ControlTabs />
                </Col>
            </Row>
        </>
    )
}

/**
 * Renders the control panel with tabs for the details panel and the assignment panel.
 *
 * @return {JSX.Element} The control panel component.
 */
const ControlPanel = () => {

    const [tab, setTab] = React.useState('1');

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={tab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleTabChange} aria-label="Control Panel Tabs">
                            <Tab label={`Details Panel`} value="1" />
                            <Tab label="Assignment Panel" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <ControlDetailsPanel />
                    </TabPanel>
                    <TabPanel value="2">
                    <div style={{ padding: '10px 0px' }}>
                        <Typography sx={{ fontWeight: 400, fontSize: '16px', margin: '0px' }} variant="h6" gutterBottom>
                            Assignment
                        </Typography>
                    </div>

                        <AssignControl />

                        <DeligateControl />
                    </TabPanel>

                </TabContext>
            </Box>
        </>
    )
}

export default ControlPanel;