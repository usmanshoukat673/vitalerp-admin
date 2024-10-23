import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import axiosInstance from '../../api/api';

class AppsCounter extends Component {

    state = {
        count: 0
    };

    componentDidMount() {
        const { category } = this.props;

        axiosInstance.post(`/api/user/marketplace/app-count`, {
            id: category.id
        }).then(e => {
            this.setState({
                count: e.data.apps

            });
        }).catch(err => {
        });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { category } = this.props;

        return `${category.name} (${this.state.count})`;
    }
}


export default AppsCounter;
