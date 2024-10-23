import React, { Component } from 'react';
import { Segment, Dimmer, Loader, Button, Image, Header, Divider } from 'semantic-ui-react';
import { NotificationManager } from 'react-notifications';
import _ from 'lodash';
import './CompanyLogo.scss';
import axiosInstance from '../../api/api';

class CompanyLogo extends Component {

    state = {
        loading: false,
        errors: [],
        open: true,
        logo: ''
    };

    onFileChange = event => {
        this.setState({ logo: event.target.files[0] });
        this.setState({ errors: [] });
    };

    handlerInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? 'file_input error' : 'file_input';
    };


    displayInputError = (errors, inputName) => {
        return errors.some(error => error.hasOwnProperty(inputName)) ? <p className="form-error-messsage logo-upload-error">
            {errors[0][inputName]}
        </p> : '';
    }


    uploadLogo = () => {
        const { company } = this.props;
        const { logo } = this.state;

        this.setState({ loading: true });

        const formData = new FormData();

        formData.append('logo', logo);
        formData.append('comp_id', company.id);

        axiosInstance.post(`/api/user/org/upload-logo`, formData).then(e => {
            this.setState({ loading: false });

            this.props.uploaded(e.data.company);

        }).catch(err => {

            if (err.response.status === 404) {
                this.setState({ errors: this.state.errors.concat(err.response.data.errors), loading: false });
                NotificationManager.error(err.response.data.errors[0].file, 'Error');
            }

            if (err.response.status === 422) {
                this.setState({ errors: this.state.errors.concat(err.response.data.errors), loading: false });
            }

            if (err.response.status === 500) {
                this.setState({ errors: [], loading: false });
            }
        });
    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { loading, errors, logo } = this.state;
        const { company } = this.props;

        return (
            <React.Fragment>
                <Segment>
                    <h3>Organization Logo</h3>
                    <Divider />

                    <div className="row">
                        <div className="col-md-6">
                            {_.isEmpty(company.logo) ?
                                <Image src='/images/no-image.png' size='small' />
                                : <Image src={`${company.logo}`} size='small' />
                            }
                        </div>

                        <div className="col-md-6">
                            {
                                _.isEmpty(company.logo) ? <h4>Upload a Organization Logo</h4> : <h4>Upload New Organization Logo</h4>
                            }

                            <div className="form-group">
                                <input className={this.handlerInputError(errors, 'logo')} name="logo" onChange={this.onFileChange} type="file" placeholder='File to Upload' />
                                {this.displayInputError(errors, 'logo')}
                            </div>
                            <div className="form-group">
                                <Button
                                    positive
                                    icon='cloud upload'
                                    labelPosition='right'
                                    content="Upload"
                                    onClick={this.uploadLogo}
                                    disabled={!logo}
                                />
                            </div>
                        </div>
                    </div>
                </Segment>
            </React.Fragment>
        );
    }
}

export default CompanyLogo;
