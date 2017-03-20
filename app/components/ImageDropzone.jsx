import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const API_VERSION  = '/v1',
      STORE_IMAGE_ROUTE = '/store_to_s3';


var DropzoneDemo = React.createClass({

  getInitialState: function() {
    return {
      file: null
    }
  },

  handleImageUpload: function(file) {
    /** POST the uploaded file using backend API which will end up storing
    the file on S3.
    **/
    let upload = request.post(API_VERSION + STORE_IMAGE_ROUTE)
                        .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }})

  },

  onDrop: function (acceptedFile, rejectedFile) {
    /** If a valid file is uploaded, this will add the contents of the file
    to the state as well as handleImageUpload.

    TODO: file validation
    **/
      console.log('Accepted file: ', acceptedFile);
       this.handleImageUpload(acceptedFile);
      this.setState({
        file: acceptedFile
      })
      console.log('Rejected file: ', rejectedFile);
    },

    render: function () {
      let img_preview_url = this.state.file ? this.state.file[0].preview : null;

      return (
          <div>
            <Dropzone
              className='dropzone'
              onDrop={this.onDrop}
              // disableClick={true}
              multiple={false}
              >
              <div>Try dropping some files here, or click to select files to upload.</div>
              <div>{this.state.file ? <img id='img-preview' src={img_preview_url} /> : false}</div>
            </Dropzone>

          </div>
      );
    }
});

export default DropzoneDemo;
