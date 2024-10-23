import React, { Component } from "react";
import { Modal, Checkbox, Button, Form, Dropdown } from "semantic-ui-react";
import CloseIcon from '@mui/icons-material/Close';
import errorHandler from "../../utils/errorHandler";
import fileSaver from "../../utils/fileSaver";
import "./DocumentReport.scss";
import axiosInstance from "../../api/api";

class DocumentReport extends Component {
    state = {
        loading: false,
        all_domains: true,
        errors: [],
        all_controls: [],
        controls: [],
    };

    componentDidMount() {
        const { standard } = this.props;

        this.setState({ loading: true });

        axiosInstance.post(`/api/user/reports/get-controls`, { standard_id: standard.standard.id })
            .then(e => {
                this.setState({ loading: false, all_controls: e.data.controls });
            })
            .catch((err) => {
                if (err.response.status === 422) {
                    this.setState({
                        errors: this.state.errors.concat(
                            err.response.data.errors
                        ),
                        loading: false,
                    });
                } else {
                    this.setState({ errors: [], loading: false });
                    errorHandler(err);
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

    handlerInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'error' : '';
    }

    displayInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p style={{ marginTop: '5px' }} className="form-error-messsage">
            {errors[0][inputName]}
        </p> : '';
    }

    toggleReportType = () => {
        this.setState((prevState) => {
            return { all_domains: !prevState.all_domains };
        });
    };

    handleGenerate = () => {
        const { standard } = this.props;

        this.setState({ loading: true });

        axiosInstance.post(`/api/user/reports/doc-uploads/report`,
            {
                std_id: standard.standard.id,
            },
            {
                responseType: "blob",
            })
            .then(e => {
                this.setState({ loading: false });
                fileSaver(e.data, `${standard.standard.name}.zip`);
                this.props.close();
            })
            .catch(async (err) => {
                if (err.response.status === 422) {
                    const errors = JSON.parse(await err.response.data.text()).errors;
                    this.setState({ errors: this.state.errors.concat(errors), loading: false });
                } else {
                    this.setState({ errors: [], loading: false });
                    errorHandler(err);
                }
            });
    };

    handleCustomGenerate = () => {
        const { standard } = this.props;
        const { controls } = this.state;

        this.setState({ loading: true });

        axiosInstance.post(`/api/user/reports/doc-uploads/custom/report`,
            {
                std_id: standard.standard.id,
                controls: controls
            },
            {
                responseType: "blob",
            }
        )
            .then(e => {
                this.setState({ loading: false });
                fileSaver(e.data, `${standard.standard.name}.zip`);
                this.props.close();
            })
            .catch(async (err) => {

                if (err.response.status === 422) {
                    const errors = JSON.parse(await err.response.data.text()).errors;
                    this.setState({
                        errors: this.state.errors.concat(
                            errors
                        ),
                        loading: false,
                    });
                } else {
                    this.setState({ errors: [], loading: false });
                    errorHandler(err);
                }
            });
    };

    render() {
        const { standard, open } = this.props;
        const { all_domains, loading, all_controls, controls, errors } = this.state;

        const controlOptions = _.map(all_controls, (ctr, index) => ({
            key: ctr.id,
            text: `${ctr.number} ${ctr.name}`,
            value: ctr.id,
        }));

        return (
            <Modal
                className="semtic__modal document__report__modal"
                open={open}
                onClose={() => { }}
                size="small"
            >
                <Modal.Content className="cc_modal_container" className={all_domains ? 'cc_modal_container' : 'cc_modal_container custom__container'}>
                    <div className="cccc__header">
                        <div className="__c__number">
                            {standard.standard.name}
                        </div>
                        <div className="__c__close">
                            <CloseIcon onClick={this.props.close} />
                        </div>
                    </div>

                    <div className="__c__description">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                    </div>

                    <div className="__c__divider"></div>

                    <div className="__options_to_export">
                        <Checkbox
                            onChange={this.toggleReportType}
                            toggle
                            checked={all_domains}
                            label={
                                all_domains
                                    ? "All Domains Reports"
                                    : "Custom Report"
                            }
                        />
                    </div>

                    {
                        !all_domains && <Form>
                            <Form.Field>
                                <label>Choose Control(s)</label>
                                <Dropdown
                                    className={this.handlerInputError(errors, 'controls')}
                                    placeholder='Choose Control(s)'
                                    onChange={this.handleControlChange}
                                    value={controls}
                                    search
                                    selection
                                    options={controlOptions}
                                    fluid
                                    multiple
                                />
                                {this.displayInputError(errors, 'controls')}
                            </Form.Field>
                        </Form>
                    }


                </Modal.Content>
                <Modal.Actions className="modal__actions">
                    <div className="__actions">
                        {
                            all_domains ? <Button
                                size="mini"
                                onClick={this.handleGenerate}
                                className={loading ? 'loading __generate_button' : '__generate_button'}
                                disabled={loading}
                            >
                                Download Report
                            </Button> : <Button
                                size="mini"
                                onClick={this.handleCustomGenerate}
                                className={loading ? 'loading __generate_button' : '__generate_button'}
                                disabled={loading}
                            >
                                Download Report
                            </Button>
                        }

                    </div>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default DocumentReport;
