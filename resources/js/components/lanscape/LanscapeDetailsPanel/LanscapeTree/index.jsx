import * as React from 'react';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ParentAssetNode from './ParentAssetNode';

const LanscapeTree = () => {

    const [expanded, setExpanded] = React.useState([]);

    const { lan_assets } = useSelector((state) => ({
        lan_assets: state.lanscape.lan_assets,
    }));

    React.useEffect(() => {
        let ids = [];

        _.forEach(lan_assets, (parent_asset) => {
            _.forEach(parent_asset.childs, (sub_asset) => {
                if (_.size(sub_asset.records) > 0) {
                    if (!_.includes(ids, `parent_asset_id_${parent_asset.id}`)) {
                        ids.push(`parent_asset_id_${parent_asset.id}`);
                    }
                    ids.push(`sub_asset_id_${sub_asset.id}`);
                }
            });
        });

        setExpanded(ids);
    }, [lan_assets]);

    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    return (
        <Card style={{ height: 'calc(100vh - 131px)', overflowY: 'scroll' }}>
            <Box sx={{ flexGrow: 1, maxWidth: 320 }}>
                <TreeView
                    aria-label="Lanscape Navigation"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    expanded={expanded}
                    onNodeToggle={handleToggle}
                >
                    {
                        _.map(lan_assets, parent_asset => <ParentAssetNode key={`parent_asset_${parent_asset.id}`} parent_asset={parent_asset} />)
                    }
                </TreeView>
            </Box>
        </Card>
    );
}

export default LanscapeTree;