import React, { Component } from 'react';
import { Form, Checkbox, Dropdown, Modal, Button, List, Popup, Image, Input } from 'semantic-ui-react';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { IoIosInformationCircleOutline } from "react-icons/io";
import WorkingControlDocs from '../WorkingControlDocs';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import OpenDocument from '../../file-manager/Document/OpenDocument';
import OpenPDFDocument from '../../file-manager/Document/OpenPDFDocument';
import OpenMSDocs from '../../file-manager/Document/OpenMSDocs';
import AssignDocToControls from '../../file-manager/Document/AssignDocToControls';
import LinkArtifact from '../LinkArtifact';
import CreateArtifact from '../CreateArtifact';
import UploadArtifact from '../UploadArtifact';
import AessmentIssue from '../AessmentIssue';
import ApplicabityConsent from './ApplicabityConsent';
import { withRouter } from 'react-router-dom';
import { setSelectedTask, setBackPageURL } from '../../../actions';
import { connect } from 'react-redux';
import './ChildSection.scss';
import './CCCControlOperations.scss';
import axiosInstance from '../../../api/api';

class CCCControlOperations extends Component {
    state = {
        loading: false,
        errors: [],
        control_status: '',
        applicable: '',
        opening_document: false,
        open_pdf_document: false,
        open_ms_document: false,
        open_document: false,
        assign: false,
        active_document: {},
        link_artifact: false,
        upload_artifact: false,
        new_artifact: false,
        mid_section: 'artifacts',
        justification: '',
        control_conset: false
    }

    componentDidMount() {
        const { control } = this.props;

        this.setState({
            // severity: (control.assessment_question && control.assessment_question.severity) != null ? control.assessment_question.severity : '',
            // probabaility: (control.assessment_question && control.assessment_question.probabaility) != null ? control.assessment_question.probabaility : '',
            // risk_rating: (control.assessment_question && control.assessment_question.risk_rating) != null ? control.assessment_question.risk_rating : '',
            // risk_action: (control.assessment_question && control.assessment_question.risk_action) != null ? control.assessment_question.risk_action : '',
            // risk_owner_id: (control.assessment_question && control.assessment_question.risk_owner_id) != null ? control.assessment_question.risk_owner_id : '',
            control_status: (control.properties && control.properties.status) != null ? control.properties.status : '',
            applicable: (control.properties && control.properties.applicable) != null ? control.properties.applicable : '',
            justification: (control.properties && control.properties.justification) != null ? control.properties.justification : '',
        });
    }

    handlerCustomInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? true : false;
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(event.target.name)) {
            delete errors[0][event.target.name];
            this.setState({ errors: errors });
        }
    };

    displayInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    handleJustificationBlur = event => {
        this.props.controlStatusChange('justification', event.target.value, this.props.control);
    }

    handleControlStatusChange = (event, { value }) => {

        this.setState({ control_status: value });

        this.props.controlStatusChange('status', value, this.props.control);

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(control_status)) {
            delete errors[0][control_status];
            this.setState({ errors: errors });
        }
    };

    toggleApplicability = () => {
        if (this.state.applicable == 'Applicable') {
            this.setState({ control_conset: true });
        }
        else {
            this.setState((prevState) => {
                return ({ applicable: (prevState.applicable == 'Applicable' ? 'Not Applicable' : 'Applicable') });
            }, () => {
                this.props.controlStatusChange('applicable', this.state.applicable, this.props.control);
                if (this.state.applicable === 'Not Applicable') {
                    this.setState({ control_status: 'Not Implemented' });
                    this.props.controlStatusChange('status', 'Not Implemented', this.props.control);
                }
            });
        }
    }


    keepControlAsIs = () => {
        this.setState({ control_conset: false });
    }

    setControlNA = () => {
        this.setState({ control_conset: false });
        this.setState((prevState) => {
            return ({ applicable: (prevState.applicable == 'Applicable' ? 'Not Applicable' : 'Applicable') });
        }, () => {
            this.props.controlStatusChange('applicable', this.state.applicable, this.props.control);
            if (this.state.applicable === 'Not Applicable') {
                this.setState({ control_status: 'Not Implemented' });
                this.props.controlStatusChange('status', 'Not Implemented', this.props.control);
            }
        });
    }

    // new functions
    openDocument = document => {
        this.setState({ open_document: true, active_document: document }, () => {
            this.setState({ opening_document: true });
        });
    };

    onDocumentOpend = () => {
        this.setState({ opening_document: false });
    }

    onCloseDocument = () => {
        this.setState({ open_document: false, active_document: {} });
    }

    openPDFDocument = document => {
        this.setState({ open_pdf_document: true, active_document: document }, () => {
            this.setState({ opening_document: true });
        });
    };

    onClosePDFDocument = () => {
        this.setState({ open_pdf_document: false, active_document: {} });
    }

    openMSDocument = document => {
        this.setState({ open_ms_document: true, active_document: document }, () => {
            this.setState({ opening_document: true });
        });
    };

    onCloseMSDocument = () => {
        this.setState({ open_ms_document: false, active_document: {} });
    }

    onSavedDocumentEdits = document => {
    };

    handleAssign = document => {
        this.setState({ assign: true, active_document: document });
    }

    handleAssignClose = () => { this.setState({ assign: false, active_document: {} }) }

    handleRenamed = document => {

        this.setState({ active_document: document });
        this.props.renamed(document, this.props.control.id);
    }

    handleDeleted = document => {
        const { control } = this.props;
        this.props.ctrdocremoved(document, this.props.control.id);
        // _.remove(control.artifacts, (doc) => {
        //     return doc.document_id === document.id;
        // });
    }

    handleLinkArtifactClose = () => this.setState({ link_artifact: false });

    handleLinkedArtifacts = (section_documents, artifacts) => {
        this.setState({ link_artifact: false });
        this.props.controlArtifactChange(artifacts, this.props.control);
        this.props.newSectionDocumentUploaded(section_documents);
    }

    handleArtifactCreated = (section_documents, artifacts) => {
        this.setState({ new_artifact: false });
        this.props.controlArtifactChange(artifacts, this.props.control);
        this.props.newSectionDocumentUploaded(section_documents);
    }

    handleNewArtifactClose = () => this.setState({ new_artifact: false });

    handleArtifactsUploaded = (section_documents, artifacts) => {
        this.setState({ upload_artifact: false });
        this.props.control.artifacts = artifacts;
        // this.props.controlChange(this.props.control);
        this.props.controlArtifactChange(artifacts, this.props.control);
        this.props.newSectionDocumentUploaded(section_documents);
    }

    handleUploadArtifactClose = () => this.setState({ upload_artifact: false });

    toggleMidSectionSpan = section => {
        if (this.state.mid_section === section) {
            this.setState({ mid_section: '' });
        }
        else {
            this.setState({ mid_section: section });
        }
    }

    listActionalbeItems = control => {

        let tasks = [];

        if (_.size(control.tasks) > 0) {
            _.forEach(control.tasks, t => {
                if (!_.isEmpty(t.task)) {
                    tasks.push(t);
                }

            })
        }

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
        const { company, history, setBackPageURL, setSelectedTask, section } = this.props;

        let url = `/${company.slug}/compliance/category/${section.slug}`;
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

        const { control_status, applicable, errors, loading,
            opening_document,
            open_pdf_document,
            open_ms_document,
            open_document,
            assign,
            active_document,
            link_artifact,
            upload_artifact,
            new_artifact,
            mid_section,
            justification,
            control_conset,

        } = this.state;

        const { open, control, company, token, standards, apps, users } = this.props;

        const statusOptions = [
            { key: 'Implemented', text: 'Implemented', value: 'Implemented' },
            { key: 'Partially Implemented', text: 'Partially Implemented', value: 'Partially Implemented' },
            { key: 'Not Implemented', text: 'Not Implemented', value: 'Not Implemented' }
        ];

        return (
            <React.Fragment>
                <Modal
                    className="semtic__modal cccc__modal"
                    open={open}
                    onClose={() => { }}
                    size="large"
                >

                    <Modal.Content className="cc_modal_container">
                        <div className="cccc__header">
                            <div className="__c__number">
                                {control.number}
                            </div>
                            <div className="__c__close">
                                <CloseIcon onClick={this.props.close} />
                            </div>
                        </div>

                        <div className="__c__name">
                            {control.name}
                        </div>

                        <div className="__c__description">
                            {control.description}
                        </div>

                        <div className="__c__divider"></div>

                        <div className="__c__tollbar">
                            <div className="__c__properties">
                                <div>{control.artifacts ? control.artifacts.length : 0}	Artifacts</div>
                                <span></span>
                                <div>{control.mapped ? control.mapped.length : 0} Mapped</div>
                            </div>
                            <div className="__c__rightsection">
                                <Form size="mini">
                                    <Form.Group widths="equal">
                                        <Form.Field className="__theapplicability">
                                            <div>Applicable</div>
                                            <div><Checkbox checked={applicable === 'Applicable'} onChange={this.toggleApplicability} toggle color="primary" /></div>
                                        </Form.Field>

                                        {applicable == 'Not Applicable' ?
                                            <Form.Field>
                                                <Input
                                                    fluid
                                                    placeholder='Control Justification'
                                                    name="justification"
                                                    onChange={this.handleChange}
                                                    onBlur={this.handleJustificationBlur}
                                                    value={justification}
                                                    className="justfication__box"
                                                />
                                                {this.displayInputError(errors, 'justification')}
                                            </Form.Field>
                                            :
                                            <Form.Field>
                                                <Dropdown
                                                    disabled={applicable == 'Not Applicable'}
                                                    clearable
                                                    options={statusOptions}
                                                    selection
                                                    onChange={this.handleControlStatusChange}
                                                    value={control_status}
                                                    placeholder="Select Control Status"
                                                    error={this.handlerCustomInputError(errors, 'control_status')}
                                                    name="control_status"
                                                />
                                            </Form.Field>
                                        }

                                    </Form.Group>
                                </Form>
                            </div>
                        </div>

                        <div className="__c__menubar">
                            <div onClick={() => { this.toggleMidSectionSpan('artifacts') }} className={mid_section === 'artifacts' ? '__cm__item __active' : '__cm__item'}>Documents</div>
                            <div onClick={() => { this.toggleMidSectionSpan('assessment') }} className={mid_section === 'assessment' ? '__cm__item __active' : '__cm__item'}>Assessment</div>
                            <div onClick={() => { this.toggleMidSectionSpan('assets') }} className={mid_section === 'assets' ? '__cm__item __active' : '__cm__item'}>Assets</div>
                            <div onClick={() => { this.toggleMidSectionSpan('issues') }} className={mid_section === 'issues' ? '__cm__item __active' : '__cm__item'}>Issues</div>
                            <div onClick={() => { this.toggleMidSectionSpan('mapped') }} className={mid_section === 'mapped' ? '__cm__item __active' : '__cm__item'}>Mapped Controls</div>
                            <div onClick={() => { this.toggleMidSectionSpan('tasks') }} className={mid_section === 'tasks' ? '__cm__item __active' : '__cm__item'}>Tasks</div>
                        </div>

                        {
                            mid_section === 'artifacts' ? <div className="__c__dyna__section __documents">

                                {
                                    _.isEmpty(control.artifacts) ? <div className="__not__found">
                                        No documents are present. Start by uploading or linking a document below.
                                    </div> :
                                        <div className="sd__documents">
                                            <TableContainer className="ControlsTable" component={Paper}>
                                                <Table size="small" aria-label="a dense table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell align="left">Name</TableCell>
                                                            <TableCell align="center">Options</TableCell>
                                                            <TableCell align="center">Size</TableCell>
                                                            <TableCell align="center">Type</TableCell>
                                                            <TableCell align="center">Modified</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            _.map(control.artifacts, art => {

                                                                return <WorkingControlDocs
                                                                    key={art.document_id}
                                                                    art={art}
                                                                    openDocument={this.openDocument}
                                                                    handleAssign={this.handleAssign}
                                                                    openPDFDocument={this.openPDFDocument}
                                                                    openMSDocument={this.openMSDocument}
                                                                    company={company}
                                                                    token={token}
                                                                    renamed={this.handleRenamed}
                                                                    deleted={this.handleDeleted}
                                                                />


                                                            })
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </div>
                                }



                                <div className="__docs__buttons">
                                    <Button className="__c_c_button" onClick={() => this.setState({ upload_artifact: true })}>Upload Document</Button>
                                    <Button className="__c_c_button" onClick={() => this.setState({ link_artifact: true })}>Link Document</Button>
                                    <div className="__cuttom_button" onClick={() => this.setState({ new_artifact: true })}>
                                        <AddIcon />
                                        New Document
                                    </div>
                                </div>
                            </div> : ''
                        }

                        {mid_section === 'assessment' ? <div className="__c__dyna__section __assessment">__assessment</div> : ''}
                        {mid_section === 'assets' ? <div className="__c__dyna__section __assets">

                            <List horizontal>
                                {
                                    _.map(apps, app => {
                                        return (<List.Item key={app.id} className="integration__item">
                                            <List.Content>
                                                <List.Header>
                                                    {app.integration.name}

                                                    <Popup
                                                        trigger={<IoIosInformationCircleOutline className="app__des__icon" />}
                                                        position='bottom center'
                                                        wide='very'
                                                        hoverable
                                                        className="app__popover"
                                                    >
                                                        <div>
                                                            <Image style={{ height: '22px', width: '22px', display: 'inline' }} size='mini' src={app.integration.icon} /> <b>{app.integration.name}</b>
                                                        </div>
                                                        <p>
                                                            {app.integration.description}
                                                        </p>
                                                    </Popup>

                                                </List.Header>

                                            </List.Content>
                                        </List.Item>);
                                    })
                                }
                            </List>

                        </div> : ''}
                        {mid_section === 'issues' ? <div className="__c__dyna__section __issues">
                            {
                                _.map(control.assessment_question, question => {
                                    return (!_.isEmpty(question.question) && question.answer == 'No' && question.question.required ? <AessmentIssue
                                        key={question.id}
                                        assessment_question={question}
                                        users={users}
                                        token={token}
                                        company={company}
                                    /> : '')
                                })
                            }
                        </div> : ''}
                        {mid_section === 'mapped' ? <div className="__c__dyna__section __mapped">

                            {
                                _.map(control.mapped, ctrl => (
                                    <p key={ctrl.control.id}>
                                        {`${!_.isEmpty(ctrl.control.number) ? ctrl.control.number : ''} ${ctrl.control.name}`} {!_.isEmpty(ctrl.control.standard) ? ` (${ctrl.control.standard.name})` : ''}
                                    </p>
                                ))
                            }

                        </div> : ''}
                        {mid_section === 'tasks' ? <div className="__c__dyna__section __tasks">
                            {
                                this.listActionalbeItems(control)
                            }
                        </div> : ''}

                        {
                            !_.isEmpty(control.tags) ? <div className="__c__tags">{
                                _.map(control.tags, t => {
                                    return (
                                        <span key={t.tag_id} className="__ctag">{t.tag.name}</span>

                                    );
                                })
                            }</div> : ''
                        }

                        {
                            link_artifact ? <LinkArtifact
                                control={control}
                                open={link_artifact}
                                close={this.handleLinkArtifactClose}
                                linked={this.handleLinkedArtifacts}
                                token={token}
                                company={company} /> : ''
                        }

                        {
                            new_artifact ? <CreateArtifact
                                created={this.handleArtifactCreated}
                                control={control}
                                open={new_artifact}
                                closed={this.handleNewArtifactClose}
                                token={token}
                                company={company} /> : ''
                        }

                        {
                            upload_artifact ? <UploadArtifact
                                uploaded={this.handleArtifactsUploaded}
                                control={control}
                                open={upload_artifact}
                                close={this.handleUploadArtifactClose}
                                token={token}
                                company={company} /> : ''
                        }

                        {open_document ? <OpenDocument open={open_document} renamed={this.handleRenamed} standards={standards} document={active_document} token={token} company={company} cancle={this.onCloseDocument} opened={this.onDocumentOpend} saved={this.onSavedDocumentEdits} /> : ''}
                        {open_pdf_document ? <OpenPDFDocument renamed={this.handleRenamed} standards={standards} open={open_pdf_document} document={active_document} token={token} company={company} cancle={this.onClosePDFDocument} /> : ''}
                        {open_ms_document ? <OpenMSDocs open={open_ms_document} document={active_document} token={token} company={company} cancle={this.onCloseMSDocument} /> : ''}
                        {assign ? <AssignDocToControls document={active_document} token={token} company={company} standards={standards} onclose={this.handleAssignClose} /> : ''}
                        <ApplicabityConsent control_conset={control_conset} keepControlAsIs={this.keepControlAsIs} setControlNA={this.setControlNA} />
                    </Modal.Content>

                </Modal>


            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    section: state.leftnav.section,
});

export default withRouter(connect(mapStateToProps, { setSelectedTask, setBackPageURL })(CCCControlOperations));
