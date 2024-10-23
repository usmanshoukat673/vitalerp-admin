import React, { Component } from "react";

import { loadAllData } from "./DataHandling";
import BLineChart from './BLineChart';
import './BChart.scss';
import showCurrentTZDate from '../../../utils/showCurrentTZDate';
import moment from 'moment';
import { Header } from "semantic-ui-react";

class BChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            dataPoints: [],
            body_width: 800
        };

        window.addEventListener("resize", this.resize().bind(this));
    }
    // document.body.clientWidth
    componentDidMount() {

        this.props.logs.forEach((log) => {
            this.setState((prevState) => ({
                dataPoints: [{
                    date: moment(log.created_at, moment.defaultFormat).toDate(),
                    value: log.latency
                }, ...prevState.dataPoints],
            }));
        });

        this.load();


    }

    resize() {
        let t;

        return event => {
            // if (t !== false) {
            //     clearTimeout(t);
            // }
            // t = setTimeout(() => {
            //     const state = Object.assign(this.state, {
            //         body_width: 800
            //     });
            //     this.setState(state);
            // }, 100);
        };
    }

    load() {
        // loadAllData(this.loaded.bind(this));

        // setTimeout(() => {
        //     this.load();
        // }, 1000);
    }

    loaded(data) {
        this.setState({ data: data });
    }

    render() {

        const { dataPoints } = this.state;

        return (
            <div>
                {dataPoints.length > 0 ? (

                    <React.Fragment>
                        <Header style={{ marginTop: '20px' }} as="h4">Last 24 hours Uptime Chart</Header>

                        <BLineChart
                            className="LineChartComponet"
                            data={dataPoints}
                            width={this.state.body_width}
                            height={430}
                            xFn={d => d.date}
                            yFn={d => d.value}
                            yDomain={[0, 100]}
                            margin={{ top: 20, left: 40, bottom: 20, right: 20 }}
                        />
                    </React.Fragment>
                ) : ''}
            </div>
        );
    }
}

export default BChart;
