import React, {Component, Fragment} from 'react';
import history from '../history';
import Upload from './Upload'
import ProductBuyChart from './ProductBuyChart'
import ProductPriceChart from './ProductPriceChart'

import '../app.css';

class Main extends Component {

  uploadFile = () => {
      history.push("/upload")
  }

  render() {
    return (
      <div className="main-page">
        <p className="title">BigData project </p>
        <button onClick={this.uploadFile} className="button-invoice">Upload new invoice</button>
        <ProductBuyChart />
        <ProductPriceChart />
      </div>
    )
  }
}

export default Main;
