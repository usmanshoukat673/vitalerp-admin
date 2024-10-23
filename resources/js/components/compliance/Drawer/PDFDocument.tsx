import React, { Component } from 'react';

class PDFDocument extends Component {

    state = {
        loading: false,
        rename: false,
        errors: [],
        numPages: null,
        pageNumber: 0,
        assign: false,
        active_document: {}
    };

    closeFile = () => {
        this.props.cancle();
    };

    renameDocument = () => {
        this.setState({ rename: true });
    }

    cancelRename = () => {
        this.setState({ rename: false });
    }

    handleRenamed = document => {
        this.setState({ rename: false });
        this.props.document.name = document.name;
        this.props.renamed(document);
    }

    renameInput = () => {
        const { document, token, company } = this.props;
        return <RenameDocument document={document} token={token} company={company} cancel={this.cancelRename} renamed={this.handleRenamed} />;
    };

    handleAssign = () => {
        this.setState({ assign: true, active_document: this.props.document });
    }

    handleAssignClose = () => { this.setState({ assign: false, active_document: {} }) }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages: numPages });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { document, open, company, token, standards } = this.props;

        let path = `${window.location.origin}/view-pdf/${document.enc_id}`;
        return (
            <React.Fragment>
               <iframe style={{ minHeight: '21cm', border: '0px', width: '100%' }} src={path}></iframe>
            </React.Fragment>
        );
    }
}

export default PDFDocument;
