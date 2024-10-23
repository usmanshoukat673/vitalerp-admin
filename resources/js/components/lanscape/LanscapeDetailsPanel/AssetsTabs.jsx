import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { MODULE_HARDWARE, MODULE_CLOUDSERVICES, MODULE_DATASETS, MODULE_INFORMATION_SYSTEMS, MODULE_PROCESSES, MODULE_SOFTWARE } from '../../../constants/layout';
import { useSelector } from 'react-redux';
const RelatedRecords = React.lazy(() => import('./RelatedRecords'));

const AssetsTabs = () => {
    let AVAILABEL_MODULES = [MODULE_HARDWARE, MODULE_SOFTWARE, MODULE_CLOUDSERVICES, MODULE_DATASETS, MODULE_PROCESSES, MODULE_INFORMATION_SYSTEMS];
    const [value, setValue] = React.useState(`"${AVAILABEL_MODULES[0]}"`);

    const { record } = useSelector((state) => ({
        record: state.lanscape.record,
    }));

    React.useEffect(() => {
        _.pull(AVAILABEL_MODULES, record.module_id).filter(Boolean);
        setValue(`"${AVAILABEL_MODULES[0]}"`);
    }, [record]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="Assets Tabs">
                        {record.module_id != MODULE_HARDWARE && <Tab label="Hardware" value={`"${MODULE_HARDWARE}"`} />}
                        {record.module_id != MODULE_SOFTWARE && <Tab label="Software" value={`"${MODULE_SOFTWARE}"`} />}
                        {record.module_id != MODULE_CLOUDSERVICES && <Tab label="Cloud services" value={`"${MODULE_CLOUDSERVICES}"`} />}
                        {record.module_id != MODULE_DATASETS && <Tab label="Data sets" value={`"${MODULE_DATASETS}"`} />}
                        {record.module_id != MODULE_PROCESSES && <Tab label="Processes" value={`"${MODULE_PROCESSES}"`} />}
                        {record.module_id != MODULE_INFORMATION_SYSTEMS && <Tab label="Information systems" value={`"${MODULE_INFORMATION_SYSTEMS}"`} />}
                    </TabList>
                </Box>

                {record.module_id != MODULE_HARDWARE && <TabPanel value={`"${MODULE_HARDWARE}"`}>
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <RelatedRecords module_id={MODULE_HARDWARE} question_id={null} />
                    </React.Suspense>
                </TabPanel>}

                {record.module_id != MODULE_SOFTWARE && <TabPanel value={`"${MODULE_SOFTWARE}"`}>
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <RelatedRecords module_id={MODULE_SOFTWARE} question_id={5} />
                    </React.Suspense>
                </TabPanel>}

                {record.module_id != MODULE_CLOUDSERVICES && <TabPanel value={`"${MODULE_CLOUDSERVICES}"`}>
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <RelatedRecords module_id={MODULE_CLOUDSERVICES} question_id={null} />
                    </React.Suspense>
                </TabPanel>}

                {record.module_id != MODULE_DATASETS && <TabPanel value={`"${MODULE_DATASETS}"`}>
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <RelatedRecords module_id={MODULE_DATASETS} question_id={7} />
                    </React.Suspense>
                </TabPanel>}
                {record.module_id != MODULE_PROCESSES && <TabPanel value={`"${MODULE_PROCESSES}"`}>
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <RelatedRecords module_id={MODULE_PROCESSES} question_id={null} />
                    </React.Suspense>
                </TabPanel>}
                {record.module_id != MODULE_INFORMATION_SYSTEMS && <TabPanel value={`"${MODULE_INFORMATION_SYSTEMS}"`}>
                    <React.Suspense fallback={<div>Loading...</div>}>
                        <RelatedRecords module_id={MODULE_INFORMATION_SYSTEMS} question_id={6} />
                    </React.Suspense>
                </TabPanel>}
            </TabContext>
        </Box>
    );
}

export default AssetsTabs;