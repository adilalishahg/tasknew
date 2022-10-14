import { useState } from 'react';
import { addUser } from '../Service/api';
import { onSuccess, onError } from '../helpers/alert';
import {Formik,Field,Form,ErrorMessage} from 'formik'
import * as Yup from "yup";

import {
  Button,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  TextField,
  Typography,
  styled,
} from '@mui/material';
// import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

const initialValue = {
  username: '',
  email: '',
  password: '',
  city: '',
  buttonText: 'Register',
  isSubmitting: '',

  error: '',
  success: '',
};

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px;
`;
const TextField1 = styled(TextField)`
    width: 100%;
    
    
        margin-top: 20px;
`;


const AddUser = () => {
  const buttonstyle = {marginTop:"5%", marginLeft:"40%"}
  const [user, setUser] = useState(initialValue);
  const { city, username, email, password, buttonText, error, success,isSubmitting } = user;
  let navigate = useNavigate();

  const onValueChange = (e) => {
    console.log(e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const validate = Yup.object().shape({
    city: Yup.string()
      .min(4, "Must be 4 charecters or more")
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    username: Yup.string()
      .min(4, "Must be 4 charecters or more")
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string()
      .email("Enter valid Email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required")
  });
  
  const onSubmit =  async(values,props) => {
    setUser({ ...user, buttonText: 'Registering',isSubmitting:"true" });
    const response=await addUser(user, setUser);
 
    console.log(response.status)
    if(response.status===200){
      onSuccess("User Added")
      navigate('/all');
      setUser({ ...user, buttonText: 'Register' ,isSubmitting:""});
      // navigate('/all');
    }else{
      onError("User Not Added")
      // console.log(response)
      setUser({ ...user, buttonText: 'Register' ,isSubmitting:""});
    }
    // // // a();


  };

  return (
    <Container>
      {success && onSuccess}
      {error && onError}
      <Typography variant="h4">Add User</Typography>

    <Formik initialValues={initialValue} validationSchema={validate} onSubmit={onSubmit}>
        {(props)=>(
          <Form>

        <Field as={TextField1}  fullWidth label="User Name" placeholder='Enter your name' name="username" helperText = {<ErrorMessage name="username"/>}
           />
        <Field as={TextField1}  fullWidth label="User Email" placeholder='Enter your Email' name="email"  helperText = {<ErrorMessage name="email"/>}
         
          id="my-input"/>
        <Field as={TextField1}  fullWidth label="User password" placeholder='Enter your password' name="password" type="password" helperText = {<ErrorMessage name="password"/>}
         
          id="my-input"/>
        <Field as={TextField1} o fullWidth label="User city" placeholder='Enter your city' name="city"  helperText = {<ErrorMessage name="city"/>}
         
          id="my-input"/>
       {/* <FormControl>
        <InputLabel htmlFor="my-input">Username</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="username"
          value={username}
          id="my-input"
        />
      </FormControl> */}
      {/* <FormControl>
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
        <InputLabel htmlFor="my-input">City</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="city"
          value={city}
          id="my-input"
        />
      </FormControl> */}
      
        <Button
        style = {buttonstyle}
          variant="contained"
          color="primary"
          type="submit"
          disabled={isSubmitting}
        >

          {isSubmitting?"Submitting":buttonText}
        </Button>
     
      </Form>
        )
    }  
    </Formik>
    </Container>
  );
};

export default AddUser;
