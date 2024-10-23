import React, { Component } from 'react';
import { Card, Icon, Button, Label } from 'semantic-ui-react';
import { FaBuilding } from "react-icons/fa";
import { setCompanies, clearUser, clearToken, setProfileCompany } from '../../actions';
import { deleteStore } from '../../store/localStorage';
import { connect } from 'react-redux';
import './Organizations.scss';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import axiosInstance from '../../api/api';
import LoadingBackgrop from '../LoadingBackgrop';

class Organizations extends Component {

    state = {
        loading: false
    }

    constructor(props) {
        super(props);
        this.navigateToProfile = this.navigateToProfile.bind(this);
    }

    componentDidMount() {

        this.setState({ loading: true });

        axiosInstance.get('/api/user/org/index').then(e => {
            this.setState({ loading: false });
            this.props.setCompanies(e.data.companies);
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

    navigateToProfile({ company }) {
        this.props.setProfileCompany(company);
        this.props.history.push('/organization/' + company.slug);
    }

    listComapnies = companies => {
        return _.map(companies, company => (
            <div className="col-md-3" key={company.created_at}>
                <Card className="org" >
                    <Label as='a' color='blue' className="org_ribbon" ribbon>Organization</Label>

                    <FaBuilding style={{ cursor: 'pointer' }} onClick={() => { this.navigateToProfile(company) }} className="org__icon" />

                    <Card.Content>
                        <Card.Header style={{ cursor: 'pointer' }} onClick={() => { this.navigateToProfile(company) }}>
                            {company.name}
                        </Card.Header>
                        <Card.Meta>
                            <span className='date'>
                                Added in <Moment fromNow>{company.created_at}</Moment>
                            </span>
                        </Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                        <a href="#">
                            <Icon name='user' />
                            {company.users_count} {company.users_count > 1 ? 'Peoples' : 'People'}
                        </a>
                    </Card.Content>
                </Card>
            </div>
        ));
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { companies } = this.props;
        const { loading } = this.state;

        return (
            <div>
                <div className="page__header">
                    <div>
                        <div className="heading">
                            Organizations
                        </div>
                    </div>
                    <div>
                        <Link to="/organizations/add">

                            <Button animated primary>
                                <Button.Content visible>Add Organization</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='add' />
                                </Button.Content>
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="row org__row">
                    {loading ? <LoadingBackgrop open={loading} /> : this.listComapnies(companies)}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    companies: state.orgs.companies
});

export default connect(mapStateToProps, { setCompanies, clearUser, clearToken, setProfileCompany })(Organizations);
