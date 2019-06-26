import React, {Component, Fragment} from 'react';
import history from '../history';
import Upload from './Upload'

import '../app.css';

class Main extends Component {
  render() {
    return (
      <div className="main-page">
      <p className="title">BigData - Dashboard </p>
          <Upload />
      </div>
    )
  }
}

export default Main;
