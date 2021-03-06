import React, { Component, Fragment } from 'react'
import history from '../history';

import ProductBuyChart from './ProductBuyChart'
import ProductPriceChart from './ProductPriceChart'

import '../app.css'

class Analytics extends Component {

  onClickHandler = () => {
    history.push("/")
  }

  render() {
    return (
      <Fragment>
      <div className="header">
        <button className="btn-back rigth" onClick={this.onClickHandler}>Back</button>
        <p className="title">Analytics screen</p>
      </div>
      <div className="charts_container">
        <ProductBuyChart />
        <ProductPriceChart />
      </div>
      </Fragment>
    )
  }
}

export default Analytics;
