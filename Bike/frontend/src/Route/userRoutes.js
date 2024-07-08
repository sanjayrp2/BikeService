import React from 'react';
import AddBookingForm from '../Pages/AddBooking';
import AllBooking from '../Pages/AllBooking';
import BookingHistory from '../Pages/BookingHistory';
import PageNotFound from '../Pages/NotFound';


const userRoutes = [
  { path: '/addbooking', element: <AddBookingForm /> },
  { path: '/allbooking', element: <AllBooking/> },
  { path: '/history', element: <BookingHistory /> },
  { path: '/history', element: <BookingHistory /> },
  { path: '*', element: <PageNotFound /> },


];

export default userRoutes;
