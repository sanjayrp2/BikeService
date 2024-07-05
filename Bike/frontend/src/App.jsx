import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home/Home';
import SignUp from './Pages/SignUp';
import AddBooking from './Pages/AddBooking';
import AddService from './Pages/AddServices';
import AllService from './Pages/AllServices';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/addbooking' element={<AddBooking/>}/>
        <Route path='/addservice' element={<AddService/>}/>
        <Route path='/allservice' element={<AllService/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
