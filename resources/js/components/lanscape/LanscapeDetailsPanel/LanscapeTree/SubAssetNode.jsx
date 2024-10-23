import React, { Suspense } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ApiIcon from '@mui/icons-material/Api';
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import CustomTreeItem from "../../../compliance/STDTree/CustomTreeItem";
import { truncateTextByChars } from "../../../../utils/stringUtils";
const TreeTooltip = React.lazy(() => import('../../../compliance/STDTree/TreeTooltip'));
import RecordNode from './RecordNode';
import { selectLanChildAsset, selectLanDetailsPanelType, selectLanParentAsset } from "../../../../actions";

const SubAssetNode = ({ parent_asset, sub_asset, history }) => {
    const dispatch = useDispatch();

    const { category, tree_mode } = useSelector((state) => ({
        category: state.lanscape.category,
        tree_mode: state.leftnav.tree_mode,
    }));

    const handleSubDomainClick = () => {
        dispatch(selectLanDetailsPanelType('sub_asset'));
        dispatch(selectLanParentAsset(parent_asset));
        dispatch(selectLanChildAsset(sub_asset));
        history.push(`/${tree_mode.route}/${category.slug}/${parent_asset.id}/${sub_asset.id}`);
    }

    return (
        <CustomTreeItem id={`sub_asset_id_${sub_asset.id}`} nodeId={`sub_asset_id_${sub_asset.id}`}
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
                    <Typography aria-label={`${sub_asset.name}`} variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
                        {truncateTextByChars(sub_asset.name, 27)}
                    </Typography>

                    <Suspense fallback={<div>Loading...</div>}>
                        <TreeTooltip id={`tooltip_id_${sub_asset.id}`} tooltipText={``} />
                    </Suspense>
                </Box>
            }
        >
            {
                _.map(sub_asset.records, record => <RecordNode parent_asset={parent_asset} sub_asset={sub_asset} key={`record_${record.id}`} record={record} />)
            }
        </CustomTreeItem>
    )
}

export default withRouter(SubAssetNode);