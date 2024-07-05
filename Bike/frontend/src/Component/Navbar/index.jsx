import React from 'react';
import { Link } from 'react-router-dom';
import { Bklogo } from '../../Assets';

const Navbar = () => {
  return (
    <nav className="bg-[#0C97BF] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="text-orange-500 text-3xl font-bold">
            <img src={Bklogo} alt="" className='w-[30%] h-[]' />
          </Link>
        </div>
        <div className="flex space-x-10">
          <Link to="/services" className="text-white hover:text-gray-300 text-lg font-bold">
            Services
          </Link>
          <Link to="/view-bookings" className="text-white hover:text-gray-300 text-lg font-bold">
            View Bookings
          </Link>
          <Link to="/history" className="text-white hover:text-gray-300 text-lg font-bold">
            History
          </Link>
          <Link to="/login" className="text-white hover:text-gray-300 text-lg font-bold">
            Log Out
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
