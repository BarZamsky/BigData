import React, { Component, Fragment } from 'react'
import {Bar as BarChart} from 'react-chartjs-2';
import axios from 'axios';

import '../App.css'

class VendorsChart extends Component {
  constructor(props) {
      super(props);

    const options = {
      scales: {
        xAxes: [{
          barPercentage: 1,
          categoryPercentage: 0.7
        }],
        yAxes: [{
          id: "y-axis-orders",
          ticks: {
            precision: 0,
          }
        }, {
          id: "y-axis-sum",
          ticks: {
            precision: 0,
          }
        }]
      }
    };

      this.state = {
        chartData: "",
        chartOptions: options
      };
    }


    componentDidMount = (e) => {
      axios
      .get("http://localhost:8080/vendors")
      .then(response => {
        console.log(response.data);
        let lables = [];
        let invoiceCount = [];
        let totalSum = [];

        for (const obj of response.data) {
          lables.push(obj['name']);
          invoiceCount.push(obj['orders']);
          totalSum.push(obj['sum']);
        }

        let data = {
        labels: lables,
        beginAtZero: true,
        datasets: [{
            label: 'Total incomes',
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 0.2)',
            borderWidth: 0,
            hoverBackgroundColor: 'rgba(255, 159, 64, 0.4)',
            hoverBorderColor: 'rgba(255, 159, 64, 1)',
            data: totalSum,
            yAxisID: "y-axis-sum"
        },{
            label: 'Total invoices',
            backgroundColor:'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
            borderWidth: 0,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: invoiceCount,
            yAxisID: "y-axis-orders"
        }]
        };

        this.setState({chartData: data})
      })
      .catch(error => {
        console.log(error);
      });
    }


render() {
  const { chartData, chartOptions } = this.state;
   return (
     <div className="chart-container">
       <BarChart data={chartData} options={chartOptions} width="600" height="250" />
     </div>
   );
 }
}

export default VendorsChart;
