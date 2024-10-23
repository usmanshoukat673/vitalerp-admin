import React, { Component } from 'react';
import _ from 'lodash';
import './RiskTab.scss';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';

class RiskTab extends Component {

    render() {

        const { company, addCustomQuestion } = this.props;

        return (
            <div className="RiskTab__container">
                <div className="RiskTab__sections">
                    <NavLink className="RiskTab__sections__menu" activeClassName="active" to={`/${company.slug}/issue-tracker`}>Issue Tracker</NavLink>
                    <NavLink className="RiskTab__sections__menu" activeClassName="active" to={`/${company.slug}/poam`}>POAM</NavLink>
                </div>
                <div className="risktab__actions">
                    {
                        addCustomQuestion && <Button onClick={() => { this.props.onAddRgClick() }} variant="contained">Add</Button>
                    }

                </div>
            </div>
        );
    }
}

export default RiskTab;
