import React, { Component } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import { withRouter } from 'react-router-dom';
import { Checkbox } from 'semantic-ui-react';
import IconButton from '@mui/material/IconButton';
import { VscChromeClose } from "react-icons/vsc";
import { connect } from 'react-redux';
import { setMaturityLevels, setCompStandards, setControlModels, setAssetTypes, setMaturityLevel } from '../../actions';
import _ from 'lodash';
import Slider from '@mui/material/Slider';
import './ControlsFilter.scss';

class ControlsFilter extends Component {

    state = {
        required_mfa: false,
        loading: false,
        errors: [],
        maturity_levels: [],
        standards: [],
        selected_ml: 5
    };

    componentDidMount() {
        const { company, maturity_levels, standards, control_models, asset_types } = this.props;
        this.setState({
            required_mfa: company.required_mfa,
            maturity_levels: maturity_levels,
            standards: standards,
            control_models: control_models,
            asset_types: asset_types
        });
    }

    toggleMLLevel = maturity_level => {
        const { maturity_levels } = this.state;
        let index = _.findIndex(maturity_levels, ml => {
            return ml.id === maturity_level.id;
        });
        maturity_level.selected = !maturity_level.selected;
        maturity_levels[index] = maturity_level;
        this.setState({ maturity_levels });
        this.props.setMaturityLevels(maturity_levels);
        this.props.changed();
    }

    toggleStandard = standard => {
        const { standards } = this.state;
        let index = _.findIndex(standards, std => {
            return std.standard_id === standard.standard_id;
        });
        standard.selected = !standard.selected;
        standards[index] = standard;
        this.setState({ standards });
        this.props.setCompStandards(standards);
        this.props.changed();
    }

    toggleControlModel = control_model => {
        const { control_models } = this.state;
        let index = _.findIndex(control_models, cm => {
            return cm.id === control_model.id;
        });
        control_model.selected = !control_model.selected;
        control_models[index] = control_model;
        this.setState({ control_models });
        this.props.setControlModels(control_models);
        this.props.changed();
    }

    toggleAssetType = asset_type => {
        const { asset_types } = this.state;
        let index = _.findIndex(asset_types, at => {
            return at.id === asset_type.id;
        });
        asset_type.selected = !asset_type.selected;
        asset_types[index] = asset_type;
        this.setState({ asset_types });
        this.props.setAssetTypes(asset_types);
        this.props.changed();
    }

    toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        this.props.onDrawerClose(open);
    };

    handlerSettingsClose = () => {
        this.props.onDrawerClose(false);
    }

    // valuetext = (value) => {
    //     return value / 20;
    // }

    valueLabelFormatV2 = (value) => {
        return value / 20;
    }

    valuetext = (value) => {
        return `${value}`;
    }

    valueLabelFormat = (value) => {
        const { maturity_levels } = this.props;
        return maturity_levels.findIndex((ml) => ml.value === value) + 1;
    }

    handleMLSliderChange = (event, newValue) => {
        const { maturity_levels, maturity_level } = this.props;
        let ml = _.find(maturity_levels, (ml) => { return ml.value === newValue; });
        if (maturity_level.id != ml.id) {
            this.props.setMaturityLevel(ml);
            this.setState({ selected_ml: newValue }, () => {
                this.props.changed();
            });
        }
    };

    handleMLSliderChangeV2 = (event, newValue) => {
        console.log(newValue);
        // const { maturity_levels } = this.props;
        // let ml = _.find(maturity_levels, (ml) => { return ml.value === newValue; });
        // this.props.setMaturityLevel(ml);
        this.setState({ selected_ml: newValue }, () => {
            // this.props.changed();
        });
    };

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {
        const { required_mfa, maturity_levels, standards, control_models, asset_types, selected_ml } = this.state;
        const { open, standard, maturity_level } = this.props;

        const mlOptions = _.map(maturity_levels, (ml, index) => ({
            label: ml.name,
            value: ml.value,
            key: ml.id,
        }));

        return (
            <React.Fragment>
                <Drawer anchor="right" open={open} onClose={this.toggleDrawer(false)}>

                    <div
                        className="the_menu"
                        style={{ width: '250px' }}
                        role="presentation"
                    >

                        <div className="setting__sht__header">
                            <h3>Filter</h3>

                            <IconButton className="close__button" onClick={this.handlerSettingsClose}><VscChromeClose /></IconButton>
                        </div>

                        <Divider />

                        {
                            standard.standard.maturity_levels ?

                                <React.Fragment>
                                    <div className="mfa__container">

                                        <h4>Maturity Levels</h4>

                                    </div>


                                    <div style={{ padding: '0px 25px 0px 15px', marginTop: '20px' }}>

                                        <Slider
                                            key={`slider-${maturity_level.id}`}
                                            style={{ color: '#17c6f6' }}
                                            defaultValue={maturity_level.value}
                                            valueLabelFormat={this.valueLabelFormat}
                                            getAriaValueText={this.valuetext}
                                            aria-labelledby="discrete-slider-restrict"
                                            step={25}
                                            max={100}
                                            min={0}
                                            valueLabelDisplay="on"
                                            marks={mlOptions}
                                            onChange={this.handleMLSliderChange}
                                        />

                                        {/*<Slider
                                            style={{ color: '#17c6f6' }}
                                            value={selected_ml}
                                            min={1}
                                            step={1}
                                            max={5}
                                            scale={(x) => x * 20}
                                            getAriaValueText={this.valueLabelFormatV2}
                                            valueLabelFormat={this.valueLabelFormatV2}
                                            onChange={this.handleMLSliderChangeV2}
                                            valueLabelDisplay="on"
                                            aria-labelledby="maturity-level-slider"
                                        />*/}

                                    </div>

                                    {/*
                                    <List>
                                        {
                                            _.map(maturity_levels, ml => {
                                                return (
                                                    <ListItem key={ml.id}>
                                                        <Checkbox onChange={() => { this.toggleMLLevel(ml) }} checked={ml.selected} toggle label={ml.name} />
                                                    </ListItem>
                                                );
                                            })
                                        }
                                    </List>

                                    */}

                                    <Divider />
                                </React.Fragment>

                                : ''
                        }



                        {/**  <div className="mfa__container">

                            <h4>Standards</h4>

                        </div>

                        <List>
                            {
                                _.map(standards, std => {
                                    return (
                                        <ListItem key={std.standard_id}>
                                            <Checkbox onChange={() => { this.toggleStandard(std) }} checked={std.selected} toggle label={std.standard.name} />
                                        </ListItem>
                                    );
                                })
                            }
                        </List>
                    <Divider />
                    */}


                        {
                            standard.standard.assets ?

                                <React.Fragment>

                                    <div className="mfa__container">

                                        <h4>Asset Types</h4>

                                    </div>

                                    <List>
                                        {
                                            _.map(asset_types, at => {
                                                return (
                                                    <ListItem key={at.id}>
                                                        <Checkbox color="orange" onChange={() => { this.toggleAssetType(at) }} checked={at.selected} slider label={at.name} />
                                                    </ListItem>
                                                );
                                            })
                                        }
                                    </List>

                                    <Divider />

                                </React.Fragment>

                                : ''}


                        {
                            standard.standard.assets ?

                                <React.Fragment>
                                    <div className="mfa__container">

                                        <h4>Models</h4>

                                    </div>

                                    <List>
                                        {
                                            _.map(control_models, cm => {
                                                return (
                                                    <ListItem key={cm.id}>
                                                        <Checkbox onChange={() => { this.toggleControlModel(cm) }} checked={cm.selected} slider label={cm.name} />
                                                    </ListItem>
                                                );
                                            })
                                        }
                                    </List>
                                </React.Fragment>

                                : ''}


                    </div>

                </Drawer>
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state) => ({
    maturity_levels: state.compliance.maturity_levels,
    standards: state.compliance.standards,
    standard: state.leftnav.standard,
    asset_types: state.compliance.asset_types,
    control_models: state.compliance.control_models,
    maturity_level: state.compliance.maturity_level,
});
export default withRouter(connect(mapStateToProps, { setMaturityLevel, setMaturityLevels, setCompStandards, setControlModels, setAssetTypes })(ControlsFilter));
