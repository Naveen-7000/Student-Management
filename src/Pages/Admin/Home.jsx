import React, {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeToken } from '../../redux/slice/tokenSlice';
import { setUser } from '../../redux/slice/userSlice';
import {Box, Tabs,Tab, useMediaQuery} from '@mui/material'
import axios from 'axios';
import StudentTable from '../../components/Table/studentTable';
import StudentDB from '../../components/Table/studentDB';
import AttendanceDB from '../../components/Table/attendancePage';

const AdminHome = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const isMobile = useMediaQuery((theme)=>theme.breakpoints.down('sm'));

  const {token, username} =  useSelector(state=>state.token);
  const dispatch = useDispatch();
  const getUser = async()=>{
    const response  = await axios.get(`http://localhost:8000/api/admin/getme/${username}`)
    .then(res=> res.data).catch(err=>console.log(err));
    dispatch(setUser(response.user));
  }

  useEffect(()=>{
     getUser();
  },[])

  return (
    <Box
    sx={{
      padding: '0 10px',
    }}
    >
      <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    }}>
       <h1>Admin Portal</h1>
       <button onClick={()=>dispatch(removeToken())}>Logout</button>
      </Box>
      <Tabs
        value={selectedTab}
        onChange={(e, newValue) => setSelectedTab(newValue)}
        centered={!isMobile}
        sx={{
            backgroundColor: 'white',
            boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Tab label="Student" sx={{
          width:'100%',
          borderRadius: '5px',
        }}  />
        <Tab label="Attendance" sx={{
          width:'100%',
        }} />
      </Tabs>

      {selectedTab === 0 ? <StudentDB token={token} /> : <AttendanceDB token={token} />}
    </Box>
  )
}

export default AdminHome