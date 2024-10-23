import React, { Component } from 'react';
import { Popup, Dropdown } from 'semantic-ui-react';
import SectionOwner from '../compliance/SectionOwner';
import './ParentSection.scss';

class ParentSection extends Component {

    state = {
        errors: [],
        loading: false,
        owner: false,
    };


    openOwner = () => {

        this.setState({ owner: true });

    };

    getInitial = name => {
        var initials = name.match(/\b\w/g) || [];
        return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    }

    closeOwner = () => {
        this.setState({ owner: false });
    };

    savedOwnerInfo = info => {
        this.props.sectionInfoChanged(this.props.psection, info);
        this.setState({ owner: false });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { psection, company, token, users } = this.props;

        const { loading, owner } = this.state;

        return (

            <div className="__the__section__page">

                <div className="__the__parent_section">

                    <div className="__psname"> {psection.menu_name}</div>

                    <div>
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

                {
                    _.map(psection.sections, section => {
                        return (
                            <div className="__the__child_section" key={section.id}>
                                {section.menu_name}
                            </div>
                        )
                    })
                }

                <div className="__respo__users">

                    {
                        _.map(psection.owners, us => {
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
                        _.map(psection.owner_teams, te => {
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
                        _.map(psection.owner_thirdparty, tp => {
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
                        _.map(psection.custodians, us => {
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
                        _.map(psection.custodian_teams, te => {
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
                        _.map(psection.custodian_thirdparty, tp => {
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

                {
                    owner && <SectionOwner
                        standard={psection.standard}
                        users={users}
                        open={owner}
                        close={this.closeOwner}
                        saved={this.savedOwnerInfo}
                        psection={psection}
                        company={company}
                        token={token}
                    />
                }

            </div>
        )
    }
}

export default ParentSection;
