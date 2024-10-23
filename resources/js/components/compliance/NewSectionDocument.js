import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import SaveNewSectionDoc from './SaveNewSectionDoc';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

class NewSectionDocument extends Component {

    state = {
        open: true,
        open_save: false,
        loading: false,
        errors: [],
        data: '',
    };

    cancelCreate = () => {
        this.props.cancle();
    };

    cancelSave = () => {
        this.setState({ open_save: false }, () => {
            this.setState({ open: true, });
        });
    };

    handleSaveAs = () => {
        this.setState({ open: false }, () => {
            this.setState({ open_save: true });
        });
    };

    onSavedNewDocument = () => {
        this.setState({ open: false, open_save: false });
        this.props.saved();
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {
        const { loading, errors, open, open_save, data } = this.state;
        const { token, company, section } = this.props;

        return (
            <React.Fragment>
                <Modal
                    className="semtic__modal"
                    open={open}
                    onClose={() => { }}
                    size="large"
                >
                    <Modal.Header>New Document</Modal.Header>
                    <Modal.Content scrolling style={{ maxHeight: '21cm' }}>

                        <div className="document-editor">
                            <div className="document-editor__toolbar"></div>
                            <div className="document-editor__editable-container">
                                <CKEditor

                                    data={this.state.data}
                                    editor={DecoupledEditor}
                                    onReady={editor => {

                                        const toolbarContainer = window.document.querySelector('.document-editor__toolbar');
                                        toolbarContainer.appendChild(editor.ui.view.toolbar.element);

                                        window.editor = editor;
                                        // You can store the "editor" and use when it is needed.
                                        // console.log('Editor is ready to use!', editor);

                                        this.setState({ editor: editor });
                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        // console.log({ event, editor, data });
                                        this.setState({ data: editor.getData() });
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


                    </Modal.Content>
                    <Modal.Actions>
                        <Button disabled={loading} onClick={this.cancelCreate}>
                            Close
                        </Button>
                        <Button positive disabled={loading} className={loading ? 'loading' : ''} onClick={this.handleSaveAs}>
                            Save
                        </Button>
                    </Modal.Actions>
                </Modal>

                {open_save ? <SaveNewSectionDoc section={section} open={open_save} content={data} token={token} company={company} cancle={this.cancelSave} saved={this.onSavedNewDocument} /> : ''}

            </React.Fragment>
        );
    }
}

export default NewSectionDocument;
