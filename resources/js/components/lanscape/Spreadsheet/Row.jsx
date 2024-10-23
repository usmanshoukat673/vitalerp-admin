import React from 'react';
import Cell from './Cell';

function Row(props) {
  return (
    <tr>
      {props.rowData.map((value, index) => (
        <Cell key={index} value={value} />
      ))}
    </tr>
  );
}

export default Row;