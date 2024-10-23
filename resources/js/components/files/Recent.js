import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { deleteStore } from '../../store/localStorage';
import { Table } from 'react-bootstrap';
import File from './File/File';
import Document from './Document/Document';
import OpenPDFDocument from './Document/OpenPDFDocument';
import OpenMSDocs from './Document/OpenMSDocs';
import axiosInstance from '../../api/api';

class Recent extends Component {

    state = {
        loading: false,
        documents: [],
        open_pdf_document: false,
        open_ms_document: false,
         active_document: {},
    }

    componentDidMount() {
        this.loadDirectory();
    }

    loadDirectory = () => {
        const { company } = this.props;

        this.setState({ loading: true });

        axiosInstance.get(`/api/user/cjfm/recent-docs/${company.id}`).then(e => {
                this.setState({ loading: false, documents: e.data.resent_docs});
            }).catch(err => {
                if (err.response.status === 500) {
                    this.setState({ errors: [], loading: false });
                }
                if (err.response.status === 401) {
                    deleteStore();
                    this.props.clearUser();
                    this.props.clearToken();
                    this.props.history.push('/login');
                }
            });
    };

    folderRenamed = document => {
        const { documents } = this.state;
        let index = _.findIndex(documents, doc => {
            return doc.id === document.id;
        });
        documents[index] = document;
        this.setState({ documents });
    }

    openPDFDocument = (document) => {
        this.setState({ open_pdf_document: true, active_document: document }, () => {
            this.setState({ opening_document: true });
        });
    };

    onClosePDFDocument = () => {
        this.setState({ open_pdf_document: false });
    }

    openMSDocument = (document) => {
        this.setState({ open_ms_document: true, active_document: document }, () => {
            this.setState({ opening_document: true });
        });
    };

    onCloseMSDocument = () => {
        this.setState({ open_ms_document: false });
    }

    deleteFolder = document => {
        const { documents } = this.state;
        _.remove(documents, (doc) => {
            return doc.id === document.id;
        });
        this.setState({ documents });
    };

    handleMoved = document => {
        const { documents } = this.state;
        _.remove(documents, (doc) => {
            return doc.id === document.id;
        });
        this.setState({ documents });
    };

    documentSaved = document => {
        const { documents } = this.state;
        let index = _.findIndex(documents, doc => {
            return doc.id === document.id;
        });
        documents[index] = document;
        this.setState({ documents });
    }


    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { company, standards, token} = this.props;
        const { documents, open_pdf_document, open_ms_document,  active_document } = this.state;

        return (
            <>
            <div className="mt-3">
                <h5 className="mb-3">Recent</h5>

                <Table className="table table-centered mb-0">
                    <thead className="table-light">
                        <tr>
                            <th className="border-0">Name</th>
                            <th className="border-0">Last Modified</th>
                            <th className="border-0">Size</th>
                            <th className="border-0">Owner</th>
                            <th className="border-0">Type</th>
                            <th className="border-0" style={{ width: '80px' }}>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {_.map(documents, (document, index) => {
                            if(document.type === 'file') {
                                return (<tr key={document.id}><File key={`${document.id}-file`} openpdf={this.openPDFDocument} openmsfile={this.openMSDocument} document={document} delete={this.deleteFolder} renamed={this.folderRenamed} /></tr>);
                            }
                            else if (document.type === 'document') {
                                return (<tr key={document.id}><Document key={`${document.id}-document`} document={document} documents={documents} delete={this.deleteFolder} moved={this.handleMoved} renamed={this.folderRenamed} saved={this.documentSaved} /></tr>);
                            }
                            // return (

                            //     <tr key={index}>
                            //         <td>
                            //             <span className="ms-2 fw-semibold">
                            //                 <Link to="#" className="text-reset">
                            //                     {file.name}
                            //                 </Link>
                            //             </span>
                            //         </td>
                            //         <td>
                            //             <p className="mb-0">{showTZDate(file.updated_at, company.timezone)}</p>
                            //         </td>
                            //         <td>{file.size}</td>
                            //         <td>{`${file.owner.first_name} ${file.owner.last_name}`}</td>
                            //         <td id="tooltip-container">
                            //             <div className="avatar-group">
                            //                 {
                            //                     // file.members.map((item, index) => {
                            //                     //     return (
                            //                     //         <OverlayTrigger
                            //                     //             key={index}
                            //                     //             placement="top"
                            //                     //             overlay={<Tooltip>{item.name}</Tooltip>}>
                            //                     //             <Link to="#" className="avatar-group-item mb-0 me-1">
                            //                     //                 <img
                            //                     //                     src={item.image}
                            //                     //                     className="rounded-circle avatar-xs"
                            //                     //                     alt="friend"
                            //                     //                 />
                            //                     //             </Link>
                            //                     //         </OverlayTrigger>
                            //                     //     );
                            //                     // })
                            //                 }
                            //             </div>
                            //         </td>
                            //         <td>
                            //             <ButtonGroup className="d-block">
                            //                 <Dropdown>
                            //                     <Dropdown.Toggle
                            //                         align="end"
                            //                         className="table-action-btn dropdown-toggle arrow-none btn btn-light btn-xs">
                            //                         <i className="mdi mdi-dots-horizontal"></i>
                            //                     </Dropdown.Toggle>
                            //                     <Dropdown.Menu>
                            //                         <Dropdown.Item>
                            //                             <i className="mdi mdi-share-variant me-2 text-muted vertical-middle"></i>
                            //                             Share
                            //                         </Dropdown.Item>
                            //                         <Dropdown.Item>
                            //                             <i className="mdi mdi-link me-2 text-muted vertical-middle"></i>
                            //                             Get Sharable Link
                            //                         </Dropdown.Item>
                            //                         <Dropdown.Item>
                            //                             <i className="mdi mdi-pencil me-2 text-muted vertical-middle"></i>
                            //                             Rename
                            //                         </Dropdown.Item>
                            //                         <Dropdown.Item>
                            //                             <i className="mdi mdi-download me-2 text-muted vertical-middle"></i>
                            //                             Download
                            //                         </Dropdown.Item>
                            //                         <Dropdown.Item>
                            //                             <i className="mdi mdi-delete me-2 text-muted vertical-middle"></i>
                            //                             Remove
                            //                         </Dropdown.Item>
                            //                     </Dropdown.Menu>
                            //                 </Dropdown>
                            //             </ButtonGroup>
                            //         </td>
                            //     </tr>
                            // )
                        })}
                    </tbody>
                </Table>

                {open_pdf_document ? <OpenPDFDocument renamed={this.folderRenamed} standards={standards} open={open_pdf_document} document={active_document} token={token} company={company} cancle={this.onClosePDFDocument} /> : ''}
        {open_ms_document ? <OpenMSDocs renamed={this.folderRenamed} open={open_ms_document} document={active_document} token={token} company={company} cancle={this.onCloseMSDocument} /> : ''}
            </div>
        </>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user.activeUser,
    token: state.token.activeToken,
    company: state.orgs.company,
    standards: state.compliance.standards,
});

export default connect(mapStateToProps, {})(Recent);
