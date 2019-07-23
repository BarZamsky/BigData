import React, {Component, Fragment} from 'react';
import history from '../history';
import Upload from './Upload'
import VendorsChart from './VendorsChart'

import '../app.css';

class Main extends Component {

  uploadFile = () => {
      history.push("/upload")
  }

  onClickHandler = () => {
    history.push("/analytics")
  }

  render() {
    return (
      <div className="main-page">
        <p className="title">BigData project </p>
        <div className="buttons">
          <button onClick={this.uploadFile} className="button-invoice">Upload new invoice</button>
          <button onClick={this.onClickHandler} className="button-two">Analytics</button>
        </div>
        <VendorsChart />
      </div>
    )
  }
}

export default Main;
