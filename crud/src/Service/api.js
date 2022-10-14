import axios from 'axios';
import { authenticate } from '../helpers/auth';
import { Route, Routes } from 'react-router-dom';
import AllUser from '../components/AllUser';
const usersUrl = 'http://localhost:8000/api';
// import { API } from '../config';

export const getUsers = async (id) => {
  id = id || 'all';
  try {
    return await axios.get(`${usersUrl}/${id}`);
  } catch (error) {
    console.log('Error while calling getUsers api ', error);
  }
};

export const addUser = async (user, setUser) => {
  return await axios
    .post(`${usersUrl}/register`, user)
  //   setUser({ ...user, username: '', email: '', password: '', city: '' });
};

export const loginUser = async (user) => {
  return await axios
    .post(`${usersUrl}/login`, user)
    .then((response) => {
      authenticate(response, () => {
        if (response.status === 200) {
          return (
            <Routes>
              <Route path="/" element={<AllUser />} />
            </Routes>
          );
        }
      });
    })
    .catch((error) => console.log(error));
  //   setUser({ ...user, username: '', email: '', password: '', city: '' });
};

export const deleteUser = async (id) => {
  return await axios
    .delete(`${usersUrl}/delete/${id}`)
};

export const editUser = async (id, user) => {
  return await axios.put(`${usersUrl}/${id}`, user);
}; 
