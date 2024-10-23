import React, { Component } from 'react';
import { NotificationManager } from 'react-notifications';
import { Button, Dropdown, Form, Modal } from 'semantic-ui-react';
import axiosInstance from '../../../api/api';

class AssignDocument extends Component {

    state = {
        open: true,
        loading: false,
        all_sections: [],
        sections: [],
        errors: [],
    }

    componentDidMount() {
        const { company, document } = this.props;

        this.setState({ loading: true });

        axiosInstance.get(`/api/user/cjfm/get-sections/${company.id}/${document.enc_id}`).then(e => {

            const sections = _.map(e.data.document_sections, (sec, index) => {
                return sec.section_id;
            });
            this.setState({ loading: false, all_sections: e.data.sections, sections: sections });

        }).catch(err => {
            if (err.response.status === 500) {
                this.setState({ errors: [], loading: false });
            }
            if (err.response.status === 401) {
                this.props.history.push('/login');
            }
        });
    }

    handleSectionChange = (event, { value }) => {

        this.setState({ sections: value });

        const { errors } = this.state;

        if (errors.length > 0 && errors[0].hasOwnProperty(sections)) {
            delete errors[0][sections];
            this.setState({ errors: errors });
        }
    }

    handleClose = () => {
        this.props.onclose();
    }

    handleAssign = () => {
        const { sections } = this.state;

        const { document } = this.props;

        this.setState({ loading: true });

        axiosInstance.post(`/api/user/cjfm/assign-sections`, {
            document_id: document.enc_id,
            sections: sections,
        }).then(e => {
            const sections = _.map(e.data.document_sections, (sec, index) => {
                return sec.section_id;
            });

            this.setState({ sections: sections, loading: false });

            this.props.onclose();
            NotificationManager.success('Sections successfully assigned!', 'Success');
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

        const { open, all_sections, sections, errors, loading } = this.state;
        const { document } = this.props;

        const sectionsOptions = _.map(all_sections, (sec, index) => ({
            key: sec.id,
            text: `${sec.standard.name} - ${sec.menu_name}`,
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
                                <label>Select Sections:</label>
                                <Dropdown disabled={loading} placeholder='Sections' onChange={this.handleSectionChange} fluid value={sections} multiple search selection options={sectionsOptions} />
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

export default AssignDocument;
