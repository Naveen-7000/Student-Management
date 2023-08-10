import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function StudentTable({ data }) {
  const reversedData = [...data].reverse();
  return (
    <TableContainer component={Paper}>
      <Table aria-label="responsive table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>ClassName</TableCell>
            <TableCell>Subjects</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reversedData.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.age}</TableCell>
              <TableCell>{item.className}</TableCell>
              <TableCell>
                {item.subjects.length > 0 && item.subjects.map((subject) => (
                  <TableCell key={subject._id} value={subject.name}>
                    {subject.name}
                  </TableCell>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default StudentTable;
