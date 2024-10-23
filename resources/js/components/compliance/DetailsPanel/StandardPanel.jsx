import React from "react";
import { Box, Typography } from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Col, Row } from "react-bootstrap";
import StandardInfo from "./StandardInfo";
import StandardChart from "./StandardChart";
import StandardTabs from "./StandardTabs";


/**
 * Renders the domain details panel.
 *
 * @return {JSX.Element} The rendered domain details panel.
 */
const StandardDetailsPanel = () => {
    return (
        <>
            <Row style={{ padding: '10px 0px' }}>
                <Col>
                    <Typography sx={{ fontWeight: 400, fontSize: '16px', margin: '0px' }} variant="h6" gutterBottom>
                        Standard Info
                    </Typography>
                </Col>
            </Row>

            <Row>
                <Col xm="6">
                    <StandardInfo />
                </Col>
                <Col xm="6">
                    <StandardChart />
                </Col>
            </Row>
            <Row>
                <Col>
                    <StandardTabs />
                </Col>
            </Row>
        </>
    )
}

/**
 * Renders the DomainPanel component, which displays a tabbed interface with two tabs:
 * "Details Panel" and "Assignment Panel". The selected tab determines which child component
 * to render within the TabPanel.
 *
 * @return {JSX.Element} The rendered DomainPanel component.
 */
const StandardPanel = () => {

    const [tab, setTab] = React.useState('1');

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={tab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleTabChange} aria-label="Domain Panel Tabs">
                            <Tab label={`Details Panel`} value="1" />
                            <Tab label="Configuration" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <StandardDetailsPanel />
                    </TabPanel>
                    <TabPanel value="2">

                    </TabPanel>

                </TabContext>
            </Box>
        </>
    )
}

export default StandardPanel;