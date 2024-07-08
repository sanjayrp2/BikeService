import React from 'react';
import AllService from '../Pages/AllServices';
import AddService from '../Pages/AddServices';
import AllBooking from '../Pages/AllBooking';
import PageNotFound from '../Pages/NotFound';
import Home from '../Pages/Home/Home';


const adminRoutes = [
    { path: '/', element: <Home /> },
    { path: '/allservices', element: <AllService /> },
    { path: '/addservices', element: <AddService /> },
    { path: '/allbookings', element: <AllBooking /> },
    { path: '*', element: <PageNotFound /> },
];

export default adminRoutes;
