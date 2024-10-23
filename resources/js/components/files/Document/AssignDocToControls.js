import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { Button, Dropdown, Form, Modal } from 'semantic-ui-react';
import axiosInstance from '../../../api/api';

class AssignDocToControls extends Component {

    state = {
        open: true,
        loading: false,
        all_controls: [],
        controls: [],
        errors: [],
    }

    componentDidMount() {
        const { token, company, document } = this.props;

        this.setState({ loading: true });

        axiosInstance.get(`/api/user/cjfm/get-controls/${company.id}/${document.enc_id}`).then(e => {

            const controls = _.map(e.data.document_controls, (sec, index) => {
                return sec.control_id;
            });
            this.setState({ loading: false, all_controls: e.data.controls, controls: controls });

        }).catch(err => {
            if (err.response.status === 500) {
                this.setState({ errors: [], loading: false });
            }
            if (err.response.status === 401) {
                this.props.history.push('/login');
            }
        });
    }

    handleControlChange = (event, { value }) => {

        this.setState({ controls: value });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(controls)) {
            delete errors[0][controls];
            this.setState({ errors: errors });
        }
    }

    handleClose = () => {
        this.props.onclose();
    }

    handleAssign = () => {
        const { controls } = this.state;

        const { document, company } = this.props;

        this.setState({ loading: true });

        axiosInstance.post(`/api/user/cjfm/assign-controls`, {
            document_id: document.enc_id,
            controls: controls,
            comp_id: company.id
        }).then(e => {
            const controls = _.map(e.data.document_controls, (sec, index) => {
                return sec.control_id;
            });

            this.setState({ controls: controls, loading: false });

            this.props.onclose();
            NotificationManager.success('Controls successfully assigned!', 'Success');
        }).catch(err => {
            if (err.response.status === 500) {
                this.setState({ errors: [], loading: false });
            }
            if (err.response.status === 401) {
                this.props.history.push('/login');
            }
        });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { open, all_controls, controls, errors, loading } = this.state;
        const { document } = this.props;

        const controlsOptions = _.map(all_controls, (sec, index) => ({
            key: sec.id,
            text: `${sec.number} ${sec.name} (${sec.standard.name})`,
            value: sec.id,
        }));

        return (
            <React.Fragment>
                <Modal
                    size="tiny"
                    open={open}
                    className="semtic__modal"
                >
                    <Modal.Header>Assign {document.name}</Modal.Header>
                    <Modal.Content style={{ height: '300px' }}>

                        <Form.Group>
                            <Form.Field>
                                <label>Select Controls:</label>
                                <Dropdown disabled={loading} placeholder='Controls' onChange={this.handleControlChange} fluid value={controls} multiple search selection options={controlsOptions} />
                            </Form.Field>
                        </Form.Group>

                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.handleClose} disabled={loading}>
                            Cancel
                        </Button>
                        <Button className={loading ? 'loading' : ''} positive onClick={this.handleAssign}>
                            Submit
                        </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        );
    }
}

export default AssignDocToControls;
