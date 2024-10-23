import React, { Component } from 'react';
import { Dropdown, Modal, Header, Button, Icon } from 'semantic-ui-react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import _ from 'lodash';
import { NotificationManager } from 'react-notifications';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import axiosInstance from '../../api/api';

class RGRowCustom extends Component {

    state = {
        errors: [],
        loading: false,
        deleteQuestion: false,
        risk_action: '',
        risk_rating: '',
        severity: '',
        probabaility: '',
        risk_owner_id: '',
        open_options: ''
    }

    componentDidMount() {
        const { question } = this.props;

        this.setState({
            severity: question.severity != null ? question.severity : '',
            probabaility: question.probabaility != null ? question.probabaility : '',
            risk_rating: question.risk_rating != null ? question.risk_rating : '',
            risk_action: question.risk_action != null ? question.risk_action : '',
            risk_owner_id: question.risk_owner_id != null ? question.risk_owner_id : '',
        });
    }

    handleSeverityChange = (event, { value }) => {

        this.setState({ severity: value }, this.calculateRisk);

        this.saveProperties('severity', value);

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(severity)) {
            delete errors[0][severity];
            this.setState({ errors: errors });
        }


    };

    saveProperties = (property, value) => {
        const { question } = this.props;
        axiosInstance.post(`/api/user/riskregister/save/rr/custom/properties`, {
            id: question.id,
            property: property,
            value: value
        }).then(e => {
        }).catch(err => {
            if (err.response.status === 500) {
                this.setState({ errors: [], loading: false });
            }
            if (err.response.status === 401) {
                this.setState({ errors: [], loading: false });
            }
        });
    }

    handleProbabailityChange = (event, { value }) => {

        this.setState({ probabaility: value }, this.calculateRisk);

        this.saveProperties('probabaility', value);

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(probabaility)) {
            delete errors[0][probabaility];
            this.setState({ errors: errors });
        }
    };

    handleRiskActionChange = (event, { value }) => {

        this.setState({ risk_action: value });

        this.saveProperties('risk_action', value);

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(risk_action)) {
            delete errors[0][risk_action];
            this.setState({ errors: errors });
        }
    };

    handleRiskOwnerChange = (event, { value }) => {

        this.setState({ risk_owner_id: value });

        this.saveProperties('risk_owner_id', value);

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(risk_owner_id)) {
            delete errors[0][risk_owner_id];
            this.setState({ errors: errors });
        }
    };


    calculateRisk = () => {
        const { severity, probabaility } = this.state;

        if (severity > 0 && probabaility > 0) {
            this.setState({ risk_rating: severity * probabaility });
            this.saveProperties('risk_rating', severity * probabaility);
        }
        else {
            this.setState({ risk_rating: '' });
            this.saveProperties('risk_rating', '');
        }
    }

    handleDelete = () => {
        this.setState({ deleteQuestion: true, open_options: '' });
    }

    deleteCustomQuestion = () => {
        const { question } = this.props;
        axiosInstance.post(`/api/user/riskregister/delete/custom/issue`, {
            id: question.id,
            comp_id: question.comp_id
        }).then(e => {
            NotificationManager.success('Given issue deleted successfully.', 'Success');

            this.props.deleted(question);
        }).catch(err => {
            if (err.response.status === 500) {
                this.setState({ errors: [], loading: false });
            }
            if (err.response.status === 401) {
                this.setState({ errors: [], loading: false });
            }
        });
    }

    handleCreatePOAM = () => {
        this.setState({ open_options: '' }, () => {
            this.props.newpoam(this.props.question);
        });
    }

    handleEdit = () => {
        this.setState({ open_options: '' }, () => {
            this.props.edit(this.props.question);
        });
    }

    handleOpenOptions = (event) => {
        this.setState({ open_options: event.currentTarget });
    }

    handleCloseOptions = () => {
        this.setState({ open_options: '' });
    }


    render() {

        const { risk_rating, severity, probabaility, risk_action, risk_owner_id, deleteQuestion, open_options } = this.state;
        const { question, users } = this.props;

        const spOptions = [
            { key: 1, text: '1', value: 1 },
            { key: 2, text: '2', value: 2 },
            { key: 3, text: '3', value: 3 },
        ];
        const riskActionOptions = [
            { key: 1, text: 'Avoid', value: 'Avoid' },
            { key: 2, text: 'Mitigate', value: 'Mitigate' },
            { key: 3, text: 'Transfer', value: 'Transfer' },
            { key: 4, text: 'Accept', value: 'Accept' },
        ];

        const usersOptions = _.map(users, (user, index) => ({
            key: user.id,
            text: `${user.user.first_name} ${user.user.last_name} (${user.user.email})`,
            value: user.user_id,
        }));

        let rating = '';

        if (risk_rating > 0 && risk_rating <= 3) {
            rating = 'risk__low';
        }
        else if (risk_rating > 3 && risk_rating <= 6) {
            rating = 'risk__mid';
        }
        else if (risk_rating > 6 && risk_rating <= 9) {
            rating = 'rish__high';
        }
        else {
            rating = '';
        }

        const options = [
            'None',
            'Atria',
            'Callisto',
            'Dione',
            'Ganymede',
            'Pyxis',
        ];


        return (

            <TableRow>
                <TableCell>
                    {`${question.risk_id}`}
                </TableCell>
                <TableCell>
                    {question.standard}
                </TableCell>
                <TableCell>{`${question.control}`}</TableCell>
                <TableCell>{`${question.question}`}</TableCell>
                <TableCell>
                    <Dropdown
                        clearable
                        options={usersOptions}
                        selection
                        onChange={this.handleRiskOwnerChange}
                        value={risk_owner_id}
                        placeholder="Select Risk Owner"
                    />
                </TableCell>
                <TableCell>
                    <Dropdown
                        clearable
                        options={spOptions}
                        selection
                        onChange={this.handleSeverityChange}
                        value={severity}
                        placeholder="Select Severity"
                    />
                </TableCell>
                <TableCell>
                    <Dropdown
                        clearable
                        options={spOptions}
                        selection
                        onChange={this.handleProbabailityChange}
                        value={probabaility}
                        placeholder="Select Probabaility"
                    />
                </TableCell>
                <TableCell className={`${rating}`}>{risk_rating}</TableCell>
                <TableCell>
                    <Dropdown
                        clearable
                        options={riskActionOptions}
                        selection
                        onChange={this.handleRiskActionChange}
                        value={risk_action}
                        placeholder="Select Risk Action"
                    />
                </TableCell>
                <TableCell>

                    <div>
                        <IconButton
                            aria-label="more"
                            aria-controls="issue-options"
                            aria-haspopup="true"
                            onClick={this.handleOpenOptions}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="issue-options"
                            anchorEl={open_options}
                            keepMounted
                            open={Boolean(open_options)}
                            onClose={this.handleCloseOptions}
                            PaperProps={{
                                style: {
                                    maxHeight: 48 * 4.5,
                                    width: '20ch',
                                },
                            }}
                        >
                            <MenuItem onClick={this.handleCreatePOAM}>
                                <InsertInvitationIcon /> Assign POAM
                            </MenuItem>
                            <MenuItem onClick={this.handleEdit}>
                                <EditIcon /> Edit
                            </MenuItem>
                            <MenuItem onClick={this.handleDelete}>
                                <DeleteIcon /> Delete
                            </MenuItem>
                        </Menu>
                    </div>

                    {
                        deleteQuestion ? <Modal
                            open={deleteQuestion}
                            onClose={() => { this.setState({ deleteQuestion: false }) }}
                            basic
                            size='small'
                            className="semtic__modal"
                        >
                            <Header icon='trash' content='Delete Issue' />
                            <Modal.Content className="semtic__modal__content">
                                <h3>Are you sure?</h3>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color='grey' onClick={() => { this.setState({ deleteQuestion: false }) }} inverted>
                                    Cancel
                                </Button>

                                <Button color='red' onClick={this.deleteCustomQuestion} inverted>
                                    <Icon name='checkmark' /> Yes, Sure.
                                </Button>
                            </Modal.Actions>
                        </Modal> : ''
                    }

                </TableCell>
            </TableRow>
        );
    }
}

export default RGRowCustom;
