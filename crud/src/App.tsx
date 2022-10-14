import  React,{useState} from 'react';
import AddUser from './components/AddUser';
import AllUser from './components/AllUser';
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginUser from './components/LoginUser';
import EditUser from './components/EditUser';
function App() {
  return (
    

    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/all" element={<AllUser />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  );

}
export default App;
