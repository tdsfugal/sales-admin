export default function parseCsvData(csvData = '') {
  if (!csvData) return [];

  // Split the data into rows
  const splits = csvData.split('\n');
  // Remove the header row
  // TODO - use this row to dynamically generate the headers
  splits.shift();
  // Convert to objects that the table can consume
  // TODO - this could also be dynamic. The accessor names are not special.
  const data = splits.map(row => {
    // Split the comma separated data
    const cells = row.split(',');

    // Parse the values
    const customerName = cells[0];
    const itemDescription = cells[1];
    const itemPrice = parseFloat(cells[2]);
    const quantity = parseInt(cells[3]);
    const merchantName = cells[4];
    const merchantAddress = cells[5];

    // Compute the row total
    // TODO - Check for NAN
    const sales = itemPrice * quantity;

    // Form record object.  Mix of strings, floats, and integers
    return {
      customerName,
      itemDescription,
      itemPrice,
      quantity,
      merchantName,
      merchantAddress,
      sales,
    };
  });

  return data;
}
