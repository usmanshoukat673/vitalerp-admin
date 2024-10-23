import React, { Component } from 'react';
import axiosInstance from '../../api/api';
import { Segment, Card, Breadcrumb, Pagination, Button, List, Image, Popup, Form, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { closeLeftNav, selectControlFunction, toggleSideMenuXButton, setParentSections, setSectionControls, toggleRightSideDocs } from '../../actions';
import LoadingControls from './LoadingControls';
import { IoIosInformationCircleOutline } from "react-icons/io";
import { RiFilterFill } from "react-icons/ri";
import { GiFireShield } from "react-icons/gi";
import IconButton from '@mui/material/IconButton';
import ControlsFilter from './ControlsFilter';
import SectionDocuments from './SectionDocuments';
import CompPieChart from './CompPieChart';
import CompDoughnutChart from './CompDoughnutChart';
import GoogleCustomSearch from './GoogleCustomSearch';
import Questions from './Questions';
import _ from 'lodash';
import './ComplianceControlsDashboard.scss';
import WorkingControl from './WorkingControl';
import ControlsTable from './ControlsTable';
import { scroller } from 'react-scroll';
import SectionControlDocuments from './SectionControlDocuments';
import MenuIcon from '@mui/icons-material/Menu';

class ComplianceControlsDashboard extends Component {

    state = {
        errors: [],
        loading: false,
        section_id: '',
        activePage: 1,
        totalPages: 0,
        apps: [],
        open_cfilter: false,
        section_changed: false,
        show_google_search: false,
        show_questions: false,
        controls: []
    };

    handlePaginationChange = (e, { activePage }) => this.getControls(activePage);

    componentDidMount() {
        if (_.isEmpty(this.props.user)) {
            this.props.history.push('/login');
        }
        else if (_.isEmpty(this.props.company)) {
            this.props.history.push('/select-organization');
        }
        else {

            this.setID();
            const { leftnav } = this.props;

            // this.props.closeLeftNav();
            this.props.toggleSideMenuXButton(false);

            // for now only load apps onces
            this.getApps();
        }
    };

    setID = () => {

        const { leftnav } = this.props;
        const { section } = leftnav;

        if (!_.isEmpty(section) && this.state.section_id !== section.id) {
            this.setState({ section_id: section.id }, () => {
                this.getControls(1);
                // trigger the change for documents
                this.setState({ section_changed: false }, () => {
                    this.setState({ section_changed: true });
                    this.setState({ show_google_search: false })
                });
            });
        }

    };

    getControls = activePage => {
        this.setState({ errors: [], loading: true });

        const { token, company, maturity_levels, control_models, asset_types, standard, maturity_level } = this.props;
        const { section_id } = this.state;

        const levels = _.filter(maturity_levels, ml => {
            return ml.value <= maturity_level.value;
        });

        const clean_levels = _.map(levels, ml => (ml.id));

        const ctl_models = _.filter(control_models, (cm) => {
            return cm.selected === true;
        });

        const models = _.map(ctl_models, cm => (cm.id));

        const ast_types = _.filter(asset_types, (at) => {
            return at.selected === true;
        });

        const assets = _.map(ast_types, at => (at.id));

        axiosInstance.post(`/api/user/compliance/controls?page=${activePage}`, {
            section_id: section_id,
            maturity_levels: clean_levels,
            maturity_level: maturity_level.id,
            control_models: models,
            asset_types: assets,
            standard: standard,
        })
            .then(e => {
                this.setState({
                    errors: [],
                    loading: false,
                    controls: e.data.controls.data,
                    activePage: e.data.controls.current_page,
                    totalPages: e.data.controls.last_page
                });
                // this.props.setSectionControls(e.data.controls.data);
            })
            .catch(err => {
                if (err.response.status === 500) {
                    this.setState({ errors: [], loading: false });
                }
                if (err.response.status === 422) {
                    this.setState({ errors: this.state.errors.concat(err.response.data.errors), loading: false });
                }
            });
    };

    getSections = () => {
        this.setState({ errors: [] });

        const { token, company, standards, maturity_levels, control_models, asset_types } = this.props;

        const all_stds = _.filter(standards, (std) => {
            return std.selected === true;
        });

        const stds = _.map(all_stds, std => (std.standard_id));

        const levels = _.filter(maturity_levels, (ml) => {
            return ml.selected === true;
        });

        const clean_levels = _.map(levels, ml => (ml.id));

        const ctl_models = _.filter(control_models, (cm) => {
            return cm.selected === true;
        });

        const models = _.map(ctl_models, cm => (cm.id));

        const ast_types = _.filter(asset_types, (at) => {
            return at.selected === true;
        });

        const assets = _.map(ast_types, at => (at.id));

        axiosInstance.post(`/api/user/compliance/parent-sections`, {
            standards: stds,
            maturity_levels: clean_levels,
            control_models: models,
            asset_types: assets,
        })
            .then(e => {

                this.setState({
                    errors: [],
                });

                this.props.setParentSections(e.data.parent_sections);
            })
            .catch(err => {
                if (err.response.status === 500) {
                    this.setState({ errors: [], loading: false });
                }
                if (err.response.status === 422) {
                    this.setState({ errors: this.state.errors.concat(err.response.data.errors), loading: false });
                }
            });
    };

    handleFilterChanged = () => {
        this.getControls(this.state.activePage);
        // this.getSections();
    }

    getApps = () => {
        this.setState({ errors: [], loading: true });
        const { section_id } = this.state;

        axiosInstance.post(`/api/user/compliance/apps`, 
        { section_id: section_id })
            .then(e => {

                this.setState({
                    errors: [],
                    loading: false,
                    apps: e.data.apps
                });
            })
            .catch(err => {
                if (err.response.status === 500) {
                    this.setState({ errors: [], loading: false });
                }
                if (err.response.status === 422) {
                    this.setState({ errors: this.state.errors.concat(err.response.data.errors), loading: false });
                }
            });
    };

    componentDidUpdate(prevProps) {
        this.setID();
    };

    handleControlList = controls => {

        const { standard } = this.props;

        return _.map(controls, (control, index) => {

            return (<Card className="control__item__card" fluid key={control.id}>
                <div className="control_item">
                    <div>
                        {_.isEmpty(control.short_name) ?
                            _.truncate(control.name, {
                                'length': 34,
                                'separator': ' '
                            })
                            : control.short_name}
                        <Popup
                            trigger={<IoIosInformationCircleOutline className="control__des__icon" />}
                            position='bottom center'
                            wide='very'
                            hoverable
                            className="cotrol__popover"
                        >
                            <p>
                                <b>{control.number} {control.name}</b>
                            </p>
                            <p>
                                Function: {control.ctlfunction ? `[${control.ctlfunction.number}] ${control.ctlfunction.name}` : ''}
                            </p>
                            {
                                standard.standard.maturity_levels ?

                                    <p>
                                        Maturity Level:   {control.maturity_level ? control.maturity_level.name : ''}
                                    </p>

                                    : ''
                            }

                            <p>
                                {control.description}
                            </p>
                        </Popup>

                    </div>
                    {
                        standard.standard.maturity_levels ?
                            <div className="__numbers">{control.maturity_level ? control.maturity_level.name : ''}</div>
                            : ''
                    }
                </div>
            </Card>);
        });
    };

    handlerFilterClick = () => {
        this.setState({ open_cfilter: true });
    };

    handleFilterClose = status => {
        this.setState({ open_cfilter: status });
    };

    handlerQuestionsClick = () => {
        this.setState({ show_questions: true });
    };

    handlerQuestionsClose = () => {
        this.setState({ show_questions: false });
    };

    toggleGoogleSearch = () => {
        this.setState({ show_google_search: true })
    }

    newSectionDoc = section_documents => {
        console.log(section_documents);
    }

    saveControlProperties = (property, value, control) => {

        control.properties[property] = value;

        this.handleControlChange(control);

        axiosInstance.post(`/api/user/riskregister/save/control/properties`, {
            property_id: control.properties.id,
            property: property,
            value: value
        }).then(e => {


        }).catch(err => {
            if (err.response.status === 500 || err.response.status === 401) {
                this.setState({ errors: [], loading: false });
            }
            if (err.response.status === 422) {

                const errors = err.response.data.errors;

                this.setState({ errors: this.state.errors.concat(errors), loading: false });

            }
        });
    }

    // Not being use currently
    saveRRProperties = (property, value, control) => {

        control.assessment_question[property] = value;

        this.handleControlChange(control);

        const { controls } = this.state;
        let index = _.findIndex(controls, ctrl => {
            return ctrl.id === control.id;
        });
        controls[index] = control;
        this.setState({ controls });

        axiosInstance.post(`/api/user/riskregister/save/rr/properties`, {
            id: control.assessment_question.id,
            property: property,
            value: value
        }).then(e => {
            this.props.controlChange(control);
        }).catch(err => {
            if (err.response.status === 500 || err.response.status === 401) {
                this.setState({ errors: [], loading: false });
            }
            if (err.response.status === 422) {

                const errors = err.response.data.errors;

                this.setState({ errors: this.state.errors.concat(errors), loading: false });

            }
        });
    }

    handleControlChange = control => {
        const { controls } = this.state;
        let index = _.findIndex(controls, ctrl => {
            return ctrl.id === control.id;
        });
        controls[index] = control;
        this.setState({ controls });
    }

    controlArtifactChange = (artifacts, control) => {
        const { controls } = this.state;
        let index = _.findIndex(controls, ctrl => {
            return ctrl.id === control.id;
        });
        control.artifacts = artifacts;
        controls[index] = control;
        this.setState({ controls });
    }

    scrollToControl = id => {
        scroller.scrollTo(`working__control__${id}`, {
            duration: 500,
            delay: 0,
            smooth: 'easeInOutQuart'
        })
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    toggleRightDocs = () => {

        this.props.toggleRightSideDocs(!this.props.leftnav.open_documents_menu);
    }

    handleRenamed = (document, control_id) => {
        const { controls } = this.state;

        let control_index = _.findIndex(controls, ctr => {
            return ctr.id === control_id;
        });

        const control = controls[control_index];

        let index = _.findIndex(control.artifacts, doc => {
            return doc.document_id === document.id;
        });
        control.artifacts[index].document.name = document.name;
        control.artifacts[index].document.updated_at = document.updated_at;
        controls[control_index] = control;
        this.setState({ controls: controls });
    }

    handleDeleted = (document, control_id) => {

        const { controls } = this.state;

        let control_index = _.findIndex(controls, ctr => {
            return ctr.id === control_id;
        });

        const control = controls[control_index];

        _.remove(control.artifacts, (doc) => {
            return doc.document_id === document.id;
        });

        controls[control_index] = control;
        this.setState({ controls: controls });
    }


    render() {

        const { loading, activePage, totalPages, apps, open_cfilter, section_changed, show_google_search, show_questions, controls } = this.state;
        const { leftnav, company, token, users, standard, standards } = this.props;
        const { section } = leftnav;

        const leftnav_status = leftnav.open ? "open__menu" : "close__menu";
        const sub_nav_status = leftnav.open_sub ? " sub__section__open" : " sub__section__close";
        const open_documents_menu_status = leftnav.open_documents_menu ? " open_documents_menu__open" : " open_documents_menu__close";

        const parent_status = leftnav.open_sub ? 'sub__slide__menu_opened ' : '';

        return (
            <div className={`${parent_status} compl__parent__container ${sub_nav_status} ${open_documents_menu_status}`} >
                <div className={`page__header ${leftnav_status}${sub_nav_status} ${open_documents_menu_status}`}>
                    <div>

                        <Breadcrumb size="large" style={{ backgroundColor: '#fff' }}>
                            <Breadcrumb.Section active>{section.menu_name}</Breadcrumb.Section>
                        </Breadcrumb>

                    </div>

                    <div>
                        <IconButton onClick={this.handlerQuestionsClick} sytle={{ padding: '8px' }}><GiFireShield /></IconButton>
                        {show_questions ? <Questions token={token} company={company} apps={apps} controls={controls} closeQuestions={this.handlerQuestionsClose} /> : ''}
                        <IconButton onClick={this.handlerFilterClick} sytle={{ padding: '8px' }}><RiFilterFill /></IconButton>
                        {
                            !leftnav.open_documents_menu ?
                                <IconButton onClick={this.toggleRightDocs} sytle={{ padding: '8px' }}><MenuIcon /></IconButton> : ''
                        }
                    </div>
                </div>

                <div className={`page__header ${leftnav_status}${sub_nav_status} ${open_documents_menu_status} custom__header`}>

                    {
                        _.isEmpty(section.description) ? '' : <p>{section.description}</p>
                    }

                </div>

                <div className={`compl__dashboard ${leftnav_status}${sub_nav_status}${open_documents_menu_status}`}>

                    {
                        /**
                         * Assets list
                         * <Segment>
                        <List horizontal>
                            {
                                _.map(apps, app => {
                                    return (<List.Item key={app.id} className="integration__item">
                                        <Image style={{
                                            height: '22px', width: '22px'
                                        }} size='mini' src={app.integration.icon} />
                                        <List.Content>
                                            <List.Header>
                                                {app.integration.name}

                                                <Popup
                                                    trigger={<IoIosInformationCircleOutline className="app__des__icon" />}
                                                    position='bottom center'
                                                    wide='very'
                                                    hoverable
                                                    className="app__popover"
                                                >
                                                    <div>
                                                        <Image style={{ height: '22px', width: '22px', display: 'inline' }} size='mini' src={app.integration.icon} /> <b>{app.integration.name}</b>
                                                    </div>
                                                    <p>
                                                        {app.integration.description}
                                                    </p>
                                                </Popup>

                                            </List.Header>

                                        </List.Content>
                                    </List.Item>);
                                })
                            }
                        </List>
                    </Segment>
                         */
                    }

                    <ControlsTable controls={controls} navigate={this.scrollToControl} />

                    {
                        /**
                         * Hiden Control listing with shortname
                         *
                         *  <Segment>
                         <Card.Group itemsPerRow={3}>

                             {loading ?

                                 <LoadingControls />

                                 : this.handleControlList(controls)}
                         </Card.Group>

                         {totalPages > 1 ? <div className="controls__pagination">
                             <Pagination
                                 activePage={activePage}
                                 onPageChange={this.handlePaginationChange}
                                 totalPages={totalPages} />
                         </div> : ''}


                     </Segment>
                         */
                    }

                    <ControlsFilter changed={this.handleFilterChanged} open={open_cfilter} onDrawerClose={this.handleFilterClose} company={company} token={token} />


                    {/** The Charts */}
                    {
                        /**
                         *
                         *  <Grid columns={2} divided style={{ marginRight: '-2rem', marginLeft: '0px' }}>
                         <Grid.Row stretched>
                             <Grid.Column>
                                 <CompPieChart />
                             </Grid.Column>
                             <Grid.Column>
                                 <CompDoughnutChart />
                             </Grid.Column>
                         </Grid.Row>
                     </Grid>
                         */
                    }

                    <Grid doubling columns={1}>
                        {
                            _.map(controls, (control, index) => {
                                return (<WorkingControl
                                    key={`${control.id}-${control.name}`}
                                    control={control}
                                    users={users}
                                    token={token}
                                    company={company}
                                    newSectionDocumentUploaded={this.newSectionDoc}
                                    controlStatusChange={this.saveControlProperties}
                                    controlRRPropertiesChange={this.saveRRProperties}
                                    controlArtifactChange={this.controlArtifactChange}
                                    apps={apps}
                                    standard={standard}
                                    standards={standards}
                                    renamed={this.handleRenamed}
                                    ctrdocremoved={this.handleDeleted}
                                />);
                            })
                        }

                    </Grid>

                    <Grid columns={1} style={{ marginRight: '-2rem', marginLeft: '0px' }}>
                        <Grid.Row stretched>
                            <Grid.Column>
                                {show_google_search ? '' : <Button onClick={this.toggleGoogleSearch}>Show External Results</Button>}
                                {show_google_search ? <GoogleCustomSearch query={section.menu_name} /> : ''}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                </div>

                {
                    leftnav.open_documents_menu ? <div className="compl__docs">
                        <SectionControlDocuments renamed={this.handleRenamed} controls={controls} section={section} company={company} token={token} />
                    </div> : ''
                }

            </div>
        );
    };
}

const mapStateToProps = (state) => ({
    maturity_levels: state.compliance.maturity_levels,
    standards: state.compliance.standards,
    standard: state.leftnav.standard,
    asset_types: state.compliance.asset_types,
    control_models: state.compliance.control_models,
    maturity_level: state.compliance.maturity_level,
    maturity_level: state.compliance.maturity_level,
    // controls: state.compliance.controls,
    users: state.orgs.company_users,
});
export default connect(mapStateToProps, { closeLeftNav, selectControlFunction, toggleSideMenuXButton, setParentSections, setSectionControls, toggleRightSideDocs })(ComplianceControlsDashboard);
