import React from 'react';
import AddBookingForm from '../Pages/AddBooking';
import AllBooking from '../Pages/AllBooking';
import BookingHistory from '../Pages/BookingHistory';
import PageNotFound from '../Pages/NotFound';
import Home from '../Pages/Home/Home';
import AllRecords from '../Pages/AllRecords';
import AllService from '../Pages/AllServices';


const userRoutes = [
  { path: '/', element: <Home /> },//The root path of the application.
  { path: '/addbooking', element: <AddBookingForm /> },//Path for the add bookings page.
  { path: '/allbooking', element: <AllRecords/> },//Path for the all bookings page.
  { path: '/history', element: <BookingHistory /> },//Path for the History page.
  { path: '/allservices', element: <AllService/> },//Path for the All services page.
  { path: '*', element: <PageNotFound /> },// A wildcard path that matches any route not explicitly defined.


];

export default userRoutes;
