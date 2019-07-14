import React, { Component } from 'react';

import Table from './Table';

import { parseCsvData } from '../util';

export default class Reader extends Component {
  constructor(props) {
    super(props);
    // Process the raw data
    const { csvData } = props;

    this.data = parseCsvData(csvData);

    this.totalSales = this.data.reduce((acc, row) => {
      return acc + row.total;
    }, 0);

    console.log(this.totalSales);
  }

  render() {
    return <Table data={this.data} />;
  }
}
