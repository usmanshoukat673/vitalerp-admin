import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import Axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { AiFillApi } from "react-icons/ai";
import './APIToken.scss';
import axiosInstance from '../../api/api';

class APIToken extends Component {

    state = {
        loading: false,
        api_key: '',
        errors: [],
    };

    componentDidMount(){

        this.setState({ errors: [], loading: true });

        axiosInstance.get('/api/user/oauth/clients')
            .then(response => {
                this.setState({ errors: [], loading: false, api_key: response.data.accessToken});
            })
            .catch(err => {
                this.setState({ errors: [], loading: false });
                if (err.response.status === 500) {
                }
                if (err.response.status === 422) {
                    this.setState({ errors: this.state.errors.concat(err.response.data.errors), loading: false });
                }
            });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { errors, loading, api_key } = this.state;

        return (
            <React.Fragment>
                <Segment piled >
                    <Header> <AiFillApi className="change_pwd_key_icon" /> API Key</Header>

                     <div className='_the_token'>
                        {api_key}
                     </div>
                </Segment>

            </React.Fragment>
        );
    }

}

export default APIToken;
