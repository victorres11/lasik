import React from 'react';
import request from 'superagent';

var OCRContainer = React.createClass({

  getInitialState: function () {
    return { ocrString: "" }
  },

  componentWillReceiveProps(nextProps) {
      /***
       * We'll process the file here when a file as uploaded and get the OCR string result.`
       ***/
    if (nextProps.uploadedFile) {
      // process file -> OCR
      let upload = request.post(this.props.apiVersion + this.props.processImageRoute)
                          .field('file', nextProps.uploadedFile);

      upload.end((err, response) => {
        if (err) {
          console.error(err);
        } else {
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
