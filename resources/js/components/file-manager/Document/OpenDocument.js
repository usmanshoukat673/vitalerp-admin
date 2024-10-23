import React, { Component } from 'react';
import { Modal, Button, Popup, Icon } from 'semantic-ui-react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { NotificationManager } from 'react-notifications';
import showTZDate from '../../../utils/showTZDate';
import { BiRename } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { MdAssignmentTurnedIn } from "react-icons/md";
import './OpenDocument.scss';
import AssignDocToControls from './AssignDocToControls';
import RenameDocument from '../../files/Options/RenameDocument';
import axiosInstance from '../../../api/api';
import DocumentMetaData from '../../files/Document/DocumentMetaData';

class OpenDocument extends Component {

    state = {
        data: '',
        loading: false,
        errors: [],
        doc: {},
        rename: false,
        assign: false,
        active_document: {}
    };

    componentDidMount() {
        const { document } = this.props;

        this.setState({ loading: true });

        axiosInstance.get(`/api/user/cjfm/view-document/${document.id}`).then(e => {
            this.setState({ data: e.data.document.content, loading: false, doc: e.data.document });
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

    closeDocument = () => {
        this.props.cancle();
    };

    handleSave = () => {
        const { data } = this.state;
        const { document } = this.props;

        this.setState({ loading: true });

        axiosInstance.post(`/api/user/cjfm/save-document`, {
            document_id: document.enc_id,
            data: data
        }).then(e => {
            this.setState({ loading: false });
            this.props.saved(e.data.document);
            this.props.cancle();
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

    renameDocument = () => {
        this.setState({ rename: true });
    }

    cancelRename = () => {
        this.setState({ rename: false });
    }

    handleRenamed = document => {
        this.setState({ rename: false });
        this.props.renamed(document);
    }

    renameInput = () => {
        const { document, token, company } = this.props;
        return <RenameDocument document={document} token={token} company={company} cancel={this.cancelRename} renamed={this.handleRenamed} />
    };

    componentDidUpdate() {
        if (this.state.editor && this.state.editor.getData() !== this.state.data && this.state.data != null) {
            this.state.editor.setData(this.state.data);
        }
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    handleAssign = () => {
        this.setState({ assign: true, active_document: this.props.document });
    }

    handleAssignClose = () => { this.setState({ assign: false, active_document: {} }) }

    editorContent = () => {
        return (
            <div className="document-editor">
                <div className="document-editor__toolbar"></div>
                <div className="document-editor__editable-container">
                    <CKEditor

                        data={_.isEmpty(this.state.data) ? `<p></p>` : this.state.data}
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
        )
    }

    modalbuttons = () => {
        return (
            <>
                <Button disabled={this.state.loading} onClick={this.closeDocument}>
                    Close
                </Button>
                <Button positive disabled={this.state.loading} className={this.state.loading ? 'loading' : ''} onClick={this.handleSave}>
                    Save
                </Button>
            </>
        )
    }

    render() {

        const { loading, doc, rename, active_document, assign } = this.state;
        const { document, open, company, token, standards, modal_inline } = this.props;

        return (
            modal_inline ? <>
                {this.editorContent()}

                {this.modalbuttons()}
            </> : <React.Fragment>
                <Modal
                    className="semtic__modal cccc__modal"
                    open={open}
                    onClose={() => { }}
                    size="large"
                >
                    <div className="modal__header__with__tools">
                        <div className="__details">
                            {
                                rename ? this.renameInput() : <h3>{document.name}</h3>
                            }

                        </div>

                        <div className="__mtools">
                            <span>Last Modified: {showTZDate(doc.updated_at, company.timezone)}
                                {
                                    !_.isEmpty(doc.modified) ? ` by ${doc.modified.first_name} ${doc.modified.last_name}` : (!_.isEmpty(doc.owner) ? ` by ${doc.owner.first_name} ${doc.owner.last_name}` : '')
                                }
                            </span>
                            <div className="__actions">

                                <Popup content='Rename Document' position='top center' trigger={<Button circular size="mini" onClick={this.renameDocument} icon>
                                    <BiRename />
                                </Button>} />

                                <Popup content='Assign Controls' position='top center' trigger={<Button circular size="mini" onClick={this.handleAssign} icon>
                                    <MdAssignmentTurnedIn />
                                </Button>} />

                                <Button circular size="mini" disabled={loading} onClick={this.closeDocument} icon>
                                    <AiOutlineClose />
                                </Button>

                            </div>
                        </div>
                    </div>
                    <div>
                    {
                        !_.isEmpty(document) && <div style={{padding: '10px 40px 0px 40px'}}><DocumentMetaData document={document} /></div>
                    }
                    </div>
                    <Modal.Content className="cc_modal_container" scrolling style={{ maxHeight: '21cm' }}>
                        {this.editorContent()}
                    </Modal.Content>
                    <Modal.Actions>
                        {this.modalbuttons()}
                    </Modal.Actions>
                </Modal>

                {assign ? <AssignDocToControls document={active_document} token={token} company={company} standards={standards} onclose={this.handleAssignClose} /> : ''}
            </React.Fragment>
        );
    }
}

export default OpenDocument;
