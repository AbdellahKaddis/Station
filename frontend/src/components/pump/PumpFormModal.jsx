import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import pumpApi from "../../services/api/pump/pumpApi"; // Adjust API import
import tankApi from "../../services/api/tank/tankApi"; // Adjust API import for tanks

const PumpFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  // Default form data
  const defaultFormData = {
    code: "",
    statuts: "active",
    flow: "",
    tank_id: "",
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [tanks, setTanks] = useState([]); // For tank dropdown

  // Fetch tanks for the dropdown
  const fetchTanks = async () => {
    try {
      const response = await tankApi.getAllTanks(); // Fetch tanks
      setTanks(response.data.data);
    } catch (err) {
      toast.error("Failed to load tanks list. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  // Initialize form data and fetch tanks when modal opens
  useEffect(() => {
    if (isOpen) {
      const initialDataToUse = initialData || defaultFormData;
      setFormData(initialDataToUse);

      // Initialize touched state
      const initialTouched = {
        code: false,
        statuts: false,
        flow: false,
        tank_id: false,
      };
      setTouched(initialTouched);
      setErrors({});

      // Fetch tanks for the dropdown
      fetchTanks();
    }
  }, [isOpen, initialData]);

  // Validate form fields
  const validateForm = async () => {
    const newErrors = {
      code: "",
      statuts: "",
      flow: "",
      tank_id: "",
    };

    // Code validation
    if (!formData.code.trim()) {
      newErrors.code = "Code is required";
    }

    // Status validation
    if (!formData.statuts) {
      newErrors.statuts = "Status is required";
    }

    // Flow validation
    if (!formData.flow) {
      newErrors.flow = "Flow is required";
    } else if (isNaN(parseFloat(formData.flow))) {
      newErrors.flow = "Flow must be a number";
    } else if (parseFloat(formData.flow) < 0) {
      newErrors.flow = "Flow must be greater than or equal to 0";
    }

    // Tank validation
    if (!formData.tank_id) {
      newErrors.tank_id = "Tank is required";
    }

    setErrors(newErrors);
    return newErrors;
  };

  // Revalidate form when formData changes
  useEffect(() => {
    validateForm();
  }, [formData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = await validateForm();

    // Check if there are any errors
    const hasErrors = Object.values(validationErrors).some((error) => Boolean(error));

    if (hasErrors) {
      // Mark all fields as touched to show errors
      const allTouched = Object.fromEntries(
        Object.keys(touched).map((key) => [key, true])
      );
      setTouched(allTouched);
      return;
    }

    // Submit the form data
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

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
          {initialData ? "Edit Pump" : "Add Pump"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Code Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Code
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              {touched.code && errors.code && (
                <p className="text-red-500 text-sm mt-1">{errors.code}</p>
              )}
            </div>

            {/* Status Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="statuts"
                value={formData.statuts}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="active">Active</option>
                <option value="under_maintenance">Under Maintenance</option>
                <option value="out_of_service">Out of Service</option>
              </select>
              {touched.statuts && errors.statuts && (
                <p className="text-red-500 text-sm mt-1">{errors.statuts}</p>
              )}
            </div>

            {/* Flow Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Flow
              </label>
              <input
                type="number"
                name="flow"
                value={formData.flow}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                min="0"
                step="0.01"
              />
              {touched.flow && errors.flow && (
                <p className="text-red-500 text-sm mt-1">{errors.flow}</p>
              )}
            </div>

            {/* Tank Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tank
              </label>
              <select
                name="tank_id"
                value={formData.tank_id}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select a tank</option>
                {tanks.map((tank) => (
                  <option key={tank.id} value={tank.id}>
                    {tank.name} (Capacity: {tank.capacity}) L
                  </option>
                ))}
              </select>
              {touched.tank_id && errors.tank_id && (
                <p className="text-red-500 text-sm mt-1">{errors.tank_id}</p>
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

export default PumpFormModal;