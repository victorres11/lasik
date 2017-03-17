import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';

var DropzoneDemo = React.createClass({

  getInitialState: function() {
    return {
      testInitialState1: ''
    }
  },
    onDrop: function (acceptedFiles, rejectedFiles) {
      request
        .get('https://api.github.com/repos/facebook/react/commits')
        .end( (err, res) => {
          console.log("attempting to set state for testInitialState1");
          this.setState({testInitialState1: res});
          console.log("attempted to set state for testInitialState1");
          console.log(this.state);
        })
      console.log(this.state);
      console.log('Accepted files: ', acceptedFiles);
      console.log('Rejected files: ', rejectedFiles);
    },

    render: function () {
      return (
          <div>
            <Dropzone onDrop={this.onDrop}>
              <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
          </div>
      );
    }
});

export default DropzoneDemo;
