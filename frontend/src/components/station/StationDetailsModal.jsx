import React from 'react';

const StationDetailsModal = ({ isOpen, onClose, station }) => {
  if (!isOpen || !station) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{station.name}</h2>
          <button
        type="button"
        onClick={onClose}
        className="p-1 hover:bg-gray-100 rounded-full"
        aria-label="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

        </div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Address</label>
            <p className="text-gray-800 dark:text-gray-200">{station.address}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">City</label>
            <p className="text-gray-800 dark:text-gray-200">{station.city}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Service Start Date</label>
            <p className="text-gray-800 dark:text-gray-200">{station.service_start_date}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Coordinates</label>
            <p className="text-gray-800 dark:text-gray-200">
              Latitude: {station.latitude}, Longitude: {station.longitude}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Contact</label>
            <p className="text-gray-800 dark:text-gray-200">Phone: {station.phone}</p>
            <p className="text-gray-800 dark:text-gray-200">Email: {station.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</label>
            <p className="text-gray-800 dark:text-gray-200">{station.status}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Opening Hours</label>
            <ul className="space-y-2">
              {station.opening_hours.map((hour, index) => (
                <li key={index} className="text-gray-800 dark:text-gray-200">
                  {hour.day}: {hour.opening_time} - {hour.closing_time}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StationDetailsModal;