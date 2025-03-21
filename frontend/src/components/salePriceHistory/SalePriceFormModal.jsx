import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import fuelTypeApi from "../../services/api/fuelTypes/fuelTypeApi";

const SalePriceFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const defaultFormData = {
    start_date: "",
    end_date: "",
    sale_price: "",
    fuel_type_id: "",
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [fuelTypes, setFuelTypes] = useState([]);

  const fetchFuelTypes = async () => {
    try {
      const response = await fuelTypeApi.getAllFuelTypes();
      setFuelTypes(response.data);
    } catch (err) {
      toast.error("Failed to load fuel types list. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    fetchFuelTypes();
    if (isOpen) {
      setFormData(initialData || defaultFormData);
      const initialTouched = {
        start_date: false,
        fuel_type_id: false,
        end_date: false,
        sale_price:false,
      };
      setTouched(initialTouched);
      setErrors({});
    }
  }, [isOpen, initialData]);

  const validateForm = async () => {
    const newErrors = {};
    if (!formData.start_date) newErrors.start_date = "Start date is required";
    if (!formData.sale_price) newErrors.sale_price = "Sale price is required";
    //task : addvalidationto endate if it's provided check if it's not less than start date
    if (!formData.fuel_type_id) newErrors.fuel_type_id = "Fuel type is required";
    setErrors(newErrors);
    console.log(newErrors)
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
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl max-h-[80vh] overflow-y-auto relative">
      {/* Close Button */}
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
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <h2 className="text-2xl font-bold mb-6">
        {initialData ? "Edit Sale Price" : "Add Sale Price"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {touched.start_date && errors.start_date && <p className="text-red-500 text-sm mt-1">{errors.start_date}</p>}
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {touched.end_date && errors.end_date && <p className="text-red-500 text-sm mt-1">{errors.end_date}</p>}
          </div>
        </div>

        {/* Sale Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Sale Price</label>
          <input
            type="number"
            name="sale_price"
            value={formData.sale_price}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {touched.sale_price && errors.sale_price && <p className="text-red-500 text-sm mt-1">{errors.sale_price}</p>}
        </div>

        {/* Fuel Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Fuel Type</label>
          <select
            name="fuel_type_id"
            value={formData.fuel_type_id}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Fuel Type</option>
            {fuelTypes.map(ft => (
              <option key={ft.id} value={ft.id}>{ft.name}</option>
            ))}
          </select>
          {touched.fuel_type_id && errors.fuel_type_id && <p className="text-red-500 text-sm mt-1">{errors.fuel_type_id}</p>}
        </div>

        {/* Buttons */}
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

export default SalePriceFormModal;
