import React, { Suspense } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
const TPTabs = React.lazy(() => import('./TPTabs'));
const AssetsTabs = React.lazy(() => import('./AssetsTabs'));
const RecordUsers = React.lazy(() => import('./RecordUsers'));
const RecordLocations = React.lazy(() => import('./RecordLocations'));

const RecordTabs = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="Records Tabs">
                        <Tab label="Assets" value="1" />
                        <Tab label="Third Parties" value="2" />
                        <Tab label="Primary User" value="3" />
                        <Tab label="Responsible User" value="4" />
                        <Tab label="Locations" value="5" />
                    </TabList>
                </Box>
                <TabPanel value="1" sx={{ p: 0 }}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <AssetsTabs />
                    </Suspense>
                </TabPanel>
                <TabPanel value="2" sx={{ p: 0 }}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <TPTabs />
                    </Suspense>
                </TabPanel>
                <TabPanel value="3">
                    <Suspense fallback={<div>Loading...</div>}>
                        <RecordUsers question_id={2} />
                    </Suspense>
                </TabPanel>
                <TabPanel value="4">
                    <Suspense fallback={<div>Loading...</div>}>
                        <RecordUsers question_id={3} />
                    </Suspense>
                </TabPanel>
                <TabPanel value="5">
                    <Suspense fallback={<div>Loading...</div>}>
                        <RecordLocations question_id={4} />
                    </Suspense>
                </TabPanel>

            </TabContext>
        </Box>
    );
}

export default RecordTabs;