import React from 'react';

const Bookings= ({ booking }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6 mb-4">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-center">{booking.name}</div>
        <p className="text-gray-700 text-base">
          Email: {booking.email}
        </p>
        <p className="text-gray-700 text-base">
          Phone: {booking.phone}  
        </p>
        <p className="text-gray-700 text-base">
          Vehicle Name: {booking.vname}
        </p>
        <p className="text-gray-700 text-base">
          Vehicle Number: {booking.vno}
        </p>
        <p className="text-gray-700 text-base">
          Vehicle Model: {booking.vmodel}
        </p>
        <p className="text-gray-700 text-base">
          Address: {booking.address}
        </p>
        <p className="text-gray-700 text-base">
          Status: {booking.status}
        </p>
        <p className="text-gray-700 text-base">
          Service: {booking.service.join(', ')}
        </p>
        <p className="text-gray-700 text-base mt-2 font-semibold">
          Date: {booking.date}
        </p>
      </div>
    </div>
  );
};

export default Bookings;
