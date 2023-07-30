import React, { useState } from 'react';
import { BLUE, DARKBLUE, GRAY, RED } from './Constant';

const RegisterCustomer = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isValidName, setIsValidName] = useState(true);

  const handleRegister = () => {

    if (!name || !email || !phone) {
      alert('Please fill in all fields.');
      return;
    }

    const newCustomer = {
      id: Date.now(),
      name,
      email,
      phone,
    };

    onRegister(newCustomer);
    setName('');
    setEmail('');
    setPhone('');
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const isValid = validateEmail(value);
    setIsValidEmail(isValid);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    const isValid = validatePhone(value);
    setIsValidPhone(isValid);
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    const isValid = validateName(value);
    setIsValidName(isValid);
  };

  const validatePhone = (phone) => {
    // Allow only digits, dashes, and spaces
    const phoneRegex = /^[\d\- ]+$/;
    return phoneRegex.test(phone);
  };

  const validateName = (name) => {
    // Allow alphabetic characters, spaces, hyphens, and apostrophes
    const nameRegex = /^[A-Za-z '-]+$/;
    return nameRegex.test(name);
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Register New Customer</h2>
      <div style={divStyle}>
        <label style={labelStyle}>Name :</label>
        <input type="text" value={name} onChange={handleNameChange} style={ !isValidName ? invalidInputStyle : inputStyle}/>
      </div>
      <div style={divStyle}>
        <label style={labelStyle}>Email :</label>
        <input type="email" value={email} onChange={handleEmailChange} style={ !isValidName ? invalidInputStyle : inputStyle}/>
      </div>
      <div style={divStyle}>
        <label style={labelStyle}>Phone :</label>
        <input type="text" value={phone} onChange={handlePhoneChange} style={ !isValidName ? invalidInputStyle : inputStyle}/>
      </div>
      <button disabled={!isValidEmail || !isValidName || !isValidPhone} style={isValidEmail && isValidName && isValidPhone ? buttonStyle : invalidButtonStyle} onClick={handleRegister}>Register</button>
    </div>
  );
};

const containerStyle = {borderWidth:1, borderColor:GRAY, borderRadius:5, padding:5, borderStyle:'solid', minWidth:'35%;'};
const titleStyle = {margin:0, padding:5, color:DARKBLUE};
const invalidInputStyle = {fontSize : 14, padding: 5, color: RED, marginLeft:5};
const inputStyle = { fontSize : 14, padding: 5, marginLeft:5};
const labelStyle = { fontSize : 14 , fontWeight:'bold'}
const divStyle = { padding : 5};
const buttonStyle = {padding:10, margin:10, borderWidth:0, borderRadius:5, fontSize : 15, color:'#FFF',  backgroundColor:DARKBLUE};
const invalidButtonStyle = {padding:10, margin:10, borderWidth:0, borderRadius:5, fontSize : 15, color:'#FFF',  backgroundColor:RED};
export default RegisterCustomer;