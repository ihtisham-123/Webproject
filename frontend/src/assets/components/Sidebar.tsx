import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Wallet2, Users, FileCheck } from 'lucide-react';

const Sidebar = () => {
  const navigate=useNavigate()
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/place-order', label: 'Place Order', icon: ShoppingCart },
    { path: '/withdraw', label: 'Withdraw', icon: Wallet2 },
    { path: '/referral', label: 'Referral', icon: Users },
    { path: '/kyc', label: 'KYC', icon: FileCheck }
  ];

  return (
    <div className="bg-gray-900 w-64 min-h-screen p-4 text-white ">
      {/* Logo Section */}
      <div className="mb-8 px-4 py-4"
      onClick={()=>navigate('/Home')}
      >
        <span className="text-2xl cursor-pointer font-bold bg-gradient-to-r from-[#3E62DE] to-[#B22ADF] bg-clip-text text-transparent">
          Bull FX
        </span>
      </div>

      {/* Navigation Section */}
      <nav className="space-y-2">
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-gradient-to-r from-[#3E62DE] to-[#B22ADF]' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`
            }
          >
            <Icon className="w-5 h-5 mr-3" />
            <span className="font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Section at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="border-t border-gray-700 pt-4 mb-4">
          <div className="flex items-center px-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#3E62DE] to-[#B22ADF] flex items-center justify-center">
              <span className="text-sm font-bold">U</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">User Dashboard</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;