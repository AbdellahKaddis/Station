import React, { useState } from 'react';
import { 
  FiHome, FiDollarSign, FiMapPin, FiArchive, FiSliders, FiDroplet, 
  FiTruck, FiPackage, FiBarChart, FiClock, FiUsers, FiCalendar, 
  FiCheckSquare, FiLogOut, FiMenu 
} from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation(); // Get current URL path

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Helper function to determine if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Hamburger Menu for Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-500 text-white rounded-md focus:outline-none"
        onClick={toggleSidebar}
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-40 h-screen flex flex-col`}
      >
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">⛽ Gas Station</h1>
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleSidebar}
          >
            <FiMenu size={24} />
          </button>
        </div>
        <nav className="mt-6 flex-1 overflow-y-auto">
          <Link
            to="/"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600 ${
              isActive('/dashboard') ? 'bg-blue-100 text-blue-600' : ''
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            <FiHome className="mr-3" /> Dashboard
          </Link>
          <Link
            to="/sales"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600 ${
              isActive('/sales') ? 'bg-blue-100 text-blue-600' : ''
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            <FiDollarSign className="mr-3" /> Sales
          </Link>
          <Link
            to="/stations"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600 ${
              isActive('/stations') ? 'bg-blue-100 text-blue-600' : ''
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            <FiMapPin className="mr-3" /> Stations
          </Link>
          <Link
            to="/tanks"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600 ${
              isActive('/tanks') ? 'bg-blue-100 text-blue-600' : ''
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            <FiArchive className="mr-3" /> Tanks
          </Link>
          <Link
            to="/pumps"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600 ${
              isActive('/pumps') ? 'bg-blue-100 text-blue-600' : ''
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            <FiSliders className="mr-3" /> Pumps
          </Link>
          <Link
            to="/fuel-types"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600 ${
              isActive('/fuel-types') ? 'bg-blue-100 text-blue-600' : ''
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            <FiDroplet className="mr-3" /> Fuel Types
          </Link>
          <Link
            to="/suppliers"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600 ${
              isActive('/suppliers') ? 'bg-blue-100 text-blue-600' : ''
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            <FiTruck className="mr-3" /> Suppliers
          </Link>
          <Link
            to="/stock-entries"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600 ${
              isActive('/stock-entries') ? 'bg-blue-100 text-blue-600' : ''
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            <FiPackage className="mr-3" /> Stock Entries
          </Link>
          <Link
            to="/meter-readings"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600 ${
              isActive('/meter-readings') ? 'bg-blue-100 text-blue-600' : ''
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            <FiBarChart className="mr-3" /> Meter Readings
          </Link>
          <Link
            to="/sale-price-history"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600 ${
              isActive('/sale-price-history') ? 'bg-blue-100 text-blue-600' : ''
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            <FiClock className="mr-3" /> Sale Price Histories
          </Link>
          <Link
            to="/employees"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600 ${
              isActive('/employees') ? 'bg-blue-100 text-blue-600' : ''
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            <FiUsers className="mr-3" /> Employees
          </Link>
          <Link
            to="/plannings"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600 ${
              isActive('/plannings') ? 'bg-blue-100 text-blue-600' : ''
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            <FiCalendar className="mr-3" /> Planning
          </Link>
          <Link
            to="/presences"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600 ${
              isActive('/presences') ? 'bg-blue-100 text-blue-600' : ''
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            <FiCheckSquare className="mr-3" /> Presence
          </Link>
          {/* <Link
            to="#"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600 ${
              isActive('#') ? 'bg-blue-100 text-blue-600' : ''
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            <FiLogOut className="mr-3" /> Logout
          </Link> */}
        </nav>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden z-30"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;