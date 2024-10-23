import React, { Component } from 'react';
import { Grid, Dropdown, Popup } from 'semantic-ui-react';
import PSectionLikeButton from '../PSectionLikeButton';
import SubSectionOwner from '../SubSectionOwner';
import CCActivities from './CCActivities';
import SectionControlsInfoChart from './SectionControlsInfoChart';
import { withRouter } from 'react-router-dom';
import { setSelectedTask, setBackPageURL } from '../../../actions';
import { connect } from 'react-redux';
import './ChildSection.scss';
import axiosInstance from '../../../api/api';

class ChildSection extends Component {

    state = {
        mid_section: 'summary',
        implemented_ctrls: 0,
        partially_imple_ctrls: 0,
        applicable_ctrls: 0,
        not_applicable_ctrls: 0,
        loading: false,
        activities: [],
        owner: false,
        custodian: false,
        errors: [],
        loading: false,
        authority: {},
        owners: [],
        owner_teams: [],
        custodians: [],
        custodian_teams: [],
        owner_thirdparty: [],
        custodian_thirdparty: [],
        like: {}
    }

    componentDidMount() {
        // load information here
        this.loadLimittedInfo();
    }

    loadLimittedInfo = () => {
        const { standard, _csection } = this.props;

        this.setState({ errors: [], });

        axiosInstance.post(`/api/user/compliance/sub-section-info`, {
            standard_id: standard.standard_id,
            sections: [_csection.id]
        })
            .then(e => {

                this.setState({
                    errors: [],
                    implemented_ctrls: e.data.implemented_ctrls,
                    applicable_ctrls: e.data.applicable_ctrls,
                    not_applicable_ctrls: e.data.not_applicable_ctrls,
                    partially_imple_ctrls: e.data.partially_imple_ctrls,
                    activities: e.data.activities,
                    authority: e.data.authority,
                    owners: e.data.owners,
                    owner_teams: e.data.owner_teams,
                    custodians: e.data.custodians,
                    custodian_teams: e.data.custodian_teams,
                    owner_thirdparty: e.data.owner_thirdparty,
                    custodian_thirdparty: e.data.custodian_thirdparty,
                    like: e.data.like,
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

    toggleSectionSpan = section => {
        if (this.state.mid_section === section) {
            this.setState({ mid_section: '' });
        }
        else {
            this.setState({ mid_section: section });
        }
    }

    getInitial = name => {
        var initials = name.match(/\b\w/g) || [];
        return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    }

    openOwner = () => {

        this.setState({ owner: true });

    };

    closeOwner = () => {
        this.setState({ owner: false });
    };

    savedOwnerInfo = info => {
        this.setState({
            owner: false,
            owners: info.owners,
            owner_teams: info.owner_teams,
            custodians: info.custodians,
            custodian_teams: info.custodian_teams,
            owner_thirdparty: info.owner_thirdparty,
            custodian_thirdparty: info.custodian_thirdparty,
        });
    }

    handleLiked = like => {
        this.setState({
            like: like,
        });
    }

    listActionalbeItems = _csection => {

        let tasks = [];

        _.forEach(_csection.controls, control => {
            if (_.size(control.tasks) > 0) {
                _.forEach(control.tasks, t => {
                    if (!_.isEmpty(t.task)) {
                        tasks.push(t);
                    }

                })
            }
        })

        if (_.size(tasks) > 0) {
            return _.map(tasks, t => {
                return (<div key={t.task_id} className="at__action chand" onClick={() => this.handleTaskView(t.task_id)}>{t.task.title}</div>)
            })
        }
        else {
            return (<div className="at__action">Records not found.</div>)
        }
    }

    handleTaskView = (task_id) => {
        const { company, history, token, setBackPageURL, setSelectedTask, _csection } = this.props;

        let url = `/${company.slug}/compliance/section/${_csection.slug}`;
        setBackPageURL(url);

        axiosInstance.post(`/api/user/projects/task`, {
            task_id: task_id,
        })
            .then(e => {
                setSelectedTask(e.data.task);
                history.push(`/${company.slug}/workbench/tasks/details/${task_id}`);
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

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }


    render() {
        const { _csection, standard, users, company, token } = this.props;

        const { mid_section, loading, implemented_ctrls,
            partially_imple_ctrls,
            applicable_ctrls,
            not_applicable_ctrls, activities, owner, custodian,
            owners,
            owner_teams,
            custodians,
            custodian_teams, owner_thirdparty, custodian_thirdparty, like } = this.state;

        return (
            <Grid.Column className="__ChildSection">
                <div className="__maincategory" >
                    <div className="__mcHeader" >
                        <div className="__mcTitle" onClick={() => { this.props.handleNavigation(_csection) }}>
                            {_csection.menu_name}
                        </div>

                        <div className="__mcrightSection">

                            <div className="__respo__users">

                                {
                                    _.map(owners, us => {
                                        return (
                                            <Popup
                                                content="Owner"
                                                key={`owner-${us.user_id}`}
                                                header={us.user.first_name + ' ' + us.user.last_name}
                                                trigger={<div className="__theUser __theAcUser">
                                                    {this.getInitial(us.user.first_name + ' ' + us.user.last_name)}
                                                </div>}
                                            />
                                        );
                                    })
                                }

                                {
                                    _.map(owner_teams, te => {
                                        return (
                                            <Popup
                                                content="Owner"
                                                key={`oteams-${te.team_id}`}
                                                header={te.team.name}
                                                trigger={<div className="__theUser __theAcUser">
                                                    {this.getInitial(te.team.name)}
                                                </div>}
                                            />
                                        );
                                    })
                                }

                                {
                                    _.map(owner_thirdparty, tp => {
                                        return (
                                            <Popup
                                                content="Third Party"
                                                key={`othirdparty-${tp.tp_id}`}
                                                header={tp.thirdparty.name}
                                                trigger={<div className="__theUser __theAcUser">
                                                    {this.getInitial(tp.thirdparty.name)}
                                                </div>}
                                            />
                                        );
                                    })
                                }

                                {
                                    _.map(custodians, us => {
                                        return (
                                            <Popup
                                                content="Custodian"
                                                key={`custodian-${us.user_id}`}
                                                header={us.user.first_name + ' ' + us.user.last_name}
                                                trigger={<div className="__theUser __theTeam">
                                                    {this.getInitial(us.user.first_name + ' ' + us.user.last_name)}
                                                </div>}
                                            />
                                        );
                                    })
                                }

                                {
                                    _.map(custodian_teams, te => {
                                        return (

                                            <Popup
                                                content="Custodian"
                                                key={`cteams-${te.team_id}`}
                                                header={te.team.name}
                                                trigger={<div className="__theUser __theTeam">
                                                    {this.getInitial(te.team.name)}
                                                </div>}
                                            />
                                        );
                                    })
                                }

                                {
                                    _.map(custodian_thirdparty, tp => {
                                        return (
                                            <Popup
                                                content="Third Party"
                                                key={`cthirdparty-${tp.tp_id}`}
                                                header={tp.thirdparty.name}
                                                trigger={<div className="__theUser __theTeam">
                                                    {this.getInitial(tp.thirdparty.name)}
                                                </div>}
                                            />
                                        );
                                    })
                                }
                            </div>

                            <div className="__shortCutDD" >

                                <Dropdown text='' icon="ellipsis vertical">
                                    <Dropdown.Menu>
                                        <Dropdown.Item text='Responsibilities' onClick={this.openOwner} />
                                        <Dropdown.Item text='Save as...' description='ctrl + s' />
                                        <Dropdown.Item text='Rename' description='ctrl + r' />
                                        <Dropdown.Item text='Make a copy' />
                                        <Dropdown.Item icon='folder' text='Move to folder' />
                                        <Dropdown.Item icon='trash' text='Move to trash' />
                                        <Dropdown.Divider />
                                        <Dropdown.Item text='Download As...' />
                                        <Dropdown.Item text='Publish To Web' />
                                        <Dropdown.Item text='E-mail Collaborators' />
                                    </Dropdown.Menu>
                                </Dropdown>

                            </div>
                        </div>

                    </div>
                    {
                        _.map(_csection.controls, control => (
                            <div className="__the__control" key={control.id} onClick={() => { this.props.handleNavigation(_csection) }}>
                                {`${control.number}: ${control.name}`}
                            </div>
                        ))
                    }

                    <div className="the__limitted__info">

                        <div className="__ss__menubar">
                            <div onClick={() => { this.toggleSectionSpan('summary') }} className={mid_section === 'summary' ? '__ssm__item __sactive' : '__ssm__item'}>Summary</div>
                            <div onClick={() => { this.toggleSectionSpan('activity') }} className={mid_section === 'activity' ? '__ssm__item __sactive' : '__ssm__item'}>Activity</div>
                        </div>

                        {
                            mid_section === 'summary' && <div className="__ss__sumary__section">
                                <div className="__sss__chart">
                                    <div className="__cheading">Controls</div>
                                    <div className="__cchart">
                                        <div className="__cchart__container">
                                            <SectionControlsInfoChart series={[applicable_ctrls, not_applicable_ctrls, implemented_ctrls, partially_imple_ctrls, 0]} />
                                        </div>
                                        <div className="__cchart__info">
                                            <div><span className="cn__applicable c__count"></span> Applicable ({applicable_ctrls})</div>
                                            <div> <span className="cn__not_applicable c__count"></span> Not Applicable ({not_applicable_ctrls})</div>
                                            <div> <span className="cn__fullyimpl c__count"></span> Implemented ({implemented_ctrls})</div>
                                            <div><span className="cn__partimpl c__count"></span> Partially Implemented ({partially_imple_ctrls})</div>
                                            <div> <span className="cn__requiredatten c__count"></span> Excluded (0)</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="__ss__aitems">
                                    <div className="__aheading">Actionable Items</div>
                                    <div className="__action__items">
                                        {
                                            this.listActionalbeItems(_csection)
                                        }
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            mid_section === 'activity' && <div className="__ss__activity__section">
                                <CCActivities c_title={false} activities={activities} />
                            </div>
                        }

                    </div>

                    <PSectionLikeButton
                        psection={_csection}
                        company={company}
                        token={token}
                        liked={this.handleLiked}
                        standard={standard.standard}
                        parent={false}
                        like={like}
                    />

                    {
                        owner && <SubSectionOwner
                            standard={standard.standard}
                            users={users}
                            open={owner}
                            close={this.closeOwner}
                            saved={this.savedOwnerInfo}
                            _csection={_csection}
                            company={company}
                            token={token}
                        />
                    }

                </div>
            </Grid.Column>
        );
    }
}

const mapStateToProps = (state) => ({
});

export default withRouter(connect(mapStateToProps, { setSelectedTask, setBackPageURL })(ChildSection));
