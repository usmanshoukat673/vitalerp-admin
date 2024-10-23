import React, { Component } from 'react';
import d3Utils from './utils/utils';
import d3Config from './config/config';

class AlineChart extends Component {
    constructor(props) {
        super(props);
        // We'll fill this out soon
    }

    componentDidMount() {
        const { timeSeriesData } = this.props;
        d3Utils.initializeChart(timeSeriesData, 'monthToDate');

    };

    componentDidUpdate(prevProps) {
        const { timeSeriesData, timeFrame } = this.props;
        if (prevProps.timeSeriesData !== timeSeriesData)
            d3Utils.handleNewData(timeSeriesData, timeFrame);
    }

    componentWillUnmount() {
        // And finally this
    }

    render() {



        return (
            <svg className="line-chart" width="100%" height={d3Config.svgHeight} />
        );
    }
}

export default AlineChart;
