import React, { Component } from 'react';
import { MdNoteAlt } from 'react-icons/md';
import { Modal, Button } from 'semantic-ui-react';
import CloseIcon from '@mui/icons-material/Close';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { NotificationManager } from 'react-notifications';
import _ from 'lodash';
import './ControlNote.scss';
import axiosInstance from '../../../api/api';

class ControlNote extends Component {

    state = {
        loading: false,
        errors: [],
        note: '',
        edit: false,
    }

    componentDidMount() {
        const { control } = this.props;

        this.setState({ note: (_.isEmpty(control.properties.notes) ? '<p></p>' : control.properties.notes) });
    }

    toggleNote = () => {
        this.setState({ edit: !this.state.edit });
    }

    handleSave = () => {
        const { note } = this.state;
        const { control } = this.props;

        this.setState({ loading: true });

        axiosInstance.post(`/api/user/compliance/save-notes`, {
            property_id: control.properties.id,
            note: note,
            control_id: control.properties.control_id,
        }).then(e => {
            this.setState({ loading: false, edit: false });
            // this.props.saved(e.data.document);
        }).catch(err => {
            if (err.response.status === 422) {
                this.setState({ errors: this.state.errors.concat(err.response.data.errors), loading: false });
                NotificationManager.error(err.response.data.errors[0].document_name, 'Error');
            }

            if (err.response.status === 500) {
                this.setState({ errors: [], loading: false });
            }
        });
    }

    render() {

        const { edit, loading, errors } = this.state;
        const { control } = this.props;

        return (
            <div className='ControlNote'>
                <MdNoteAlt onClick={this.toggleNote} className='note__icon' />

                <Modal
                    className="semtic__modal cccc__modal"
                    open={edit}
                    onClose={() => { }}
                    size="large"
                >

                    <Modal.Content className="cc_modal_container">
                        <div className="cccc__header">
                            <div className="__c__number">
                                {control.number}
                            </div>
                            <div className="__c__close">
                                <CloseIcon onClick={this.toggleNote} />
                            </div>
                        </div>

                        <div className="__c__name">
                            {control.name}
                        </div>

                        <div className="__c__description">
                            {control.description}
                        </div>

                        <div className="__c__divider"></div>

                        <div>
                            <div className="document-editor">
                                <div className="document-editor__toolbar"></div>
                                <div className="document-editor__editable-container">
                                    <CKEditor

                                        data={_.isEmpty(this.state.note) ? `<p></p>` : this.state.note}
                                        editor={DecoupledEditor}
                                        onReady={editor => {

                                            const toolbarContainer = window.document.querySelector('.document-editor__toolbar');
                                            toolbarContainer.appendChild(editor.ui.view.toolbar.element);
                                            window.editor = editor;
                                        }}

                                        onChange={(event, editor) => {
                                            // console.log({ event, editor, data });
                                            this.setState({ note: editor.getData() });
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
                        </div>

                        <div className="__notes__buttons">
                            <Button className="__c_c_button" onClick={this.handleSave}>Submit</Button>
                            <Button className="__c_c_button__close" onClick={this.toggleNote}>Close</Button>
                        </div>
                    </Modal.Content>

                </Modal>
            </div>
        );
    }
}

export default ControlNote;
