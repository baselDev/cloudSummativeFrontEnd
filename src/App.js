import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/login'; 
import CreateAccount from './pages/createAccount';
import AddBooking from './pages/createBookings'
import BookingView from './pages/viewBookings'

function App() {
  const navigate = useNavigate();
  return(
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/createAccount" element={<CreateAccount />} />
      <Route path = "/addBooking" element={<AddBooking/>} />
      <Route path = "/viewBooking" element={<BookingView/>} />
      </Routes>
  );
};

export default App;