import React from 'react';

function Cell(props) {
    return (
      <td className="cell">
        {props.value}
      </td>
    );
  }
  
  export default Cell;
