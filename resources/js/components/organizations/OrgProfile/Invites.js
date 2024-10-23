import React, { Component } from 'react';
import _ from 'lodash';
import './Users.scss';
import { Placeholder, Pagination, Segment, Button, List, Divider, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { clearUser, clearToken } from '../../../actions';
import { deleteStore } from '../../../store/localStorage';
import { Link } from 'react-router-dom';
import showTZDate from '../../../utils/showTZDate';
import axiosInstance from '../../../api/api';

class Invites extends Component {

    state = {
        loading: false,
        invites: [],
        activePage: 1,
        totalPages: 0,
    };

    componentDidMount() {
        this.loadInvites(1);
    }

    handlePaginationChange = (e, { activePage }) => this.loadInvites(activePage);

    loadInvites = activePage => {
        const { company } = this.props;

        this.setState({ loading: true });

        axiosInstance.get(`/api/user/org/invites/${company.id}?page=${activePage}`).then(e => {
            this.setState({
                loading: false,
                invites: e.data.invites.data,
                activePage: e.data.invites.current_page,
                totalPages: e.data.invites.last_page
            });
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

    listInvites = (invites, company) => {
        return invites.length > 0 ? (<List divided relaxed>
            {
                _.map(invites, user => (
                    <List.Item key={user.created_at}>
                        <List.Icon name='user' size='large' verticalAlign='middle' />
                        <List.Content>
                            <List.Header as='a'>{user.email}</List.Header>
                            <List.Description as='a'>Invited On {showTZDate(user.created_at, company.timezone)} </List.Description>
                        </List.Content>
                    </List.Item>
                ))
            }
        </List>) : <div>No invites yet <Link to={`/${company.slug}/settings/invite-user`}>Invite One?</Link></div>;
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {
        const { loading, invites, activePage, totalPages } = this.state;
        const { company } = this.props;

        return (
            <React.Fragment>

                <Segment piled style={{ marginTop: '0px', marginBottom: '55px' }}>

                    <h3>Invites</h3>

                    <Divider />

                    {loading ? <Placeholder>
                        <Placeholder.Paragraph>
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                        </Placeholder.Paragraph>
                        <Placeholder.Paragraph>
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                        </Placeholder.Paragraph>
                        <Placeholder.Paragraph>
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                            <Placeholder.Line />
                        </Placeholder.Paragraph>

                    </Placeholder> : this.listInvites(invites, company)}

                    <div className="activity__container">
                        <Pagination
                            activePage={activePage}
                            onPageChange={this.handlePaginationChange}
                            totalPages={totalPages} />
                    </div>

                </Segment>
            </React.Fragment>
        );
    };
}

const mapStateToProps = (state) => ({
    token: state.token.activeToken,
    company: state.orgs.company,
});
export default connect(mapStateToProps, { clearUser, clearToken })(Invites);
