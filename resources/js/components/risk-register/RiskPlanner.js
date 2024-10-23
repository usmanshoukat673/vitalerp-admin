import React, { Component } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RPSubHeaderRow from './RPSubHeaderRow';
import RPRow from './RPRow';
import RPRowCustom from './RPRowCustom';
import RiskTab from './RiskTab';
import { connect } from 'react-redux';
import { closeSubLeftNav } from '../../actions';
import axiosInstance from '../../api/api';

class RiskPlanner extends Component {

    state = {
        errors: [],
        loading: false,
        questions: [],
        custom_questions: [],
    }
    componentDidMount() {
        this.props.closeSubLeftNav();
        const { company } = this.props;
        this.setState({ loading: true });
        axiosInstance.get(`/api/user/riskregister/poam/questions/${company.id}`).then(e => {
            this.setState({ loading: false, questions: e.data.questions, custom_questions: e.data.custom_questions });
        }).catch(err => {
            if (err.response.status === 500) {
                this.setState({ errors: [], loading: false });
            }
            if (err.response.status === 401) {
                this.setState({ errors: [], loading: false });
                this.props.history.push('/login');
            }
        });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { leftnav, company, token } = this.props;
        const { questions, custom_questions } = this.state;

        return (

            <div className={leftnav.open_sub ? 'sub__slide__menu_opened' : ''} >
                <RiskTab company={company} addCustomQuestion={false} />

                <div className="RiskRegister__body">

                    <TableContainer component={Paper}>
                        <Table className="RiskRegister__table" aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Plan</TableCell>
                                    <TableCell>Start Date</TableCell>
                                    <TableCell>Planned Completion Date</TableCell>
                                    <TableCell>Actual Completion Date</TableCell>
                                    <TableCell>Resolution</TableCell>
                                    <TableCell>Artifact</TableCell>
                                    <TableCell>Severity</TableCell>
                                    <TableCell>Probabaility</TableCell>
                                    <TableCell>Risk Rating</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <RPSubHeaderRow />

                                {
                                    _.map(questions, question => {
                                        return <RPRow

                                            key={question.id}
                                            question={question}
                                            token={token}

                                        />;
                                    })

                                }

                                {
                                    _.map(custom_questions, question => {
                                        return <RPRowCustom

                                            key={question.id}
                                            question={question}
                                            token={token}
                                            deleted={this.handleDeleteCst}
                                            edit={this.handleEdit}

                                        />;
                                    })
                                }


                            </TableBody>
                        </Table>
                    </TableContainer>

                </div>

            </div>
        );
    }
}

export default connect(null, { closeSubLeftNav })(RiskPlanner);
