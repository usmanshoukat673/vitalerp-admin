import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { CanvasJS, CanvasJSChart } from 'canvasjs-react-charts';

class CompDoughnutChart extends Component {
    render() {

        const options = {
            animationEnabled: true,
            title: {
                text: "Test Title",
                fontSize: 20,
                fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
                fontWeight: 600
            },
            subtitles: [{
                text: "71% Positive",
                verticalAlign: "center",
                fontSize: 18,
                fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
                fontWeight: 600,
                dockInsidePlotArea: true
            }],
            data: [{
                type: "doughnut",
                showInLegend: true,
                indexLabel: "{name}: {y}",
                yValueFormatString: "#,###'%'",
                dataPoints: [
                    { name: "Unsatisfied", y: 5 },
                    { name: "Very Unsatisfied", y: 31 },
                    { name: "Very Satisfied", y: 40 },
                    { name: "Satisfied", y: 17 },
                    { name: "Neutral", y: 7 }
                ]
            }]
        }

        return (
            <React.Fragment>
                <Segment>
                    <CanvasJSChart options={options} />
                </Segment>
            </React.Fragment>
        );
    }
}

export default CompDoughnutChart;
