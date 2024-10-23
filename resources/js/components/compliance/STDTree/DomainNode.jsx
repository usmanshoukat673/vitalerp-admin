import React from "react";
import SubDomainNode from "./SubDomainNode";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { truncateTextByChars } from "../../../utils/stringUtils";
import TreeTooltip from "./TreeTooltip";
import { useDispatch, useSelector } from "react-redux";
import { setDetailsPanelType, setParentDomain } from "../../../actions";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import CustomTreeItem from "./CustomTreeItem";

const DomainNode = ({ domain, history }) => {

    const dispatch = useDispatch();

    const { company, standard } = useSelector((state) => ({
        company: state.orgs.company,
        standard: state.leftnav.standard,
    }));

    const handleDomainClick = () => {
        dispatch(setDetailsPanelType('domain'));
        dispatch(setParentDomain(domain));
        history.push(`/${company.slug}/compliance-stack/${standard.standard.slug}/${domain.slug}`);
    }

    return (
        <CustomTreeItem id={`domain_id_${domain.id}`} nodeId={`domain_id_${domain.id}`}
            label={
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 0.5,
                        pr: 0,
                    }}
                    onClick={handleDomainClick} 
                >
                    <Box component={FolderOpenIcon} color="inherit" sx={{ mr: 1 }} />
                    <Typography aria-label={`${domain.menu_name}`} variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
                        {truncateTextByChars(domain.menu_name, 30)}
                    </Typography>
                    <TreeTooltip id={`tooltip_id_${domain.id}`} tooltipText={`domain: ${domain.menu_name}`} />
                </Box>
            }
        >
            {
                _.map(domain.sections, sub_domain => <SubDomainNode key={`sub_domain_${sub_domain.id}`} parent_domain={domain} sub_domain={sub_domain} />)
            }
        </CustomTreeItem>
    )
}

export default withRouter(DomainNode);