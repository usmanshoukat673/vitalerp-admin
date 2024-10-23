import React, { Component } from 'react';
import { Button, Form, Modal, Input } from 'semantic-ui-react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import axiosInstance from '../../api/api';
import { Card } from 'react-bootstrap';

class CreateArtifact extends Component {

    state = {
        open: true,
        loading: false,
        errors: [],
        content: '',
        name: '--New Document--'
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(event.target.name)) {
            delete errors[0][event.target.name];
            this.setState({ errors: errors });
        }
    };

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

    cancelCreate = () => {
        this.props.closed();
    };

    handleSubmit = () => {
        const { company, control } = this.props;
        const { name, content } = this.state;

        this.setState({ loading: true });

        axiosInstance.post(`/api/user/compliance/create-new-artifact`, {
            name: name,
            control_id: control.id,
            section_id: control.standard_section_id,
            standard_id: control.standard_id,
            document_id: company.document.id,
            content: content // needs to validated after dicussion
        }).then(e => {
            // saved
            // close the new doc and save doc
            // reload docs for current active section
            this.setState({ loading: false, open: false });
            this.props.created(e.data.section_documents, e.data.artifacts);

        }).catch(err => {
            if (err.response.status === 422) {

                const errors = err.response.data.errors;

                this.setState({ errors: this.state.errors.concat(errors), loading: false });

            }
            if (err.response.status === 500) {
                this.setState({ errors: [], loading: false });
            }
        });
    };

    createDocForm = () => {
        const { loading, errors, open, name } = this.state;
        return (
            <Form>
                <Form.Field>
                    <Input icon='file'
                        fluid
                        iconPosition='left'
                        placeholder='Document Name'
                        name="name"
                        onChange={this.handleChange}
                        value={name}
                    />
                    {this.displayInputError(errors, 'name')}
                </Form.Field>
                <Form.Field>
                    <div className="document-editor">
                        <div className="document-editor__toolbar"></div>
                        <div className="document-editor__editable-container">
                            <CKEditor

                                editor={DecoupledEditor}
                                data={this.state.content}
                                onReady={editor => {

                                    const toolbarContainer = window.document.querySelector('.document-editor__toolbar');
                                    toolbarContainer.appendChild(editor.ui.view.toolbar.element);

                                    window.editor = editor;
                                    // You can store the "editor" and use when it is needed.
                                    // console.log('Editor is ready to use!', editor);

                                    this.setState({ editor: editor });
                                }}
                                onChange={(event, editor) => {
                                    this.setState({ content: editor.getData() });
                                }}
                                onBlur={(event, editor) => {
                                    // console.log('Blur.', editor);
                                }}
                                onFocus={(event, editor) => {
                                    // console.log('Focus.', editor);
                                }}
                            />
                        </div>
                    </div>
                    {this.displayInputError(errors, 'content')}
                </Form.Field>
            </Form>
        )
    }

    actionButtons = (cancelBtnText, SubmitBtnText) => {
        const { loading, errors, open, name } = this.state;

        return (
            <>
                <Button positive disabled={loading} className={loading ? 'loading' : ''} onClick={this.handleSubmit}>
                    {SubmitBtnText}
                </Button>
                <Button disabled={loading} onClick={this.cancelCreate}>
                    {cancelBtnText}
                </Button>
            </>
        )
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {
        const { open } = this.state;

        return (
            <React.Fragment>
                {
                    this.props.inline ?
                        <Card className="d-block">
                            <Card.Body>
                                {this.createDocForm()}
                                <Form.Group>
                                    {this.actionButtons('Cancel', 'Submit')}
                                </Form.Group>
                            </Card.Body>
                        </Card>

                        : <Modal
                            className="semtic__modal cccc__modal"
                            open={open}
                            onClose={() => { }}
                            size="large"
                        >
                            <Modal.Content className="cc_modal_container" scrolling style={{ maxHeight: '21cm' }}>
                                {this.createDocForm()}
                            </Modal.Content>
                            <Modal.Actions>
                                {this.actionButtons('Close', 'Submit')}
                            </Modal.Actions>
                        </Modal>
                }
            </React.Fragment >
        );
    }
}

export default CreateArtifact;
