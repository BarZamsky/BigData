import React, { Component } from 'react'
import '../App.css'
import axios from 'axios'

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
  render() {
    return (
      <div className="upload-main">
      <p className="text-upload" >Add invoice: </p>
        <input className="files-btn" type="file" name="" id="" onChange={this.handleselectedFile} />
        <button className="files-btn" onClick={this.handleUpload}>Upload</button>
        <div> {Math.round(this.state.loaded, 2)} %</div>
        <div>
          {this.state.done ? <p> file uploaded successfuly !! </p> : <p> </p>}
        </div>
      </div>
    )
  }
}

export default Upload
