import {Box} from '@mui/material';
import {useSelector} from 'react-redux';
import {BrowserRouter as Router, Route,Routes,Navigate} from 'react-router-dom'
import Login from './Pages/Authentication/Login';
import AdminHome from './Pages/Admin/Home';
import StudentHome from './Pages/Student/Home';
function App() {

  const admin = useSelector(state=>state.token);
  return (
    <Router>
      <Routes>
        <Route path='/' element={admin.token ? ( admin.isAdmin ? (<AdminHome/>) : (<StudentHome />)) : (<Navigate replace to={"/login"} />)} />
        <Route path='/login' element={<Login />} />
        <Route path="/admin" element={admin.token ? (<AdminHome/>) : (<Navigate replace to={"/login"} />)} />
        <Route path="/student" element={admin.token ? (<StudentHome/>) : (<Navigate replace to={"/login"} />)}/>
      </Routes>
    </Router>
  );
}

export default App;
