import { useState, useEffect } from 'react';
import { loginUser } from '../Service/api';
import { onSuccess, onError } from '../helpers/alert';
import axios from 'axios';
import { authenticate } from '../helpers/auth';

import {
  Button,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  Typography,
  styled,
} from '@mui/material';
// import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
const usersUrl = 'http://localhost:8000/api/';

const initialValue = {
  email: '',
  password: '',
  buttonText: 'Login',

  error: '',
  success: '',
};

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px;
`;

const LoginUser = () => {
  const [user, setUser] = useState(initialValue);
  const { email, password, buttonText, error, success } = user;
  let navigate = useNavigate();

  const onValueChange = (e) => {
    console.log(e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const addUserDetails = async () => {
    // setUser({ ...user, buttonText: 'Registering' });

    //
    // if (a === 1) {
    //
    // }
    await await axios
      .post(`${usersUrl}login`, user)
      .then((response) => {
        authenticate(response, () => {
          if (response.status === 200) {
            return navigate('/all');
          }
        });
      })
      .catch((error) => console.log(error));

    // setUser({ ...user, buttonText: 'Registering' });

    // navigate('/all');
  };

  return (
    <Container>
      {success && onSuccess}
      {error && onError}
      <Typography variant="h4">Login User</Typography>

      <FormControl>
        <InputLabel htmlFor="my-input">Email</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="email"
          value={email}
          id="my-input"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Password</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="password"
          value={password}
          id="my-input"
        />
      </FormControl>

      <FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={() => addUserDetails()}
        >
          {buttonText}
        </Button>
      </FormControl>
    </Container>
  );
};

export default LoginUser;
