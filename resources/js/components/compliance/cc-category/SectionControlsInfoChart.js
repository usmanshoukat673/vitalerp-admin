import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class SectionControlsInfoChart extends Component {

    state = {
        options: {
            dataLabels: {
                enabled: false,
            },
            legend: {
                show: false
            },
            colors: ['#2722a1', '#2f6cd0', '#2bc4ee', '#d600bc', '#f73829'],
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

export default SectionControlsInfoChart;
