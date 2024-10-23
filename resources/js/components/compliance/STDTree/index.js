import * as React from 'react';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import DomainNode from './DomainNode';

const STDTree = () => {

    const [expanded, setExpanded] = React.useState([]);

    const { parent_sections } = useSelector((state) => ({
        parent_sections: state.leftnav.parent_sections,
    }));

    React.useEffect(() => {
        let ids = [];

        _.forEach(parent_sections, (domain) => {
            ids.push(`domain_id_${domain.id}`);

            _.forEach(domain.sections, (sub_domain) => {
                ids.push(`sub_domain_id_${sub_domain.id}`);
            });
        });

        setExpanded(ids);

    }, [parent_sections]);

    const handleToggle = (event, nodeIds) => {
        setExpanded(nodeIds);
    };

    return (
        <Card style={{ height: 'calc(100vh - 131px)', overflowY: 'scroll' }}>
            <Box sx={{ flexGrow: 1, maxWidth: 320 }}>
                <TreeView
                    aria-label="Compailance Stack Navigation"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    expanded={expanded}
                    onNodeToggle={handleToggle}
                >
                    {
                        _.map(parent_sections, domain => <DomainNode key={`domain_${domain.id}`} domain={domain} />)
                    }
                </TreeView>
            </Box>
        </Card>
    );
}

export default STDTree;