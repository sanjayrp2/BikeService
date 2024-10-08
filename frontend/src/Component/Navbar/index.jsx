import React from 'react';
import { Link } from 'react-router-dom';
import { Bklogo } from '../../Assets';
import useAuth from '../../Hooks/auth';
import RouteLink from './RouteLink';

const Navbar = () => {
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };
  useAuth();
  const role = localStorage.getItem('role');

  return (
    <nav className="bg-[#0C97BF] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="text-orange-500 text-3xl font-bold">
            <img src={Bklogo} alt="" className='w-[30%] h-[]' />
          </Link>
        </div>
        <div className="flex space-x-10">
          {
            role === 'user' &&
            RouteLink.user.map((user, index) => (
              <Link to={user.link} className="text-white hover:text-gray-300 text-lg font-bold">
                {user.name}
              </Link>
            ))
          }
          {
            role === 'admin' &&
            RouteLink.admin.map((admin, index) => (
              <Link to={admin.link} className="text-white hover:text-gray-300 text-lg font-bold">
                {admin.name}
              </Link>
            ))
          }

          <div className="text-white hover:text-gray-300 text-lg font-bold cursor-pointer" onClick={logout}>
            Log Out
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
