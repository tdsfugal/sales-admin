import React, { Component } from 'react';

import Reader from './Reader';

export default class Workspace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      csvData: 'some data',
    };
  }

  onDragover(ev) {
    ev.preventDefault();
    ev.stopPropagation();
  }

  onDrop(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    console.log('===== Drop =======');

    if (ev.dataTransfer.items) {
      console.log('with items');
      // Use DataTransferItemList interface to access the file(s)
      for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[i].kind === 'file') {
          var file = ev.dataTransfer.items[i].getAsFile();
          console.log('... file[' + i + '].name = ' + file.name);
        }
      }
    } else {
      console.log('with files');
      // Use DataTransfer interface to access the file(s)
      for (var j = 0; j < ev.dataTransfer.files.length; j++) {
        const file = ev.dataTransfer.files[j];
        console.log('... file[' + j + '].name = ' + file.name);
      }
    }
  }

  render() {
    const { csvData } = this.state;
    console.log(csvData);

    if (csvData) {
      return (
        <div className="Workspace">
          <Reader props={{ csvData }} />
        </div>
      );
    } else {
      return (
        <div
          className="Workspace"
          onDragOver={this.onDragover}
          onDrop={this.onDrop}
        >
          <h1>Drop CSV file here</h1>
        </div>
      );
    }
  }
}
