import React, { useEffect, useState } from "react";
import { extractIds, extractIdsFromDomains } from "../../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { setDomainControls, setDomainInfo, setStandardInfo } from "../../../../actions";
import axiosInstance from "../../../../api/api";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

const StatusDropdown = ({ control }) => {

    const dispatch = useDispatch();

    const [errors, setErrors] = useState([]);
    const [control_status, setControlStatus] = useState('');

    const { standard, details_panel_type, parent_domain, sub_domain, domain_controls, domain_info, standard_info, parent_sections } = useSelector((state) => ({
        standard: state.leftnav.standard,
        details_panel_type: state.compliance.details_panel_type,
        parent_domain: state.compliance.parent_domain,
        sub_domain: state.compliance.sub_domain,
        domain_controls: state.compliance.domain_controls,
        domain_info: state.compliance.domain_info,
        standard_info: state.compliance.standard_info,
        parent_sections: state.leftnav.parent_sections,
    }));

    useEffect(() => {
        setControlStatus(control.status);
    }, [control]);

    const getSections = () => {
        let sections = [];
        switch (details_panel_type) {
            case 'standard':
                sections = extractIdsFromDomains(parent_sections)
                break;

            case 'domain':
                sections = extractIds(parent_domain);
                break;

            case 'sub_domain':
                sections = [sub_domain.id];
                break;

            case 'control':
                break;

            default:
                break;
        }

        return sections;
    }

    const handleChange = (event) => {
        setControlStatus(event.target.value);
        // save changes 
        axiosInstance.post(`/api/user/compliance/update-control-status`, {
            standard_id: standard.standard_id,
            sections: getSections(),
            company_control_id: control.id,
            control_status: event.target.value,
        })
            .then(e => {
                let copy_domain_controls = [...domain_controls];
                let index = _.findIndex(domain_controls, ctrl => {
                    return ctrl.id === control.id;
                });
                copy_domain_controls[index].status = event.target.value;
                dispatch(setDomainControls(copy_domain_controls));
                if (details_panel_type == 'domain' || details_panel_type == 'sub_domain') {
                    let copy_domain_info = { ...domain_info };
                    copy_domain_info.applicable_ctrls = e.data.domain_info.applicable_ctrls;
                    copy_domain_info.not_applicable_ctrls = e.data.domain_info.not_applicable_ctrls;
                    copy_domain_info.partially_imple_ctrls = e.data.domain_info.partially_imple_ctrls;
                    copy_domain_info.implemented_ctrls = e.data.domain_info.implemented_ctrls;
                    copy_domain_info.excluded_ctrls = e.data.domain_info.excluded_ctrls;
                    dispatch(setDomainInfo(copy_domain_info));
                }
                else if (details_panel_type == 'standard') {
                    let copy_standard_info = { ...standard_info };
                    copy_standard_info.applicable_ctrls = e.data.domain_info.applicable_ctrls;
                    copy_standard_info.not_applicable_ctrls = e.data.domain_info.not_applicable_ctrls;
                    copy_standard_info.partially_imple_ctrls = e.data.domain_info.partially_imple_ctrls;
                    copy_standard_info.implemented_ctrls = e.data.domain_info.implemented_ctrls;
                    copy_standard_info.excluded_ctrls = e.data.domain_info.excluded_ctrls;
                    dispatch(setStandardInfo(copy_standard_info));
                }
            });

        clearErrors('control_status');
    };

    const clearErrors = (field) => {
        if (errors.length > 0 && errors[0].hasOwnProperty(field)) {
            delete errors[0][field];
            setErrors(errors);
        }
    }

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
                id="control_status_dropdown"
                value={control_status}
                onChange={handleChange}
            >
                <MenuItem value={`Implemented`}>Implemented</MenuItem>
                <MenuItem value={`Partially Implemented`}>Partially Implemented</MenuItem>
                <MenuItem value={`Not Implemented`}>Not Implemented</MenuItem>
            </Select>
        </FormControl>
    )
}

export default StatusDropdown;