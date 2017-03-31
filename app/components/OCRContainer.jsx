import React from 'react';
import request from 'superagent';

import { Button } from 'react-bootstrap';

var OCRContainer = React.createClass({

  getInitialState: function () {
    return { imgString: "" }
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.uploadedFile) {
      console.log("process image here so that we can get the OCR representation");
      // process file -> OCR
      console.log("Should be a file here...");
      let upload = request.post(this.props.apiVersion + this.props.processImageRoute)
                          .field('file', nextProps.uploadedFile);

      upload.end((err, response) => {
        if (err) {
          console.error(err);
        } else {
        console.log("API Call worked");
        this.setState({
          imgString: response.body["output"]
        });
        }
      })

    }
  },

    render: function () {
      return (
        <div className="ocr-zone">
          <p className="ocr-contents">{this.props.uploadedFile ? this.state.imgString : "no file detected"}</p>
        </div>
      );
    }
});

export default OCRContainer;
