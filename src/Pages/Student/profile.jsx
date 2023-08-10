import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useSelector } from 'react-redux';

const Profile = ({ profileData }) => {
  const user = useSelector((state)=>state.user?.user);
  
  if(!user){
    return <><p>No user</p></>
  }
  
  const { name, age, className, subjects } = user;
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Profile
        </Typography>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="subtitle1">Age: {age}</Typography>
        <Typography variant="subtitle1">Class: {className}</Typography>
        <Typography variant="h6" mt={2}>
          Subjects:
        </Typography>
        <List>
          {subjects.map((subject) => (
            <ListItem key={subject._id}>
              <ListItemText primary={subject.name} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default Profile;
