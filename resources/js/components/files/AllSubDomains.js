
import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { deleteStore } from '../../store/localStorage';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import { AiFillFolder } from 'react-icons/ai';
import './AllSubDomains.scss';
import axiosInstance from '../../api/api';


class AllSubDomains extends Component {

    state = {
        loading: false,
        sub_sections: [],
        all_standards: [],
    }

    componentDidMount() {
        this.loadDirectory();
    }

    loadDirectory = () => {
        const { standards } = this.props;

        const stds = _.map(standards, std => (std.standard_id));

        this.setState({ loading: true });

        axiosInstance.post(`/api/user/cjfm/all-sub-domains`, {
                standards: stds,
            }).then(e => {
                this.setState({ loading: false, all_standards: e.data.all_standards});
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

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { all_standards } = this.state;

        return (
            <div className="mt-3 __AllSubDomains">
            <h4 className="mb-2">Access All Domains</h4>

            {
                _.map(all_standards, standard => {
                    return(
                        <div key={standard.id} className="__standard__sections">
                            <h5>{standard.name}</h5>

                            <Row className="mx-n1 g-0">
                                {_.map(standard.sections,(sub_section, i) => {
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
                                                                    standard.name
                                                                }
                                                            </p>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </Card>
                                        </Col>
                                    );
                                })}
                            </Row>
                        </div>
                    );
                })
            }


        </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user.activeUser,
    token: state.token.activeToken,
    company: state.orgs.company,
    standards: state.compliance.standards,
});

export default withRouter(connect(mapStateToProps, {})(AllSubDomains));
