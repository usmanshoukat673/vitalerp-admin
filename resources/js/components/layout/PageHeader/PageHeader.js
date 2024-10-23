import React, { Component } from 'react';
import './PageHeader.scss';
import { Container, Grid, Header, Breadcrumb } from 'semantic-ui-react';

class PageHeader extends Component {
    render() {

        const { header, breadcrumb } = this.props;

        return (
            <div className="page__header">
                <div className="heading">
                    {header}
                </div>
                <p>
                    {breadcrumb}
                </p>
            </div>
        );
    }
}

export default PageHeader;
