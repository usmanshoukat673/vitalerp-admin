import React, { Component } from "react";
import { Modal, Checkbox, Button, Form, Dropdown } from "semantic-ui-react";
import CloseIcon from '@mui/icons-material/Close';
import errorHandler from "../../utils/errorHandler";
import fileSaver from "../../utils/fileSaver";
import "./DownloadSOAReport.scss";
import axiosInstance from "../../api/api";

class DownloadSOAReport extends Component {
    state = {
        loading: false,
        errors: [],
    };
    handleGenerate = () => {
        const { standard } = this.props;

        this.setState({ loading: true });

        axiosInstance.post(`/api/user/reports/get-soa-report`,
            {
                standard_id: standard.standard.id,
                name: standard.standard.name,
            },
            {
                responseType: "blob",
            }
        )
            .then(e => {
                this.setState({ loading: false });
                fileSaver(e.data, `${standard.standard.name}._SOA_Report.xlsx`);
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

    render() {
        const { standard, open } = this.props;
        const { loading, errors } = this.state;


        return (
            <Modal
                className="semtic__modal document__report__modal"
                open={open}
                onClose={() => { }}
                size="small"
            >
                <Modal.Content className="cc_modal_container">
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
                    <p>
                        Click download report button to get SOA Report... needs to update the lang.
                    </p>
                </Modal.Content>
                <Modal.Actions className="modal__actions">
                    <div className="__actions">
                        <Button
                            size="mini"
                            onClick={this.handleGenerate}
                            className={loading ? 'loading __generate_button' : '__generate_button'}
                            disabled={loading}
                        >
                            Download Report
                        </Button>
                    </div>
                </Modal.Actions>
            </Modal>
        );
    }
}

export default DownloadSOAReport;
