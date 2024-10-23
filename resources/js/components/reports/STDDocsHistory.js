import React, { Component } from 'react';
import errorHandler from "../../utils/errorHandler";
import _ from 'lodash';
import { Modal } from 'semantic-ui-react';
import CloseIcon from '@mui/icons-material/Close';
import ReportLog from "./ReportLog";
import './STDDocsHistory.scss';
import axiosInstance from '../../api/api';

class STDDocsHistory extends Component {

    state = {
        loading: false,
        errors: [],
        logs: [],
    }

    componentDidMount() {
        this.getLogs();
    }

    getLogs = () => {

        this.setState({ loading: true });

        axiosInstance.post(`/api/user/reports/doc-reports-history`)
            .then(e => {
                this.setState({ loading: false, logs: e.data.logs });
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

        const { logs, loading } = this.state;
        const { close, open, company, token } = this.props;

        return (
            <React.Fragment>
                <Modal
                    className="semtic__modal document__report__logs"
                    open={open}
                    onClose={() => { }}
                    size="large"
                >
                    <Modal.Content className="cc_modal_container" className="cc_modal_container">
                        <div className="cccc__header">
                            <div className="__c__number">
                                Documentation Reports
                            </div>
                            <div className="__c__close">
                                <CloseIcon onClick={close} />
                            </div>
                        </div>

                        <div className="__c__divider"></div>

                        {
                            _.map(logs, log => {
                                return (
                                    <ReportLog key={log.id} log={log} company={company} token={token} />
                                );
                            })
                        }


                    </Modal.Content>
                </Modal>
            </React.Fragment>
        );
    }
}

export default STDDocsHistory;
