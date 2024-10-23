import React, { Component } from 'react';
import RGRow from './RGRow';
import RGRowCustom from './RGRowCustom';
import RGSubHeaderRow from './RGSubHeaderRow';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddCustomIssue from './AddCustomIssue';
import RiskTab from './RiskTab';
import _ from 'lodash';
import { connect } from 'react-redux';
import { closeSubLeftNav } from '../../actions';
import EditCustomIssue from './EditCustomIssue';
import NewPOAM from './NewPOAM';
import axiosInstance from '../../api/api';

class RiskRegister extends Component {

    state = {
        errors: [],
        loading: false,
        questions: [],
        custom_questions: [],
        users: [],
        add_rg: false,
        newpoam: false,
        edit_custom_que: false,
        eactive_question: {},
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
            const { token, company } = this.props;
            this.setState({ loading: true });
            axiosInstance.get(`/api/user/riskregister/questions/${company.id}`).then(e => {
                this.setState({ loading: false, questions: e.data.questions, users: e.data.users, custom_questions: e.data.custom_questions });
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
    }

    handleAddRG = () => {
        this.setState({ add_rg: true });
    }

    handleCloseRG = () => {
        this.setState({ add_rg: false });
    }

    handleAddIssue = issue => {
        let custom_questions = this.state.custom_questions;
        custom_questions.push(issue);
        this.setState({ custom_questions: custom_questions, add_rg: false });
    }

    handleDeleteCst = issue => {
        let custom_questions = this.state.custom_questions;

        _.remove(custom_questions, (que) => {
            return que.id === issue.id;
        });

        this.setState({ custom_questions: custom_questions });
    }

    handleEdit = question => {
        this.setState({ edit_custom_que: true, eactive_question: question });
    }

    handleUpdateIssue = issue => {
        let custom_questions = this.state.custom_questions;

        let index = _.findIndex(custom_questions, que => {
            return que.id === issue.id;
        });

        custom_questions[index] = issue;
        this.setState({ custom_questions: custom_questions, edit_custom_que: false, eactive_question: {} });
    }

    handleCloseEdit = () => {
        this.setState({ edit_custom_que: false, eactive_question: {} });
    }

    handleNewPoam = question => {
        this.setState({ newpoam: true, eactive_question: question });
    }

    handleClosePoam = () => {
        this.setState({ newpoam: false, eactive_question: {} });
    }

    handleCstPoamAdded = issue => {
        let custom_questions = this.state.custom_questions;

        let index = _.findIndex(custom_questions, que => {
            return que.id === issue.id;
        });

        custom_questions[index] = issue;
        this.setState({ newpoam: false, eactive_question: {}, custom_questions: custom_questions });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { leftnav, company, token } = this.props;
        const { questions, users, custom_questions, add_rg, eactive_question, edit_custom_que, newpoam } = this.state;

        return (

            <div className={leftnav.open_sub ? 'sub__slide__menu_opened' : ''} >
                <RiskTab company={company} addCustomQuestion={true} onAddRgClick={this.handleAddRG} />

                <div className="RiskRegister__body">

                    <TableContainer component={Paper}>
                        <Table className="RiskRegister__table" aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Standard</TableCell>
                                    <TableCell>Risk Control</TableCell>
                                    <TableCell>Question</TableCell>
                                    <TableCell>Risk Owner</TableCell>
                                    <TableCell>Severity</TableCell>
                                    <TableCell>Probabaility</TableCell>
                                    <TableCell>Risk Rating</TableCell>
                                    <TableCell>Risk Action</TableCell>
                                    <TableCell>Options</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <RGSubHeaderRow />
                                {
                                    _.map(questions, question => {
                                        return <RGRow

                                            key={question.id}
                                            question={question}
                                            token={token}
                                            users={users}


                                        />;
                                    })

                                }

                                {
                                    _.map(custom_questions, question => {
                                        return <RGRowCustom

                                            key={question.id}
                                            question={question}
                                            token={token}
                                            users={users}
                                            deleted={this.handleDeleteCst}
                                            edit={this.handleEdit}
                                            newpoam={this.handleNewPoam}

                                        />;
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <AddCustomIssue handleAddIssue={this.handleAddIssue} open={add_rg} users={users} close={this.handleCloseRG} token={token} company={company} />

                    {edit_custom_que ? <EditCustomIssue handleUpdateIssue={this.handleUpdateIssue} question={eactive_question} open={edit_custom_que} users={users} close={this.handleCloseEdit} token={token} company={company} /> : ''}

                    {newpoam ? <NewPOAM question={eactive_question} open={newpoam} added={this.handleCstPoamAdded} close={this.handleClosePoam} token={token} company={company} /> : ''}

                    {/**
                    <div className="RiskRegister__rows">
                        <RGHeaderRow />
                        <RGSubHeaderRow />
                        <RGRow />
                    </div>
                    */}
                </div>
            </div>
        );
    }
}

export default connect(null, { closeSubLeftNav })(RiskRegister);
