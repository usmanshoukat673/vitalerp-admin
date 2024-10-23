import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { CanvasJS, CanvasJSChart } from 'canvasjs-react-charts';

class CompPieChart extends Component {
    render() {

        const options = {
            exportEnabled: false,
            animationEnabled: true,
            title: {
                text: "Apps",
                fontSize: 20,
                fontFamily: "Lato,'Helvetica Neue',Arial,Helvetica,sans-serif",
                fontWeight: 600
            },
            data: [{
                type: "pie",
                startAngle: 75,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}%",
                dataPoints: [
                    { y: 18, label: "Direct" },
                    { y: 49, label: "Organic Search" },
                    { y: 9, label: "Paid Search" },
                    { y: 5, label: "Referral" },
                    { y: 19, label: "Social" }
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

export default CompPieChart;
