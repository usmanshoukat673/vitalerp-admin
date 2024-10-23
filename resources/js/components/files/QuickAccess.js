
import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { deleteStore } from '../../store/localStorage';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import { AiFillFolder } from 'react-icons/ai';
import './QuickAccess.scss';
import axiosInstance from '../../api/api';


class QuickAccess extends Component {

    state = {
        loading: false,
        sub_sections: [],
    }

    componentDidMount() {
        this.loadDirectory();
    }

    loadDirectory = () => {
        const { company } = this.props;

        this.setState({ loading: true });

        axiosInstance.get(`/api/user/cjfm/quick-access/${company.id}`).then(e => {
                this.setState({ loading: false, sub_sections: e.data.sub_sections});
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

    handleSectionNavigation = (section_id) => {
        const { company } = this.props;
        this.props.history.push(`/${company.slug}/filemanager/section/${section_id}`);
    }

    handleViewAllNaviation = () => {
        const { } = this.props;
        this.props.history.push(`/${company.slug}/filemanager/all-domains`);
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { company} = this.props;
        const { sub_sections } = this.state;

        return (
            <div className="mt-3">
            <h5 className="mb-2">Quick Access</h5>

            <Row className="mx-n1 g-0">
                {sub_sections.map((sub_section, i) => {
                    return (
                        <Col key={i} xxl={3} lg={6}>
                            <Card className="m-1 shadow-none border __the__subsection" onClick={() => this.handleSectionNavigation(sub_section.id)}>
                                <div className="p-2">
                                    <Row>
                                        <Col className="col-auto">
                                            <div className="avatar-sm">
                                                <span className="avatar-title bg-light text-secondary rounded">
                                                    <AiFillFolder />
                                                </span>
                                            </div>
                                        </Col>
                                        <Col className="ps-0">
                                            <Link to="#" className="text-muted fw-bold">
                                                {sub_section.menu_name}
                                            </Link>
                                            <p className="mb-0 font-13">
                                                {
                                                    sub_section.standard.name
                                                }
                                            </p>
                                        </Col>
                                    </Row>
                                </div>
                            </Card>
                        </Col>
                    );
                })}

                <Col xxl={3} lg={6}>
                <Card className="m-1 shadow-none border __the__subsection" onClick={() => this.handleViewAllNaviation()}>
                    <div className="p-2">
                        <Row>
                            <Col className="col-auto">
                                <div className="avatar-sm">
                                    <span className="avatar-title bg-light text-secondary rounded">
                                        <AiFillFolder />
                                    </span>
                                </div>
                            </Col>
                            <Col className="ps-0">
                                <Link to="#" className="text-muted fw-bold">
                                    View All Domains
                                </Link>
                                <p className="mb-0 font-13">
                                    Click to view All Domains
                                </p>
                            </Col>
                        </Row>
                    </div>
                </Card>
            </Col>
            </Row>
        </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user.activeUser,
    token: state.token.activeToken,
    company: state.orgs.company,
});

export default withRouter(connect(mapStateToProps, {})(QuickAccess));
