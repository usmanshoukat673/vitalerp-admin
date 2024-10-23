import React, { Component } from 'react';

class MSDocument extends Component {

    state = {
        loading: false,
        errors: [],
        rename: false,
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

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }


    render() {

        const { document} = this.props;

        let path = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURI(`${window.location.origin}/view-msfiles/${document.enc_id}/${document.name}`)}`;


        return (
            <React.Fragment>
                <div style={{ maxHeight: '21cm' }}>
                    <iframe style={{ minHeight: '21cm', border: '0px', width: '100%' }} src={path}></iframe>
                </div>
            </React.Fragment>
        );
    }
}

export default MSDocument;
