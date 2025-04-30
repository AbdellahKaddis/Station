import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import salePriceHistoryApi from "../../services/api/salePriceHistory/salePriceHistoryApi";
import meterReadingApi from "../../services/api/meterReading/meterReadingApi";
import pumpApi from "../../services/api/pump/pumpApi";
import tankApi from "../../services/api/tank/tankApi";

const SaleFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const defaultFormData = {
    quantity: "",
    sale_date: "",
    payment_method: "",
    pump_id: null,
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [pumps, setPumps] = useState([]);

  const fetchPumps = async () => {
    try {
      const { data } = await pumpApi.getAllPumps(); 
      setPumps(data.data);
    } catch (err) {
      toast.error("Failed to load pumps list. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    fetchPumps();
    if (isOpen) {
      const initialDataToUse = initialData || defaultFormData; 
      setFormData(initialDataToUse);

      const initialTouched = {
        quantity: false,
        sale_date: false,
        payment_method: false,
        pump_id: false,
      };
      setTouched(initialTouched);
      setErrors({});
    }
  }, [isOpen, initialData]);

  const validateForm = async () => {
    const newErrors = {
      quantity: "",
      sale_date: "",
      payment_method: "",
      pump_id: "",
    };

    if (!formData.pump_id) {
      newErrors.pump_id = "Pump is required";
    }

    if (!formData.quantity) {
      newErrors.quantity = "Quantity is required";
    } else if (isNaN(parseFloat(formData.quantity))) {
      newErrors.quantity = "Quantity must be a number";
    } else if (parseFloat(formData.quantity) <= 0) {
      newErrors.quantity = "Quantity must be greater than 0";
    } else if (formData.pump_id) {
      try {
        const { data } = await pumpApi.getPump(formData.pump_id);
        const tank = data.data.tank;

        const newVolume = tank.current_volume - parseFloat(formData.quantity);
        if (newVolume < 0) {
          newErrors.quantity = `The quantity you're trying to buy exceeds the tank's volume. The tank only has ${tank.current_volume}L left. Please reduce the quantity.`;
        }
      } catch (err) {
        toast.error("Failed to load tank. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        newErrors.quantity = "Error validating tank volume. Please try again.";
      }
    }

    if (!formData.sale_date) {
      newErrors.sale_date = "Sale date is required";
    }

    if (!formData.payment_method) {
      newErrors.payment_method = "Payment method is required";
    } else if (!["cash", "card"].includes(formData.payment_method)) {
      newErrors.payment_method = "Payment method must be cash or card";
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

    const success = await onSubmit(formData); // Wait for submission result
    if (success) {
      setFormData(defaultFormData); // Reset form
      onClose(); // Close modal only on success
    }
  };

  if (!isOpen) return null;

  const displayPumps = () => {
    return pumps.map((pump) => pump.statuts === 'active' && (
      <option key={pump.id} value={pump.id}>
        {pump.code}
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

        <h2 className="text-2xl font-bold mb-6">
          {initialData ? "Edit Sale" : "Add Sale"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Pump</label>
              <select
                name="pump_id"
                value={formData.pump_id || ""}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select a pump</option>
                {displayPumps()}
              </select>
              {touched.pump_id && errors.pump_id && (
                <p className="text-red-500 text-sm mt-1">{errors.pump_id}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Quantity</label>
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
            <div>
              <label className="block text-sm font-medium text-gray-700">Sale Date</label>
              <input
                type="date"
                name="sale_date"
                value={formData.sale_date}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
              {touched.sale_date && errors.sale_date && (
                <p className="text-red-500 text-sm mt-1">{errors.sale_date}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Payment Method</label>
              <select
                name="payment_method"
                value={formData.payment_method}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select a payment method</option>
                <option value="cash">Cash</option>
                <option value="card">Card</option>
              </select>
              {touched.payment_method && errors.payment_method && (
                <p className="text-red-500 text-sm mt-1">{errors.payment_method}</p>
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

export default SaleFormModal;