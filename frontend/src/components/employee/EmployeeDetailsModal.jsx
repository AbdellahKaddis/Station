import React from 'react';

const EmployeeDetailsModal = ({ isOpen, onClose, employee }) => {
  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {employee.first_name} {employee.last_name}
          </h2>
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
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Employee CIN</label>
            <p className="text-gray-800 dark:text-gray-200">{employee.employee_cin}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</label>
            <p className="text-gray-800 dark:text-gray-200">{employee.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Phone</label>
            <p className="text-gray-800 dark:text-gray-200">{employee.phone}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Gender</label>
            <p className="text-gray-800 dark:text-gray-200">{employee.gender === 'male'? '♂️': '♀️'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Date of Birth</label>
            <p className="text-gray-800 dark:text-gray-200">{employee.date_of_birth}</p>
          </div>
          <div>
            <label className={`text-sm font-medium text-gray-600 dark:text-gray-${employee.address?500:400}`}>Address</label>
            <p className="text-gray-800 dark:text-gray-200">{employee.address ?? 'Not provided'}</p>
          </div>
          <div>
            <label className={`text-sm font-medium text-gray-600 dark:text-gray-${employee.nationality?500:400}`}>Nationality</label>
            <p className="text-gray-800 dark:text-gray-200">{employee.nationality ?? 'Not provided'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</label>
            <p className="text-gray-800 dark:text-gray-200">{employee.status}</p>
          </div>
          <div>
            <label className={`text-sm font-medium text-gray-600 dark:text-gray-${employee.cnss_number?500:400}`}>CNSS Number</label>
            <p className="text-gray-800 dark:text-gray-200">{employee.cnss_number ?? 'Not available'}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Contract Type</label>
            <p className="text-gray-800 dark:text-gray-200">{employee.contract_type}</p>
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

export default EmployeeDetailsModal;
