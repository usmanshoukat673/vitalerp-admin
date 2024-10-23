import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { TreeItem } from '@mui/x-tree-view/TreeItem';

import SettingsIcon from '@mui/icons-material/Settings';
import { truncateTextByChars } from "../../../../utils/stringUtils";
import { useDispatch, useSelector } from "react-redux";
import { saveRecord, selectLanChildAsset, selectLanDetailsPanelType, selectLanParentAsset } from "../../../../actions";
import { withRouter } from "react-router-dom";
import TreeTooltip from "../../../compliance/STDTree/TreeTooltip";

const RecordNode = ({ history, parent_asset, sub_asset, record }) => {

    const dispatch = useDispatch();

    const { category, tree_mode } = useSelector((state) => ({
        category: state.lanscape.category,
        tree_mode: state.leftnav.tree_mode,
    }));

    const handleControlClick = () => {
        dispatch(selectLanDetailsPanelType('record'));
        dispatch(selectLanParentAsset(parent_asset));
        dispatch(selectLanChildAsset(sub_asset));
        dispatch(saveRecord(record));
        history.push(`/${tree_mode.route}/${category.slug}/${parent_asset.id}/${sub_asset.id}/${record.id}`);
    }

    return (
        <TreeItem onClick={handleControlClick} id={`record_id_${record.id}`} nodeId={`${record.id}`}
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
                    <Typography aria-label={`${record.name}`} variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
                        {truncateTextByChars(`${record.name}`)}
                    </Typography>
                    <TreeTooltip id={`tooltip_id_${record.id}`} tooltipText={`record: ${record.name}`} />
                </Box>
            }
        >
            
        </TreeItem>
    )
}

export default withRouter(RecordNode);