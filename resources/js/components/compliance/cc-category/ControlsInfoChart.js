import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const controlChartColor = ['#313178', '#4e4e94', '#7474b0', '#a1a1ce', '#cfcfe8'];
const lanscapeChartcolor = ['#491173', '#5b2881', '#6d408f', '#7f589d', '#9170ab'];
const thirdpartyChartcolor = ['#295e4a', '#317158', '#398467', '#419776', '#49aa85'];
const threatTrendsChartcolor = ['#b9203f', '#c03652', '#c74c65', '#ce6278', '#d5798b'];
const orgsModuleChartcolor = ['#086278', '#207185', '#398193', '#5291a0', '#6aa0ae'];

const ControlsInfoChart = ({ series, type }) => {

    const [options, setOptinos] = useState({
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        colors: ['#313178', '#4e4e94', '#7474b0', '#a1a1ce', '#cfcfe8'],
        labels: ['Implemented', 'Partially Implemented', 'Not Implemented', 'Excluded', 'Not Applicable'],
    });

    useEffect(() => {
        if (type == 'lanscape') {
            setOptinos({ ...options, colors: lanscapeChartcolor });
        }
        else if (type == 'third-parties') {
            setOptinos({ ...options, colors: thirdpartyChartcolor });
        }
        else if (type == 'threattrend') {
            setOptinos({ ...options, colors: threatTrendsChartcolor });
        }
        else if (type == 'orgsmodule') {
            setOptinos({ ...options, colors: orgsModuleChartcolor });
        }
        else {
            setOptinos({ ...options, colors: controlChartColor });
        }
    }, [type]);

    return <Chart options={options} series={series} type="donut" />
}

export default ControlsInfoChart;
