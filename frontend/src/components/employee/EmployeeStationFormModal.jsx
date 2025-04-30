import React, { useState, useEffect } from "react";
import stationApi from "../../services/api/station/stationApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeStationFormModal= ({ isOpen, onClose,onSubmit,employee }) => {

  const [formData, setFormData] = useState({
    station_id:null,
    contract_type: "",
    employee_id:null
  });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [stations, setStations] = useState([]);

  const fetchStations = async () => {
    try {
      const response = await stationApi.getAllStations();
      setStations(response.data);
    } catch (err) {
      toast.error("Failed to load stations list. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchStations();
      setFormData({
        station_id:null,
        contract_type: "",
        employee_id:employee.id,
        status:"active",
      });  
      const initialTouched = {
        station_id:false,
        contract_type: false,
      };
      setTouched(initialTouched);
      setErrors({});
    }
  }, [isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.station_id) newErrors.station_id = "Station is required";
    if (!formData.contract_type) newErrors.contract_type = "Contract type is required";

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

    const validationErrors = validateForm();
    const hasErrors = Object.values(validationErrors).some(Boolean);

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
  const displayStations = () =>{ 
    return stations.map((station) => (
      <option key={station.id} value={station.id} >
        {station.name}
      </option>
    ));
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl max-h-[80vh] overflow-y-auto relative z-50">
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
        <h2 className="text-2xl font-bold mb-6">Add Employee to New Station</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label className="block text-sm font-medium text-gray-700">Station</label>
            <select
              name="station_id"
              value={formData.station_id}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"

            >
              <option value="">Select Station</option>
              {displayStations()}

            </select>
            {touched.station_id && errors.station_id && (
              <p className="text-red-500 text-sm mt-1">{errors.station_id}</p>
            )}
          </div>

          {/* Contract Type (Select Input) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Contract Type</label>
            <select
              name="contract_type"
              value={formData.contract_type}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Contract Type</option>
              <option value="CDI">CDI</option>
              <option value="CDD">CDD</option>
            </select>
            {touched.contract_type && errors.contract_type && (
              <p className="text-red-500 text-sm mt-1">{errors.contract_type}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="col-span-full flex justify-end space-x-4 mt-6">
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
             Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeStationFormModal;