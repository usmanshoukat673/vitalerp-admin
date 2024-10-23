import React from 'react';
import HeaderCell from './HeaderCell';

function HeaderRow(props) {
  return (
    <tr>
      {props.rowData.map((value, index) => (
        <HeaderCell key={index} value={value} />
      ))}
    </tr>
  );
}

export default HeaderRow;
