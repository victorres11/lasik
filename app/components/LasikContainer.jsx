'use strict';
import React from 'react';
import ReactDOM from 'react-dom'
import ImageDropzone from './ImageDropzone';
import OCRContainer from './OCRContainer';

const API_VERSION  = '/v1',
      STORE_IMAGE_ROUTE = '/store_to_s3',
      PROCESS_IMAGE_ROUTE = '/ocr';

var LasikContainer = React.createClass({

  getInitialState: function() {
    return {file: ''}
  },

  onDrop: function (acceptedFile, rejectedFile) {
    /** If a valid file is uploaded, this will add the contents of the file
    to the state as well as handleImageUpload.

    Note that even though we only accept an individual files at a time, it treats
    it in an arry. We'll strip out the array and passback the file right away.

    TODO: file validation
    **/
      console.log('Accepted file: ', acceptedFile);
      this.setState({
        file: acceptedFile[0]
      })
      console.log('Rejected file: ', rejectedFile);
    },


  render: function() {
    return (
      <div>
        <ImageDropzone
          onDrop={this.onDrop}
          uploadedFile={this.state.file}
          apiVersion={API_VERSION}
          storeImageRoute={STORE_IMAGE_ROUTE}
        />
        <OCRContainer
          uploadedFile={this.state.file}
          apiVersion={API_VERSION}
          processImageRoute={PROCESS_IMAGE_ROUTE}
        />

      </div>
    )
  }

});

export default LasikContainer;
