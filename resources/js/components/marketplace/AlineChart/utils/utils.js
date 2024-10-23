
import {
    curveMonotoneX,
    line as d3Line,
    select,
} from 'd3';
import _ from 'lodash';

/**
 * build the elements that will be contained within our main SVG
 */
const buildAxes = () => {
    select('.line-chart')
        .append('g')
        .attr('class', 'line-chart-yaxis');

    select('.line-chart')
        .append('g')
        .attr('class', 'line-chart-xaxis')
};

const buildLine = () => {
    select('.line-chart')
        .append('path')
        .attr('class', 'line-chart-line')
};


/**
 * draw elements of the chart based on current settings
 */
const drawAxes = () => {
    select('.line-chart-xaxis')
        .call(xAxis);

    select('.line-chart-yaxis')
        .call(yAxis);
}

const drawLine = (data) => {
    const line = d3Line()
        .x(scaleXData)
        .y(scaleYData)
        .curve(curveMonotoneX);

    select('.line-chart-line')
        .attr('d', line(data));
}

/**
 * invoke functions to draw appropriate changes
 */
const renderChanges = (data) => {
    drawAxes();
    drawLine(data);
}

const initializeChart = (data) => {
    buildAxes();
    buildLine();
    renderChanges(data);
}




/**
 * Adjust the y-scale based on data values given
 */
const adjustYScale = (data) => {
    const maxPoint = _.maxBy(data, point => point.value);
    const maxY = _.max([maxPoint.value, d3Config.defaultMaxYValue]);
    yScale.domain([0, maxY]);
}

/**
 * Adjust the x-scale to fit the settings required by the given time frame
 */
const adjustXScale = (data, timeFrame) => {
    const date = new Date();
    let startDate;

    switch (timeFrame) {
        case 'monthToDate':
            startDate = dateUtils.getStartOfMonth(date);
            break;
        case 'oneYear':
            startDate = dateUtils.subtract(date, 12, 'month');
            break;
        default:
            startDate = new Date(_.first(data).timestamp);
    }
    xScale.domain([startDate, date]);
}

const handleNewData = (data, timeFrame) => {
    adjustYScale(data);
    adjustXScale(data, option);
    renderChanges(data);
}
