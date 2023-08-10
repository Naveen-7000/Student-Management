import axios from 'axios'
import React, { useEffect, useState } from 'react'
import StudentTable from './studentTable';
import { Button,Modal,Box,TextField,Grid } from '@mui/material';
import MultiSelect from './multiSelect';

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

const StudentDB = ({token}) => {
  const [username,setUserName] = useState('');
  const [password,setPassword] = useState('');
  const [name,setName] = useState('');
  const [age,setAge] = useState('');
  const [className,setClassName] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [students,setStudents] = useState([]);
  const [open,setOpen] = useState(false);
  const [selectedNames, setSelectedNames] = useState([]);


 // Fetch subjects from API (assuming it's an async function)
 useEffect(() => {
  const fetchSubjects = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/admin/subjects',{
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      const data = response.data;
      setSubjects(data.subjects);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  fetchSubjects();
}, []);



  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const removeValues=()=>{
    setName('');
    setAge('');
    setClassName('');
    setUserName('');
    setPassword('');
    setSelectedNames([]);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = {
      name,
      username,
      age,
      className,
      password,
      subjects:selectedNames
    }

    console.log(data,'modal');
     await axios.post("http://localhost:8000/api/admin/createstudent",data,{
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    getAllStudent();
    removeValues();
    handleClose();
  };
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
    <Button onClick={handleOpen}>Create new student</Button>
    <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
  <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <form onSubmit={(e)=>handleSubmit(e)}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e)=>setUserName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Age"
              variant="outlined"
              fullWidth
              margin="normal"
              value={age}
              onChange={(e)=>setAge(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Class Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={className}
              onChange={(e)=>setClassName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <MultiSelect subjects={subjects} selectedNames={selectedNames} setSelectedNames={setSelectedNames} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Create
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
    </Box>
    <Button onClick={handleClose}>Close</Button>
  </Box>
</Modal>
{
  students.length > 0 && <StudentTable data={students} />
}
    </>
  )
}

export default StudentDB