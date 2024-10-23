import React, { Component } from 'react';
import './RGHeaderRow.scss';

class RGHeaderRow extends Component {

    state = {
        errors: [],
        loading: false,
    }

    render() {

        const { leftnav } = this.props;

        return (
            <div className="RGHeaderRow__body">
                <div className="RGHeaderRow__id">ID</div>
                <div className="RGHeaderRow__standard">Standard</div>
                <div className="RGHeaderRow__domain">Domain</div>
                <div className="RGHeaderRow__riskcontrol">Risk Control</div>
                <div className="RGHeaderRow__question">Question</div>
                <div className="RGHeaderRow__riskowner">Risk Owner</div>
                <div className="RGHeaderRow__severity">Severity</div>
                <div className="RGHeaderRow__probabaility">Probabaility</div>
                <div className="RGHeaderRow__riskrating">Risk Rating</div>
            </div>
        );
    }
}

export default RGHeaderRow;
