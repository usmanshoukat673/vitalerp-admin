import React, { Component } from 'react';
import { Button as SemButton, List, Modal, Popup, Segment, Header, Grid, Pagination } from 'semantic-ui-react'
import _ from 'lodash';
import { IoIosInformationCircleOutline } from "react-icons/io";
import YesNo from './questionaire/YesNo';
import FillIn from './questionaire/FillIn';
import SelectDoc from './questionaire/SelectDoc';
// The stepper
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

import './Questions.scss';
import axiosInstance from '../../api/api';

class Questions extends Component {

    state = {
        open: true,
        loading: false,
        questions: [],
        documents: [],
        errors: [],
        activeStep: 0
    }

    componentDidMount() {

        this.loadQuestion();
    }

    loadQuestion = () => {

        this.setState({ errors: [], loading: true });

        const {controls } = this.props;

        const filtered_controls = _.map(controls, ctrl => (ctrl.id));

        axiosInstance.post(`/api/user/compliance/questions`, {
            controls: filtered_controls,
        })
            .then(e => {

                this.setState({
                    errors: [],
                    loading: false,
                    questions: e.data.questions,
                    documents: e.data.documents
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

    handleClose = () => this.props.closeQuestions();

    generateQuestion = (question, control) => {

        const { apps, token } = this.props;
        const { documents, questions, activeStep } = this.state;

        if (question.question_type == 'yes_no') {
            return <YesNo all_assets={apps} activeStep={activeStep} questions_length={questions.length} handleNext={this.handleNext} handleBack={this.handleBack} key={question.id} token={token} question={question} control={control} />
        }
        else if (question.question_type == 'fill_in_blank') {
            return <FillIn all_assets={apps} activeStep={activeStep} questions_length={questions.length} handleNext={this.handleNext} handleBack={this.handleBack} key={question.id} token={token} question={question} control={control} />
        }
        else if (question.question_type == 'select_doc') {
            return <SelectDoc all_assets={apps} documents={documents} activeStep={activeStep} questions_length={questions.length} handleNext={this.handleNext} handleBack={this.handleBack} token={token} key={question.id} question={question} control={control} />
        }
        else {
            return (
                <div key={question.id}>
                    <p>{question.question}</p>
                    <Popup
                        trigger={<IoIosInformationCircleOutline className="control__des__icon" />}
                        position='bottom center'
                        wide='very'
                        hoverable
                        className="cotrol__popover"
                    >
                        <p>
                            {question.description}
                        </p>
                    </Popup>
                </div>);
        }
    }

    handleNext = () => {
        this.setState((prevState) => {
            return ({ activeStep: prevState.activeStep + 1 });
        });
    };

    handleBack = () => {
        this.setState((prevState) => {
            return ({ activeStep: prevState.activeStep - 1 });
        });
    };

    handleReset = () => {
        this.setState({ activeStep: 0 });
    };

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { open, questions, loading, errors, activeStep } = this.state;
        const { apps } = this.props;

        const square = { width: 150, height: 150 }

        return (
            <React.Fragment>
                <Modal
                    className="semtic__modal"
                    size="large"
                    onClose={() => { }}
                    open={open}
                >
                    <Modal.Header style={{ display: 'flex', justifyContent: 'space-between' }}>Questionnaire

                        <SemButton size="tiny" color='black' onClick={this.handleClose}>
                            X
                        </SemButton>

                    </Modal.Header>
                    <Modal.Content>

                        {/*
                        <div>

                            <Grid centered columns={4}>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Segment circular style={square} inverted color="blue">
                                            <Header as='h3'>
                                                Questions
                                            <Header.Subheader>{questions.length}</Header.Subheader>
                                            </Header>
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Segment circular style={square} inverted color="teal">
                                            <Header as='h3'>
                                                Assets
                                            <Header.Subheader>{apps.length}</Header.Subheader>
                                            </Header>
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>



                        </div>*/}

                        {/* New Material Stepper */}

                        <div style={{ width: '100%' }}>
                            <Stepper activeStep={activeStep} orientation="vertical">
                                {_.map(questions, (que, index) => (
                                    <Step key={que.id}>
                                        <StepLabel>

                                            {que.question.name}

                                            <Popup
                                                className="__help__model"
                                                trigger={<IoIosInformationCircleOutline className="__help__icon" />}
                                                position='bottom center'
                                                wide='very'
                                                hoverable
                                            >
                                                {que.control.description}
                                            </Popup>
                                        </StepLabel>
                                        <StepContent>
                                            {this.generateQuestion(que, que.control)}
                                        </StepContent>
                                    </Step>
                                ))}
                            </Stepper>
                            {activeStep === questions.length && (
                                <Paper square elevation={0} style={{ padding: '24px' }}>
                                    <Typography>All steps completed - you&apos;re finished</Typography>
                                    <Button onClick={this.handleReset} style={{ marginTop: '8px', marginRight: '8px' }}>
                                        Reset
                                    </Button>
                                </Paper>
                            )}
                        </div>

                    </Modal.Content>

                </Modal>
            </React.Fragment>
        );
    }
}

export default Questions;
