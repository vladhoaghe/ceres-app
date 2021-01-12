import React from "react";
import ReactApexChart from "react-apexcharts";
import "./Plot.css";

class Plot extends React.Component {
    constructor(props) {
        super(props);
        //props.values = [[*Date*, *NDVI value*]]
        this.state = {
            series: [
                {
                    name: "NDVI",
                    data: this.props.values,
                },
            ],
            options: {
                colors: ["#46A346"],
                chart: {
                    toolbar: {
                        show: false,
                    },
                    id: "area-datetime",
                    type: "area",
                },
                annotations: {
                    yaxis: [
                        {
                            y: 30,
                            borderColor: "#999",
                        },
                    ],
                    xaxis: [
                        {
                            borderColor: "#999",
                            yAxisIndex: 0,
                        },
                    ],
                },
                dataLabels: {
                    enabled: false,
                },
                markers: {
                    size: 0,
                    style: "hollow",
                },
                xaxis: {
                    type: "datetime",
                    min: new Date("01 Mar 2020").getTime(),
                    tickAmount: 6,
                },
                tooltip: {
                    x: {
                        format: "dd MMM yyyy",
                    },
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.7,
                        opacityTo: 0.9,
                        stops: [0, 100],
                    },
                },
            },
        };
    }

    render() {
        return (
            <div id="chart">
                <div id="chart-timeline">
                    <ReactApexChart
                        options={this.state.options}
                        series={this.state.series}
                        type="area"
                        height={400}
                    />
                </div>
            </div>
        );
    }
}

export default Plot;
