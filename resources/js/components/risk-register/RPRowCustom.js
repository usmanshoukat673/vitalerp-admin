import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import _ from 'lodash';
import DatePicker from 'react-date-picker';
import './RPRowCustom.scss';
import 'react-date-picker/dist/DatePicker.css';
import './CustomCalender.scss';

class RPRowCustom extends Component {

    state = {
        errors: [],
        loading: false,
        risk_rating: '',
        severity: '',
        probabaility: '',
        start_date: '',
        planned_completion_date: '',
        actual_completion_date: '',
    }

    componentDidMount() {
        const { question } = this.props;

        this.setState({
            severity: (question.pseverity != null ? question.pseverity : ''),
            probabaility: (question.pprobabaility != null ? question.pprobabaility : ''),
            plan: (question.plan != null ? question.plan : ''),
            start_date: (question.start_date != null ? new Date(question.start_date) : ''),
            planned_completion_date: (question.completion_date != null ? new Date(question.completion_date) : ''),
            actual_completion_date: (question.actual_compl_date != null ? new Date(question.actual_compl_date) : ''),
        });
    };

    handleSeverityChange = (event, { value }) => {

        this.setState({ severity: value }, this.calculateRisk);

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(severity)) {
            delete errors[0][severity];
            this.setState({ errors: errors });
        }

    };

    handleProbabailityChange = (event, { value }) => {

        this.setState({ probabaility: value }, this.calculateRisk);

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(probabaility)) {
            delete errors[0][probabaility];
            this.setState({ errors: errors });
        }
    };

    calculateRisk = () => {
        const { severity, probabaility } = this.state;

        if (severity > 0 && probabaility > 0) {
            this.setState({ risk_rating: severity * probabaility });
        }
        else {
            this.setState({ risk_rating: '' });
        }
    }

    onStartDateChange = start_date => {
        this.setState({ start_date });
    }

    onPlannedCompChange = planned_completion_date => {
        this.setState({ planned_completion_date });
    }

    onActualCompChange = actual_completion_date => {
        this.setState({ actual_completion_date });
    }

    render() {

        const { risk_rating, plan, start_date, planned_completion_date, actual_completion_date } = this.state;
        const { question } = this.props;

        const spOptions = [
            { key: 1, text: '1', value: 1 },
            { key: 2, text: '2', value: 2 },
            { key: 3, text: '3', value: 3 },
        ];


        return (
            <TableRow>
                <TableCell>
                    {plan}
                </TableCell>
                <TableCell>
                    <DatePicker
                        onChange={this.onStartDateChange}
                        value={start_date}
                    />
                </TableCell>
                <TableCell>
                    <DatePicker
                        onChange={this.onPlannedCompChange}
                        value={planned_completion_date}
                    />
                </TableCell>
                <TableCell>
                    <DatePicker
                        onChange={this.onActualCompChange}
                        value={actual_completion_date}
                    />
                </TableCell>
                <TableCell>
                    {question.resolution}
                </TableCell>
                <TableCell>
                    {question.artifact}
                </TableCell>
                <TableCell>
                    <Dropdown
                        clearable
                        options={spOptions}
                        selection
                        onChange={this.handleSeverityChange}
                    />
                </TableCell>
                <TableCell>
                    <Dropdown
                        clearable
                        options={spOptions}
                        selection
                        onChange={this.handleProbabailityChange}
                    />
                </TableCell>
                <TableCell>{risk_rating}</TableCell>
            </TableRow>
        );
    }
}

export default RPRowCustom;
