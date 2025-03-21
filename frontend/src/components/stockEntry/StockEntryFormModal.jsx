import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import tankApi from "../../services/api/tank/tankApi";
import supplierApi from "../../services/api/supplier/supplierApi";
import fuelTypeApi from "../../services/api/fuelTypes/fuelTypeApi";


const StockEntryFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const defaultFormData = {
    entry_date: "",
    quantity: "",
    purchase_price: "",
    tank_id: "",
    supplier_id: "",
    fuel_type_id: "",
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [tanks, setTanks] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);

  // Fetch tanks, suppliers, and fuel types for the dropdowns
  const fetchDropdowns = async () => {
    try {
      const [tanksResponse, suppliersResponse, fuelTypesResponse] = await Promise.all([
        tankApi.getAllTanks(),
        supplierApi.getAllSuppliers(),
        fuelTypeApi.getAllFuelTypes(),
      ]);
      setTanks(tanksResponse.data.data);
      setSuppliers(suppliersResponse.data.data);
      setFuelTypes(fuelTypesResponse.data);
    } catch (err) {
      toast.error("Failed to load dropdown data. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      const initialDataToUse = initialData || defaultFormData;
      setFormData(initialDataToUse);

      // Initialize touched state
      const initialTouched = {
        entry_date: false,
        quantity: false,
        purchase_price: false,
        tank_id: false,
        supplier_id: false,
        fuel_type_id: false,
      };
      setTouched(initialTouched);
      setErrors({});

      // Fetch dropdown data
      fetchDropdowns();
    }
  }, [isOpen, initialData]);

  // Validate form fields
  const validateForm = async () => {
    const newErrors = {
      entry_date: "",
      quantity: "",
      purchase_price: "",
      tank_id: "",
      supplier_id: "",
      fuel_type_id: "",
    };

    // Entry date validation
    if (!formData.entry_date) {
      newErrors.entry_date = "Entry date is required";
    }

    // Quantity validation
    if (!formData.quantity) {
      newErrors.quantity = "Quantity is required";
    } else if (isNaN(parseFloat(formData.quantity)) || parseFloat(formData.quantity) < 0) {
      newErrors.quantity = "Quantity must be a positive number";
    }

    // Purchase price validation
    if (!formData.purchase_price) {
      newErrors.purchase_price = "Purchase price is required";
    } else if (isNaN(parseFloat(formData.purchase_price)) || parseFloat(formData.purchase_price) < 0) {
      newErrors.purchase_price = "Purchase price must be a positive number";
    }

    // Tank validation
    if (!formData.tank_id) {
      newErrors.tank_id = "Tank is required";
    } 


     //validate current volume is not bigger than capacity after adding this qunatity
     if(formData.tank_id && formData.quantity)
      {
        try {
          const {data} = await tankApi.getTank(formData.tank_id);
          const tank = data.data;
          if(initialData)
          {
            tank.current_volume = tank.current_volume - parseFloat(initialData.quantity);
            formData.previousVolume = tank.current_volume;
          }
          const tankVolumeAfterAddingNewQuantity = tank.current_volume + parseFloat(formData.quantity);
          if(tankVolumeAfterAddingNewQuantity >  tank.capacity){
            newErrors.quantity =`The quantity you're trying to add exceeds the tank's capacity.but the tank only has ${tank.capacity - tank.current_volume}L of available space left. Please reduce the quantity.`;
        }
        } catch (err) {
          toast.error("Failed to load tank. Please try again.");
          newErrors.fuel_type_id = "we have some issues we will fix them soon.";
        }
          }
    // Supplier validation
    if (!formData.supplier_id) {
      newErrors.supplier_id = "Supplier is required";
    }

    // Fuel type validation
    if (!formData.fuel_type_id) {
      newErrors.fuel_type_id = "Fuel type is required";
    }
  
        //validate tank is linked to right fuel type
        if(formData.tank_id && formData.fuel_type_id)
          {
            try {
              const {data} = await tankApi.getTank(formData.tank_id);
              const tank = data.data;

              if(tank.fuel_type.id !== parseInt(formData.fuel_type_id)){
                newErrors.tank_id = "The selected tank does not match the provided fuel type";
                newErrors.fuel_type_id = "The selected fuel type does not match the provided tank";
            }
            } catch (err) {
              toast.error("Failed to load tank. Please try again.");
              newErrors.fuel_type_id = "something is wrong.";
            }
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
          {initialData ? "Edit Stock Entry" : "Add Stock Entry"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Entry Date Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Entry Date
              </label>
              <input
                type="date"
                name="entry_date"
                value={formData.entry_date}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              {touched.entry_date && errors.entry_date && (
                <p className="text-red-500 text-sm mt-1">{errors.entry_date}</p>
              )}
            </div>

            {/* Quantity Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                min="0"
                step="0.01"
              />
              {touched.quantity && errors.quantity && (
                <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
              )}
            </div>

            {/* Purchase Price Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Purchase Price
              </label>
              <input
                type="number"
                name="purchase_price"
                value={formData.purchase_price}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                min="0"
                step="0.01"
              />
              {touched.purchase_price && errors.purchase_price && (
                <p className="text-red-500 text-sm mt-1">{errors.purchase_price}</p>
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
                    {tank.name} (Capacity: {tank.capacity} L)
                  </option>
                ))}
              </select>
              {touched.tank_id && errors.tank_id && (
                <p className="text-red-500 text-sm mt-1">{errors.tank_id}</p>
              )}
            </div>

            {/* Supplier Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Supplier
              </label>
              <select
                name="supplier_id"
                value={formData.supplier_id}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select a supplier</option>
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
              {touched.supplier_id && errors.supplier_id && (
                <p className="text-red-500 text-sm mt-1">{errors.supplier_id}</p>
              )}
            </div>

            {/* Fuel Type Field */}
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
                {fuelTypes.map((fuelType) => (
                  <option key={fuelType.id} value={fuelType.id}>
                    {fuelType.name}
                  </option>
                ))}
              </select>
              {touched.fuel_type_id && errors.fuel_type_id && (
                <p className="text-red-500 text-sm mt-1">{errors.fuel_type_id}</p>
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

export default StockEntryFormModal;
