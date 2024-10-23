import React, { Component } from 'react';
import Axios from "axios";
import errorHandler from "../../utils/errorHandler";
import { Button } from 'semantic-ui-react';
import showTZDate from '../../utils/showTZDate';
import fileSaver from "../../utils/fileSaver";
import './ReportLog.scss';

class ReportLog extends Component {

    state = {
        loading: false,
        errors: [],
    }

    handleDownload = (log) => {

        this.setState({ loading: true });

        axiosInstance.post(`/api/user/reports/download-doc-report`,
            {
                report_id: log.id,
            },
            {
                responseType: "blob",
            }
        )
            .then(e => {
                this.setState({ loading: false });
                fileSaver(e.data, `${log.name}`);
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
    }

    render() {

        const { loading } = this.state;
        const { log, company } = this.props;

        return (
            <div className='rpt__log'>
                <div className='__title'>{log.name}</div>
                <div className='__manifest'>manifest.xlsx</div>
                <div className='__created_at'>
                    {showTZDate(log.created_at, company.timezone)}
                </div>
                <div className='__download'>
                    <Button
                        size="mini"
                        onClick={() => { this.handleDownload(log) }}
                        className={loading ? 'loading __generate_button' : '__generate_button'}
                        disabled={loading}
                    >
                        Download
                    </Button>
                </div>
            </div>
        );
    }
}

export default ReportLog;
