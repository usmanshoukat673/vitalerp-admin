import React, { Component } from 'react';
import _ from 'lodash';
import QuickAccess from './QuickAccess';
import Recent from './Recent';
import { connect } from 'react-redux';
import { closeLeftNav, closeSubLeftNav, selectControlFunction, selectCatalogSection } from '../../actions';
import './DefaultAccess.scss';

class DefaultAccess extends Component {

    state = {
        loading: false,
        errors: [],
    }

    componentDidMount() {
        this.props.closeSubLeftNav();
        this.props.selectControlFunction({});
        this.props.selectCatalogSection({});
    }


    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {
        return (
            <>
            <QuickAccess />

            <Recent />
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user.activeUser,
});


export default connect(mapStateToProps, { closeLeftNav, closeSubLeftNav, selectControlFunction, selectCatalogSection })(DefaultAccess);
