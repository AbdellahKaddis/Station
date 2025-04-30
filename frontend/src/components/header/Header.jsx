import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import userApi from '../../services/api/user/userApi';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate(); // For redirecting after logout
  const { user, logout } = useUserContext(); // Assuming logout is provided by UserContext
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to toggle dropdown

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle logout
  const handleLogout = async() => {
    await userApi.logout();
    logout(); // Call the logout function from UserContext
    navigate('/login'); // Redirect to login page after logout
    setIsDropdownOpen(false); // Close the dropdown
  };

  // Extract the page name from the URL path and capitalize it (commented out as per your code)
  // const pageName = location.pathname.split('/')[1] || 'dashboard';
  // const formattedPageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
      <button
        className="md:hidden text-gray-700 focus:outline-none"
        // onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
      <div className="flex items-center space-x-2">
        {/* <span className="text-xl">⛽</span>
        <h1 className="text-xl font-semibold text-gray-800">
          {formattedPageName}
        </h1> */}
      </div>
      <div className="relative flex items-center space-x-4">
        {/* User email as clickable element to toggle dropdown */}
        <button
          onClick={toggleDropdown}
          className="text-gray-600 hover:text-gray-800 focus:outline-none"
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
          aria-label="User menu"
        >
          {user.email}
        </button>
        <img
          className="w-10 h-10 rounded-full"
          src="https://via.placeholder.com/40"
          alt="User avatar"
        />
        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
              aria-label="Logout"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;