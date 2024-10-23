import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class AccountControlsInfoChart extends Component {

    state = {
        options: {
            dataLabels: {
                enabled: false,
            },
            legend: {
                show: false
            },
            colors: ['#0e1132', '#af524b', '#a0dbb3', '#4ac3c1', '#e73353'],
            labels: ['Applicable', 'Not Applicable', 'Implemented', 'Partially Implemented', 'Excluded']
        },
    };

    render() {
        const { series } = this.props;
        const { options } = this.state;
        return (
            <React.Fragment>
                <Chart options={options} series={series} type="donut" />
            </React.Fragment>
        );
    }
}

export default AccountControlsInfoChart;
