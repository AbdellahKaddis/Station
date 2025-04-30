import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import utilityApi from "../../services/api/utility/utilityApi";
import fuelTypeApi from "../../services/api/fuelTypes/fuelTypeApi";
import stationApi from "../../services/api/station/stationApi";

const TankFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {

  const defaultFormData = {
    capacity: "",
    fuel_type_id: "",
    name: "",
    station_id:null,
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [fuelTypes, setFuelTypes] = useState([]);
  const [stations, setStations] = useState([]);

  const fetchFuelTypes = async () => {
    // setLoading(true);
    try {
      const response = await fuelTypeApi.getAllFuelTypes();
      setFuelTypes(response.data);
    //   setLoading(false);
    } catch (err) {
      toast.error("Failed to load fuel types list. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const fetchStations = async () => {
    // setLoading(true);
    try {
      const response = await stationApi.getAllStations();
      setStations(response.data);
      // setLoading(false);
    } catch (err) {
      toast.error("Failed to load stations list. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };
  useEffect(() => {
    fetchFuelTypes();
    fetchStations();
    if (isOpen) {
      const initialDataToUse = initialData || { ...defaultFormData, current_volume: 0 }; // Set current_volume to 0
        setFormData(initialDataToUse);


      const initialTouched = {
        capacity: false,
        fuel_type_id: false,
        name: false,
        station_id:false,
      };
      setTouched(initialTouched);
      setErrors({});
    }
  }, [isOpen, initialData]);

  const validateForm = async () => {
    const newErrors = {
      capacity: "",
      fuel_type_id: "",
      name: "",
      station_id:"",
    };

    if (!formData.capacity) {
      newErrors.capacity = "Capacity is required";
    } else if (isNaN(parseFloat(formData.capacity))) {
      newErrors.capacity = "Capacity must be a number";
    } else if (parseFloat(formData.capacity) <= 0) {
      newErrors.capacity = "Capacity must be greater than 0";
    }

    if (!formData.fuel_type_id) {
      newErrors.fuel_type_id = "Fuel type is required";
    }

    if (!formData.station_id) {
      newErrors.station_id = "Station is required";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
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

    onSubmit(formData); 
    onClose();
  };

  if (!isOpen) return null;
  const displayFuelTypes = () =>{ 
    return fuelTypes.map((fuelType) => (
      <option key={fuelType.id} value={fuelType.id} >
        {fuelType.name}
      </option>
    ));
  };
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
          {initialData ? "Edit Tank" : "Add Tank"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="col-span-full">
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
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Capacity
              </label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                min="0"
                step="0.01"
              />
              {touched.capacity && errors.capacity && (
                <p className="text-red-500 text-sm mt-1">{errors.capacity}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fuel Type
              </label>
              <select
                name="fuel_type_id"
                value={formData.fuel_type_id}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select a fuel type</option>
                {displayFuelTypes()}
              </select>
              {touched.fuel_type_id && errors.fuel_type_id && (
                <p className="text-red-500 text-sm mt-1">{errors.fuel_type_id}</p>
              )}
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700">Station</label>
            <select
              name="station_id"
              value={formData.station_id}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              // disabled={initialData}
            >
              <option value="">Select Station</option>
              {displayStations()}

            </select>
            {touched.station_id && errors.station_id && (
              <p className="text-red-500 text-sm mt-1">{errors.station_id}</p>
            )}
          </div>
      
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
        </form>
      </div>
    </div>
  );
};

export default TankFormModal;