import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { MODULE_SUPPLIERS, MODULE_VENDORS } from '../../../constants/layout';
const RelatedRecords = React.lazy(() => import('./RelatedRecords'));

const TPTabs = () => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="Thirdparty Tabs">
                        <Tab label="Vendors" value="1" />
                        <Tab label="Suppliers" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <RelatedRecords module_id={MODULE_VENDORS} question_id={1} />
                    </React.Suspense>

                </TabPanel>
                <TabPanel value="2">
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <RelatedRecords module_id={MODULE_SUPPLIERS} question_id={1} />
                    </React.Suspense>
                </TabPanel>
            </TabContext>
        </Box>
    );
}

export default TPTabs;