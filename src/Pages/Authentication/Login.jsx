// LoginForm.js
import React, { useState } from 'react';
import {TextField,Box,Button, useMediaQuery,Tab,Tabs} from '@mui/material';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import { setToken } from '../../redux/slice/tokenSlice';
import {useNavigate} from 'react-router-dom';
const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
//   0 for student and 1 for admin
const dispatch = useDispatch();
const navigate = useNavigate();

  const isMobile = useMediaQuery((theme)=>theme.breakpoints.down('sm'));

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = {
        username:userName,
        password
    }
    if(selectedTab){
        const response = await axios.post(`http://localhost:8000/api/admin/login`,data)
        .then(response => response.data).catch(error => console.log(error));
        dispatch(setToken(response));
        navigate('/admin');
    }else{
        const response = await axios.post(`http://localhost:8000/api/student/login`,data).then(response => response.data).catch(error => console.log(error));
        dispatch(setToken(response));
        navigate('/student');
    }
  };


  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <form onSubmit={handleSubmit} >
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding:isMobile ? '20px' : '25px 75px',
            border: '1px solid black',
            borderRadius:'6px',
            gap:'5px',

        }}>
            <Tabs
        value={selectedTab}
        onChange={(e, newValue) => setSelectedTab(newValue)}
        centered={!isMobile}
        sx={{
            backgroundColor: 'white',
        }}
      >
        <Tab label="Student" />
        <Tab label="Admin" />
      </Tabs>
        <TextField
          label="Username"
          variant="outlined"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
         <Button type="submit" variant="contained" color="primary">
          {selectedTab === 0 ? 'Student Login' : 'Admin Login'}
        </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
