import React, {Component} from 'react';
import Select from 'react-select';

import '../app.css';

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

class Dropdown extends Component {
  constructor(props) {
  super(props);

    this.state = {
      selectedOption: null,
    };
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
        className= "select-dropdown"
      />
    );
  }
}

export default Dropdown;
