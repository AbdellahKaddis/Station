import React, { useState, useEffect } from "react";

const FuelTypeFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const defaultFormData = {
    name: "",
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      
      const initialDataToUse = initialData || defaultFormData;
      setFormData(initialDataToUse);
      
      // Initialize touched state
      const initialTouched = {
        name: false,
      };
      setTouched(initialTouched);
      setErrors({});
    }
  }, [isOpen, initialData]);

  const validateForm = async() => {
    const newErrors = {
      name: "",
    };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    setErrors(newErrors);
    return newErrors;
  };
  useEffect(()=>{
    validateForm();
  },[formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));

  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const validationErrors = await validateForm();
    
    const hasErrors = Object.values(validationErrors).some(error => Boolean(error));

    if (hasErrors) {
      const allTouched = Object.fromEntries(
        Object.keys(touched).map(key => [
            key,true,
        ])
      );
      setTouched(allTouched);
      return;
    }

    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;
  return (

    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl max-h-[80vh] overflow-y-auto relative">
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
        {initialData ? "Edit Fuel Type" : "Add Fuel Type"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default FuelTypeFormModal;