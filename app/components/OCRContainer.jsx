import React from 'react';
import request from 'superagent';

import { Button } from 'react-bootstrap';

var OCRContainer = React.createClass({

  getInitialState: function () {
    return { imgString: "" }
  },

  onButtonClick: function() {
    console.log("process image here so that we can get the OCR representation");
    // process file -> OCR
    if (this.props.uploadedFile === ""){
      // TODO: Add bootsrap alert here
      console.log("there is no file detected");
    } else {
      console.log("Should be a file here...");
      console.log(this.props.uploadedFile);
      let upload = request.post(this.props.apiVersion + this.props.processImageRoute)
                          .field('file', this.props.uploadedFile);

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

  componentWillReceiveProps(nextProps) {
  },

    render: function () {
      return (
        <div>
          {/* <Button
             bsStyle="primary"
             className='OCR-processing-button'
             onClick={this.onButtonClick}
             >OCR Processing
           </Button><br></br> */}

          <div className="ocr-zone">
            <p className="ocr-contents">{this.props.uploadedFile ? this.state.imgString : "no file detected"}</p>
          </div>
        </div>
      );
    }
});

export default OCRContainer;
