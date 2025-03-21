import React from 'react';

const PumpDetailsModal = ({ isOpen, onClose, pump }) => {
  if (!isOpen || !pump) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Pump Details</h2>
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
          {/* Code */}
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Code</label>
            <p className="text-gray-800 dark:text-gray-200">{pump.code}</p>
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</label>
            <p className="text-gray-800 dark:text-gray-200">
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  pump.statuts === "active"
                    ? "bg-green-100 text-green-800"
                    : pump.statuts === "under_maintenance"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {pump.statuts}
              </span>
            </p>
          </div>

          {/* Flow */}
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Flow Rate</label>
            <p className="text-gray-800 dark:text-gray-200">{pump.flow} L/min</p>
          </div>

          {/* Tank */}
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Tank</label>
            <p className="text-gray-800 dark:text-gray-200">
              {pump.tank?.name} (Capacity: {pump.tank?.capacity}) L
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Volume</label>
            <p className="text-gray-800 dark:text-gray-200">
              {pump.tank.current_volume} L
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Fuel Type</label>
            <p className="text-gray-800 dark:text-gray-200">
              {pump.tank.fuel_type.name}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Station Name</label>
            <p className="text-gray-800 dark:text-gray-200">
              {pump.tank.station.name}
            </p>
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

export default PumpDetailsModal;