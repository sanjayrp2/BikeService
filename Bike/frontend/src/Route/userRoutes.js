import React from 'react';
import AddBookingForm from '../Pages/AddBooking';
import AllBooking from '../Pages/AllBooking';
import BookingHistory from '../Pages/BookingHistory';


const userRoutes = [
  { path: '/addbooking', element: <AddBookingForm /> },
  { path: '/seebookings', element: <AllBooking/> },
  { path: '/history', element: <BookingHistory /> },

];

export default userRoutes;
