import React, { useEffect, useState } from "react";
import { extractIds, extractIdsFromDomains } from "../../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { setDomainControls, setDomainInfo, setStandardInfo } from "../../../../actions";
import axiosInstance from "../../../../api/api";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import _ from "lodash";

const MaturityLevelDropdown = ({ control }) => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState([]);
    const [errors, setErrors] = useState([]);
    const [maturity_level, setMaturityLevel] = useState('');

    const { standard, details_panel_type, parent_domain, sub_domain, domain_controls, domain_info, standard_info, parent_sections, control_info } = useSelector((state) => ({
        standard: state.leftnav.standard,
        details_panel_type: state.compliance.details_panel_type,
        parent_domain: state.compliance.parent_domain,
        sub_domain: state.compliance.sub_domain,
        domain_controls: state.compliance.domain_controls,
        domain_info: state.compliance.domain_info,
        standard_info: state.compliance.standard_info,
        parent_sections: state.leftnav.parent_sections,
        control_info: state.compliance.control_info
    }));

    useEffect(() => {
        setMaturityLevel(_.isEmpty(control.maturity_level) ? '' : control.maturity_level);
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
        setMaturityLevel(event.target.value);
        // save changes 
        axiosInstance.post(`/api/user/compliance/update-control-maturity-level`, {
            standard_id: standard.standard_id,
            company_control_id: control.id,
            maturity_level: event.target.value,
        })
            .then(e => {
                if (!_.isEmpty(control_info)) {
                    let copy_control_info = { ...control_info };
                    copy_control_info.control.maturity_level = event.target.value;
                    dispatch(setControlInfo(copy_control_info));
                }



                NotificationManager.success(e.data.message, 'Success');
            }).catch(err => {
                if (err.response.status === 422) {
                    const errors = err.response.data.errors;
                    setErrors(errors.concat(errors));
                }
            }).finally(() => {
                setErrors([]);
                setLoading(false);
            });

        clearErrors('maturity_level');
    };

    const clearErrors = (field) => {
        if (errors.length > 0 && errors[0].hasOwnProperty(field)) {
            delete errors[0][field];
            setErrors(errors);
        }
    }

    const handlerCustomInputError = (inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? true : false;
    }

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small" error={maturity_level == '' ? true : false}>
            <Select
                id="control_mldropdown"
                value={maturity_level}
                onChange={handleChange}
            >
                <MenuItem value={1}>0 - Incomplete</MenuItem>
                <MenuItem value={2}>1 - Performed</MenuItem>
                <MenuItem value={3}>2 - Managed</MenuItem>
                <MenuItem value={4}>3 - Established</MenuItem>
                <MenuItem value={5}>4 - Predictable</MenuItem>
                <MenuItem value={6}>5 - Optimizing</MenuItem>
            </Select>
        </FormControl>
    )
}

export default MaturityLevelDropdown;