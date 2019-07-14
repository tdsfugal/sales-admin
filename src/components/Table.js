import React from 'react';
import ReactTable from 'react-table';

export default props => {
  const { data } = props;
  const columns = [
    {
      Header: 'Customer Name',
      accessor: 'customerName',
    },
    {
      Header: 'Item Description',
      accessor: 'itemDescription',
    },
    {
      Header: 'Item Price',
      accessor: 'itemPrice',
    },
    {
      Header: 'Quantity',
      accessor: 'quantity',
    },
    {
      Header: 'Merchant Name',
      accessor: 'merchantName',
    },
    {
      Header: 'Merchant Address',
      accessor: 'merchantAddress',
    },
  ];
  return <ReactTable data={data} columns={columns} />;
};
