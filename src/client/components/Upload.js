import React, { Component, Fragment } from 'react'
import history from '../history';
import axios from 'axios'

import '../App.css'

class Upload extends Component {
  constructor() {
    super()
    this.state = {
      selectedFile: null,
      loaded: 0,
      done: false
    }
  }
  handleselectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }
  handleUpload = () => {
    const data = new FormData()
    data.append('file', this.state.selectedFile, this.state.selectedFile.name)

    axios
      .post("http://localhost:8080/upload", data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
            done: true
          })
        },
      })
      .then(res => {
        console.log(res.statusText)
      })
  }

  onClickHandler = (e) => {
      history.push("/");
  }

  render() {
    return (
      <Fragment>
      <p className="upload-title">Upload new invoice </p>
      <div className="upload-main">
      <p className="text-upload" >Upload invoice - </p>
        <input className="files-btn" type="file" name="" id="" onChange={this.handleselectedFile} />
        <button className="files-btn" onClick={this.handleUpload}>Upload</button>
        <div className="upload-persent"> {Math.round(this.state.loaded, 2)} %</div>
        <div>
          {this.state.done ? <p> file uploaded successfuly !! </p> : <p> </p>}
        </div>
      </div>
      <button className="btn-back" onClick={this.onClickHandler}> Back </button>
      </Fragment>
    )
  }
}

export default Upload
