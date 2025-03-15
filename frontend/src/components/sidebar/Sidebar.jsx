import React, { useState } from 'react';
import { FiHome, FiDollarSign, FiTruck, FiUsers, FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';
const Sidebar = ()=> {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return <>
    <div
            className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}
          >
            <div className="p-4">
              <h1 className="text-2xl font-bold text-gray-800">⛽ Gas Station</h1>
            </div>
            <nav className="mt-6">
              <Link to='#' className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600">
                <FiHome className="mr-3" /> Dashboard
              </Link>
              <Link to='#' className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600">
                <FiDollarSign className="mr-3" /> Sales
              </Link>
              <Link to='#' className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600">
                <FiTruck className="mr-3" /> Stock
              </Link>
              <Link to='#' className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600">
                <FiUsers className="mr-3" /> Employees
              </Link>
              <Link to='#' className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600">
                <FiLogOut className="mr-3" /> Logout
              </Link>
            </nav>
          </div>
    </>
}
export default Sidebar;