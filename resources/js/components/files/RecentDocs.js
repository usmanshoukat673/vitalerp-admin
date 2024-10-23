// @flow
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, ButtonGroup, Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { setFilesDocuments, unSetFilesDocuments } from '../../actions';
import { deleteStore } from '../../store/localStorage';
import { connect } from 'react-redux';
import showTZDate from '../../utils/showTZDate';
import axiosInstance from '../../api/api';

class RecentDocs extends Component{

    state = {
        loading: false,
        errors: [],
        document: '',
        documents: [],
        breadcrumbs: [],
        creating_folder: false,
        creating_document: false,
        document_id: '',
        uploading_file: false,
        open_pdf_document: false,
        open_ms_document: false,
        active_document: {},
        resent_docs: []
    };

    constructor(props) {
        super(props);
        this.loadDirectory = this.loadDirectory.bind(this);
    }

    componentDidMount() {
        this.loadDirectory();
    }

    componentDidUpdate(prevProps) {
        this.loadDirectory();
    };

    loadDirectory = () => {
        const { company } = this.props;
        const { document_id } = this.props.match.params;

        console.log(document_id);

        if (!_.isEmpty(document_id) && this.state.document_id !== document_id) {
            this.setState({ document_id: document_id });

            this.setState({ loading: true });

            axiosInstance.get(`/api/user/cjfm/list/${company.id}/${document_id}`).then(e => {
                this.setState({ loading: false, resent_docs: e.data.resent_docs });

                this.props.setFilesDocuments(e.data.documents);

                if (e.data.document.parent != null) {
                    this.setState({ breadcrumbs: _.reverse(e.data.breadcrumbs) });
                }
                // set documents here into redux
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
        }
    };

    render()
    {
        const { errors,
            loading,
            creating_folder,
            document,
            documents,
            breadcrumbs,
            uploading_file,
            creating_document,
            active_document,
            open_pdf_document,
            open_ms_document,
            resent_docs
        } = this.state;

        const { token, company, standards } = this.props;

        return(
            <>
            <div className="mt-3">
                <h5 className="mb-3">Recent</h5>

                <Table responsive className="table table-centered table-nowrap mb-0">
                    <thead className="table-light">
                        <tr>
                            <th className="border-0">Name</th>
                            <th className="border-0">Last Modified</th>
                            <th className="border-0">Size</th>
                            <th className="border-0">Owner</th>
                            <th className="border-0">Members</th>
                            <th className="border-0" style={{ width: '80px' }}>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {resent_docs.map((file, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <span className="ms-2 fw-semibold">
                                            <Link to="#" className="text-reset">
                                                {file.name}
                                            </Link>
                                        </span>
                                    </td>
                                    <td>
                                        <p className="mb-0">{showTZDate(file.updated_at, company.timezone)}</p>
                                        <span className="font-12">by {file.modifiedBy}</span>
                                    </td>
                                    <td>{file.size}</td>
                                    <td>{file.owner}</td>
                                    <td id="tooltip-container">
                                        <div className="avatar-group">
                                            {
                                            //     file.members.map((item, index) => {
                                            //     return (
                                            //         <OverlayTrigger
                                            //             key={index}
                                            //             placement="top"
                                            //             overlay={<Tooltip>{item.name}</Tooltip>}>
                                            //             <Link to="#" className="avatar-group-item mb-0 me-1">
                                            //                 <img
                                            //                     src={item.image}
                                            //                     className="rounded-circle avatar-xs"
                                            //                     alt="friend"
                                            //                 />
                                            //             </Link>
                                            //         </OverlayTrigger>
                                            //     );
                                            // })
                                        }
                                        </div>
                                    </td>
                                    <td>
                                        <ButtonGroup className="d-block">
                                            <Dropdown>
                                                <Dropdown.Toggle
                                                    align="end"
                                                    className="table-action-btn dropdown-toggle arrow-none btn btn-light btn-xs">
                                                    <i className="mdi mdi-dots-horizontal"></i>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item>
                                                        <i className="mdi mdi-share-variant me-2 text-muted vertical-middle"></i>
                                                        Share
                                                    </Dropdown.Item>
                                                    <Dropdown.Item>
                                                        <i className="mdi mdi-link me-2 text-muted vertical-middle"></i>
                                                        Get Sharable Link
                                                    </Dropdown.Item>
                                                    <Dropdown.Item>
                                                        <i className="mdi mdi-pencil me-2 text-muted vertical-middle"></i>
                                                        Rename
                                                    </Dropdown.Item>
                                                    <Dropdown.Item>
                                                        <i className="mdi mdi-download me-2 text-muted vertical-middle"></i>
                                                        Download
                                                    </Dropdown.Item>
                                                    <Dropdown.Item>
                                                        <i className="mdi mdi-delete me-2 text-muted vertical-middle"></i>
                                                        Remove
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </>
        );
    }

}


const mapStateToProps = (state) => ({
    token: state.token.activeToken,
    company: state.orgs.company,
    standards: state.compliance.standards,
});

export default connect(mapStateToProps, { setFilesDocuments, unSetFilesDocuments })(RecentDocs);

