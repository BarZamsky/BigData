import React, { Component, Fragment } from 'react'
import {Bar as BarChart} from 'react-chartjs-2';
import axios from 'axios';
import Dropdown from './Dropdown'
import DatePicker from "react-datepicker";
import Select from 'react-select';

import "react-datepicker/dist/react-datepicker.css";

import '../App.css'

const options = [
  { value: 'milk 1%', label: 'Milk 1%' },
  { value: 'milk 3%', label: 'Milk 3%' },
  { value: 'white bread', label: 'White Bread' },
  { value: 'brown bread', label: 'Brown Bread' },
  { value: 'butter', label: 'Butter' },
  { value: 'white cheese', label: 'White Cheese' },
  { value: 'eggs XL', label: 'Eggs XL' },
  { value: 'eggs L', label: 'Eggs L' },
  { value: 'eggs M', label: 'Eggs M' },
  { value: 'kotej', label: 'Kotej' },
  { value: 'onion 1kg', label: 'Onion 1kg' },
  { value: 'tester choise', label: 'Tester Choise' },
  { value: 'banana 1kg', label: 'Banana 1kg' },
  { value: 'milki', label: 'Milki' },
  { value: 'sugar', label: 'Sugar' },
  { value: 'tuna', label: 'Tuna' },
  { value: 'pasta', label: 'Pasta' },
  { value: 'ketchup', label: 'Ketchup' },
  { value: 'sweet corn', label: 'Sweet Corn' },
  { value: 'Coca Cola Zero', label: 'Coca Cola Zero' },
  { value: 'humus', label: 'Humus' },
  { value: 'chiken 1kg', label: 'Chiken 1kg' },
  { value: 'Water 6pc', label: 'Water 6pc' },
  { value: 'potato', label: 'Potato' },
  { value: 'salmon 1kg', label: 'Salmon 1kg' },
];

class ProductBuyChart extends Component {
  constructor(props) {
      super(props);

    const options = {
      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          stacked: true
        }]
      }
    };

      this.state = {
        startDate: new Date(),
        endDate: new Date(),
        selectedOption: "",
        showGraph: false,
        chartData: "",
        chartOptions: options
      };
      this.handleChangeStart = this.handleChangeStart.bind(this);
      this.handleChangeEnd = this.handleChangeEnd.bind(this);
    }


      onSubmitHandler = (e) => {
        console.log(this.state.selectedOption['value']);
        if (this.state.selectedOption['value'] == null) {
          alert("You have to choose product!")
          exit();
        }

        let body = {
          productName: this.state.selectedOption['value'],
          start: this.state.startDate,
          end: this.state.endDate
        }

        console.log(body);
        e.preventDefault();
        axios
        .post("http://localhost:8080/product-volume", body)
        .then(response => {
          this.setState({showGraph: true})
          console.log(response.data);
          let lables = [];
          let values = [];

          for (const obj of response.data) {
            lables.push(obj['vendor']);
            values.push(obj['volume']);
          }

          let data = {
          labels: lables,
          datasets: [{
              label: 'Number of purchases of ' + this.state.selectedOption['label'],
              backgroundColor:[
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: values
          }]
          };

          this.setState({chartData: data})
        })
        .catch(error => {
          console.log(error);
        });
      }


  handleChangeStart(date) {
     this.setState({
       startDate: date
     });
   }

   handleChangeEnd(date) {
      this.setState({
        endDate: date
      });
    }

    handleChange = selectedOption => {
      this.setState({ selectedOption });
      console.log(`Option selected:`, selectedOption);
    };

render() {
  const { chartData, chartOptions } = this.state;
   return (
     <Fragment>
     <div className={this.state.showGraph ? "container" : ""}>
     <h2 className="chart-title">Choose product and dates to compare volume of purchases among the vendors: </h2>
     <div className="data-to-pick">
        <p>Start date: <DatePicker selected={this.state.startDate} onChange={this.handleChangeStart} className="date"/></p>
        <p>End date:   <DatePicker selected={this.state.endDate} onChange={this.handleChangeEnd} className="date"/></p>
        <Select
          value={this.state.selectedOption}
          onChange={this.handleChange}
          options={options}
          className= "select-dropdown"
        />
        <button className="btn-volume" onClick={this.onSubmitHandler}>Send!</button>
     </div>

     {this.state.showGraph ?
     <div className="chart-container">
       <BarChart data={chartData} options={chartOptions} width="600" height="250" />
       </div>
       : <div></div>
     }
     </div>
     </Fragment>
   );
 }
}

export default ProductBuyChart;
