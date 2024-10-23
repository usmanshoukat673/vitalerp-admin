import React from "react";
import { Box, Typography } from "@mui/material";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Col, Row } from "react-bootstrap";
import SubDomainInfo from "./SubDomainInfo";
import DomainChart from "./DomainChart";
import SubDomainTabs from "./SubDomainTabs";


/**
 * Renders the Sub domain details panel.
 *
 * @return {JSX.Element} The rendered Sub domain details panel.
 */
const SDDetailsPanel = () => {
    return (
        <>
            <Row style={{ padding: '10px 0px' }}>
                <Col>
                    <Typography sx={{ fontWeight: 400, fontSize: '16px', margin: '0px' }} variant="h6" gutterBottom>
                        Subdomain Info
                    </Typography>
                </Col>
            </Row>

            <Row>
                <Col xm="6">
                    <SubDomainInfo />
                </Col>
                <Col xm="6">
                    <DomainChart />
                </Col>
            </Row>
            <Row>
                <Col>
                    <SubDomainTabs />
                </Col>
            </Row>
        </>
    )
}

/**
 * Renders the SubDomainPanel component, which displays a tabbed interface with two tabs:
 * "Details Panel" and "Assignment Panel". The selected tab determines which child component
 * to render within the TabPanel.
 *
 * @return {JSX.Element} The rendered SubDomainPanel component.
 */
const SubDomainPanel = () => {

    const [tab, setTab] = React.useState('1');

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={tab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleTabChange} aria-label="Sub Domain Panel Tabs">
                            <Tab label={`Details Panel`} value="1" />
                            <Tab label="Assignment Panel" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <SDDetailsPanel />
                    </TabPanel>
                    <TabPanel value="2">

                    </TabPanel>

                </TabContext>
            </Box>
        </>
    )
}

export default SubDomainPanel;