import React from 'react';

export default ({ props }) => {
  const { csvData } = props;
  console.log('===== GOT CSV DATA ======');
  console.log(csvData);
  return <div className="Reader" />;
};
