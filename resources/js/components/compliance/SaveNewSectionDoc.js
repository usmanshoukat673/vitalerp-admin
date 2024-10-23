import React, { Component } from 'react';
import { Button, Form, Modal, Dropdown, Input } from 'semantic-ui-react';
import axiosInstance from '../../api/api';

class SaveNewSectionDoc extends Component {
    state = {
        open: true,
        loading: false,
        errors: [],
        data: '',
        document_name: '',
        all_sections: [],
        sections: [],
    };

    componentDidMount() {
        const { company, section } = this.props;

        this.setState({ loading: true, sections: [section.id] });

        axiosInstance.get(`/api/user/cjfm/get-sections/${company.id}`).then(e => {

            this.setState({ loading: false, all_sections: e.data.sections });

        }).catch(err => {
            if (err.response.status === 500) {
                this.setState({ errors: [], loading: false });
            }
            if (err.response.status === 401) {
                this.props.history.push('/login');
            }
        });
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(event.target.name)) {
            delete errors[0][event.target.name];
            this.setState({ errors: errors });
        }
    };

    handleSectionChange = (event, { value }) => {
        this.setState({ sections: value });
        const { errors } = this.state;
        if (errors.length > 0 && errors[0].hasOwnProperty(sections)) {
            delete errors[0][sections];
            this.setState({ errors: errors });
        }
    }

    handlerInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'create__input error' : 'create__input';
    };

    handlerCustomInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? true : false;
    }

    displayInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    cancelSave = () => {
        this.props.cancle();
    };

    handleSave = () => {
        const { company, content } = this.props;
        const { document_name, sections } = this.state;

        this.setState({ loading: true });

        axiosInstance.post(`/api/user/cjfm/create-document-control-db`, {
            document_name: document_name,
            sections: sections,
            document_id: company.document.enc_id,
            content: content, // needs to validated after dicussion
            comp_id: company.id
            
        }).then(e => {
            // saved
            // close the new doc and save doc
            // reload docs for current active section
            this.setState({ loading: false, open: false });
            this.props.saved();

        }).catch(err => {
            if (err.response.status === 422) {

                const errors = err.response.data.errors;

                this.setState({ errors: this.state.errors.concat(errors), loading: false });

            }
            if (err.response.status === 500) {
                this.setState({ errors: [], loading: false });
            }
            if (err.response.status === 401) {
                this.props.history.push('/login');
            }
        });
    };

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { loading, errors, open, document_name, all_sections, sections } = this.state;

        const sectionsOptions = _.map(all_sections, (sec, index) => ({
            key: sec.id,
            text: `${sec.standard.name} - ${sec.menu_name}`,
            value: sec.id,
        }));

        return (<React.Fragment>
            <Modal
                className="semtic__modal"
                open={open}
                size="small"
            >
                <Modal.Header>Save Document</Modal.Header>
                <Modal.Content style={{ minHeight: '300px' }}>
                    <Form.Group>
                        <Form.Field>
                            <h4>Document Name</h4>
                            <Input icon='file'
                                fluid
                                iconPosition='left'
                                placeholder='Document Name'
                                name="document_name"
                                error={this.handlerCustomInputError(errors, 'document_name')}
                                className={this.handlerInputError(errors, 'document_name')}
                                onChange={this.handleChange}
                                value={document_name}
                            />

                            {this.displayInputError(errors, 'document_name')}
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                        <Form.Field>
                            <h4>Select Sections:</h4>
                            <Dropdown disabled={loading} placeholder='Sections' onChange={this.handleSectionChange} fluid value={sections} multiple search selection options={sectionsOptions} />
                        </Form.Field>
                    </Form.Group>
                </Modal.Content>
                <Modal.Actions>
                    <Button disabled={loading} onClick={this.cancelSave}>
                        Close
                    </Button>
                    <Button positive disabled={loading} className={loading ? 'loading' : ''} onClick={this.handleSave}>
                        Save
                    </Button>
                </Modal.Actions>
            </Modal>
        </React.Fragment>)
    }
}
export default SaveNewSectionDoc;
