import React, { useState, useEffect } from "react";
import { cities } from "morocco-cities";
import utilityApi from "../../services/api/utility/utilityApi";

const StationFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const defaultFormData = {
    name: "",
    address: "",
    city: "",
    service_start_date: "",
    latitude: "",
    longitude: "",
    phone: "",
    email: "",
    status: "active",
    opening_hours: [{ day: "monday", opening_time: "", closing_time: "" }],
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
        address: false,
        city: false,
        service_start_date: false,
        latitude: false,
        longitude: false,
        phone: false,
        email: false,
        status: false,
        opening_hours: initialDataToUse.opening_hours.map(() => ({
          day: false,
          opening_time: false,
          closing_time: false,
        })),
      };
      setTouched(initialTouched);
      setErrors({});
    }
  }, [isOpen, initialData]);

  const validateForm = async() => {
    const newErrors = {
      name: "",
      address: "",
      city: "",
      service_start_date: "",
      latitude: "",
      longitude: "",
      phone: "",
      email: "",
      opening_hours: [],
    };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    // City validation
    if (!formData.city) {
      newErrors.city = "City is required";
    }

    // Service start date validation
    if (!formData.service_start_date) {
      newErrors.service_start_date = "Service start date is required";
    }

    // Latitude validation
    const lat = parseFloat(formData.latitude);
    if (!formData.latitude) {
      newErrors.latitude = "Latitude is required";
    } else if (isNaN(lat)) {
      newErrors.latitude = "Invalid latitude value";
    } else if (lat < -90 || lat > 90) {
      newErrors.latitude = "Must be between -90 and 90";
    }

    // Longitude validation
    const lng = parseFloat(formData.longitude);
    if (!formData.longitude) {
      newErrors.longitude = "Longitude is required";
    } else if (isNaN(lng)) {
      newErrors.longitude = "Invalid longitude value";
    } else if (lng < -180 || lng > 180) {
      newErrors.longitude = "Must be between -180 and 180";
    }

    // Phone validation
    const phoneRegex = /^0[5-7]\d{8}$/;
    if (!formData.phone) {
      newErrors.phone = "Phone is required";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Invalid Moroccan phone number";
    }
    

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    } else if(!initialData)
      {
        const {data} = await utilityApi.isEmailExist(formData.email,'station');
        if (data.exists) {
          newErrors.email = "This email is already registered.";
        }
      }

    // Opening hours validation
    newErrors.opening_hours = formData.opening_hours.map((hour, index) => {
      const hourErrors = {
        day: "",
        opening_time: "",
        closing_time: "",
      };

      if (!hour.day) {
        hourErrors.day = "Day is required";
      }

      if (!hour.opening_time) {
        hourErrors.opening_time = "Opening time is required";
      }

      if (!hour.closing_time) {
        hourErrors.closing_time = "Closing time is required";
      } else if (hour.opening_time && hour.closing_time) {
        const opening = new Date(`1970-01-01T${hour.opening_time}`);
        const closing = new Date(`1970-01-01T${hour.closing_time}`);
        if (closing <= opening) {
          hourErrors.closing_time = "Must be after opening time";
        }
      }

      return hourErrors;
    });

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

  const handleOpeningHoursChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedHours = [...prev.opening_hours];
      updatedHours[index][name] = value;
      return { ...prev, opening_hours: updatedHours };
    });
    setTouched((prev) => {
      const updatedTouched = [...prev.opening_hours];
      updatedTouched[index] = { ...updatedTouched[index], [name]: true };
      return { ...prev, opening_hours: updatedTouched };
    });
   
  };

  const addOpeningHours = () => {
    const days = ["monday","tuesday","wednesday","thursday","thursday","friday","saturday","sunday"];
    const nextDay = days.find((e)=> !formData.opening_hours.find(obj=> obj.day === e) )
    if(nextDay === undefined)
    {
      return;
    }
    setFormData((prev) => ({
      ...prev,
      opening_hours: [
        ...prev.opening_hours,
        { day: nextDay, opening_time: "", closing_time: "" },
      ],
    }));
    setTouched((prev) => ({
      ...prev,
      opening_hours: [
        ...prev.opening_hours,
        { day: false, opening_time: false, closing_time: false },
      ],
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const validationErrors = await validateForm();
    
    const hasErrors = Object.values(validationErrors).some(error =>
      Array.isArray(error) 
        ? error.some(hour => Object.values(hour).some(Boolean))
        : Boolean(error)
    );

    if (hasErrors) {
      // Mark all fields as touched to show errors
      const allTouched = Object.fromEntries(
        Object.keys(touched).map(key => [
          key,
          key === "opening_hours"
            ? validationErrors.opening_hours.map(() => ({
                day: true,
                opening_time: true,
                closing_time: true,
              }))
            : true,
        ])
      );
      setTouched(allTouched);
      return;
    }

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
        {initialData ? "Edit Station" : "Add Station"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ... other form elements */}
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
          {/* Modified Address Field */}
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

            {/* Other fields follow similar pattern */}
            {/* ... */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Service Start Date</label>
              <input
                type="date"
                name="service_start_date"
                value={formData.service_start_date}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
                {touched.service_start_date && errors.service_start_date && (
                <p className="text-red-500 text-sm mt-1">{errors.service_start_date}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Latitude</label>
              <input
                type="number"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                min={-90}
                max={90}
              />
                {touched.latitude && errors.latitude && (
                <p className="text-red-500 text-sm mt-1">{errors.latitude}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Longitude</label>
              <input
                type="number"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                min={-180}
                max={180}
              />
                {touched.longitude && errors.longitude && (
                <p className="text-red-500 text-sm mt-1">{errors.longitude}</p>
              )}
            </div>
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
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {touched.status && errors.status && (
                <p className="text-red-500 text-sm mt-1">{errors.status}</p>
              )}
            </div>

            {/* Opening Hours Section */}
            <div className="col-span-full">
              <h3 className="text-lg font-semibold mb-4">Opening Hours</h3>
              {formData.opening_hours.map((hour, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Day
                    </label>
                    <select
                      name="day"
                      value={hour.day}
                      onChange={(e) => handleOpeningHoursChange(index, e)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="monday" disabled={formData.opening_hours.find(obj=> obj.day === "monday")}>Monday</option>
                      <option value="tuesday" disabled={formData.opening_hours.find(obj=> obj.day === "tuesday")}>Tuesday</option>
                      <option value="wednesday" disabled={formData.opening_hours.find(obj=> obj.day === "wednesday")}>Wednesday</option>
                      <option value="thursday" disabled={formData.opening_hours.find(obj=> obj.day === "thursday")}>Thursday</option>
                      <option value="friday" disabled={formData.opening_hours.find(obj=> obj.day === "friday")}>Friday</option>
                      <option value="saturday" disabled={formData.opening_hours.find(obj=> obj.day === "saturday")}>Saturday</option>
                      <option value="sunday" disabled={formData.opening_hours.find(obj=> obj.day === "sunday")}>Sunday</option>
                    </select>
                    {touched.opening_hours?.[index]?.day && errors.opening_hours?.[index]?.day && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.opening_hours[index].day}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Opening Time
                    </label>
                    <input
                      type="time"
                      name="opening_time"
                      value={hour.opening_time}
                      onChange={(e) => handleOpeningHoursChange(index, e)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                    {touched.opening_hours?.[index]?.opening_time && errors.opening_hours?.[index]?.opening_time && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.opening_hours[index].opening_time}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Closing Time
                    </label>
                    <input
                      type="time"
                      name="closing_time"
                      value={hour.closing_time}
                      onChange={(e) => handleOpeningHoursChange(index, e)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                    {touched.opening_hours?.[index]?.closing_time && errors.opening_hours?.[index]?.closing_time && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.opening_hours[index].closing_time}
                      </p>
                    )}
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addOpeningHours}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Opening Hours
              </button>
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

export default StationFormModal;