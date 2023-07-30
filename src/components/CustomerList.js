import React from 'react';
import { DARKBLUE, GRAY, RED } from './Constant';

const CustomerList = ({ customers, onViewCustomer, onDeleteCustomer }) => {
  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Customer List</h2>
      <table>
        <thead>
          <tr>
            <th style={headerStyle}>Name</th>
            <th style={headerStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>
                <button style={viewButtonStyle} onClick={() => onViewCustomer(customer)}>View</button>
                <button style={deleteButtonStyle} onClick={() => onDeleteCustomer(customer.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const containerStyle = {borderWidth:1, borderColor:GRAY, borderRadius:5, padding:5, borderStyle:'solid', minWidth:500};
const titleStyle = {margin:0, padding:5, color:DARKBLUE};
const headerStyle = { fontSize : 16 , fontWeight:'bold', border:'1px solid black;'};
const viewButtonStyle = {padding:10, margin:10, borderWidth:0, borderRadius:5, fontSize : 15, color:'#FFF',  backgroundColor:DARKBLUE};
const deleteButtonStyle = {padding:10, margin:10, borderWidth:0, borderRadius:5, fontSize : 15, color:'#FFF',  backgroundColor:RED};

export default CustomerList;