import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ApplicabilityDropdown from "./ApplicabilityDropdown";
import StatusDropdown from "./StatusDropdown";
import showTZDate from "../../../../utils/showTZDate";
import { withRouter } from "react-router-dom";
import { setControl, setDetailsPanelType, setParentDomain, setSubDomain } from "../../../../actions";

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import MaturityLevelDropdown from "./MaturityLevelDropdown";

const filterSectionsByControlId = (parentSections, controlId) => {
    const filteredSections = [];

    for (const parentSection of parentSections) {
        for (const section of parentSection.sections) {
            const foundControl = section.controls.find(control => control.id === controlId);
            if (foundControl) {
                filteredSections.push({ parentSection, section, control: foundControl });
                break; // Exit loop once control is found in the section
            }
        }
    }

    return filteredSections;
};

const ControlRow = ({ history, control }) => {

     const dispatch = useDispatch();

    const { parent_sections, company, standard } = useSelector((state) => ({
        company: state.orgs.company,
        parent_sections: state.leftnav.parent_sections,
        standard: state.leftnav.standard,
    }));

    const handleClick = () => {
        const filteredSections = filterSectionsByControlId(parent_sections, control.control.id);
        if (filteredSections.length > 0) {
            const parent_domain = filteredSections[0].parentSection;
            const sub_domain =  filteredSections[0].section;
            dispatch(setDetailsPanelType('control'));
            dispatch(setParentDomain(parent_domain));
            dispatch(setSubDomain(sub_domain));
            dispatch(setControl(filteredSections[0].control));
            history.push(`/${company.slug}/compliance-stack/${standard.standard.slug}/${parent_domain.slug}/${sub_domain.slug}/${control.control.number}`);
        }
    }

    return (
        <TableRow
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                <span onClick={handleClick} className="chand">{`${control.control.number} ${control.control.name}`}</span>
            </TableCell>
            <TableCell align="left">
                <MaturityLevelDropdown control={control} />
            </TableCell>
            <TableCell>
                <ApplicabilityDropdown control={control} />
            </TableCell>
            <TableCell align="left">
                <StatusDropdown control={control} />
            </TableCell>

            <TableCell align="left">
                {showTZDate(control.updated_at, company.timezone)}
            </TableCell>
            <TableCell align="right"></TableCell>
        </TableRow>
    )
}

export default withRouter(ControlRow);