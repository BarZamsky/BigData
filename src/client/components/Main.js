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
    // const copy = React.string({js|\u00a9|js});;

    return (
      <Fragment>
      <div className="main-page">
        <p className="title">BigData Dashboard </p>
        <div className="buttons">
          <button onClick={this.uploadFile} className="button-invoice">Upload new invoice</button>
          <button onClick={this.onClickHandler} className="button-two">Analytics</button>
        </div>
        <VendorsChart />
      </div>
      <div className="footer">
        <span className="copyright"> {'\u00A9'} Bar Zamsky and Shahar Botesazan </span>
      </div>
      </Fragment>
    )
  }
}

export default Main;
