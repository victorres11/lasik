'use strict';
import React from 'react';
import ReactDOM from 'react-dom'
import ImageDropzone from './ImageDropzone';
import OCRContainer from './OCRContainer';
import { Grid, Row, Col, Alert } from 'react-bootstrap';

const API_VERSION  = '/v1',
      STORE_IMAGE_ROUTE = '/store_to_s3',
      PROCESS_IMAGE_ROUTE = '/stringify_image';

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
    let alertInstance = (
            <Alert
              bsStyle="success">
              File has been uploaded successfully!
            </Alert>
          );

    let imgDropzone = (<ImageDropzone
      onDrop={this.onDrop}
      uploadedFile={this.state.file}
      apiVersion={API_VERSION}
      storeImageRoute={STORE_IMAGE_ROUTE}/>);

    let ocrContainer =(  <OCRContainer
        uploadedFile={this.state.file}
        apiVersion={API_VERSION}
        processImageRoute={PROCESS_IMAGE_ROUTE}
      />);

    return (
      // <div>
      <div>
        <span>
          {this.state.file ? alertInstance : null}
        </span>

      <Grid
        fluid={true}>
        <Row className="show-grid">
          <Col md={6} mdPush={6}>{ocrContainer}</Col>
          <Col md={6} mdPull={6}>{imgDropzone}</Col>
        </Row>
      </Grid>
      </div>
    )
  }

});

export default LasikContainer;
