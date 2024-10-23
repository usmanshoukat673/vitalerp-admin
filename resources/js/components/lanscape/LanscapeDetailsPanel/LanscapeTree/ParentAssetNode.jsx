import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import SubAssetNode from "./SubAssetNode";
import { truncateTextByChars } from "../../../../utils/stringUtils";
import CustomTreeItem from "../../../compliance/STDTree/CustomTreeItem";
import TreeTooltip from "../../../compliance/STDTree/TreeTooltip";
import { selectLanDetailsPanelType, selectLanParentAsset } from "../../../../actions";

const ParentAssetNode = ({ parent_asset, history }) => {

    const dispatch = useDispatch();

    const { category, tree_mode } = useSelector((state) => ({
        category: state.lanscape.category,
        tree_mode: state.leftnav.tree_mode,
    }));

    const handleDomainClick = () => {
        dispatch(selectLanDetailsPanelType('parent_asset'));
        dispatch(selectLanParentAsset(parent_asset));
        history.push(`/${tree_mode.route}/${category.slug}/${parent_asset.id}`);
    }

    return (
        <CustomTreeItem id={`parent_asset_id_${parent_asset.id}`} nodeId={`parent_asset_id_${parent_asset.id}`}
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
                    <Typography aria-label={`${parent_asset.name}`} variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
                        {truncateTextByChars(parent_asset.name, 30)}
                    </Typography>
                    <TreeTooltip id={`tooltip_id_${parent_asset.id}`} tooltipText={``} />
                </Box>
            }
        >
            {
                _.map(parent_asset.childs, sub_asset => <SubAssetNode key={`sub_asset_${sub_asset.id}`} parent_asset={parent_asset} sub_asset={sub_asset} />)
            }
        </CustomTreeItem>
    )
}

export default withRouter(ParentAssetNode);