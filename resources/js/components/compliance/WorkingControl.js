import React, { Component } from 'react';
import Button from '@mui/material/Button';
import { Grid, Form, Dropdown, Segment, Label, Checkbox, List, Image, Popup, Icon } from 'semantic-ui-react';
import _ from 'lodash';
import LinkIcon from '@mui/icons-material/Link';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LinkArtifact from './LinkArtifact';
import UploadArtifact from './UploadArtifact';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import IconButton from '@mui/material/IconButton';
import AessmentQuestion from './AessmentQuestion';
import './WorkingControl.scss';
import AessmentIssue from './AessmentIssue';
import { IoIosInformationCircleOutline } from "react-icons/io";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CreateArtifact from './CreateArtifact';
import OpenDocument from '../file-manager/Document/OpenDocument';
import OpenPDFDocument from '../file-manager/Document/OpenPDFDocument';
import OpenMSDocs from '../file-manager/Document/OpenMSDocs';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import showTZDate from '../../utils/showTZDate';
import prettyBytes from 'pretty-bytes';
import AssignDocToControls from '../file-manager/Document/AssignDocToControls';
import WorkingControlDocs from './WorkingControlDocs';
import axiosInstance from '../../api/api';

class WorkingControl extends Component {

    state = {
        loading: false,
        errors: [],
        control_status: '',
        risk_action: '',
        risk_rating: '',
        severity: '',
        probabaility: '',
        risk_owner_id: '',
        link_artifact: false,
        upload_artifact: false,
        new_artifact: false,
        applicable: '',
        mid_section: 'artifacts',
        opening_document: false,
        open_pdf_document: false,
        open_ms_document: false,
        open_document: false,
        assign: false,
        active_document: {}
    }

    componentDidMount() {
        const { control } = this.props;

        this.setState({
            severity: (control.assessment_question && control.assessment_question.severity) != null ? control.assessment_question.severity : '',
            probabaility: (control.assessment_question && control.assessment_question.probabaility) != null ? control.assessment_question.probabaility : '',
            risk_rating: (control.assessment_question && control.assessment_question.risk_rating) != null ? control.assessment_question.risk_rating : '',
            risk_action: (control.assessment_question && control.assessment_question.risk_action) != null ? control.assessment_question.risk_action : '',
            risk_owner_id: (control.assessment_question && control.assessment_question.risk_owner_id) != null ? control.assessment_question.risk_owner_id : '',
            control_status: (control.properties && control.properties.status) != null ? control.properties.status : '',
            applicable: (control.properties && control.properties.applicable) != null ? control.properties.applicable : '',
        });
    }

    handlerInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'error' : '';
    }

    handlerCustomInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? true : false;
    }

    displayInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    handleControlStatusChange = (event, { value }) => {

        this.setState({ control_status: value });

        this.props.controlStatusChange('status', value, this.props.control);

        // this.props.control.properties.status = value;

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(control_status)) {
            delete errors[0][control_status];
            this.setState({ errors: errors });
        }
    };

    toggleApplicability = () => {
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

    handleSeverityChange = (event, { value }) => {

        this.setState({ severity: value }, this.calculateRisk);

        this.props.control.assessment_question.severity = value;
        this.saveProperties('severity', value);

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(severity)) {
            delete errors[0][severity];
            this.setState({ errors: errors });
        }
    };

    saveProperties = (property, value) => {
        const { control } = this.props;
        axiosInstance.post(`/api/user/riskregister/save/rr/properties`, {
            id: control.assessment_question.id,
            property: property,
            value: value
        }).then(e => {
            this.props.controlChange(control);
        }).catch(err => {
            if (err.response.status === 500 || err.response.status === 401) {
                this.setState({ errors: [], loading: false });
            }
    
            if (err.response.status === 422) {

                const errors = err.response.data.errors;

                this.setState({ errors: this.state.errors.concat(errors), loading: false });

            }
        });
    }

    handleProbabailityChange = (event, { value }) => {

        this.setState({ probabaility: value }, this.calculateRisk);

        this.props.control.assessment_question.probabaility = value;
        this.saveProperties('probabaility', value);

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(probabaility)) {
            delete errors[0][probabaility];
            this.setState({ errors: errors });
        }
    };

    handleRiskActionChange = (event, { value }) => {

        this.setState({ risk_action: value });

        this.props.control.assessment_question.risk_action = value;
        this.saveProperties('risk_action', value);

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(risk_action)) {
            delete errors[0][risk_action];
            this.setState({ errors: errors });
        }
    };

    handleRiskOwnerChange = (event, { value }) => {

        this.setState({ risk_owner_id: value });

        this.props.control.assessment_question.risk_owner_id = value;

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
            this.props.control.assessment_question.risk_rating = severity * probabaility;
            this.saveProperties('risk_rating', severity * probabaility);
        }
        else {
            this.setState({ risk_rating: '' });
            this.props.control.assessment_question.risk_rating = '';
            this.saveProperties('risk_rating', '');
        }
    }

    handleLinkArtifactClose = () => this.setState({ link_artifact: false });

    handleUploadArtifactClose = () => this.setState({ upload_artifact: false });

    handleArtifactsUploaded = (section_documents, artifacts) => {
        this.setState({ upload_artifact: false });
        this.props.control.artifacts = artifacts;
        // this.props.controlChange(this.props.control);
        this.props.controlArtifactChange(artifacts, this.props.control);
        this.props.newSectionDocumentUploaded(section_documents);
    }

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

    toggleMidSection = section => {
        this.setState({ mid_section: section });
    }

    toggleMidSectionSpan = section => {
        if (this.state.mid_section === section) {
            this.setState({ mid_section: '' });
        }
        else {
            this.setState({ mid_section: section });
        }
    }

    controlQuestionChange = question => {
        const { control } = this.props;
        let index = _.findIndex(control.assessment_question, que => {
            return que.id === question.id;
        });
        this.props.control.assessment_question[index] = question;
        this.props.controlChange(this.props.control);
    }

    handleNewArtifactClose = () => this.setState({ new_artifact: false });

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

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

    render() {

        const { control_status,
            loading,
            errors,
            risk_rating,
            severity,
            probabaility,
            risk_action,
            risk_owner_id,
            link_artifact,
            new_artifact,
            upload_artifact,
            applicable,
            mid_section,
            open_document,
            active_document,
            open_pdf_document,
            open_ms_document,
            assign
        } = this.state;
        const { control, users, token, company, apps, standard, standards } = this.props;


        const statusOptions = [
            { key: 'Implemented', text: 'Implemented', value: 'Implemented' },
            { key: 'Partially Implemented', text: 'Partially Implemented', value: 'Partially Implemented' },
            { key: 'Not Implemented', text: 'Not Implemented', value: 'Not Implemented' }
        ];

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

        return (
            <Grid.Column name={`working__control__${control.id}`} className="working__control_column">
                <Segment className="working__control">

                    <div className="working__control__header">
                        <div className="control__name">
                            {
                                `${(!_.isEmpty(control.number) ? control.number : '')} ${control.name}`
                            }
                        </div>
                        <div className="sub__properties">
                            <Form size="mini">
                                <Form.Field>
                                    <div>Applicable</div>
                                    <div><Checkbox checked={applicable === 'Applicable'} onChange={this.toggleApplicability} slider color="primary" /></div>
                                </Form.Field>
                            </Form>
                        </div>
                        <div className="sub__properties">
                            <Form size="mini">
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
                            </Form>
                        </div>

                        <div className="sub__properties maturity__level">
                            <div>Maturity Level</div>
                            <div>
                                {
                                    standard.standard.maturity_levels ? (control.maturity_level ? control.maturity_level.name : '') : 'N/A'
                                }
                            </div>
                        </div>
                    </div>

                    <div className="working__control__description">
                        {control.description && <p>{control.description}</p>}
                    </div>

                    <div className="working__control__mid">
                        <div className={mid_section === 'artifacts' ? 'selected' : ''}>
                            <span onClick={() => { this.toggleMidSectionSpan('artifacts') }}>DOCUMENTS</span>
                            {
                                mid_section === 'artifacts' ?

                                    <IconButton onClick={() => { this.toggleMidSection('') }} component="span">
                                        <ExpandLessIcon />
                                    </IconButton> :

                                    <IconButton onClick={() => { this.toggleMidSection('artifacts') }} component="span">
                                        <ExpandMoreIcon />
                                    </IconButton>
                            }


                        </div>
                        <div className={mid_section === 'assessment' ? 'selected' : ''}>
                            <span onClick={() => { this.toggleMidSectionSpan('assessment') }}>ASSESSMENT</span>
                            {
                                mid_section === 'assessment' ?

                                    <IconButton onClick={() => { this.toggleMidSection('') }} component="span">
                                        <ExpandLessIcon />
                                    </IconButton> :

                                    <IconButton onClick={() => { this.toggleMidSection('assessment') }} component="span">
                                        <ExpandMoreIcon />
                                    </IconButton>
                            }

                        </div>
                        <div className={mid_section === 'assets' ? 'selected' : ''}>
                            <span onClick={() => { this.toggleMidSectionSpan('assets') }}>ASSETS</span>
                            {
                                mid_section === 'assets' ?

                                    <IconButton onClick={() => { this.toggleMidSection('') }} component="span">
                                        <ExpandLessIcon />
                                    </IconButton> :

                                    <IconButton onClick={() => { this.toggleMidSection('assets') }} component="span">
                                        <ExpandMoreIcon />
                                    </IconButton>
                            }
                        </div>
                        <div className={mid_section === 'issues' ? 'selected' : ''}>
                            <span onClick={() => { this.toggleMidSectionSpan('issues') }}>ISSUES</span>
                            {
                                mid_section === 'issues' ?

                                    <IconButton onClick={() => { this.toggleMidSection('') }} component="span">
                                        <ExpandLessIcon />
                                    </IconButton> :

                                    <IconButton onClick={() => { this.toggleMidSection('issues') }} component="span">
                                        <ExpandMoreIcon />
                                    </IconButton>
                            }
                        </div>

                        <div className={mid_section === 'mapped' ? 'selected' : ''}>
                            <span onClick={() => { this.toggleMidSectionSpan('mapped') }}>MAPPED CONTROLS</span> {
                                mid_section === 'mapped' ?

                                    <IconButton onClick={() => { this.toggleMidSection('') }} component="span">
                                        <ExpandLessIcon />
                                    </IconButton> :

                                    <IconButton onClick={() => { this.toggleMidSection('mapped') }} component="span">
                                        <ExpandMoreIcon />
                                    </IconButton>
                            }
                        </div>
                        <div className={mid_section === 'tasks' ? 'selected' : ''}>
                            <span onClick={() => { this.toggleMidSectionSpan('tasks') }}>TASKS</span>  {
                                mid_section === 'tasks' ?

                                    <IconButton onClick={() => { this.toggleMidSection('') }} component="span">
                                        <ExpandLessIcon />
                                    </IconButton> :

                                    <IconButton onClick={() => { this.toggleMidSection('tasks') }} component="span">
                                        <ExpandMoreIcon />
                                    </IconButton>
                            }
                        </div>
                    </div>

                    {
                        mid_section === 'assessment' ?

                            <div className="working__control__mid__section">
                                {
                                    _.map(control.assessment_question, question => (
                                        <AessmentQuestion
                                            key={question.id}
                                            assessment_question={question}
                                            users={users} token={token}
                                            company={company}
                                            controlQuestionChange={this.controlQuestionChange}
                                            control={control}
                                            uploaded={this.handleArtifactsUploaded}
                                        />))
                                }
                            </div> : ''
                    }

                    {
                        mid_section === 'assets' ?

                            <div className="working__control__mid__section">
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
                            </div> : ''
                    }

                    {
                        mid_section === 'issues' ?

                            <div className="working__control__mid__section">
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
                            </div> : ''
                    }

                    {
                        mid_section === 'artifacts' ?

                            <div className="working__control__mid__section">

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

                                                        /**
                                                         *
                                                          if (art.document.type === 'document') {
                                                             return (<TableRow key={art.document_id}>
                                                                 <TableCell component="th" scope="row" align="left">
                                                                     <div style={{ cursor: 'auto!important' }} className="sd__document" onClick={() => { this.openDocument(art.document) }}>
                                                                         <Icon name="file" />
                                                                         <div className="doc__name">{
                                                                             _.truncate(art.document.name, {
                                                                                 'length': 30,
                                                                                 'separator': ' '
                                                                             })
                                                                         }</div>
                                                                     </div>
                                                                 </TableCell>
                                                                 <TableCell align="center">
                                                                     <Popup content='Assign Controls' position='top center' trigger={<IconButton size="small" onClick={() => { this.handleAssign(art.document) }}>
                                                                         <MdAssignmentTurnedIn />
                                                                     </IconButton>} />
                                                                 </TableCell>
                                                                 <TableCell align="center"><span>{art.document.size ? prettyBytes(art.document.size) : ''}</span></TableCell>
                                                                 <TableCell align="center">Digital</TableCell>
                                                                 <TableCell align="center">{showTZDate(art.document.updated_at, company.timezone)}</TableCell>

                                                             </TableRow>);
                                                         }
                                                         else if (art.document.type === 'file') {

                                                             if (art.document.ext === 'pdf') {
                                                                 return (<TableRow key={art.document_id}>
                                                                     <TableCell component="th" scope="row" align="left">
                                                                         <div className="sd__document" style={{ cursor: 'auto!important' }} onClick={() => { this.openPDFDocument(art.document) }}>
                                                                             <Image style={{ height: '18px' }} src={`/images/icons/${art.document.ext}.png`} />
                                                                             <div className="doc__name">{
                                                                                 _.truncate(art.document.name, {
                                                                                     'length': 30,
                                                                                     'separator': ' '
                                                                                 })
                                                                             }</div>
                                                                         </div>
                                                                     </TableCell>
                                                                     <TableCell align="center">
                                                                         <Popup content='Assign Controls' position='top center' trigger={<IconButton size="small" onClick={() => { this.handleAssign(art.document) }}>
                                                                             <MdAssignmentTurnedIn />
                                                                         </IconButton>} />
                                                                     </TableCell>
                                                                     <TableCell align="center"><span>{art.document.size ? prettyBytes(art.document.size) : ''}</span></TableCell>
                                                                     <TableCell align="center">File</TableCell>
                                                                     <TableCell align="center">{showTZDate(art.document.updated_at, company.timezone)}</TableCell>

                                                                 </TableRow>);
                                                             }


                                                             let msFiles = ['doc', 'docx', 'pptx', 'xlsx', 'xls', 'ppt'];

                                                             if (msFiles.includes(art.document.ext)) {
                                                                 return (<TableRow key={art.document_id}>
                                                                     <TableCell component="th" scope="row" align="left">
                                                                         <div className="sd__document" style={{ cursor: 'auto!important' }} onClick={() => { this.openMSDocument(art.document) }}>
                                                                             <Image style={{ height: '18px' }} src={`/images/icons/${art.document.ext}.png`} />
                                                                             <div className="doc__name">{
                                                                                 _.truncate(art.document.name, {
                                                                                     'length': 30,
                                                                                     'separator': ' '
                                                                                 })
                                                                             }</div>
                                                                         </div>
                                                                     </TableCell>
                                                                     <TableCell align="center">
                                                                         <Popup content='Assign Controls' position='top center' trigger={<IconButton size="small" onClick={() => { this.handleAssign(art.document) }}>
                                                                             <MdAssignmentTurnedIn />
                                                                         </IconButton>} />
                                                                     </TableCell>
                                                                     <TableCell align="center"><span>{art.document.size ? prettyBytes(art.document.size) : ''}</span></TableCell>
                                                                     <TableCell align="center">File</TableCell>
                                                                     <TableCell align="center">{showTZDate(art.document.updated_at, company.timezone)}</TableCell>

                                                                 </TableRow>);
                                                             }

                                                             return (<TableRow key={art.document_id}>
                                                                 <TableCell component="th" scope="row" align="left">
                                                                     <div className="sd__document">
                                                                         <Image style={{ height: '18px' }} src={`/images/icons/${art.document.ext}.png`} />
                                                                         <div className="doc__name">{
                                                                             _.truncate(art.document.name, {
                                                                                 'length': 30,
                                                                                 'separator': ' '
                                                                             })
                                                                         }</div>
                                                                     </div>
                                                                 </TableCell>
                                                                 <TableCell align="center">
                                                                     <Popup content='Assign Controls' position='top center' trigger={<IconButton size="small" onClick={() => { this.handleAssign(art.document) }}>
                                                                         <MdAssignmentTurnedIn />
                                                                     </IconButton>} />
                                                                 </TableCell>
                                                                 <TableCell align="center"><span>{art.document.size ? prettyBytes(art.document.size) : ''}</span></TableCell>
                                                                 <TableCell align="center">File</TableCell>
                                                                 <TableCell align="center">{showTZDate(art.document.updated_at, company.timezone)}</TableCell>

                                                             </TableRow>);

                                                         }
                                                         *
                                                         */
                                                    })
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>


                                {
                                    /*

                                    <Grid doubling columns={2} className="sd__documents">
                                    {

                                        _.map(control.artifacts, art => {

                                            if (!_.isEmpty(art.document)) {
                                                if (art.document.type === 'document') {
                                                    return (
                                                        <Grid.Column key={art.document_id} >
                                                            <div style={{ cursor: 'auto!important' }} className="sd__document" onClick={() => { this.openDocument(art.document) }}>
                                                                <Icon name="file" />
                                                                <div className="doc__name">{
                                                                    _.truncate(art.document.name, {
                                                                        'length': 30,
                                                                        'separator': ' '
                                                                    })
                                                                }</div>
                                                            </div>
                                                        </Grid.Column>
                                                    );
                                                }
                                                else if (art.document.type === 'file') {

                                                    if (art.document.ext === 'pdf') {
                                                        return (
                                                            <Grid.Column key={art.document_id} >
                                                                <div className="sd__document" style={{ cursor: 'auto!important' }} onClick={() => { this.openPDFDocument(art.document) }}>
                                                                    <Image style={{ height: '18px' }} src={`/images/icons/${art.document.ext}.png`} />
                                                                    <div className="doc__name">{
                                                                        _.truncate(art.document.name, {
                                                                            'length': 30,
                                                                            'separator': ' '
                                                                        })
                                                                    }</div>
                                                                </div>
                                                            </Grid.Column>
                                                        );
                                                    }

                                                    let msFiles = ['doc', 'docx', 'pptx', 'xlsx', 'xls', 'ppt'];

                                                    if (msFiles.includes(art.document.ext)) {
                                                        return (
                                                            <Grid.Column key={art.document_id} >
                                                                <div className="sd__document" style={{ cursor: 'auto!important' }} onClick={() => { this.openMSDocument(art.document) }}>
                                                                    <Image style={{ height: '18px' }} src={`/images/icons/${art.document.ext}.png`} />
                                                                    <div className="doc__name">{
                                                                        _.truncate(art.document.name, {
                                                                            'length': 30,
                                                                            'separator': ' '
                                                                        })
                                                                    }</div>
                                                                </div>
                                                            </Grid.Column>
                                                        );
                                                    }

                                                    return (
                                                        <Grid.Column key={art.document_id} >
                                                            <div className="sd__document">
                                                                <Image style={{ height: '18px' }} src={`/images/icons/${art.document.ext}.png`} />
                                                                <div className="doc__name">{
                                                                    _.truncate(art.document.name, {
                                                                        'length': 30,
                                                                        'separator': ' '
                                                                    })
                                                                }</div>
                                                            </div>
                                                        </Grid.Column>
                                                    );
                                                }
                                            }

                                        })
                                    }
                                </Grid>

                                    */
                                }



                                <div>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<LinkIcon />}
                                        className="artifact__buttons"
                                        onClick={() => this.setState({ link_artifact: true })}
                                        size="small"
                                    >
                                        Link Document
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="default"
                                        startIcon={<CloudUploadIcon />}
                                        className="artifact__buttons"
                                        onClick={() => this.setState({ upload_artifact: true })}
                                        size="small"
                                    >
                                        Upload Document
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="default"
                                        startIcon={<InsertDriveFileIcon />}
                                        className="artifact__buttons"
                                        onClick={() => this.setState({ new_artifact: true })}
                                        size="small"
                                    >
                                        New Document
                                    </Button>
                                </div>
                            </div> : ''
                    }
                    {
                        mid_section === 'mapped' ?

                            <div className="working__control__mid__section">
                                {
                                    _.map(control.mapped, ctrl => (
                                        <p key={ctrl.control.id}>
                                            {`${!_.isEmpty(ctrl.control.number) ? ctrl.control.number : ''} ${ctrl.control.name}`} {!_.isEmpty(ctrl.control.standard) ? ` (${ctrl.control.standard.name})` : ''}
                                        </p>
                                    ))
                                }
                            </div> : ''
                    }

                    {
                        mid_section === 'tasks' ?
                            <div className="working__control__mid__section">
                                TASKS
                            </div> : ''
                    }

                    {
                        /**
                         *

                    {control.name && <p><b>{control.number} {control.name}</b></p>}

                    {control.mapped && _.map(control.mapped, ctr => <p key={ctr.mapped_to} className="mapped__control">{ctr.control.number} {ctr.control.name}</p>)}

                    {control.maturity_level && <p>Maturity Level: {control.maturity_level.name}</p>}

                     <Form>
                        <Form.Field>
                            <label>Control Status</label>
                            <Dropdown
                                clearable
                                options={statusOptions}
                                selection
                                onChange={this.handleControlStatusChange}
                                value={control_status}
                                placeholder="Select Control Status"
                                error={this.handlerCustomInputError(errors, 'control_status')}
                                name="control_status"
                            />
                            {this.displayInputError(errors, 'control_status')}
                        </Form.Field>
                    </Form>

                    {control.description && <p>{control.description}</p>}

                    {
                        control.assessment_question && <p><b>{control.assessment_question.question.question}</b></p>
                    }

                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<LinkIcon />}
                            className="artifact__buttons"
                            onClick={() => this.setState({ link_artifact: true })}
                        >
                            Link Artifact
                        </Button>
                        <Button
                            variant="contained"
                            color="default"
                            startIcon={<CloudUploadIcon />}
                            className="artifact__buttons"
                            onClick={() => this.setState({ upload_artifact: true })}
                        >
                            Upload Artifact
                        </Button>
                    </div>

                    {
                        !_.isEmpty(control.assessment_question) ?

                            <Form>
                                <Form.Group widths="equal">
                                    <Form.Field>
                                        <Dropdown
                                            clearable
                                            options={usersOptions}
                                            selection
                                            onChange={this.handleRiskOwnerChange}
                                            value={risk_owner_id}
                                            placeholder="Select Risk Owner"
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <Dropdown
                                            clearable
                                            options={spOptions}
                                            selection
                                            onChange={this.handleSeverityChange}
                                            value={severity}
                                            placeholder="Select Severity"
                                        />
                                    </Form.Field>
                                </Form.Group>
                                <Form.Group widths="equal">
                                    <Form.Field>
                                        <Dropdown
                                            clearable
                                            options={spOptions}
                                            selection
                                            onChange={this.handleProbabailityChange}
                                            value={probabaility}
                                            placeholder="Select Probabaility"
                                        />
                                    </Form.Field>
                                    <Form.Field>
                                        <Dropdown
                                            clearable
                                            options={riskActionOptions}
                                            selection
                                            onChange={this.handleRiskActionChange}
                                            value={risk_action}
                                            placeholder="Select Risk Action"
                                        />
                                    </Form.Field>
                                </Form.Group>
                            </Form>

                            : ''}
                         */
                    }

                    {
                        !_.isEmpty(control.tags) ? <div className="control__tags">{
                            _.map(control.tags, t => {
                                return (
                                    <Label key={t.tag_id} as='a' tag>
                                        {t.tag.name}
                                    </Label>
                                );
                            })
                        }</div> : ''
                    }

                </Segment>

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
                    upload_artifact ? <UploadArtifact
                        uploaded={this.handleArtifactsUploaded}
                        control={control}
                        open={upload_artifact}
                        close={this.handleUploadArtifactClose}
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

                {open_document ? <OpenDocument open={open_document} renamed={this.handleRenamed} standards={standards} document={active_document} token={token} company={company} cancle={this.onCloseDocument} opened={this.onDocumentOpend} saved={this.onSavedDocumentEdits} /> : ''}
                {open_pdf_document ? <OpenPDFDocument renamed={this.handleRenamed} standards={standards} open={open_pdf_document} document={active_document} token={token} company={company} cancle={this.onClosePDFDocument} /> : ''}
                {open_ms_document ? <OpenMSDocs open={open_ms_document} document={active_document} token={token} company={company} cancle={this.onCloseMSDocument} /> : ''}
                {assign ? <AssignDocToControls document={active_document} token={token} company={company} standards={standards} onclose={this.handleAssignClose} /> : ''}
            </Grid.Column>
        );
    }
}

export default WorkingControl;
