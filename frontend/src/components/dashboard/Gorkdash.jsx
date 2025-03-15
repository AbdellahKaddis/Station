// src/App.jsx
import React, { useState } from 'react';
import { FiHome, FiDollarSign, FiTruck, FiUsers, FiLogOut } from 'react-icons/fi';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Gorkdash = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sample chart data
  const salesData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Fuel Sales (Liters)',
        data: [1200, 1500, 1300, 1700, 1600, 1800, 1400],
        backgroundColor: '#3B82F6',
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { position: 'top' }, title: { display: true, text: 'Weekly Fuel Sales' } },
  };

  // Sample table data
  const pumps = [
    { id: 1, number: 'P01', status: 'Active', flowRate: 45.5 },
    { id: 2, number: 'P02', status: 'Inactive', flowRate: 0 },
    { id: 3, number: 'P03', status: 'Maintenance', flowRate: 0 },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-inter">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-800">⛽ Gas Station</h1>
        </div>
        <nav className="mt-6">
          <a href="#" className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600">
            <FiHome className="mr-3" /> Dashboard
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600">
            <FiDollarSign className="mr-3" /> Sales
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600">
            <FiTruck className="mr-3" /> Stock
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600">
            <FiUsers className="mr-3" /> Employees
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600">
            <FiLogOut className="mr-3" /> Logout
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Main Station Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">John Doe</span>
            <img
              className="w-10 h-10 rounded-full"
              src="https://via.placeholder.com/40"
              alt="User avatar"
            />
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 flex-1 overflow-y-auto">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <h3 className="text-sm font-medium text-gray-600">Total Sales</h3>
              <p className="text-2xl font-bold text-gray-800">$12,450</p>
              <p className="text-xs text-green-500">+5% from last week</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <h3 className="text-sm font-medium text-gray-600">Active Pumps</h3>
              <p className="text-2xl font-bold text-gray-800">2/3</p>
              <p className="text-xs text-yellow-500">1 in maintenance</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <h3 className="text-sm font-medium text-gray-600">Fuel Stock</h3>
              <p className="text-2xl font-bold text-gray-800">5,600 L</p>
              <p className="text-xs text-red-500">-200 L today</p>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <Bar data={salesData} options={chartOptions} />
          </div>

          {/* Pump Status Table */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Pump Status</h3>
            <table className="w-full text-left">
              <thead>
                <tr className="text-sm text-gray-600 border-b">
                  <th className="py-2">Pump Number</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Flow Rate (L/min)</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pumps.map((pump) => (
                  <tr key={pump.id} className="text-sm text-gray-700 border-b hover:bg-gray-50">
                    <td className="py-3">{pump.number}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          pump.status === 'Active'
                            ? 'bg-green-100 text-green-700'
                            : pump.status === 'Inactive'
                            ? 'bg-gray-100 text-gray-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {pump.status}
                      </span>
                    </td>
                    <td className="py-3">{pump.flowRate}</td>
                    <td className="py-3">
                      <button className="text-blue-600 hover:underline">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-4 text-center text-sm text-gray-600 bg-white shadow-inner">
          Gas Station Dashboard © 2025
        </footer>
      </div>
    </div>
  );
};

export default Gorkdash;