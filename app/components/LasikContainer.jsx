'use strict';
import React from 'react';
import ImageDropzone from './ImageDropzone';
import OCRContainer from './OCRContainer';
import { Grid, Row, Col, Alert, Jumbotron, Navbar } from 'react-bootstrap';

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
      this.setState({
        file: acceptedFile[0]
      });
    },

  render: function() {
    let alertInstance = (
            <Alert
              bsStyle="success">
              File has been uploaded successfully!
            </Alert>
          ),

        imgDropzone = (
            <ImageDropzone
              onDrop={this.onDrop}
              uploadedFile={this.state.file}
              apiVersion={API_VERSION}
              storeImageRoute={STORE_IMAGE_ROUTE}
            />
        ),

        ocrContainer = (
            <OCRContainer
                uploadedFile={this.state.file}
                apiVersion={API_VERSION}
                processImageRoute={PROCESS_IMAGE_ROUTE}
            />
        ),

        navbar = (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    Project Lasik 🐈👊
                </Navbar.Brand>
            </Navbar.Header>
        </Navbar>
    ),

        jumbotron = (
          <Jumbotron>
              <h1>Project Lasik </h1>
              <p>Upload a file to use the OCR to text converter.</p>
          </Jumbotron>
    ),
        uploadAlert = (
            <span>
              {this.state.file ? alertInstance : null}
            </span>
    );

    return (
      <div>
          { navbar }
          { jumbotron }
          { uploadAlert }

      <Grid
        fluid={true}>
        <Row className="show-grid">
          <Col md={4} lg={4} mdOffset={2} lgOffset={2}>{imgDropzone}</Col>
          <Col md={4} lg={4} mdOffset={0} lgOffset={0}>{ocrContainer}</Col>
        </Row>
      </Grid>
      </div>
    )
  }

});

export default LasikContainer;
