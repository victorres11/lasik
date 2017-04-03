import React from 'react';
import request from 'superagent';

var OCRContainer = React.createClass({

  getInitialState: function () {
    return { ocrString: "" }
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
          ocrString: response.body["output"]
        });
        }
      })

    }
  },

    handleChange(event) {
        this.setState({
            ocrString: event.target.value
        });
    },

    render: function () {
        let textArea = (
            <textarea rows="10" cols="50" value={ this.props.uploadedFile ? this.state.ocrString : "OCR String will be outputted here" }
             onChange={this.handleChange}
            />
        );

      return (
        <div className="ocr-zone">
          { textArea }
        </div>
      );
    }
});

export default OCRContainer;
