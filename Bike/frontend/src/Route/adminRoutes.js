import React from 'react';
import AllService from '../Pages/AllServices';
import AddService from '../Pages/AddServices';
import AllBooking from '../Pages/AllBooking';


const adminRoutes = [
    { path: '/allservices', element: <AllService /> },
    { path: '/addservices', element: <AddService /> },
    { path: '/seeallbookings', element: <AllBooking /> },
];

export default adminRoutes;
