import React, { Component } from 'react';
import './Applications.scss';
import _ from 'lodash';
import { Header, Card, Image, Button, Icon, Popup } from 'semantic-ui-react';
import showCurrentTZDate from '../../utils/showCurrentTZDate';
import { NavLink, withRouter } from 'react-router-dom';
import AppLoadingSimulation from './AppLoadingSimulation';
import { FcSettings } from "react-icons/fc";
import { selecteApp, clearApp, closeSubLeftNav, selectControlFunction, selectCatalogSection } from '../../actions';
import { connect } from 'react-redux';
import RightDrawer from '../../layouts/RightDrawer';
import axiosInstance from '../../api/api';

const notFound = '/images/no-result-found.svg';

const RightSidebar = () => {
    return(
        <div>
            TODO
        </div>
    )
}

class Applications extends Component {
    state = {
        errors: [],
        loading: false,
        apps: []
    }

    componentDidMount() {
        if (_.isEmpty(this.props.user)) {
            this.props.history.push('/login');
        }
        else if (_.isEmpty(this.props.company)) {
            this.props.history.push('/select-organization');
        }
        else {

            this.props.closeSubLeftNav();
            this.props.selectControlFunction({});
            this.props.selectCatalogSection({});

            const { company, application } = this.props;
            this.setState({ loading: true });
            axiosInstance.get(`/api/user/applications/list/${company.id}`).then(e => {
                this.setState({ loading: false, apps: e.data.list });
            }).catch(err => {
                if (err.response.status === 500) {
                    this.setState({ errors: [], loading: false });
                }
                if (err.response.status === 401) {
                    this.setState({ errors: [], loading: false });
                    this.props.history.push('/login');
                }
            });
        }
    }

    handleConfigure = app => {
        const { company } = this.props;
        if (!_.isEmpty(app.integration.config_url)) {
            this.props.selecteApp(app);
            this.props.history.push(`/${company.slug}${app.integration.config_url}`);
        }
    }

    handleAppList = () => {
        const { apps } = this.state;

        return apps.length > 0 ? (<Card.Group itemsPerRow={5}>{
            _.map(apps, app => (
                <Card key={app.created_at}>
                    <div className="application">
                        <FcSettings className="setting__icon" onClick={() => { this.handleConfigure(app) }} />
                        <Image size='small' rounded verticalAlign='middle' centered src={app.integration.logo} />
                    </div>
                    <Card.Content>
                        <Card.Header>{app.integration.name}</Card.Header>
                        <Card.Meta>
                            <span className='date'>Installed on {showCurrentTZDate(app.created_at)}</span>
                        </Card.Meta>
                    </Card.Content>
                    {/**  <Card.Content extra>
                        <Button primary onClick={() => { this.handleConfigure(app) }}>Configure</Button>
                    </Card.Content>*/ }
                </Card>

            ))
        }</Card.Group>) : <React.Fragment>

            <Image src={notFound} size='medium' centered />
            <Header as='h3' textAlign='center'>
                There is nothing here!
            </Header>

            <Header as='h3' textAlign='center'>
                Visit our <NavLink to="/marketplace/all">Marketplace</NavLink> to install required applications based on your organization needs.
            </Header>
        </React.Fragment >;
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { loading } = this.state;
        const { leftnav } = this.props;

        return (
           <>
             <div className={leftnav.open_sub ? 'sub__slide__menu_opened' : ''} >
                <div className="page__header">
                    <div className="heading">
                        Assets
                    </div>

                    <div>
                        <Popup
                        content="Visit Marketplace to install workflows as per your organization requirements"
                        header="Marketplace"
                        position='left center'
                        trigger={
                            <NavLink to="/rete/marketplace/all">
                                <Button>
                                    <Icon name='shopping cart' /> Rete Marketplace
                                </Button>
                            </NavLink>
                        }
                    />
                    <Popup
                        content="Visit Marketplace to install assets as per your organization requirements"
                        header="Marketplace"
                        position='left center'
                        trigger={
                            <NavLink to="/marketplace/all">
                                <Button>
                                    <Icon name='shopping cart' /> Marketplace
                                </Button>
                            </NavLink>
                        }
                    />
                    </div>

                </div>
                <div className="applications" style={{ margin: '15px 15px 55px 15px' }}>
                    {loading ? <AppLoadingSimulation /> : this.handleAppList()}
                </div>
            </div>

            <RightDrawer title="Assets" component={<RightSidebar />} />
           </>
        );
    }
}

export default withRouter(connect(null, { selecteApp, clearApp, closeSubLeftNav, selectControlFunction, selectCatalogSection })(Applications));
