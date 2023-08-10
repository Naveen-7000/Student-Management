import axios from 'axios'
import React, { useEffect, useState } from 'react'
import StudentTable from './studentTable';
import { Button,Modal,Box,TextField,Grid } from '@mui/material';
import MultiSelect from './multiSelect';
import AttendanceTable from './attendanceTable';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #616161',
  borderRadius:'6px',
  boxShadow: 24,
  p: 4,
};

const AttendanceDB = ({token}) => {
  const [students,setStudents] = useState([]);

    const getAllStudent = async() =>{
        const data = await axios.get(`http://localhost:8000/api/admin/students`,{
          headers:{
            Authorization: `Bearer ${token}`,
          }
        })
        .then(res => res.data).catch(err => console.log(err));

        setStudents(data?.students);
    }

    useEffect(()=>{
    getAllStudent();
    },[]);

  return (
    <>
    {
  students.length > 0 && <AttendanceTable data={students} token={token} />
}
    </>
  )
}

export default AttendanceDB