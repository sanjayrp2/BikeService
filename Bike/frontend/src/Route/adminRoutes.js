import React from 'react';
import AllService from '../Pages/AllServices';
import AddService from '../Pages/AddServices';
import AllBooking from '../Pages/AllBooking';
import PageNotFound from '../Pages/NotFound';


const adminRoutes = [
    { path: '/allservices', element: <AllService /> },
    { path: '/addservices', element: <AddService /> },
    { path: '/seeallbookings', element: <AllBooking /> },
    { path: '*', element: <PageNotFound /> },
];

export default adminRoutes;
