import React, { Component } from 'react';
import { Modal, Button } from 'semantic-ui-react';
import _ from 'lodash';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import axiosInstance from '../../../api/api';

class ViewWorkflow extends Component {

    state = {
        loading: false,
        errors: [],
        local_workflow: {}
    };

    componentDidMount() {

        const { workflow } = this.props;
        this.setState({ loading: true });
        axiosInstance.post(`/api/user/rete-marketplace/workflow`, { id: workflow.id }).then(e => {
            this.setState({ loading: false, errors: [], local_workflow: e.data.workflow });

        }).catch(err => {
            if (err.response.status === 500) {
                this.setState({ errors: [], loading: false });
            }
            if (err.response.status === 401) {
                this.setState({ errors: [], loading: false });
                this.props.history.push('/login');
            }
        });

    };

    handleCloseAppView = () => {
        this.props.handleCloseAppView();
    };

    onInstall = (redirect, app) => {
        this.props.onInstalled(redirect, app);
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { open, close, workflow, token, company } = this.props;

        const { uptime_logs, loading, local_workflow } = this.state;

        return (

            <React.Fragment>
                <Modal dimmer="inverted" open={open}  size="large" className="semtic__modal" closeIcon>
                    <Modal.Header>{workflow.name}</Modal.Header>
                    <Modal.Content style={{ minHeight: '450px' }}>
                        <Modal.Description>
                            <ReactMarkdown children={local_workflow.description} remarkPlugins={[remarkGfm]} />
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                    <Button onClick={this.props.close}>
                    Close
                  </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        );
    }
}

export default ViewWorkflow;
