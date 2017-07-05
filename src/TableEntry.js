import React from 'react';
import './App.css';

//destructure table contents and make default values'N/A':

const TableEntry = ({No, agency='N/A', expiration_date='N/A', lot_number='N/A', manufacturing_date='N/A', serial_number='N/A', UDI}) => {
  return (
    <tr>
      <td>{No + 1}</td>
      <td>{lot_number}</td>
      <td>{serial_number}</td>
      <td>{expiration_date}</td>
      <td>{manufacturing_date}</td>
      <td>{agency}</td>
      <td className="UDIContainer">
        <a className="seeUDI">Hover to see UDI</a>
        <span className="UDItip">{UDI}</span>
      </td>
    </tr>)
};

export default TableEntry;
