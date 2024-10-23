/**
 * Not in use from 2022, 17 Nov 
 */
import React, { Component, Suspense } from 'react';
import axiosInstance from '../../api/api';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { closeSubLeftNav, selectControlFunction, selectCatalogSection, selectStandard, setParentSections, setCompanyUsers, selectCatalogParentSection } from '../../actions';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import AllStandardDocuments from './AllStandardDocuments';
import SectionTile from './SectionTile';
import VisitDashboardBreadcrum from '../dashboard/VisitDashboardBreadcrum';
const ControlsInfoChart = React.lazy(() => import('./cc-category/ControlsInfoChart'));
const CCActivities = React.lazy(() => import('./cc-category/CCActivities'));

const RightSidebar = () => {
    return(
        <div>
            Hi I am from Dashboard!
        </div>
    )
}

class ComplianceCategories extends Component {

    state = {
        errors: [],
        loading: false,
        openSwitchCompl: '',
        view_documents: false,
        standard_name: '',
        documents: [],
        activities: [],
        implemented_ctrls: 0,
        partially_imple_ctrls: 0,
        applicable_ctrls: 0,
        not_applicable_ctrls: 0,
    }

    componentDidMount() {
        if (_.isEmpty(this.props.user)) {
            this.props.history.push('/login');
        }
        else if (_.isEmpty(this.props.company)) {
            this.props.history.push('/select-organization');
        }
        else {
            this.props.closeSubLeftNav();
        }
    }

    componentDidUpdate(prevProps) {
        const { standard_name } = this.props.match.params;
        if (this.state.standard_name !== standard_name) {
            this.setState({ standard_name: standard_name });
            this.loadStdInfo();
        }
    }

