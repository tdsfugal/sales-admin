import React from 'react';
import ReactTable, { ReactTableDefaults } from 'react-table';

Object.assign(ReactTableDefaults, {
  column: Object.assign(ReactTableDefaults.column, {
    style: {
      fontSize: '14px',
      textAlign: 'left',
    },
    headerStyle: {
      fontSize: '14px',
      fontWeight: 'bold',
      textAlign: 'left',
    },
  }),
});

export default props => {
  const { rows, totalSales } = props;

  let defaultPageSize = 20;
  let showPagination = true;
  if (rows.length < 20) {
    defaultPageSize = rows.length + 1;
    showPagination = false;
  }

  Object.assign(ReactTableDefaults, {
    defaultPageSize,
    showPagination,
  });

  const columns = [
    {
      Header: 'Customer Name',
      accessor: 'customerName',
      Footer: () => <h3>TOTAL SALES</h3>,
    },
    {
      Header: 'Sales',
      accessor: 'sales',
      maxWidth: 80,
      Cell: ({ row }) => `$ ${row.sales.toFixed(2)}`,
      style: Object.assign({}, ReactTableDefaults.column.style, {
        textAlign: 'right',
      }),
      headerStyle: Object.assign({}, ReactTableDefaults.column.headerStyle, {
        textAlign: 'right',
      }),
      Footer: () => <h3>{`$ ${totalSales.toFixed(2)}`}</h3>,
    },
    {
      Header: 'Quantity',
      accessor: 'quantity',
      maxWidth: 80,
      style: Object.assign({}, ReactTableDefaults.column.style, {
        textAlign: 'center',
      }),
      headerStyle: Object.assign({}, ReactTableDefaults.column.headerStyle, {
        textAlign: 'center',
      }),
    },
    {
      Header: 'Price',
      accessor: 'itemPrice',
      Cell: ({ row }) => `$ ${row.itemPrice.toFixed(2)}`,
      maxWidth: 80,
      style: Object.assign({}, ReactTableDefaults.column.style, {
        textAlign: 'right',
      }),
      headerStyle: Object.assign({}, ReactTableDefaults.column.headerStyle, {
        textAlign: 'right',
      }),
    },
    {
      Header: 'Description',
      accessor: 'itemDescription',
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
  return (
    <ReactTable
      data={rows}
      columns={columns}
      sorted={[{ id: 'sales', desc: true }]}
    />
  );
};
