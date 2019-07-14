import React, { Component } from 'react';

import Reader from './Reader';

export default class Workspace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      csvData: null,
    };

    this.onDragEnter = ev => {
      ev.preventDefault();
      ev.stopPropagation();
    };

    this.onDragOver = ev => {
      ev.preventDefault();
      ev.stopPropagation();
    };

    this.onDrop = ev => {
      ev.preventDefault();
      ev.stopPropagation();
      if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (var i = 0; i < ev.dataTransfer.items.length; i++) {
          // If dropped items aren't files, reject them
          if (ev.dataTransfer.items[i].kind === 'file') {
            const file = ev.dataTransfer.items[i].getAsFile();
            this.loadCsvFile(file);
          }
        }
      } else {
        // Use DataTransfer interface to access the file(s)
        for (var j = 0; j < ev.dataTransfer.files.length; j++) {
          const file = ev.dataTransfer.files[j];
          this.loadCsvFile(file);
        }
      }
    };

    this.loadCsvFile = file => {
      const reader = new FileReader();
      reader.onload = () => this.setState({ csvData: reader.result });
      reader.readAsText(file);
    };
  }

  render() {
    const { csvData } = this.state;
    if (csvData) {
      return (
        <div className="Workspace">
          <Reader csvData={csvData} />
        </div>
      );
    } else {
      return (
        <div
          className="Workspace"
          onDragEnter={this.onDragEnter}
          onDragOver={this.onDragOver}
          onDrop={this.onDrop}
        >
          <h1>Drop CSV file here</h1>
        </div>
      );
    }
  }
}