    loadStdInfo = () => {
        const { standard } = this.props;

        this.setState({ errors: [], });

        axiosInstance.post(`/api/user/compliance/standard-info`, {
            standard_id: standard.standard_id,
            getdocs: true
        })
            .then(e => {

                this.setState({
                    errors: [],
                    implemented_ctrls: e.data.implemented_ctrls,
                    applicable_ctrls: e.data.applicable_ctrls,
                    not_applicable_ctrls: e.data.not_applicable_ctrls,
                    partially_imple_ctrls: e.data.partially_imple_ctrls,
                    documents: e.data.documents,
                    activities: e.data.activities,
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
    }

    handleNavigation = section => {
        const { company } = this.props;
        this.props.selectCatalogSection(section);
        this.props.history.push(`/${company.slug}/compliance/category/${section.slug}`);
    };

    handleSectionNav = section => {
        const { company } = this.props;
        this.props.selectCatalogParentSection(section);
        this.props.history.push(`/${company.slug}/compliance/section/${section.slug}`);
    };

    handleSubSectionNav = (section, slug) => {
        const { company } = this.props;
        this.props.selectCatalogParentSection(section);
        this.props.history.push(`/${company.slug}/compliance/section/${section.slug}?to=${slug}`);
    };

    handleSwitchComplOpen = event => {
        this.setState({ openSwitchCompl: event.currentTarget });
    };

    handleSwitchComplClose = () => {
        this.setState({ openSwitchCompl: '' });
    };

    switchCompalance = std => {
        const { company, selectStandard, history } = this.props;
        selectStandard(std);

        this.setState({ errors: [], openSwitchCompl: '' });

        axiosInstance.post(`/api/user/compliance/parent-sections`, {
            standards: [std.standard_id],
        })
            .then(e => {

                this.setState({
                    errors: [],
                });

                this.props.setParentSections(e.data.parent_sections);
                this.props.setCompanyUsers(e.data.users);

                history.push(`/${company.slug}/compliance/${std.standard.slug}`);
            })
            .catch(err => {
                if (err.response.status === 500) {
                    this.setState({ errors: [], loading: false });
                }
                if (err.response.status === 422) {
                    this.setState({ errors: this.state.errors.concat(err.response.data.errors), loading: false });
                }
            });
    }

    toggleDocuments = () => {
        this.setState({ view_documents: !this.state.view_documents });
    }

    handleRenamed = (document, control_id) => {
        const { documents } = this.state;
        let index = _.findIndex(documents, doc => {
            return doc.document.id === document.id;
        });
        if (index >= 0) {
            documents[index].document.name = document.name;
            documents[index].document.updated_at = document.updated_at;
            this.setState({ documents: documents });
        }
    }

    handleRenamedDV = (document) => {
        const { documents } = this.state;
        let index = _.findIndex(documents, doc => {
            return doc.document.id === document.id;
        });

        if (index >= 0) {
            documents[index].document.name = document.name;
            documents[index].document.updated_at = document.updated_at;
            this.setState({ documents: documents });
        }

    }

    handleSectionInfoChanged = (psection, info) => {
        const { leftnav } = this.props;
        let parent_sections = leftnav.parent_sections;
        let index = _.findIndex(parent_sections, sec => {
            return sec.id === psection.id;
        });
        parent_sections[index].custodian_teams = info.custodian_teams;
        parent_sections[index].custodians = info.custodians;
        parent_sections[index].owner_teams = info.owner_teams;
        parent_sections[index].owners = info.owners;
        parent_sections[index].owner_thirdparty = info.owner_thirdparty;
        parent_sections[index].custodian_thirdparty = info.custodian_thirdparty;
        this.props.setParentSections(parent_sections);
    }

    handleSectionLiked = (psection, like) => {
        const { leftnav } = this.props;
        let parent_sections = leftnav.parent_sections;
        let index = _.findIndex(parent_sections, sec => {
            return sec.id === psection.id;
        });
        parent_sections[index].like = like;
        this.props.setParentSections(parent_sections);
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const {
            loading,
            openSwitchCompl,
            view_documents,
            implemented_ctrls,
            partially_imple_ctrls,
            applicable_ctrls,
            not_applicable_ctrls,
            documents,
            activities
        } = this.state;
        const { leftnav, standard, standards, company, token, users } = this.props;

        return (
            <div className={leftnav.open_sub ? 'sub__slide__menu_opened' : ''} >

                <div className="ccroot__mainbd">
                    <div className="ccroot__breadcrum"><VisitDashboardBreadcrum /> {' > '} Compliance</div>

                    <div className="cc__header">
                        <div className="__name">{standard.standard.name}</div>
                        <div className="__actions">

                            {/**
                         <Button className={view_documents ? '__active' : ''} onClick={this.toggleDocuments}><FileCopyIcon /> Documents</Button> */}
                            {
                                /*

                                <Button onClick={this.handleSwitchComplOpen}><LoopIcon /> Switch Compliance</Button>

                            <Menu
                                id="compailance-menu"
                                anchorEl={openSwitchCompl}
                                keepMounted
                                open={Boolean(openSwitchCompl)}
                                onClose={this.handleSwitchComplClose}
                            >
                                <div className="__cm__heading">
                                    Compliance
                                </div>

                                <Divider style={{ marginTop: '0px' }} />

                                {
                                    _.map(standards, std => {
                                        return (
                                            <MenuItem className="__cm__menu" key={`std-${std.standard_id}`} onClick={() => { this.switchCompalance(std) }} >
                                                {std.standard.expand_name}
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Menu>
                            */
                            }
                        </div>
                    </div>
                </div>

                <div className="compliance__categories">

                    <div className="cc_overview__panal">
                        <div className="__piechart">
                            <div className="__pieheading">Overview</div>
                            <Suspense fallback={<div>Loading...</div>}>
                                <ControlsInfoChart type="controls" series={[implemented_ctrls, partially_imple_ctrls, applicable_ctrls, 0, not_applicable_ctrls]} />
                            </Suspense>
                        </div>
                        <div className="__pienotes">
                            <div> <span className="n__fullyimpl __count">{implemented_ctrls}</span> Implemented</div>
                            <div><span className="n__partimpl __count">{partially_imple_ctrls}</span> Partially Implemented</div>
                            <div><span className="n__applicable __count">{applicable_ctrls}</span> Applicable</div>
                            <div> <span className="n__requiredatten __count">0</span> Excluded</div>
                            <div> <span className="n__not_applicable __count">{not_applicable_ctrls}</span> Not Applicable</div>
                        </div>

                        <div className="__totaldocs">
                            <div className="__numberof_docs">
                                <div>{documents.length}</div>
                                <div>Documents</div>
                            </div>
                        </div>
                        <Suspense fallback={<div>Loading...</div>}>
                            <CCActivities c_title={true} activities={activities} />
                        </Suspense>
                    </div>

                    <div className="categories__panal">
                        <div className="cp__header__section">
                            <div className="cp__header">Categories</div>
                            <div className="cp__actions">
                                <div>view by:</div>
                                <div className="active">Category</div>
                                <div>Topic</div>
                                <div>Custom</div>
                            </div>
                            <div className="cp__options">
                                {
                                    /**
                                     * <Button className={view_documents ? '__active' : ''} onClick={this.toggleDocuments} size="mini"><FileCopyIcon /> documents</Button>
                                     */
                                }
                            </div>
                        </div>

                        <div className="cp__main__section">
                            <div className="cp__the__sections">
                                <Grid doubling columns={1}>
                                    {
                                        _.map(leftnav.parent_sections, psection => {
                                            return (
                                                <SectionTile
                                                    company={company}
                                                    token={token}
                                                    standard={standard}
                                                    psection={psection}
                                                    key={psection.id}
                                                    users={users}
                                                    navigate={this.handleSectionNav}
                                                    subnavigate={this.handleSubSectionNav}
                                                    sectionInfoChanged={this.handleSectionInfoChanged}
                                                    sectionLiked={this.handleSectionLiked}
                                                />
                                            )
                                        })
                                    }

                                </Grid>
                            </div>
                            <div>
                                <AllStandardDocuments
                                    documents={documents}
                                    close={this.toggleDocuments}
                                    standard={standard}
                                    company={company}
                                    token={token}
                                    standards={standards}
                                    renamed={this.handleRenamedDV}
                                />
                            </div>
                        </div>

                        {view_documents && <AllStandardDocuments
                            documents={documents}
                            close={this.toggleDocuments}
                            standard={standard}
                            company={company}
                            token={token}
                            standards={standards}
                            renamed={this.handleRenamedDV}
                        />}
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    standard: state.leftnav.standard,
    standards: state.compliance.standards,
    users: state.orgs.company_users,
});

export default withRouter(connect(mapStateToProps, { closeSubLeftNav, selectControlFunction, selectCatalogSection, selectStandard, setParentSections, setCompanyUsers, selectCatalogParentSection })(ComplianceCategories));
