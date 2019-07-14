import React, { Component } from 'react';

import Table from './Table';

export default class Reader extends Component {
  constructor(props) {
    super(props);
    // Process the raw data
    const { csvData } = props;

    this.data = [];
    if (csvData) {
      // Split the data into rows
      const splits = csvData.split('\n');
      // Remove the header row
      // TODO - use this row to dynamically generate the headers
      splits.shift();
      // Convert to objects that the table can consume
      // TODO - this could also be dynamic. The accessor names are not special.
      this.data = splits.map(row => {
        const cells = row.split(',');
        return {
          customerName: cells[0],
          itemDescription: cells[1],
          itemPrice: cells[2],
          quantity: cells[3],
          merchantName: cells[4],
          merchantAddress: cells[5],
        };
      });
    }
  }

  render() {
    return <Table data={this.data} />;
  }
}
