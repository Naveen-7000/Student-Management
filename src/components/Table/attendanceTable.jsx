import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Button,
} from "@mui/material";
import MultiSelect from "./multiSelect";
import axios from "axios";

function AttendanceTable({ data, token }) {
  const [selectedClass, setSelectedClass] = useState("All");
  const [attendedSubjects, setAttendedSubjects] = useState([]);
  const [studentsAttendance, setStudentsAttendance] = useState(
    data.reduce((acc, student) => {
      acc[student._id] = {
        selectedDate: "",
        formattedDate: "",
      };
      return acc;
    }, {})
  );

  const reversedData = [...data].reverse();

  const formatDate = (e, studentId) => {
    const inputDate = e.target.value;
    const [year, month, day] = inputDate.split("-");
    const formattedDate = new Date(
      year,
      month - 1, // Month is zero-based
      day
    ).toISOString();
    setStudentsAttendance((prevAttendance) => ({
      ...prevAttendance,
      [studentId]: {
        selectedDate: formattedDate,
        formattedDate: inputDate,
      },
    }));
  };

  const handleSubjectAttendanceToggle = async (studentId) => {
    const data = {
      studentId,
      date: studentsAttendance[studentId].selectedDate,
      attendedSubjects: attendedSubjects[studentId]?.subjects || [],
    };
    console.log(data);
    await axios.post(
      "http://localhost:8000/api/admin/mark-attendance",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const filteredData =
    selectedClass === "All"
      ? reversedData
      : reversedData.filter((item) => item.className === selectedClass);

  return (
    <div>
      <FormControl>
        <Select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <MenuItem value="All">All Classes</MenuItem>
          {Array.from(new Set(data.map((item) => item.className))).map(
            (className) => (
              <MenuItem key={className} value={className}>
                {className}
              </MenuItem>
            )
          )}
        </Select>
      </FormControl>
      <TableContainer component={Paper}>
        <Table aria-label="responsive table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>ClassName</TableCell>
              <TableCell>Subjects</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.age}</TableCell>
                <TableCell>{item.className}</TableCell>
                <TableCell>
                  <MultiSelect
                    subjects={item.subjects}
                    selectedNames={attendedSubjects[item._id]?.subjects || []}
                    setSelectedNames={(selectedSubjects) =>
                      setAttendedSubjects((prevAttendedSubjects) => ({
                        ...prevAttendedSubjects,
                        [item._id]: {
                          ...prevAttendedSubjects[item._id],
                          subjects: selectedSubjects,
                        },
                      }))
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    id={`attendance-date-${item._id}`}
                    label="Attendance Date"
                    type="date"
                    value={studentsAttendance[item._id]?.formattedDate || ""}
                    onChange={(e) => formatDate(e, item._id)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      max: new Date().toISOString().split("T")[0], // Disable future dates
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleSubjectAttendanceToggle(item._id)}
                  >
                    Submit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AttendanceTable;
