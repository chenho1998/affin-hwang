import React from 'react';
import { DARKBLUE, GRAY, RED } from './Constant';

const CustomerDetail = ({ customer }) => {
  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Customer Detail</h2>
      <div style={divStyle}>
        <strong>Name:</strong> {customer.name}
      </div>
      <div style={divStyle}>
        <strong>Email:</strong> {customer.email}
      </div>
      <div style={divStyle}>
        <strong>Phone:</strong> {customer.phone}
      </div>
    </div>
  );
};

const containerStyle = {borderWidth:1, borderColor:GRAY, borderRadius:5, padding:5, borderStyle:'solid', marginTop:5};
const titleStyle = {margin:0, padding:5, color:DARKBLUE};
const divStyle = { padding : 5};
const headerStyle = { fontSize : 16 , fontWeight:'bold'};
const viewButtonStyle = {padding:10, margin:10, borderWidth:0, borderRadius:5, fontSize : 15, color:'#FFF',  backgroundColor:DARKBLUE};
const deleteButtonStyle = {padding:10, margin:10, borderWidth:0, borderRadius:5, fontSize : 15, color:'#FFF',  backgroundColor:RED};


export default CustomerDetail;