import { NavLink } from 'react-router-dom';
import React from 'react';
function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white flex-shrink-0 p-4 flex flex-col space-y-4">
      <h1 className="text-xl font-bold mb-6">User Dashboard</h1>
      <NavLink to="/" className="block text-left p-2 rounded hover:bg-gray-700">
        Dashboard
      </NavLink>
      <NavLink
        to="/place-order"
        className="block text-left p-2 rounded hover:bg-gray-700"
      >
        Place Order
      </NavLink>
      <NavLink
        to="/withdraw"
        className="block text-left p-2 rounded hover:bg-gray-700"
      >
        Withdraw
      </NavLink>
      <NavLink
        to="/referral"
        className="block text-left p-2 rounded hover:bg-gray-700"
      >
        Referral
      </NavLink>
      <NavLink to="/kyc" className="block text-left p-2 rounded hover:bg-gray-700">
        KYC
      </NavLink>
    </aside>
  );
}

export default Sidebar;