import React, { Suspense } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useSelector } from 'react-redux';
import Badge from '@mui/material/Badge';
const ModuleRecords = React.lazy(() => import('./ModuleRecords'));
const NonConfiguredRecords = React.lazy(() => import('./NonConfiguredRecords'));

const ModuleTabs = () => {
    const [value, setValue] = React.useState('1');

    const { module_details } = useSelector((state) => ({
        module_details: state.lanscape.module_details,
    }));

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="Module Tabs">
                        <Tab label="Records" value="1" />
                        <Tab
                            label={
                                <Badge badgeContent={_.size(module_details.not_configured)}
                                    color="warning">
                                    Needs Configurations &nbsp;&nbsp;
                                </Badge>
                            } value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1" sx={{ p: 0 }}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <ModuleRecords />
                    </Suspense>
                </TabPanel>

                <TabPanel value="2" sx={{ p: 0 }}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <NonConfiguredRecords />
                    </Suspense>
                </TabPanel>
            </TabContext>
        </Box>
    );
}

export default ModuleTabs;