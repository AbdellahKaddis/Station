import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import employeeApi from "../../services/api/employee/employeeApi"; 
import { formatDate } from "date-fns";

  // Get today's week, day, and year
export   const getTodayValues = () => {
    const today = new Date();
    const week = getWeekNumber(today);
    const day = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    const year = today.getFullYear();
    return { week, day, year };
  };
  // Helper function to get the ISO week number
export   const getWeekNumber = (date) => {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - startOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
};
const PresenceFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const defaultFormData = {
    week: "",
    day: "",
    start_time: "",
    end_time: "",
    year: new Date().getFullYear(),
    employee_id: "",
    status: "present", // Default status
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [employees, setEmployees] = useState([]);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Fetch employees for the employee_id dropdown
  const fetchEmployees = async () => {
    try {
      const response = await employeeApi.getAllEmployees(); // Fetch all employees
      setEmployees(response.data.data);
    } catch (err) {
      toast.error("Failed to load employees list. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    fetchEmployees();
    if (isOpen) {
      const todayValues = getTodayValues();
      const initialDataToUse = initialData
        ? {
            ...initialData,
            week: initialData.week || todayValues.week,
            day: initialData.day || todayValues.day,
            year: initialData.year || todayValues.year,
          }
        : {
            ...defaultFormData,
            week: todayValues.week,
            day: todayValues.day,
            year: todayValues.year,
          };

      setFormData(initialDataToUse);

      const initialTouched = {
        week: false,
        day: false,
        start_time: false,
        end_time: false,
        employee_id: false,
        status: false,
      };
      setTouched(initialTouched);
      setErrors({});
    }
  }, [isOpen, initialData]);

  // Validate the form fields
  const validateForm = async () => {
    const newErrors = {
      week: "",
      day: "",
      start_time: "",
      end_time: "",
      employee_id: "",
      status: "",
    };

    if (!formData.week) {
      newErrors.week = "Week is required";
    } else if (isNaN(parseInt(formData.week))) {
      newErrors.week = "Week must be a number";
    } else if (parseInt(formData.week) < 1 || parseInt(formData.week) > 52) {
      newErrors.week = "Week must be between 1 and 52";
    }

    if (!formData.day && formData.day !== 0) {
      newErrors.day = "Day is required";
    }

    if (!formData.start_time) {
      newErrors.start_time = "Start time is required";
    } else if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(formData.start_time)) {
      newErrors.start_time = "Start time must be in HH:MM format";
    }

    if (!formData.end_time) {
      newErrors.end_time = "End time is required";
    } else if (!/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(formData.end_time)) {
      newErrors.end_time = "End time must be in HH:MM format";
    } else if (formData.end_time <= formData.start_time) {
      newErrors.end_time = "End time must be after start time";
    }

    if (!formData.employee_id) {
      newErrors.employee_id = "Employee is required";
    }

    if (!formData.status) {
      newErrors.status = "Status is required";
    }

    setErrors(newErrors);
    return newErrors;
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = await validateForm();

    const hasErrors = Object.values(validationErrors).some((error) => Boolean(error));

    if (hasErrors) {
      const allTouched = Object.fromEntries(
        Object.keys(touched).map((key) => [key, true])
      );
      setTouched(allTouched);
      return;
    }

    onSubmit(formData); // Submit the form data
    onClose(); // Close the modal
  };

  if (!isOpen) return null;

  // Display days in the dropdown
  const displayDays = () => {
    return days.map((day, index) => (
      <option key={index} value={index}>
        {day}
      </option>
    ));
  };

  // Display employees in the dropdown
  const displayEmployees = () => {
    return employees.map((employee) => employee.status === "active" && (
      <option key={employee.id} value={employee.id}>
        {employee.first_name} {employee.last_name}
      </option>
    ));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl max-h-[80vh] overflow-y-auto relative z-50">
        {/* Close X button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full"
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

        <h2 className="text-2xl font-bold mb-6">
          {initialData ? "Edit Presence" : "Add Presence"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Week */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Week
              </label>
              <input
                type="number"
                name="week"
                value={formData.week}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                min="1"
                max="52"
                disabled
              />
              {touched.week && errors.week && (
                <p className="text-red-500 text-sm mt-1">{errors.week}</p>
              )}
            </div>

            {/* Day */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Day
              </label>
              <select
                name="day"
                value={formData.day}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                disabled
              >
                <option value="">Select a day</option>
                {displayDays()}
              </select>
              {touched.day && errors.day && (
                <p className="text-red-500 text-sm mt-1">{errors.day}</p>
              )}
            </div>

            {/* Start Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Start Time
              </label>
              <input
                type="time"
                name="start_time"
                value={formData.start_time}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              {touched.start_time && errors.start_time && (
                <p className="text-red-500 text-sm mt-1">{errors.start_time}</p>
              )}
            </div>

            {/* End Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                End Time
              </label>
              <input
                type="time"
                name="end_time"
                value={formData.end_time}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              {touched.end_time && errors.end_time && (
                <p className="text-red-500 text-sm mt-1">{errors.end_time}</p>
              )}
            </div>

            {/* Employee */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employee
              </label>
              <select
                name="employee_id"
                value={formData.employee_id}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select an employee</option>
                {displayEmployees()}
              </select>
              {touched.employee_id && errors.employee_id && (
                <p className="text-red-500 text-sm mt-1">{errors.employee_id}</p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="present">Present</option>
                <option value="absent">Absent</option>
              </select>
              {touched.status && errors.status && (
                <p className="text-red-500 text-sm mt-1">{errors.status}</p>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              {initialData ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PresenceFormModal;