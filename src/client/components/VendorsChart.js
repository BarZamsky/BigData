import React, {
  Component,
  Fragment
} from 'react'
import {
  Bar as BarChart
} from 'react-chartjs-2';
import axios from 'axios';

import '../App.css'

class VendorsChart extends Component {
  constructor(props) {
    super(props);

    const optionsVendors = {
      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          stacked: true,
          ticks: {
            beginAtZero: true,
          callback: function(value) {if (value % 1 === 0) {return value;}},
             fontSize: 16,
             fontColor: 'black'
          }
        }]
      }
    };

    this.state = {
      chartData: "",
      vendorData: "",
      showData: false,
      vendorsOptions: optionsVendors
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
          }, {
            label: 'Total invoices',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
            borderWidth: 0,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: invoiceCount,
            yAxisID: "y-axis-orders"
          }]
        };

        this.setState({
          chartData: data
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  getVendorInvoicesSummary = (vendor) => {
      axios.get(`http://localhost:8080/${vendor}`)
      .then(response => {
        console.log(response.data);
        if (response.data.length == 0) {
          alert("No invoices found for this vendor..")
          return;
        }

        let lables = [];
        let invoiceCount = [];

        for (const obj of response.data) {
          lables.push(obj['month']);
          invoiceCount.push(obj['count']);
        }

        let data = {
          labels: lables,
          beginAtZero: true,
          datasets: [{
            label: 'Invoices issued',
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 0.2)',
            borderWidth: 0,
            hoverBackgroundColor: 'rgba(255, 159, 64, 0.4)',
            hoverBorderColor: 'rgba(255, 159, 64, 1)',
            data: invoiceCount
          }]
        };

        this.setState({
          vendorData: data,
          showData: true
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const {chartData, vendorData, vendorsOptions} = this.state;

    const options = {
      scales: {
        xAxes: [{
          barPercentage: 1,
          categoryPercentage: 0.7
        }],
        yAxes: [{
          id: "y-axis-orders",
          ticks: {
            beginAtZero: true,
            callback: function(value) {
              if (value % 1 === 0) {
                return value;
              }
            },
            fontSize: 16,
            fontColor: 'black'
          }
        }, {
          id: "y-axis-sum",
          ticks: {
            beginAtZero: true,
            callback: function(value) {
              if (value % 1 === 0) {
                return value;
              }
            },
            fontSize: 16,
            fontColor: 'black'
          }
        }]
      },
      onClick: (e, item) => {
          let vendor = this.state.chartData.labels[item[0]._index];
          console.log("getting invoice data for: " +vendor);
          this.getVendorInvoicesSummary(vendor)
        }
    };

    return (
      <Fragment>
      <div className="chart-main">
      <div className = "chart-container" >
      <BarChart data = {chartData}
        options = {options}
        width = "400"
        height = "200" />

        {this.state.showData ?
        <BarChart data = {vendorData}
          options = {vendorsOptions}
          width = "400"
          height = "200" />
          : <div></div>
        }
        </div>
        </div>
        </Fragment>
    );
  }
}

export default VendorsChart;
