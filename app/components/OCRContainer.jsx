import React from 'react';

var OCRContainer = React.createClass({

  getInitialState: function() {
    return {fileName: ''}
  },

  onButtonClick: function() {
    console.log("process image here so that we can get the OCR representation")
    console.log('button click');
    // process file -> OCR
    let upload = request.post(API_VERSION + STORE_IMAGE_ROUTE)
                        .field('file', this.state.file.preview)

  },

  componentWillReceiveProps(nextProps) {
    console.log("process image here so that we can get the OCR representation")
    console.log("componentWillReceiveProps() triggered");
    console.log("this.props");
    console.log(nextProps);
    // debugger;
  },

    render: function () {
      return (
          <div>
            {this.props.uploadedFile ? this.props.uploadedFile.name : "no file detected"}
          </div>
      );
    }
});

export default OCRContainer;
