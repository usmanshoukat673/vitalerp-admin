import React, { Component } from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Placeholder } from 'semantic-ui-react';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';

class ReteMKLeftNav extends Component {

    state = {
        all_cats: true,
        selected_cats: []
    }

    handleAllCatsChange = (event) => {
        this.setState({selected_cats : []}, () => {
            this.props.oncategorychange(this.state.selected_cats);
        });
        this.setState({ all_cats: true });
    }

    handleCatSelect = (event) => {
        this.setState({ all_cats: false });

        let category_id = _.parseInt(event.target.value);
        let index = _.indexOf(this.state.selected_cats, category_id);
        if(index >= 0)
        {
            let cleaned =  _.remove(this.state.selected_cats, function(c) {
                return c == category_id;
              });
            this.setState({selected_cats:cleaned}, () => {
                this.props.oncategorychange(this.state.selected_cats);
            });

            if(_.size(this.state.selected_cats) === 0)
            {
                this.setState({ all_cats: true });
            }
        }
        else{
            let cats = this.state.selected_cats;
            cats.push(category_id);
            this.setState({selected_cats : cats}, () => {
                this.props.oncategorychange(this.state.selected_cats);
            });
        }
    }

    isSelected = category_id => {
        if(_.indexOf(this.state.selected_cats, category_id) >= 0)
        {
            return true;
        }
        return false;
    }

    listMainNav = categories => {

        return (
            <FormGroup>
            {
                _.map(categories, (cat) => (
                    <FormControlLabel
                    key={`sub-cate-${cat.id}`}
                    control={<Checkbox checked={this.isSelected(cat.id)} value={cat.id} onChange={this.handleCatSelect} name={`${cat.name}`} />}
                    label={`${cat.name}`}
                />
                ))
            }
            </FormGroup>
        );
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { categories } = this.props;
        const { all_cats } = this.state;

        return (
            <div className="sub__left__menu">
                <div className="sub__settings_box">
                    <div className="heading">Categories</div>

                    <FormControlLabel
                        control={<Checkbox checked={all_cats} onChange={this.handleAllCatsChange} name="all_categories" />}
                        label="All Categories"
                    />

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

export default withRouter(connect(null, {  })(ReteMKLeftNav));
