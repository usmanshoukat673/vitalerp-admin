import React, { useEffect } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector } from "react-redux";

const VendorCatalogSwitch = ({ shared_standards }) => {

    const { active_standard } = useSelector((state) => ({
        active_standard: state.policyportal.active_standard,
    }));

    const [standard, setStandard] = React.useState('');

    useEffect(() => {
        if (!_.isEmpty(active_standard)) {
            setStandard(active_standard.standard_id);
        }
    }, [active_standard]);

    const handleChange = (event) => {
        setStandard(event.target.value);
    };

    // useEffect(() => {
    //     if (standard != '') {
    //         let std = _.find(shared_standards, (std) => {
    //             return std.standard_id === standard;
    //         });
    //         dispatch(setPortalActiveStandard(std));
    //         portalAxiosInstance.get(`/standard/domains/${standard}`).then(e => {
    //             dispatch(setPortalActiveDomains(e.data));
    //         }).catch(err => {});
    //     }
    // }, [standard]);

    return (
        <Box sx={{ minWidth: 120, background: 'transparent' }}>
            <FormControl fullWidth>
                {/* <InputLabel id="vendor-catalog-switch-label">Stack</InputLabel> */}
                <Select
                    labelId="vendor-catalog-switch-label"
                    id="vendor-catalog-switch"
                    value={standard}
                    onChange={handleChange}
                    sx={{color: '#fff', border: 'none'}}
                >
                    {
                        _.map(shared_standards, (standard, index) => (
                            <MenuItem value={standard.standard_id} key={index}>{`${standard.standard.name}`}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        </Box>
    )
}

export default VendorCatalogSwitch;