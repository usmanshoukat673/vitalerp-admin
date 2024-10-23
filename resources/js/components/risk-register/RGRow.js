import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import _ from 'lodash';
import axiosInstance from '../../api/api';

class RGRow extends Component {

    state = {
        errors: [],
        loading: false,
        risk_action: '',
        risk_rating: '',
        severity: '',
        probabaility: '',
        risk_owner_id: '',
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
        const { token, question } = this.props;
        axiosInstance.post(`/api/user/riskregister/save/rr/properties`, {
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

    render() {

        const { risk_rating, severity, probabaility, risk_action, risk_owner_id } = this.state;
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


        return (

            <TableRow>
                <TableCell>
                    {`${question.standard.name.substring(0, 2)}${question.id}`}
                </TableCell>
                <TableCell>
                    {question.standard.name}
                </TableCell>
                <TableCell>{`${question.control.number} ${question.control.name}`}</TableCell>
                <TableCell>{question.question ? question.question.question : ''}</TableCell>
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
                <TableCell></TableCell>
            </TableRow>
        );
    }
}

export default RGRow;
