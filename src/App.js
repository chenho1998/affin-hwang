import React, { useEffect, useState } from 'react';
import RegisterCustomer from './components/RegisterCustomer.js';
import CustomerList from './components/CustomerList';
import CustomerDetail from './components/CustomerDetail';
import axios from 'axios';
import { BLUE, DARKBLUE, GRAY, LIGHTBLUE } from './components/Constant.js';

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [page , setPage] = useState(0);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api.php');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleRegister = async (newCustomer) => {
    try {
      const response = await axios.post('http://localhost:8000/api.php', newCustomer);
      //setCustomers([...customers, response.data]);
      let result = response.data.result;
      if(result){
        alert('Created success.');
      }else{
        alert('Created failed.');
      }
      fetchCustomers();
    } catch (error) {
      console.error('Error registering customer:', error);
    }
  };

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleDeleteCustomer = async (customerId) => {
    try {
      await axios.delete(`http://localhost:8000/api.php/${customerId}`,{ data: { customerId } });
      fetchCustomers();
      setSelectedCustomer(null);
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <div style={{padding:10}}>
      <h1>Customer Information Management</h1>
      
      <button onClick={()=>setPage(1)} style={page == 1 ? selectedButtonStyle : buttonStyle}>
        <text style={page == 1 ? selectedButtonText : buttonText}>
          NEW CUSTOMER
        </text>
      </button>
      <button onClick={()=>setPage(2)} style={page == 2 ? selectedButtonStyle : buttonStyle}>
        <text style={page == 2 ? selectedButtonText : buttonText}>
          CUSTOMER LIST
        </text>
      </button>
        {
          page == 1 && (
            <RegisterCustomer onRegister={handleRegister} />
          )
        }
        {
          page === 2 && (
            <div>
              <CustomerList
                customers={customers}
                onViewCustomer={handleViewCustomer}
                onDeleteCustomer={handleDeleteCustomer}
              />
              
              {selectedCustomer && <CustomerDetail customer={selectedCustomer} />}
            </div>
          )
        }


    </div>
  );
};

const selectedButtonStyle = {backgroundColor:BLUE, padding:10, margin:10, borderWidth:0, borderRadius:5};
const selectedButtonText = {color:'white', fontSize:25};

const buttonStyle = {padding:10, margin:10, borderWidth:1, borderRadius:5, borderColor:BLUE, backgroundColor:'#FFF'};
const buttonText = {fontSize:25};

export default App;