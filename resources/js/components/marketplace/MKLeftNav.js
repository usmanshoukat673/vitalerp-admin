import React, { Component } from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { selecteMKCategory } from '../../actions';
import { connect } from 'react-redux';
import { Placeholder } from 'semantic-ui-react';

class MKLeftNav extends Component {

    state = {
        expanded: [],
        selected: []
    }

    handleToggle = (event, nodeIds) => {
        this.setState({ expanded: nodeIds });
    };

    handleSelect = (event, nodeIds) => {
        this.setState({ selected: nodeIds });
        const { all_categories } = this.props;
        let category = _.find(all_categories, (category) => {
            return category.id === parseInt(nodeIds);
        });
        this.props.selecteMKCategory(category);
        this.props.history.push(`/marketplace/${category.slug}`);
    };

    listMainNav = categories => {
        const { expanded, selected } = this.state;
        const { token } = this.props;
        return (<TreeView expanded={expanded}
            selected={selected}
            onNodeToggle={this.handleToggle}
            onNodeSelect={this.handleSelect}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            {
                _.map(categories, (cat) => (
                    <TreeItem key={cat.id} nodeId={`${cat.id}`} label={`${cat.name} (${cat.total_apps})`}>
                        {(cat.childs.length > 0 ? this.listChildCategories(cat.childs) : '')}
                    </TreeItem>
                ))
            }
        </TreeView>);
    }

    listChildCategories = categories => {
        const { token } = this.props;
        return _.map(categories, (cat) => (
            <TreeItem key={cat.id} nodeId={`${cat.id}`} label={`${cat.name} (${cat.total_apps})`} />
        ));
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { categories } = this.props;

        return (
            <div className="sub__left__menu">
                <div className="sub__settings_box">
                    <div className="heading">Categories</div>

                    {_.isEmpty(categories) ?
                        <Placeholder>
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                        </Placeholder>
                        : this.listMainNav(categories)
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(connect(null, { selecteMKCategory })(MKLeftNav));
