import React, { Component, Fragment } from 'react'
import {Line as LineChart} from 'react-chartjs-2';
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

class ProductPriceChart extends Component {
  constructor(props) {
      super(props);

      const options = {
        scaleShowGridLines: true,
        scaleGridLineColor: 'rgba(0,0,0,.05)',
        scaleGridLineWidth: 1,
        scaleShowHorizontalLines: true,
        scaleShowVerticalLines: true,
        bezierCurve: true,
        bezierCurveTension: 0.4,
        pointDot: true,
        pointDotRadius: 4,
        pointDotStrokeWidth: 1,
        pointHitDetectionRadius: 20,
        datasetStroke: true,
        datasetStrokeWidth: 2,
        datasetFill: true,
        legendTemplate: '<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
      }

      const styles = {
        graphContainer: {
          border: '1px solid black',
          padding: '15px'
        }
      }

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
        if (this.state.selectedOption['value'] == null) {
          alert("You have to choose product!")
          exit();
        }

        console.log(this.state.selectedOption['value']);
        let body = {
          productName: this.state.selectedOption['value'],
          start: this.state.startDate,
          end: this.state.endDate
        }

        console.log(body);
        e.preventDefault();
        axios
        .post("http://localhost:8080/product-price", body)
        .then(response => {
          this.setState({showGraph: true})
          console.log(response.data);
          let lables = [];
          let prices = [];

          for (const obj of response.data) {
            lables.push(obj['vendor']);
            prices.push(obj['prices']);
          }

          let data = {
          labels: lables,
          datasets: [{
            label: this.state.selectedOption['label'] + " price range",
            fillColor: 'rgba(220,220,220,0.2)',
            strokeColor: 'rgba(220,220,220,1)',
            pointColor: 'rgba(220,220,220,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            data: prices,
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
     <h2 className="chart-title">Choose product and dates to compare his price among the vendors: </h2>
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
       <LineChart data={chartData} options={chartOptions} width="600" height="250" />
       </div>
       : <div></div>
     }
     </div>
     </Fragment>
   );
 }
}

export default ProductPriceChart;
