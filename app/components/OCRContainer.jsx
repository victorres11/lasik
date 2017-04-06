import React from 'react';
import request from 'superagent';

var OCRContainer = React.createClass({

  getInitialState: function () {
    return {
        ocrString: "",
    }
  },

  componentWillReceiveProps(nextProps) {
      /***
       * This will take the uploadedFile and make an API call to the back end to do the OCR processing and
       * stores the resulting ocrString locally to display in the textArea.
       ***/
    if (nextProps.uploadedFile !== this.props.uploadedFile) {
      let upload = request.post(this.props.apiVersion + this.props.processImageRoute)
                          .field('file', nextProps.uploadedFile);

      upload.end((err, response) => {
        if (err) {
          console.error(err);
        } else {
            response.body["output"] === "null" ? this.props.handleAlertType("failure") : this.props.handleAlertType("success");
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
            <textarea rows="10" cols="50"
                      value={ this.props.uploadedFile ? this.state.ocrString : "OCR String will be outputted here" }
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
