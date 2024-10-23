import React, { Component } from 'react';
import { Modal, Button, Icon, Header, Image, Label } from 'semantic-ui-react';
import InstallApp from './InstallApp';
import _ from 'lodash';

import { scaleLinear, scaleBand } from 'd3-scale';
import { line, curveMonotoneX } from 'd3-shape';
import { extent } from 'd3-array';
import { transition } from 'd3-transition';
import XYAxis from './Chart/Axis/xy-axis';
import Line from './Chart/Line/Line';

class LineChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            errors: [],
            uptime_logs: [],
            dataPoints: [],
        };
    }

    componentDidMount() {

        this.props.logs.forEach((log) => {
            this.setState((prevState) => ({
                dataPoints: [{
                    name: log.checked_at,
                    value: log.latency
                }, ...prevState.dataPoints],
            }));
        });

        // const { token, application } = this.props;

        // this.setState({ loading: true });
        // axiosInstance.post(`/api/user/applications/uptime-logs`, { id: application.id }).then(e => {
        //     this.setState({ loading: false, uptime_logs: e.data.logs }, () => {

        //     });

        // }).catch(err => {
        //     if (err.response.status === 500) {
        //         this.setState({ errors: [], loading: false });
        //         NotificationManager.error('Server Error, Please contact customer support.', 'Error');
        //     }
        //     if (err.response.status === 401) {
        //         this.setState({ errors: [], loading: false });
        //         this.props.history.push('/login');
        //     }
        // });

    };

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {

        const { dataPoints } = this.state;

        const parentWidth = 600;

        const margins = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
        };

        const width = parentWidth - margins.left - margins.right;
        const height = 200 - margins.top - margins.bottom;

        const ticks = 5;
        const t = transition().duration(1000);

        const xScale = scaleBand()
            .domain(dataPoints.map(d => d.name))
            .rangeRound([0, width]).padding(0.1);

        const yScale = scaleLinear()
            .domain(extent(dataPoints, d => d.value))
            .range([height, 0])
            .nice();

        const lineGenerator = line()
            .x(d => xScale(d.name))
            .y(d => yScale(d.value))
            .curve(curveMonotoneX);

        return (

            <React.Fragment>
                <svg
                    className="lineChartSvg"
                    width={width + margins.left + margins.right}
                    height={height + margins.top + margins.bottom}
                >
                    <g transform={`translate(${margins.left}, ${margins.top})`}>
                        <XYAxis {...{ xScale, yScale, height, ticks, t }} />
                        <Line data={dataPoints} xScale={xScale} yScale={yScale} lineGenerator={lineGenerator} width={width} height={height} />
                    </g>
                </svg>
            </React.Fragment>
        );
    }
}

export default LineChart;
