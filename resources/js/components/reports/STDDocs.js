import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import DocumentReport from './DocumentReport';
import './STDDocs.scss';
import STDDocsHistory from './STDDocsHistory';

class STDDocs extends Component {

    state = {
        loading: false,
        errors: [],
        generate: false,
        view_logs: false,
        selected_standard: {}
    }

    handleGenerate = standard => {
        this.setState({ generate: true, selected_standard: standard });
    }

    handleClose = () => {
        this.setState({ generate: false, selected_standard: {} });
    }

    toggleLogs = () => {
        this.setState((prevState) => {
            return ({ view_logs: !prevState.view_logs });
        });
    }

    render() {
        const { standards, company, token } = this.props;
        const { generate, selected_standard, view_logs } = this.state;
        return (
            <React.Fragment>
                <div className="report__tile">
                    <div className='__tile__header'>
                        <div className='__title'>Documentation Export</div>
                        <div className='__link'>
                            <a onClick={this.toggleLogs}>Reports</a>
                        </div>
                    </div>
                    <div className='__tile__container'>
                        {
                            _.map(standards, std => {
                                return (
                                    <div key={std.standard_id} className='__tile__standard'>
                                        <div>{std.standard.name}</div>
                                        <div><Button className='__generate_button' size='mini' onClick={() => this.handleGenerate(std)}>Generate</Button></div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>

                {
                    generate && <DocumentReport company={company} token={token} standard={selected_standard} open={generate} close={this.handleClose} />
                }

                {
                    view_logs && <STDDocsHistory close={this.toggleLogs} company={company} token={token} open={view_logs} />
                }
            </React.Fragment>
        );
    }

}


export default STDDocs;
