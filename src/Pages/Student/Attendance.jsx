import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

const Attendance = () => {
  const [originalAttendance, setOriginalAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const username = useSelector((state) => state.user.user._id);

  const getAttendance = async () => {
    const response = await axios
      .get(`http://localhost:8000/api/student/attendance/${username}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    setOriginalAttendance(response?.allAttendance);
    setFilteredAttendance(response?.allAttendance);
  };

  useEffect(() => {
    getAttendance();
  }, []);

  const filterAttendanceByDate = () => {
    // Filter attendance records based on selectedDate
    const filteredData = originalAttendance.filter((record) => {
      const formattedDate = new Date(record.date).toISOString().slice(0, 10);
      return formattedDate === selectedDate;
    });
    // Update the displayed attendance
    setFilteredAttendance(filteredData);
  };

  return (
    <Box sx={{ padding: '5px' }}>
      <TextField
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        sx={{ margin: '16px 0px' }}
      />
      <Button variant="contained" onClick={filterAttendanceByDate} sx={{ margin: '20px 5px' }}>
        Filter by Date
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: '16px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Attended Subjects</TableCell>
              <TableCell>Absent Subjects</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAttendance?.map((record) => (
              <TableRow key={record._id}>
                <TableCell>
                  {new Date(record.date).toISOString().slice(0, 10)}
                </TableCell>
                <TableCell>
                  {record.attendedSubjects?.map((subject) => (
                    <span key={subject._id}>{subject.name}, </span>
                  ))}
                </TableCell>
                <TableCell>
                  {record.absentSubjects?.map((subject) => (
                    <span key={subject._id}>{subject.name}, </span>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Attendance;
