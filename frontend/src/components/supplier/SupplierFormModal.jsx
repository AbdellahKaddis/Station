import React, { useState, useEffect } from "react";
import { cities } from "morocco-cities";
import utilityApi from "../../services/api/utility/utilityApi";
const SupplierFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  // Default form data
  const defaultFormData = {
    name: "",
    telephone: "",
    email: "",
    address: "",
    city: "",
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  // Initialize form data when modal opens
  useEffect(() => {
    if (isOpen) {
      const initialDataToUse = initialData || defaultFormData;
      setFormData(initialDataToUse);

      // Initialize touched state
      const initialTouched = {
        name: false,
        telephone: false,
        email: false,
        address: false,
        city: false,
      };
      setTouched(initialTouched);
      setErrors({});
    }
  }, [isOpen, initialData]);

  // Validate form fields
  const validateForm = async () => {
    const newErrors = {
      name: "",
      telephone: "",
      email: "",
      address: "",
      city: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format";
        else if (!initialData) {
          const { data } = await utilityApi.isEmailExist(formData.email, "supplier");
          if (data.exists) newErrors.email = "This email is already registered.";
        }
      }

      const phoneRegex = /^0[5-7]\d{8}$/;
      if (!formData.telephone.trim()) {
        newErrors.telephone = "Phone number is required";
      } else if (!phoneRegex.test(formData.telephone)) {
        newErrors.telephone = "Invalid Moroccan telephone number";
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
  const displayCities = () =>
    cities.map((city) => (
      <option key={city.name} value={city.name} >
        {city.name}
      </option>
    ));
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
          {initialData ? "Edit Supplier" : "Add Supplier"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              {touched.name && errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Telephone Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Telephone
              </label>
              <input
                type="text"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              {touched.telephone && errors.telephone && (
                <p className="text-red-500 text-sm mt-1">{errors.telephone}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              {touched.email && errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* City Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select a city</option>
                {displayCities()}
              </select>
              {touched.city && errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
              )}
            </div>

            {/* Address Field */}
            <div className="col-span-full">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              {touched.address && errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
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

export default SupplierFormModal;