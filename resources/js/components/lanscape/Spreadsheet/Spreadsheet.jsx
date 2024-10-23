import React from 'react';
import Row from './Row';
import HeaderRow from './HeaderRow';

const headings = [
  ['Item 1', 'Item 2', 'Item 3'] // configuration, [type]
]

const data = [
  ['A1', 'B1', 'C1'], // table 
  ['A2', 'B2', 'C2'],
  ['A3', 'B3', 'C3'],
];

function Spreadsheet() {



  return (
    <table className="spreadsheet">
      <thead>
        {
          headings.map((heading, hindex) => (
            <HeaderRow key={hindex} rowData={heading} />
          ))
        }
      </thead>
      <tbody>
        {data.map((rowData, index) => (
          <Row key={index} rowData={rowData} />
        ))}
      </tbody>
    </table>
  );
}

export default Spreadsheet;
