import React from "react";
import ControlNode from "./ControlNode";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ApiIcon from '@mui/icons-material/Api';
import { truncateTextByChars } from "../../../utils/stringUtils";
import TreeTooltip from "./TreeTooltip";
import { useDispatch, useSelector } from "react-redux";
import { setDetailsPanelType, setParentDomain, setSubDomain } from "../../../actions";
import { withRouter } from "react-router-dom";
import CustomTreeItem from "./CustomTreeItem";

const SubDomainNode = ({ parent_domain, sub_domain, history }) => {
    const dispatch = useDispatch();

    const { company, standard } = useSelector((state) => ({
        company: state.orgs.company,
        standard: state.leftnav.standard,
    }));

    const handleSubDomainClick = () => {
        dispatch(setDetailsPanelType('sub_domain'));
        dispatch(setParentDomain(parent_domain));
        dispatch(setSubDomain(sub_domain));
        history.push(`/${company.slug}/compliance-stack/${standard.standard.slug}/${parent_domain.slug}/${sub_domain.slug}`);
    }

    return (
        <CustomTreeItem id={`sub_domain_id_${sub_domain.id}`} nodeId={`sub_domain_id_${sub_domain.id}`}
            label={
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 0.5,
                        pr: 0,
                    }}
                    onClick={handleSubDomainClick} 
                >
                    <Box component={ApiIcon} color="inherit" sx={{ mr: 1 }} />
                    <Typography aria-label={`${sub_domain.menu_name}`} variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
                        {truncateTextByChars(sub_domain.menu_name, 27)}
                    </Typography>
                    <TreeTooltip id={`tooltip_id_${sub_domain.id}`} tooltipText={`sub domain: ${sub_domain.menu_name}`} />
                </Box>
            }
        >
            {
                _.map(sub_domain.controls, control => <ControlNode parent_domain={parent_domain} sub_domain={sub_domain} key={`control_${control.id}`} control={control} />)
            }
        </CustomTreeItem>
    )
}

export default withRouter(SubDomainNode);