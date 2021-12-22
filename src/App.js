import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Pages/Header';
import Login from './Pages/Login';
import Register from './Pages/Register';


function App() {
  return (
    <div className="App">
          <BrowserRouter>
          <Header />
            <Routes>
              <Route path="/" element={<Register />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
