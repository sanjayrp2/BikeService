import React from 'react';
import AllService from '../Pages/AllServices';
import AddService from '../Pages/AddServices';
import AllBooking from '../Pages/AllBooking';
import PageNotFound from '../Pages/NotFound';
import Home from '../Pages/Home/Home';

//using React Router to manage navigation between different components.
const adminRoutes = [
    { path: '/', element: <Home /> }, //The root path of the application.
    { path: '/allservices', element: <AllService /> },//Path for the all services page.
    { path: '/addservices', element: <AddService /> },//Path for the add services page.
    { path: '/allbookings', element: <AllBooking /> },// Path for the all bookings page.
    { path: '*', element: <PageNotFound /> },//A wildcard path that matches any route not explicitly defined.
];

export default adminRoutes;
