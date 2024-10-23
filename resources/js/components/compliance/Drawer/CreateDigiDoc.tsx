import React, { useState } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { useSelector } from "react-redux";
import _ from "lodash";

const handleCreateDigiInit = ({dataChanged}) => {

    const [data, setData] = useState('');
    const [errors, setErrors] = useState([]);
    const [editor, setEditor] = useState({});

    const { token, company } = useSelector(state => ({
        token: state.token.activeToken,
        company: state.orgs.company,
    }));

    return(
        <>
            <div className="document-editor">
                <div className="document-editor__toolbar"></div>
                <div className="document-editor__editable-container">
                    <CKEditor

                        data={_.isEmpty(data) ? `<p></p>` : data}
                        editor={DecoupledEditor}
                        onReady={editor => {

                            const toolbarContainer = window.document.querySelector('.document-editor__toolbar');
                            toolbarContainer.appendChild(editor.ui.view.toolbar.element);

                            window.editor = editor;
                            // You can store the "editor" and use when it is needed.
                            // console.log('Editor is ready to use!', editor);
                            setEditor(editor);
                        }}

                        onChange={(event, editor) => {
                            // console.log({ event, editor, data });
                            setData(editor.getData());
                            dataChanged(editor.getData());
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
        </>
    );
}

export default handleCreateDigiInit;