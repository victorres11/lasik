'use strict';
import React from 'react';
import ImageDropzone from './components/ImageDropzone';
import OCRContainer from './components/OCRContainer';

let LasikContainer = (
  <div>
    <ImageDropzone />,
    <OCRContainer />
  </div>
)

ReactDOM.render(
  LasikContainer,
  document.getElementById('main')
);
