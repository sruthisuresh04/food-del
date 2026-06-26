import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './Pages/Add/Add'
import List from './Pages/List/List'
import Orders from './Pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';
// ...existing imports...

const App = () => {
const url = import.meta.env.VITE_BACKEND_URL;

  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
           <Route path="/" element={<Navigate to="/orders" />} />
          <Route path="/add" element={<Add url={url}/>}/>
          <Route path="/list" element={<List url={url}/>}/>
          <Route path="/orders" element={<Orders url={url}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
