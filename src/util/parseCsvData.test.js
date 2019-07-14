import parseCsvData from './parseCsvData';

const SAMPLE_HEADER =
  'Customer Name,Item Description,Item Price,Quantity,Merchant Name,Merchant Address\n';

const SAMPLE_ROWS = [
  'Butch Coolidge,Tank Top Undershirt,9.50,3,Hero Outlet,123 Main Street\n',
  'Jack Burton,Premium Cowboy Boots,149.99,1,Carpenter Outfitters,99 Factory Drive\n',
  'Ellen Ripley,Tank Top Undershirt,9.50,2,Hero Outlet,123 Main Street\n',
  'Lisbeth Salander,Black Hoodie,49.99,4,Stockholm Supplies,34 Other Avenue\n',
  'Ellen Ripley,Stomper Shoes,129.00,1,Parker Footwear,77 Main Street\n',
];

const EXPECTED_FIRST_ROW = {
  customerName: 'Butch Coolidge',
  itemDescription: 'Tank Top Undershirt',
  itemPrice: 9.5,
  quantity: 3,
  merchantName: 'Hero Outlet',
  merchantAddress: '123 Main Street',
  sales: 3 * 9.5,
};

describe('function parseCsvData', () => {
  it('parses nothing to an empty array', () => {
    expect(parseCsvData()).toEqual([]);
  });

  it('parses an empty string to an empty array', () => {
    expect(parseCsvData('')).toEqual([]);
  });

  it('parses just a header row to an empty array', () => {
    expect(parseCsvData(SAMPLE_HEADER)).toEqual([]);
  });

  it('parses a single row correctly, with sales figure', () => {
    const data = SAMPLE_HEADER + SAMPLE_ROWS[0];
    expect(parseCsvData(data)).toEqual([EXPECTED_FIRST_ROW]);
  });

  it('parses multiple rows', () => {
    const data = SAMPLE_ROWS.reduce(
      (acc, row) => acc + row,
      SAMPLE_HEADER.slice(0),
    );
    const actual = parseCsvData(data);
    expect(actual).toHaveLength(5);
    expect(actual[0]).toEqual(EXPECTED_FIRST_ROW);
  });

  it('assumes the first row is a header row and ignores it', () => {
    const notTheHeader =
      'Fred Upton,Red/Green Socks,12.00,1,Marine Exchange,107 Marina Way\n';
    const data = SAMPLE_ROWS.reduce((acc, row) => acc + row, notTheHeader);
    const actual = parseCsvData(data);
    expect(actual).toHaveLength(5);
    expect(actual[0]).toEqual(EXPECTED_FIRST_ROW);
  });

  it('ignores rows with non-numeric itemPrice', () => {
    const bogusRow =
      'Fred Upton,Red/Green Socks,twelve dollars,1,Marine Exchange,107 Marina Way\n';
    const data = SAMPLE_ROWS.reduce(
      (acc, row) => acc + row,
      SAMPLE_HEADER.slice(0) + bogusRow,
    );
    const actual = parseCsvData(data);
    expect(actual).toHaveLength(5);
    expect(actual[0]).toEqual(EXPECTED_FIRST_ROW);
  });

  it('ignores rows with non-numeric quantity', () => {
    const bogusRow =
      'Fred Upton,Red/Green Socks,12.00,one,Marine Exchange,107 Marina Way\n';
    const data = SAMPLE_ROWS.reduce(
      (acc, row) => acc + row,
      SAMPLE_HEADER.slice(0) + bogusRow,
    );
    const actual = parseCsvData(data);
    expect(actual).toHaveLength(5);
    expect(actual[0]).toEqual(EXPECTED_FIRST_ROW);
  });

  // TODO - Add tests for non-CSV formats
});
