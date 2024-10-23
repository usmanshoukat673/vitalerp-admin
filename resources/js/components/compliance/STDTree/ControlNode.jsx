import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { TreeItem } from '@mui/x-tree-view/TreeItem';

import SettingsIcon from '@mui/icons-material/Settings';
import { truncateTextByChars } from "../../../utils/stringUtils";
import TreeTooltip from "./TreeTooltip";
import { useDispatch, useSelector } from "react-redux";
import { setControl, setDetailsPanelType, setParentDomain, setSubDomain } from "../../../actions";
import { withRouter } from "react-router-dom";

const ControlNode = ({ history, parent_domain, sub_domain, control }) => {

    const dispatch = useDispatch();

    const { company, standard } = useSelector((state) => ({
        company: state.orgs.company,
        standard: state.leftnav.standard,
    }));

    const handleControlClick = () => {
        dispatch(setDetailsPanelType('control'));
        dispatch(setParentDomain(parent_domain));
        dispatch(setSubDomain(sub_domain));
        dispatch(setControl(control));
        history.push(`/${company.slug}/compliance-stack/${standard.standard.slug}/${parent_domain.slug}/${sub_domain.slug}/${control.number}`);
    }

    return (
        <TreeItem onClick={handleControlClick} id={`control_id_${control.id}`} nodeId={`${control.id}`}
            label={
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 0.5,
                        pr: 0,
                    }}
                >
                    <Box component={SettingsIcon} color="inherit" sx={{ mr: 1 }} />
                    <Typography aria-label={`${control.number} ${control.name}`} variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
                        {truncateTextByChars(`${control.number} ${control.name}`)}
                    </Typography>
                    <TreeTooltip id={`tooltip_id_${control.id}`} tooltipText={`control: ${control.number} ${control.name}`} />
                </Box>
            }
        >
            
        </TreeItem>
    )
}

export default withRouter(ControlNode);