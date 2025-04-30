import React, { useState, useEffect } from "react";
import employeeApi from "../../services/api/employee/employeeApi";
import utilityApi from "../../services/api/utility/utilityApi";
import stationApi from "../../services/api/station/stationApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const defaultFormData = {
    employee_cin: "",
    last_name: "",
    first_name: "",
    email: "",
    phone: "",
    gender: "",
    date_of_birth: "",
    address: "",
    nationality: "",
    station_id:null,
    status: "active",
    cnss_number: "",
    contract_type: "",
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [nationalities, setNationalities] = useState([]);
  const [stations, setStations] = useState([]);
  const getNationalities =async()=> {
    const {data} = await utilityApi.getAllNationalities();
    setNationalities(data.data);
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

    if (isOpen) {
      fetchStations();
      getNationalities();
      setFormData(initialData || defaultFormData);
      const initialTouched = {
        employee_cin: false,
        last_name: false,
        first_name: false,
        email: false,
        phone: false,
        gender: false,
        date_of_birth: false,
        address: "",
        nationality: "",
        station_id:false,
        status: "active",
        cnss_number: "",
        contract_type: false,
      };
      setTouched(initialTouched);
      setErrors({});
    }

  }, [isOpen, initialData]);

  const validateForm = async () => {
    const newErrors = {};

    if (!formData.employee_cin.trim()) newErrors.employee_cin = "CIN is required";
    if (!formData.last_name.trim()) newErrors.last_name = "Last name is required";
    if (!formData.first_name.trim()) newErrors.first_name = "First name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email format";
      else if (!initialData) {
        const { data } = await utilityApi.isEmailExist(formData.email, "employee");
        if (data.exists) newErrors.email = "This email is already registered.";
      }
    }

    const phoneRegex = /^0[5-7]\d{8}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Invalid Moroccan phone number";
    }

    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.station_id && !initialData) newErrors.station_id = "Station is required";
    if (!formData.date_of_birth) newErrors.date_of_birth = "Date of birth is required";
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

    const validationErrors = await validateForm();
    const hasErrors = Object.values(validationErrors).some(Boolean);

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
  const displayNationalities = () =>{ 
    return nationalities.map((nationality) => (
      <option key={nationality} value={nationality} >
        {nationality}
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

  if (!isOpen) return null;

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
        <h2 className="text-2xl font-bold mb-6">{initialData ? "Edit Employee" : "Add Employee"}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Employee CIN */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Employee CIN</label>
            <input
              type="text"
              name="employee_cin"
              value={formData.employee_cin}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {touched.employee_cin && errors.employee_cin && (
              <p className="text-red-500 text-sm mt-1">{errors.employee_cin}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {touched.last_name && errors.last_name && (
              <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
            )}
          </div>

          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {touched.first_name && errors.first_name && (
              <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
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

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {touched.phone && errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Gender (Select Input) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {touched.gender && errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {touched.date_of_birth && errors.date_of_birth && (
              <p className="text-red-500 text-sm mt-1">{errors.date_of_birth}</p>
            )}
          </div>

                    {/* Nationality (Select Input) */}
                    <div>
            <label className="block text-sm font-medium text-gray-700">Nationality</label>
            <select
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Nationality</option>
             {displayNationalities()}

            </select>
            {touched.nationality && errors.nationality && (
              <p className="text-red-500 text-sm mt-1">{errors.nationality}</p>
            )}
          </div>

          {/* Address (Textarea) */}
          <div className="col-span-full">
            <label className="block text-sm font-medium text-gray-700">Address</label>
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

          {/* Station (Select Input) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Station</label>
            <select
              name="station_id"
              value={formData.station_id}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              disabled={initialData}
            >
              <option value="">Select Station</option>
              {displayStations()}

            </select>
            {touched.station_id && errors.station_id && (
              <p className="text-red-500 text-sm mt-1">{errors.station_id}</p>
            )}
          </div>

          <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                disabled={!initialData}
              >
                <option value="active">Active</option>
                <option value="terminated">Terminated</option>
              </select>
            </div>

          {/* CNSS Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">CNSS Number</label>
            <input
              type="text"
              name="cnss_number"
              value={formData.cnss_number}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {touched.cnss_number && errors.cnss_number && (
              <p className="text-red-500 text-sm mt-1">{errors.cnss_number}</p>
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
              {initialData ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeFormModal;