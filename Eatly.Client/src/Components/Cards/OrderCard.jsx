import React from 'react';

export default function OrderCard({ id, foodId, image, name, status, time, date }) {
  const statusColor = status === "Cancelled" ? "text-red-600" : "";

  return (
        
    <div  className="flex justify-between items-center rounded-lg shadow-xl hover:shadow-2xl cursor-pointer  py-3 px-4 border border-gray-100">
      <div className='flex gap-5' >
        <div>
        <img 
        src={image} alt="" 
        className='w-12 h-12 rounded-full object-cover'/>
        </div>
      <div>
        <h3 className="text-text-dark  font-semibold">{name}</h3>
        <p className={`text-sm ${statusColor}`}>{status}</p>
        </div>
      </div>
      <div className="text-gray-500 text-sm">
        {date === "Today" ? time : date}
      </div>
    </div>
  );
}