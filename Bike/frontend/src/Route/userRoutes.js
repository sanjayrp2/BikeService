import React from 'react';
import AddBookingForm from '../Pages/AddBooking';
import AllBooking from '../Pages/AllBooking';
import BookingHistory from '../Pages/BookingHistory';
import PageNotFound from '../Pages/NotFound';
import Home from '../Pages/Home/Home';
import AllRecords from '../Pages/AllRecords';
import AllService from '../Pages/AllServices';


const userRoutes = [
  { path: '/', element: <Home /> },
  { path: '/addbooking', element: <AddBookingForm /> },
  { path: '/allbooking', element: <AllRecords/> },
  { path: '/history', element: <BookingHistory /> },
  { path: '/allservices', element: <AllService/> },
  { path: '*', element: <PageNotFound /> },


];

export default userRoutes;
