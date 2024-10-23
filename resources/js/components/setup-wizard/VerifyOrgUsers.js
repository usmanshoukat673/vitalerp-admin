import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import { MdKeyboardArrowRight } from 'react-icons/md';
import './VerifyOrgUsers.scss';

class VerifyOrgUsers extends Component {

    state = {
        errors: [],
        loading: false,
        just_me: false
    }

    componentDidMount() {
        if (_.isEmpty(this.props.user)) {
            this.props.history.push('/login');
        }
        else if (_.isEmpty(this.props.company)) {
            this.props.history.push('/select-organization');
        }
    }

    handleGoBack = () => {
        const { company } = this.props;
        if (!this.state.just_me) {
            this.props.history.push(`/${company.slug}/onboarding/confirm-organization`);
        }
    }

    handleProceed = () => {
        const { company } = this.props;
        if (!this.state.just_me) {
            this.props.history.push(`/${company.slug}/onboarding/adding-peoples`);
        }
        else {
            this.props.history.push(`/dashboard`);
        }

    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const {
            loading,
            just_me
        } = this.state;
        const { company, token, leftnav, user } = this.props;

        return (
            <div className={leftnav.open_sub ? 'sub__slide__menu_opened' : ''} >

                <div className="__coorz">
                    <div className="__coorz__header">
                        Welcome back, {`${user.first_name}`}!
                    </div>
                    <div className="__coorz__sub__header">
                        <div className="__coorz__sub__header__left">
                            Let’s finish setting up your account
                        </div>
                        <div className="__coorz__sub__header__right">
                            <div className="__coorz__cust__progress__label">Your account is 54% complete</div>
                            <div>
                                <div className="__coorz__cust__progress">
                                    <div className="__current__progress" style={{ width: '54%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="__coorz__setup__steps">
                        <div className="__coorz__setup__step step_1">
                            <div className="__ss__header"></div>
                            <div className="__ss__body">
                                <div className="step__inactive"><FiCheck /> Login</div>
                                <div className="step__inactive"><FiCheck /> Confirm your organization</div>
                                <div className="step__active"><MdKeyboardArrowRight /> Manage organization users</div>
                                <div className="step__inactive"><FiCheck /> Assign responsibilities</div>
                            </div>
                        </div>
                        <div className="__coorz__setup__step active__step">
                            <div className="__ss__header">
                                Manage organization users
                            </div>
                            <div className="__ss__body">
                                <div className="__ss__question">
                                    How many people are in your organization?
                                </div>
                                <div className="__ss__question__options">
                                    <div onClick={() => { this.setState({ just_me: true }) }} className={just_me ? 'ss__active' : ''}>Just me</div>
                                    <div onClick={() => { this.setState({ just_me: false }) }} className={!just_me ? 'ss__active' : ''}>Multiple People</div>
                                </div>

                                <div className="__ss__question__actions">
                                    <div onClick={this.handleGoBack} className="__acctions__button _goback">Go back</div>
                                    <div onClick={this.handleProceed} className="__acctions__button __active">Proceed</div>
                                </div>
                            </div>
                        </div>
                        <div className="__coorz__setup__step step__full__blank">
                            <div className="__ss__header"></div>
                            <div className="__ss__body">

                            </div>
                        </div>
                        <div className="__coorz__setup__step step__half_blank">
                            <div className="__ss__header"></div>
                            <div className="__ss__body">

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
});

export default withRouter(connect(mapStateToProps, {})(VerifyOrgUsers));
