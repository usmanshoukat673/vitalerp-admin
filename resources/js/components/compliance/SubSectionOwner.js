import React, { Component } from 'react';
import { Button, Modal, Dropdown, Form, Radio } from 'semantic-ui-react';
import CloseIcon from '@mui/icons-material/Close';
import './SubSectionOwner.scss';
import AddThirdParty from '../thirdparty/AddThirdParty';
import axiosInstance from '../../api/api';

class SubSectionOwner extends Component {

    state = {
        errors: [],
        loading: false,
        add_thirdparty: false,
        owners: [],
        custodians: [],
        owner_type: 'users',
        custodian_type: 'users',
        owner_teams: [],
        custodian_teams: [],
        all_teams: [],
        touched: false,
        custodian_thirdparty: [],
        all_thirdparties: [],
        owner_thirdparty: [],
    }

    componentDidMount() {
        const { standard, _csection } = this.props;

        this.setState({ errors: [], loading: true });

        axiosInstance.post(`/api/user/compliance/sub-section-owner-info`, {
            standard_id: standard.id,
            section_id: _csection.id,
        })
            .then(e => {
                this.setState({
                    errors: [],
                    owners: e.data.owners,
                    custodians: e.data.custodians,
                    owner_type: e.data.owner_autority,
                    custodian_type: e.data.custodian_autority,
                    all_teams: e.data.all_teams,
                    custodian_teams: e.data.custodian_teams,
                    owner_teams: e.data.owner_teams,
                    all_thirdparties: e.data.all_thirdparties,
                    owner_thirdparty: e.data.owner_thirdparty,
                    custodian_thirdparty: e.data.custodian_thirdparty,
                    loading: false,
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

    handleSubmit = event => {

        event.preventDefault();

        const { standard, _csection, users } = this.props;

        const { all_teams, owners, custodians, owner_type, custodian_type, owner_teams, custodian_teams, owner_thirdparty, custodian_thirdparty, all_thirdparties } = this.state;

        this.setState({ errors: [], loading: true });

        let all_users = _.map(users, us => us.user.id);

        let all_teams_filtered = _.map(all_teams, te => te.id);

        let all_thirdparties_filtered = _.map(all_thirdparties, tp => tp.id);

        axiosInstance.post(`/api/user/compliance/save-sub-section-owner-info`, {
            standard_id: standard.id,
            csection: _csection,
            owners: owners,
            custodians: custodians,
            all_users: all_users,
            all_teams: all_teams_filtered,
            all_thirdparties: all_thirdparties_filtered,
            owner_type: owner_type,
            custodian_type: custodian_type,
            owner_teams: owner_teams,
            custodian_teams: custodian_teams,
            owner_thirdparty: owner_thirdparty,
            custodian_thirdparty: custodian_thirdparty,
        })
            .then(e => {

                this.setState({
                    errors: [],
                    loading: false,
                    touched: false
                });

                this.props.saved(e.data.new_resposibilities);

            })
            .catch(err => {
                if (err.response.status === 500) {
                    this.setState({ errors: [], loading: false, touched: false });
                }
                if (err.response.status === 422) {
                    this.setState({ errors: this.state.errors.concat(err.response.data.errors), loading: false, touched: false });
                }
            });
    }

    handleOwnerChange = (event, { value }) => {

        this.setState({ owners: value, touched: true });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(owners)) {
            delete errors[0][owners];
            this.setState({ errors: errors });
        }
    }

    handleCustodianChange = (event, { value }) => {

        this.setState({ custodians: value, touched: true });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(custodians)) {
            delete errors[0][custodians];
            this.setState({ errors: errors });
        }
    }

    handleOwnerTeamChange = (event, { value }) => {

        this.setState({ owner_teams: value, touched: true });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(owner_teams)) {
            delete errors[0][owner_teams];
            this.setState({ errors: errors });
        }
    }

    handleCustodianTeamChange = (event, { value }) => {

        this.setState({ custodian_teams: value, touched: true });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(custodian_teams)) {
            delete errors[0][custodian_teams];
            this.setState({ errors: errors });
        }
    }

    handleOwnerTPChange = (event, { value }) => {

        this.setState({ owner_thirdparty: value, touched: true });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(owner_thirdparty)) {
            delete errors[0][owner_thirdparty];
            this.setState({ errors: errors });
        }
    }
    handleCustodianTPChange = (event, { value }) => {

        this.setState({ custodian_thirdparty: value, touched: true });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(custodian_thirdparty)) {
            delete errors[0][custodian_thirdparty];
            this.setState({ errors: errors });
        }
    }

    handlerInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'error' : '';
    }

    displayInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p style={{ marginTop: '5px' }} className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    handleOwnerTypeChange = (e, { value }) => this.setState({ owner_type: value, touched: true })
    handleCustodianTypeChange = (e, { value }) => this.setState({ custodian_type: value, touched: true })

    closeOwner = () => this.props.close();

    closeAddTP = () => {
        this.setState({ add_thirdparty: false });
    }

    thirdpartyAdded = thirdparty => {
        let all_thirdparties = this.state.all_thirdparties;
        all_thirdparties.push(thirdparty);
        this.setState({ add_thirdparty: false, all_thirdparties: all_thirdparties });
    }

    render() {

        const { owners, errors, loading, custodians, owner_type, custodian_type, all_teams, custodian_teams, owner_teams, touched, all_thirdparties,
            owner_thirdparty,
            add_thirdparty,
            custodian_thirdparty } = this.state;
        const { open, users, _csection, company, token } = this.props;

        const userOptions = _.map(users, (us, index) => ({
            key: us.user.id,
            text: `${us.user.first_name} ${us.user.last_name}`,
            value: us.user.id,
        }));

        const teamsOptions = _.map(all_teams, (te, index) => ({
            key: te.id,
            text: `${te.name}`,
            value: te.id,
        }));

        const tpOptions = _.map(all_thirdparties, (th, index) => ({
            key: th.id,
            text: `${th.name}`,
            value: th.id,
        }));

        return (
            <React.Fragment>
                <Modal
                    className="semtic__modal sectonowner__modal"
                    onClose={() => { }}
                    open={open}
                    size="large"
                >
                    <Modal.Content className="sectonowner_modal_container">
                        <div className="sss__header">
                            <div className="__ss__number">
                                {_csection.menu_name} Responsibilities
                            </div>
                            <div className="__ss__close">
                                <CloseIcon onClick={this.closeOwner} />
                            </div>
                        </div>

                        <div className="__ss__main__section">
                            <div className="__owner__form">
                                <div className="form__column">
                                    <Form>
                                        <p>Owner:</p>

                                        <Form.Group widths="equal" className="owner__selection">
                                            <Form.Field>
                                                <Radio
                                                    label='User(s)'
                                                    name='ownerGroup'
                                                    value='users'
                                                    checked={owner_type === 'users'}
                                                    onChange={this.handleOwnerTypeChange}
                                                />
                                            </Form.Field>
                                            <Form.Field>
                                                <Radio
                                                    label='Team(s)'
                                                    name='ownerGroup'
                                                    value='teams'
                                                    checked={owner_type === 'teams'}
                                                    onChange={this.handleOwnerTypeChange}
                                                />
                                            </Form.Field>
                                            <Form.Field>
                                                <Radio
                                                    label='Third Party'
                                                    name='ownerGroup'
                                                    value='thirdparty'
                                                    checked={owner_type === 'thirdparty'}
                                                    onChange={this.handleOwnerTypeChange}
                                                />
                                            </Form.Field>
                                        </Form.Group>

                                        {
                                            owner_type === 'users' && <Form.Field>
                                                <label>User(s)</label>
                                                <Dropdown
                                                    className={this.handlerInputError(errors, 'owners')}
                                                    placeholder='Owner'
                                                    onChange={this.handleOwnerChange}
                                                    value={owners}
                                                    search
                                                    selection
                                                    options={userOptions}
                                                    fluid
                                                    multiple
                                                />
                                                {this.displayInputError(errors, 'owners')}
                                            </Form.Field>
                                        }

                                        {
                                            owner_type === 'teams' && <Form.Field>
                                                <label>Team(s)</label>
                                                <Dropdown
                                                    className={this.handlerInputError(errors, 'owner_teams')}
                                                    placeholder='Teams'
                                                    onChange={this.handleOwnerTeamChange}
                                                    value={owner_teams}
                                                    search
                                                    selection
                                                    options={teamsOptions}
                                                    fluid
                                                    multiple
                                                />
                                                {this.displayInputError(errors, 'owner_teams')}
                                            </Form.Field>
                                        }

                                        {
                                            owner_type === 'thirdparty' &&
                                            <div>

                                                <Form.Field>
                                                    <label>Third Party(s)</label>
                                                    <Dropdown
                                                        className={this.handlerInputError(errors, 'owner_thirdparty')}
                                                        placeholder='Third Party'
                                                        onChange={this.handleOwnerTPChange}
                                                        value={owner_thirdparty}
                                                        search
                                                        selection
                                                        options={tpOptions}
                                                        fluid
                                                        multiple
                                                    />
                                                    {this.displayInputError(errors, 'owner_thirdparty')}
                                                </Form.Field>

                                                <span className="tp__button" onClick={() => this.setState({ add_thirdparty: true })} >Add New Third Party</span>

                                            </div>
                                        }


                                        <Form.Field>
                                            <Button
                                                fluid
                                                disabled={loading || !touched}
                                                className={loading ? '__ap__action loading' : '__ap__action'}
                                                onClick={this.handleSubmit} >
                                                Submit
                                            </Button>
                                        </Form.Field>
                                    </Form>
                                </div>
                                <div className="form__column">
                                    <Form>

                                        <p>Custodian:</p>

                                        <Form.Group widths="equal" className="owner__selection">
                                            <Form.Field>
                                                <Radio
                                                    label='User(s)'
                                                    name='custodianGroup'
                                                    value='users'
                                                    checked={custodian_type === 'users'}
                                                    onChange={this.handleCustodianTypeChange}
                                                />
                                            </Form.Field>
                                            <Form.Field>
                                                <Radio
                                                    label='Team(s)'
                                                    name='custodianGroup'
                                                    value='teams'
                                                    checked={custodian_type === 'teams'}
                                                    onChange={this.handleCustodianTypeChange}
                                                />
                                            </Form.Field>
                                            <Form.Field>
                                                <Radio
                                                    label='Third Party'
                                                    name='custodianGroup'
                                                    value='thirdparty'
                                                    checked={custodian_type === 'thirdparty'}
                                                    onChange={this.handleCustodianTypeChange}
                                                />
                                            </Form.Field>
                                        </Form.Group>

                                        {
                                            custodian_type === 'users' && <Form.Field>

                                                <label>User(s)</label>

                                                <Dropdown
                                                    className={this.handlerInputError(errors, 'custodians')}
                                                    placeholder='Custodians'
                                                    onChange={this.handleCustodianChange}
                                                    value={custodians}
                                                    search
                                                    selection
                                                    options={userOptions}
                                                    fluid
                                                    multiple
                                                />
                                                {this.displayInputError(errors, 'custodians')}
                                            </Form.Field>
                                        }

                                        {
                                            custodian_type === 'teams' && <Form.Field>
                                                <label>Team(s)</label>
                                                <Dropdown
                                                    className={this.handlerInputError(errors, 'custodian_teams')}
                                                    placeholder='Teams'
                                                    onChange={this.handleCustodianTeamChange}
                                                    value={custodian_teams}
                                                    search
                                                    selection
                                                    options={teamsOptions}
                                                    fluid
                                                    multiple
                                                />
                                                {this.displayInputError(errors, 'custodian_teams')}
                                            </Form.Field>
                                        }


                                        {
                                            custodian_type === 'thirdparty' && <div>

                                                <Form.Field>
                                                    <label>Third Party(s)</label>
                                                    <Dropdown
                                                        className={this.handlerInputError(errors, 'custodian_thirdparty')}
                                                        placeholder='Third Party'
                                                        onChange={this.handleCustodianTPChange}
                                                        value={custodian_thirdparty}
                                                        search
                                                        selection
                                                        options={tpOptions}
                                                        fluid
                                                        multiple
                                                    />
                                                    {this.displayInputError(errors, 'custodian_thirdparty')}
                                                </Form.Field>

                                                <span className="tp__button" onClick={() => this.setState({ add_thirdparty: true })} >Add New Third Party</span>

                                            </div>
                                        }

                                    </Form>
                                </div>

                            </div>

                        </div>

                    </Modal.Content>

                </Modal>

                {
                    add_thirdparty && <AddThirdParty
                        added={this.thirdpartyAdded}
                        open={add_thirdparty}
                        company={company}
                        token={token}
                        close={this.closeAddTP}
                    />
                }
            </React.Fragment>
        );
    }
}

export default SubSectionOwner;
