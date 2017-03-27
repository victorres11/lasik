import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { Alert } from 'react-bootstrap';

var ImageDropzone = React.createClass({

  handleImageUpload: function(file) {
    /** POST the uploaded file using backend API which will end up storing
    the file on S3.
    **/
    let upload = request.post(this.props.apiVersion + this.props.storeImageRoute)
                        .field('file', file)

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      } else {
      console.log("Uploaded successfully to s3");
      }
    })

    this.props.onDrop(file);
  },

    render: function () {
      let alertInstance = (
              <Alert
                bsStyle="success">
                File has been uploaded successfully!
              </Alert>
            );

      return (

          <div>
            {this.props.uploadedFile ? alertInstance : null}
            <Dropzone
              className='dropzone'
              onDrop={this.handleImageUpload}
              multiple={false}
              >
              {this.props.uploadedFile ? <i className="fa fa-check-circle fa-5x dropzone-contents" aria-hidden="true"> </i> : <p className="dropzone-contents"> Try dropping some files here, or click to select files to upload. </p>}
              {/* <div>{this.state.file ? <img id='img-preview' src={imgPreviewUrl} /> : false}</div> */}
            </Dropzone>



          </div>
      );
    }
});

export default ImageDropzone;
