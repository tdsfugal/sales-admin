import React, { Component } from 'react';

import Table from './Table';

import { parseCsvData } from '../util';

export default class Workspace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      totalSales: 0,
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
      reader.onload = () => {
        const csvData = reader.result;
        // Parse the csv data and compute total sales
        const rows = parseCsvData(csvData);
        const totalSales = rows.reduce((acc, row) => {
          return acc + row.sales;
        }, 0);
        // Trigger a render cycle
        this.setState({
          rows,
          totalSales,
        });
      };
      reader.readAsText(file);
    };
  }

  render() {
    const { rows, totalSales } = this.state;
    if (rows.length > 0) {
      return (
        <div className="Workspace">
          <Table rows={rows} totalSales={totalSales} />
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
