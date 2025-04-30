// import React, { useState, useEffect } from "react";
// import { Plus, Edit, Trash2 } from 'lucide-react';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Swal from 'sweetalert2';
// import saleApi from "../../services/api/sale/saleApi"; 
// import tankApi from "../../services/api/tank/tankApi"; 
// import SaleFormModal from "./SaleFormModal"; 
// import meterReadingApi from "../../services/api/meterReading/meterReadingApi";
// import salePriceHistoryApi from "../../services/api/salePriceHistory/salePriceHistoryApi";

// const SalesList = () => {
//   const [sales, setSales] = useState([]);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [editingSale, setEditingSale] = useState(null);

//   // Fetch sales
//   const fetchSales = async () => {
//     setLoading(true);
//     try {
//       const { data } = await saleApi.getAllSales(); 
//       setSales(data);
//       setLoading(false);

//     } catch (err) {
//       toast.error("Failed to load sales list. Please try again.", {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   useEffect(() => {
//     fetchSales();
//   }, []);

//   const updateTank=async(tank_id,quantity)=>{
//     let tank=null;
//     try {
//       let {data} = await tankApi.getTank(tank_id);
//       let tank = data.data;

//       tank.current_volume-=parseFloat(quantity);
//       //validate quantity is exist
//       if(tank.current_volume < 0){
//         throw new Error(`The quantity you're trying to buy is less than tank current volume.but the tank only has  ${tank.current_volume+tank.capacity}L of available space left. Please reduce the quantity.`);
//       }
//         await tankApi.updateTank(tank);
//         toast.success("tank volume updated successfully!", {
//           position: "top-right",
//           autoClose: 3000,
//           theme: "colored",
//         });
//         return tank;
        
//         } catch (err) {
//           toast.error(err.message, {
//             position: "top-right",
//             autoClose: 3000,
//             theme: "colored",
//           });
//           tank=null;
//           return tank;
//         }
//       };
    
//   // Add a new sale
//   const handleAddSale = async (sale) => {
//     try {
      
//       const {data}=await meterReadingApi.getMeterReadingByPumpId(sale.pump_id);
//       let meterReading = data.data;

//       const updatedTank = await updateTank(meterReading.pump.tank_id,sale.quantity);

//       if(updatedTank){
//         //update meter reading if tank was updated
//         meterReading.final_reading = parseFloat(meterReading.initial_reading)+parseFloat(sale.quantity);
//         meterReading.initial_reading = meterReading.final_reading;
//         await meterReadingApi.updateMeterReading(meterReading)

//         const {data} = await salePriceHistoryApi.getCurrentSalePriceByFuelType(updatedTank.fuel_type.id);
//         const salePriceHistory = data.data;

//         const amount = parseFloat(sale.quantity)*parseFloat(salePriceHistory.sale_price);

//         sale = {...sale,amount,sale_price_history_id:salePriceHistory.id,meter_reading_id:meterReading.id}

//         await saleApi.addNewSale(sale); 
//         fetchSales();
//       }

//       toast.success("Sale completed successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     } catch (err) {
//       console.log(err);
//       toast.error(`Failed to complete sale. ${err.response.data.message}`, {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   // Update a sale
//   const handleUpdateSale = async (sale) => {
//     try {
//       await saleApi.updateSale(sale);
//       fetchSales();
//       toast.success("Sale updated successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     } catch (err) {
//       console.log(err);
//       toast.error(`Failed to update sale. ${err.response.data.message}`, {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   // Delete a sale
//   const handleDeleteSale = async (saleId) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await saleApi.deleteSale(saleId);
//           fetchSales();
//           toast.success("Sale deleted successfully!", {
//             position: "top-right",
//             autoClose: 3000,
//             theme: "colored",
//           });
//         } catch (err) {
//           console.log(err);
//           toast.error(`Failed to delete sale. ${err.response.data.message}`, {
//             position: "top-right",
//             autoClose: 3000,
//             theme: "colored",
//           });
//         }
//       }
//     });
//   };

//   // Open edit modal
//   const openEditModal = (sale = null) => {
//     setEditingSale(sale);
//     setIsEditModalOpen(true);
//   };

//   // Close edit modal
//   const closeEditModal = () => {
//     setEditingSale(null);
//     setIsEditModalOpen(false);
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className="looping-rhombuses-spinner">
//         <div className="rhombus"></div>
//         <div className="rhombus"></div>
//         <div className="rhombus"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">Sales</h1>
//       <button
//         onClick={() => openEditModal()}
//         className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//       >
//         Add Sale
//       </button>
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="overflow-x-auto">
//           <table className="min-w-full">
//             <thead>
//               <tr>
//               <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Sale Date
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Pump Number
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Quantity (L)
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Amount (MAD)
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Payment Method
//                 </th>
//                 {/* <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th> */}
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {sales.map((sale) => (
//                 <tr key={sale.id}>
//                   <td className="px-6 py-4 whitespace-nowrap">{sale.sale_date}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{sale.meter_reading.pump.code}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{sale.quantity}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{sale.amount}</td>

//                   <td className="px-6 py-4 whitespace-nowrap">{sale.payment_method}</td>

//                   {/* <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-4">
//                     <button
//                       className="text-indigo-600 hover:text-indigo-900"
//                       onClick={() => openEditModal(sale)}
//                     >
//                       <Edit className="h-5 w-5" />
//                     </button>
//                     <button
//                       className="text-red-600 hover:text-red-900"
//                       onClick={() => handleDeleteSale(sale.id)}
//                     >
//                       <Trash2 className="h-5 w-5" />
//                     </button>
//                   </td> */}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <SaleFormModal
//         isOpen={isEditModalOpen}
//         onClose={closeEditModal}
//         onSubmit={editingSale ? handleUpdateSale : handleAddSale}
//         initialData={editingSale}
//       />

//       <ToastContainer />
//     </div>
//   );
// };

// export default SalesList;
// import React, { useState, useEffect } from "react";
// import { Plus, Edit, Trash2, ArrowUp, ArrowDown, ChevronDown, X, ChevronLeft, ChevronRight } from 'lucide-react';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Swal from 'sweetalert2';
// import saleApi from "../../services/api/sale/saleApi"; 
// import tankApi from "../../services/api/tank/tankApi"; 
// import SaleFormModal from "./SaleFormModal"; 
// import meterReadingApi from "../../services/api/meterReading/meterReadingApi";
// import salePriceHistoryApi from "../../services/api/salePriceHistory/salePriceHistoryApi";
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";

// const SalesList = () => {
//   const [sales, setSales] = useState([]);
//   const [filteredSales, setFilteredSales] = useState([]);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [editingSale, setEditingSale] = useState(null);
//   const [dateRange, setDateRange] = useState([null, null]);
//   const [startDate, endDate] = dateRange;
//   const [selectedPump, setSelectedPump] = useState('');
//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
//   const [pumps, setPumps] = useState([]);
//   const [paymentMethods, setPaymentMethods] = useState([]);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   // Fetch sales
//   const fetchSales = async () => {
//     setLoading(true);
//     try {
//       const { data } = await saleApi.getAllSales(); 
//       setSales(data);
//       setFilteredSales(data);

//       const uniquePumps = [...new Set(data.map(sale => sale.meter_reading.pump.code))];
//       const uniquePaymentMethods = [...new Set(data.map(sale => sale.payment_method))];
//       setPumps(uniquePumps);
//       setPaymentMethods(uniquePaymentMethods);

//       setLoading(false);
//     } catch (err) {
//       toast.error("Failed to load sales list. Please try again.", {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSales();
//   }, []);

//   // Filter and sort sales
//   useEffect(() => {
//     let filtered = sales.filter(sale => {
//       const saleDate = new Date(sale.sale_date.split(' ')[0]);
//       const dateMatch = (!startDate || saleDate >= startDate) && (!endDate || saleDate <= endDate);
//       const pumpMatch = !selectedPump || sale.meter_reading.pump.code === selectedPump;
//       const paymentMethodMatch = !selectedPaymentMethod || sale.payment_method === selectedPaymentMethod;
//       return dateMatch && pumpMatch && paymentMethodMatch;
//     });

//     if (sortConfig.key) {
//       filtered.sort((a, b) => {
//         let aValue, bValue;
//         if (sortConfig.key === 'sale_date') {
//           aValue = new Date(a.sale_date.split(' ')[0]);
//           bValue = new Date(b.sale_date.split(' ')[0]);
//         } else if (sortConfig.key === 'pump') {
//           aValue = a.meter_reading.pump.code.toLowerCase();
//           bValue = b.meter_reading.pump.code.toLowerCase();
//         } else if (sortConfig.key === 'quantity') {
//           aValue = parseFloat(a.quantity);
//           bValue = parseFloat(b.quantity);
//         } else if (sortConfig.key === 'amount') {
//           aValue = parseFloat(a.amount);
//           bValue = parseFloat(b.amount);
//         } else if (sortConfig.key === 'payment_method') {
//           aValue = a.payment_method.toLowerCase();
//           bValue = b.payment_method.toLowerCase();
//         }

//         if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
//         if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
//         return 0;
//       });
//     }

//     setFilteredSales(filtered);
//   }, [sales, dateRange, selectedPump, selectedPaymentMethod, sortConfig]);

//   const updateTank = async (tank_id, quantity) => {
//     let tank = null;
//     try {
//       let { data } = await tankApi.getTank(tank_id);
//       let tankData = data.data;

//       tankData.current_volume -= parseFloat(quantity);
//       if (tankData.current_volume < 0) {
//         throw new Error(`The quantity you're trying to buy is less than tank current volume, but the tank only has ${tankData.current_volume + tankData.capacity}L of available space left. Please reduce the quantity.`);
//       }
//       await tankApi.updateTank(tankData);
//       return tankData;
//     } catch (err) {
//       toast.error(err.message, {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//       return null;
//     }
//   };

//   const handleAddSale = async (sale) => {
//     try {
//       const { data } = await meterReadingApi.getMeterReadingByPumpId(sale.pump_id);
//       let meterReading = data.data;

//       const updatedTank = await updateTank(meterReading.pump.tank_id, sale.quantity);

//       if (updatedTank) {
//         meterReading.final_reading = parseFloat(meterReading.initial_reading) + parseFloat(sale.quantity);
//         meterReading.initial_reading = meterReading.final_reading;
//         await meterReadingApi.updateMeterReading(meterReading);

//         const { data: priceData } = await salePriceHistoryApi.getCurrentSalePriceByFuelType(updatedTank.fuel_type.id);
//         const salePriceHistory = priceData.data;

//         const amount = parseFloat(sale.quantity) * parseFloat(salePriceHistory.sale_price);

//         sale = { ...sale, amount, sale_price_history_id: salePriceHistory.id, meter_reading_id: meterReading.id };

//         await saleApi.addNewSale(sale);
//       }

//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleUpdateSale = async (sale) => {
//     try {
//       await saleApi.updateSale(sale);
//       fetchSales();
//       toast.success("Sale updated successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     } catch (err) {
//       console.log(err);
//       toast.error(`Failed to update sale. ${err.response?.data?.message || err.message}`, {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   const handleDeleteSale = async (saleId) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await saleApi.deleteSale(saleId);
//           fetchSales();
//           toast.success("Sale deleted successfully!", {
//             position: "top-right",
//             autoClose: 3000,
//             theme: "colored",
//           });
//         } catch (err) {
//           console.log(err);
//           toast.error(`Failed to delete sale. ${err.response?.data?.message || err.message}`, {
//             position: "top-right",
//             autoClose: 3000,
//             theme: "colored",
//           });
//         }
//       }
//     });
//   };

//   const openEditModal = (sale = null) => {
//     setEditingSale(sale);
//     setIsEditModalOpen(true);
//   };

//   const closeEditModal = () => {
//     fetchSales();
//     setEditingSale(null);
//     setIsEditModalOpen(false);
//   };

//   const resetFilters = () => {
//     setDateRange([null, null]);
//     setSelectedPump('');
//     setSelectedPaymentMethod('');
//     setCurrentPage(1);
//     setSortConfig({ key: null, direction: 'asc' });
//     toast.info("Filters reset", {
//       position: "top-right",
//       autoClose: 2000,
//     });
//   };

//   const removeFilter = (filterType) => {
//     switch (filterType) {
//       case 'date':
//         setDateRange([null, null]);
//         break;
//       case 'pump':
//         setSelectedPump('');
//         break;
//       case 'paymentMethod':
//         setSelectedPaymentMethod('');
//         break;
//       default:
//         break;
//     }
//     setCurrentPage(1);
//   };

//   const handleSort = (key) => {
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//     setCurrentPage(1);
//   };

//   const totalPages = Math.ceil(filteredSales.length / itemsPerPage);
//   const paginatedSales = filteredSales.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   if (loading) {
//     return (
//       <div className="looping-rhombuses-spinner">
//     <div className="rhombus"></div>
//     <div className="rhombus"></div>
//     <div className="rhombus"></div>
//   </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-6">
//       {/* Filters */}
//       <div className="mb-6 p-6 bg-gray-50 rounded-xl shadow-sm">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold text-gray-800">Filter Sales Records</h2>
//           <button
//             onClick={() => openEditModal()}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors duration-150"
//             aria-label="Add a new sale record"
//           >
//             <Plus className="inline-block mr-2 h-5 w-5" /> Add Sale
//           </button>
//         </div>
//         <div className="flex flex-wrap gap-4">
//           <div className="flex-1 min-w-[200px]">
//             <label htmlFor="date-range" className="block text-sm font-medium text-gray-800 mb-1">Sale Date Range</label>
//             <div className="relative">
//               <DatePicker
//                 id="date-range"
//                 selectsRange
//                 startDate={startDate}
//                 endDate={endDate}
//                 onChange={(update) => {
//                   setDateRange(update);
//                   setCurrentPage(1);
//                 }}
//                 className="p-2 border border-gray-400 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
//                 dateFormat="MMMM d, yyyy"
//                 placeholderText="Select date range"
//                 isClearable
//               />
//             </div>
//           </div>
//           <div className="flex-1 min-w-[200px]">
//             <label htmlFor="pump-filter" className="block text-sm font-medium text-gray-800 mb-1">Pump Number</label>
//             <div className="relative">
//               <select
//                 id="pump-filter"
//                 value={selectedPump}
//                 onChange={(e) => {
//                   setSelectedPump(e.target.value);
//                   setCurrentPage(1);
//                 }}
//                 className={`p-2 pr-8 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 appearance-none ${
//                   selectedPump ? 'border-blue-500' : 'border-gray-400'
//                 }`}
//               >
//                 <option value="">All Pumps</option>
//                 {pumps.map((pump) => (
//                   <option key={pump} value={pump}>{pump}</option>
//                 ))}
//               </select>
//               <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//             </div>
//           </div>
//           <div className="flex-1 min-w-[200px]">
//             <label htmlFor="payment-method-filter" className="block text-sm font-medium text-gray-800 mb-1">Payment Method</label>
//             <div className="relative">
//               <select
//                 id="payment-method-filter"
//                 value={selectedPaymentMethod}
//                 onChange={(e) => {
//                   setSelectedPaymentMethod(e.target.value);
//                   setCurrentPage(1);
//                 }}
//                 className={`p-2 pr-8 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 appearance-none ${
//                   selectedPaymentMethod ? 'border-blue-500' : 'border-gray-400'
//                 }`}
//               >
//                 <option value="">All Payment Methods</option>
//                 {paymentMethods.map((method) => (
//                   <option key={method} value={method}>{method}</option>
//                 ))}
//               </select>
//               <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//             </div>
//           </div>
//           <div className="flex items-end">
//             <button
//               onClick={resetFilters}
//               className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-blue-500 transition-colors duration-150 flex items-center w-full sm:w-auto"
//             >
//               <X className="h-4 w-4 mr-2" /> Reset Filters
//             </button>
//           </div>
//         </div>
//         {(startDate || endDate || selectedPump || selectedPaymentMethod) && (
//           <div className="mt-4 text-sm text-gray-600 flex flex-wrap gap-2">
//             <span className="font-medium">Filtered by:</span>
//             {(startDate || endDate) && (
//               <button
//                 onClick={() => removeFilter('date')}
//                 className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-150 flex items-center"
//               >
//                 Date: {startDate?.toLocaleDateString() || ''} {endDate ? `to ${endDate.toLocaleDateString()}` : ''} <X className="ml-1 h-4 w-4" />
//               </button>
//             )}
//             {selectedPump && (
//               <button
//                 onClick={() => removeFilter('pump')}
//                 className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-150 flex items-center"
//               >
//                 Pump: {selectedPump} <X className="ml-1 h-4 w-4" />
//               </button>
//             )}
//             {selectedPaymentMethod && (
//               <button
//                 onClick={() => removeFilter('paymentMethod')}
//                 className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-150 flex items-center"
//               >
//                 Payment: {selectedPaymentMethod} <X className="ml-1 h-4 w-4" />
//               </button>
//             )}
//           </div>
//         )}
//       </div>

//       <div className="bg-white p-6 rounded-xl shadow-sm">
//         {paginatedSales.length === 0 ? (
//           <div className="text-center py-8 text-gray-500">
//             No sales records found. Try adjusting your filters.
//           </div>
//         ) : (
//           <>
//             {/* Table Layout for Larger Screens */}
//             <div className="hidden md:block overflow-x-auto">
//               <table className="min-w-full">
//                 <caption className="sr-only">Sales Records List</caption>
//                 <thead>
//                   <tr>
//                     <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
//                       <button onClick={() => handleSort('sale_date')} className="flex items-center">
//                         Sale Date
//                         {sortConfig.key === 'sale_date' && (
//                           sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
//                         )}
//                       </button>
//                     </th>
//                     <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
//                       <button onClick={() => handleSort('pump')} className="flex items-center">
//                         Pump Number
//                         {sortConfig.key === 'pump' && (
//                           sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
//                         )}
//                       </button>
//                     </th>
//                     <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
//                       <button onClick={() => handleSort('quantity')} className="flex items-center">
//                         Quantity (L)
//                         {sortConfig.key === 'quantity' && (
//                           sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
//                         )}
//                       </button>
//                     </th>
//                     <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
//                       <button onClick={() => handleSort('amount')} className="flex items-center">
//                         Amount (MAD)
//                         {sortConfig.key === 'amount' && (
//                           sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
//                         )}
//                       </button>
//                     </th>
//                     <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
//                       <button onClick={() => handleSort('payment_method')} className="flex items-center">
//                         Payment Method
//                         {sortConfig.key === 'payment_method' && (
//                           sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
//                         )}
//                       </button>
//                     </th>
//                     <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {paginatedSales.map((sale) => (
//                     <tr key={sale.id} className="hover:bg-gray-100 transition-colors duration-150">
//                       <td className="px-4 py-3 whitespace-nowrap text-gray-800">{sale.sale_date}</td>
//                       <td className="px-4 py-3 whitespace-nowrap text-gray-800">{sale.meter_reading.pump.code}</td>
//                       <td className="px-4 py-3 whitespace-nowrap text-gray-800">{sale.quantity}</td>
//                       <td className="px-4 py-3 whitespace-nowrap text-gray-800">{sale.amount}</td>
//                       <td className="px-4 py-3 whitespace-nowrap text-gray-800">{sale.payment_method}</td>
//                       <td className="px-4 py-3 whitespace-nowrap text-sm font-medium flex space-x-3">
//                         <div className="relative group">
//                           <button
//                             className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
//                             onClick={() => openEditModal(sale)}
//                             aria-label={`Edit sale record for ${sale.sale_date}`}
//                           >
//                             <Edit className="h-5 w-5" />
//                           </button>
//                           <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Edit</div>
//                         </div>
//                         <div className="relative group">
//                           {/* <button
//                             className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
//                             onClick={() => handleDeleteSale(sale.id)}
//                             aria-label={`Delete sale record for ${sale.sale_date}`}
//                           >
//                             <Trash2 className="h-5 w-5" />
//                           </button> */}
//                           <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Delete</div>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Card Layout for Smaller Screens */}
//             <div className="block md:hidden space-y-4">
//               {paginatedSales.map((sale) => (
//                 <div key={sale.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-800">{sale.sale_date}</h3>
//                       <p className="text-sm text-gray-600">Pump Number: {sale.meter_reading.pump.code}</p>
//                       <p className="text-sm text-gray-600">Quantity: {sale.quantity} L</p>
//                       <p className="text-sm text-gray-600">Amount: {sale.amount} MAD</p>
//                       <p className="text-sm text-gray-600">Payment Method: {sale.payment_method}</p>
//                     </div>
//                     <div className="flex space-x-2">
//                       <div className="relative group">
//                         <button
//                           className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
//                           onClick={() => openEditModal(sale)}
//                           aria-label={`Edit sale record for ${sale.sale_date}`}
//                         >
//                           <Edit className="h-5 w-5" />
//                         </button>
//                         <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Edit</div>
//                       </div>
//                       <div className="relative group">
//                         <button
//                           className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
//                           onClick={() => handleDeleteSale(sale.id)}
//                           aria-label={`Delete sale record for ${sale.sale_date}`}
//                         >
//                           <Trash2 className="h-5 w-5" />
//                         </button>
//                         <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Delete</div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="mt-6 flex justify-between items-center">
//                 <div className="text-sm text-gray-600">
//                   Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredSales.length)} of {filteredSales.length} sales records
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <button
//                     onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                     disabled={currentPage === 1}
//                     className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 transition-colors duration-150 flex items-center"
//                   >
//                     <ChevronLeft className="h-4 w-4 mr-1" /> Previous
//                   </button>
//                   <span className="text-sm text-gray-600">
//                     Page {currentPage} of {totalPages}
//                   </span>
//                   <button
//                     onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                     disabled={currentPage === totalPages}
//                     className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 transition-colors duration-150 flex items-center"
//                   >
//                     Next <ChevronRight className="h-4 w-4 ml-1" />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       <SaleFormModal
//         isOpen={isEditModalOpen}
//         onClose={closeEditModal}
//         onSubmit={editingSale ? handleUpdateSale : handleAddSale}
//         initialData={editingSale}
//         fetchSales={fetchSales}
//       />

//       <ToastContainer />
//     </div>
//   );
// };

// export default SalesList;
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, ArrowUp, ArrowDown, ChevronDown, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';
import saleApi from "../../services/api/sale/saleApi"; 
import tankApi from "../../services/api/tank/tankApi"; 
import SaleFormModal from "./SaleFormModal"; 
import meterReadingApi from "../../services/api/meterReading/meterReadingApi";
import salePriceHistoryApi from "../../services/api/salePriceHistory/salePriceHistoryApi";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const SalesList = () => {
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingSale, setEditingSale] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [selectedPump, setSelectedPump] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [pumps, setPumps] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchSales = async () => {
    setLoading(true);
    try {
      const { data } = await saleApi.getAllSales(); 
      setSales(data);
      setFilteredSales(data);

      const uniquePumps = [...new Set(data.map(sale => sale.meter_reading.pump.code))];
      const uniquePaymentMethods = [...new Set(data.map(sale => sale.payment_method))];
      setPumps(uniquePumps);
      setPaymentMethods(uniquePaymentMethods);

      setLoading(false);
    } catch (err) {
      toast.error("Failed to load sales list. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  useEffect(() => {
    let filtered = sales.filter(sale => {
      const saleDate = new Date(sale.sale_date.split(' ')[0]);
      const dateMatch = (!startDate || saleDate >= startDate) && (!endDate || saleDate <= endDate);
      const pumpMatch = !selectedPump || sale.meter_reading.pump.code === selectedPump;
      const paymentMethodMatch = !selectedPaymentMethod || sale.payment_method === selectedPaymentMethod;
      return dateMatch && pumpMatch && paymentMethodMatch;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue, bValue;
        if (sortConfig.key === 'sale_date') {
          aValue = new Date(a.sale_date.split(' ')[0]);
          bValue = new Date(b.sale_date.split(' ')[0]);
        } else if (sortConfig.key === 'pump') {
          aValue = a.meter_reading.pump.code.toLowerCase();
          bValue = b.meter_reading.pump.code.toLowerCase();
        } else if (sortConfig.key === 'quantity') {
          aValue = parseFloat(a.quantity);
          bValue = parseFloat(b.quantity);
        } else if (sortConfig.key === 'amount') {
          aValue = parseFloat(a.amount);
          bValue = parseFloat(b.amount);
        } else if (sortConfig.key === 'payment_method') {
          aValue = a.payment_method.toLowerCase();
          bValue = b.payment_method.toLowerCase();
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredSales(filtered);
  }, [sales, dateRange, selectedPump, selectedPaymentMethod, sortConfig]);

  const updateTank = async (tank_id, quantity) => {
    let tank = null;
    try {
      let { data } = await tankApi.getTank(tank_id);
      let tankData = data.data;

      tankData.current_volume -= parseFloat(quantity);
      if (tankData.current_volume < 0) {
        throw new Error(`The quantity you're trying to buy exceeds the tank's current volume. The tank only has ${tankData.current_volume + parseFloat(quantity)}L left. Please reduce the quantity.`);
      }
      await tankApi.updateTank(tankData);
      return tankData;
    } catch (err) {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return null;
    }
  };

  const handleAddSale = async (sale) => {
    try {
      const { data } = await meterReadingApi.getMeterReadingByPumpId(sale.pump_id);
      let meterReading = data.data;

      const updatedTank = await updateTank(meterReading.pump.tank_id, sale.quantity);

      if (updatedTank) {
        meterReading.final_reading = parseFloat(meterReading.initial_reading) + parseFloat(sale.quantity);
        meterReading.initial_reading = meterReading.final_reading;
        await meterReadingApi.updateMeterReading(meterReading);

        const { data: priceData } = await salePriceHistoryApi.getCurrentSalePriceByFuelType(updatedTank.fuel_type.id);
        const salePriceHistory = priceData.data;

        const amount = parseFloat(sale.quantity) * parseFloat(salePriceHistory.sale_price);

        sale = { ...sale, amount, sale_price_history_id: salePriceHistory.id, meter_reading_id: meterReading.id };

        await saleApi.addNewSale(sale);
        await fetchSales(); // Refresh sales data
        console.log("Toast triggered")
        toast.success("Sale added successfully!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        return true; // Indicate success
      }
      return false; // Indicate failure if tank update fails
    } catch (err) {
      console.log(err);
      toast.error(`Failed to add sale. ${err.response?.data?.message || err.message}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return false; // Indicate failure
    }
  };

  const handleUpdateSale = async (sale) => {
    try {
      await saleApi.updateSale(sale);
      await fetchSales();
      toast.success("Sale updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return true;
    } catch (err) {
      console.log(err);
      toast.error(`Failed to update sale. ${err.response?.data?.message || err.message}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return false;
    }
  };

  const handleDeleteSale = async (saleId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await saleApi.deleteSale(saleId);
          fetchSales();
          toast.success("Sale deleted successfully!", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        } catch (err) {
          console.log(err);
          toast.error(`Failed to delete sale. ${err.response?.data?.message || err.message}`, {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        }
      }
    });
  };

  const openEditModal = (sale = null) => {
    setEditingSale(sale);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    fetchSales();
    setEditingSale(null);
    setIsEditModalOpen(false);
  };

  const resetFilters = () => {
    setDateRange([null, null]);
    setSelectedPump('');
    setSelectedPaymentMethod('');
    setCurrentPage(1);
    setSortConfig({ key: null, direction: 'asc' });
    toast.info("Filters reset", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const removeFilter = (filterType) => {
    switch (filterType) {
      case 'date':
        setDateRange([null, null]);
        break;
      case 'pump':
        setSelectedPump('');
        break;
      case 'paymentMethod':
        setSelectedPaymentMethod('');
        break;
      default:
        break;
    }
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredSales.length / itemsPerPage);
  const paginatedSales = filteredSales.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="looping-rhombuses-spinner">
        <div className="rhombus"></div>
        <div className="rhombus"></div>
        <div className="rhombus"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 p-6 bg-gray-50 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Filter Sales Records</h2>
          <button
            onClick={() => openEditModal()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors duration-150"
            aria-label="Add a new sale record"
          >
            <Plus className="inline-block mr-2 h-5 w-5" /> Add Sale
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="date-range" className="block text-sm font-medium text-gray-800 mb-1">Sale Date Range</label>
            <div className="relative">
              <DatePicker
                id="date-range"
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                  setDateRange(update);
                  setCurrentPage(1);
                }}
                className="p-2 border border-gray-400 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
                dateFormat="MMMM d, yyyy"
                placeholderText="Select date range"
                isClearable
              />
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="pump-filter" className="block text-sm font-medium text-gray-800 mb-1">Pump Number</label>
            <div className="relative">
              <select
                id="pump-filter"
                value={selectedPump}
                onChange={(e) => {
                  setSelectedPump(e.target.value);
                  setCurrentPage(1);
                }}
                className={`p-2 pr-8 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 appearance-none ${
                  selectedPump ? 'border-blue-500' : 'border-gray-400'
                }`}
              >
                <option value="">All Pumps</option>
                {pumps.map((pump) => (
                  <option key={pump} value={pump}>{pump}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="payment-method-filter" className="block text-sm font-medium text-gray-800 mb-1">Payment Method</label>
            <div className="relative">
              <select
                id="payment-method-filter"
                value={selectedPaymentMethod}
                onChange={(e) => {
                  setSelectedPaymentMethod(e.target.value);
                  setCurrentPage(1);
                }}
                className={`p-2 pr-8 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 appearance-none ${
                  selectedPaymentMethod ? 'border-blue-500' : 'border-gray-400'
                }`}
              >
                <option value="">All Payment Methods</option>
                {paymentMethods.map((method) => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-blue-500 transition-colors duration-150 flex items-center w-full sm:w-auto"
            >
              <X className="h-4 w-4 mr-2" /> Reset Filters
            </button>
          </div>
        </div>
        {(startDate || endDate || selectedPump || selectedPaymentMethod) && (
          <div className="mt-4 text-sm text-gray-600 flex flex-wrap gap-2">
            <span className="font-medium">Filtered by:</span>
            {(startDate || endDate) && (
              <button
                onClick={() => removeFilter('date')}
                className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-150 flex items-center"
              >
                Date: {startDate?.toLocaleDateString() || ''} {endDate ? `to ${endDate.toLocaleDateString()}` : ''} <X className="ml-1 h-4 w-4" />
              </button>
            )}
            {selectedPump && (
              <button
                onClick={() => removeFilter('pump')}
                className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-150 flex items-center"
              >
                Pump: {selectedPump} <X className="ml-1 h-4 w-4" />
              </button>
            )}
            {selectedPaymentMethod && (
              <button
                onClick={() => removeFilter('paymentMethod')}
                className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-150 flex items-center"
              >
                Payment: {selectedPaymentMethod} <X className="ml-1 h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        {paginatedSales.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No sales records found. Try adjusting your filters.
          </div>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full">
                <caption className="sr-only">Sales Records List</caption>
                <thead>
                  <tr>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('sale_date')} className="flex items-center">
                        Sale Date
                        {sortConfig.key === 'sale_date' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('pump')} className="flex items-center">
                        Pump Number
                        {sortConfig.key === 'pump' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('quantity')} className="flex items-center">
                        Quantity (L)
                        {sortConfig.key === 'quantity' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('amount')} className="flex items-center">
                        Amount (MAD)
                        {sortConfig.key === 'amount' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('payment_method')} className="flex items-center">
                        Payment Method
                        {sortConfig.key === 'payment_method' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedSales.map((sale) => (
                    <tr key={sale.id} className="hover:bg-gray-100 transition-colors duration-150">
                      <td className="px-4 py-3 whitespace-nowrap text-gray-800">{sale.sale_date}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-800">{sale.meter_reading.pump.code}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-800">{sale.quantity}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-800">{sale.amount}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-800">{sale.payment_method}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium flex space-x-3">
                        <div className="relative group">
                          <button
                            className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                            onClick={() => openEditModal(sale)}
                            aria-label={`Edit sale record for ${sale.sale_date}`}
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Edit</div>
                        </div>
                        <div className="relative group">
                          {/* <button
                            className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                            onClick={() => handleDeleteSale(sale.id)}
                            aria-label={`Delete sale record for ${sale.sale_date}`}
                          >
                            <Trash2 className="h-5 w-5" />
                          </button> */}
                          <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Delete</div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="block md:hidden space-y-4">
              {paginatedSales.map((sale) => (
                <div key={sale.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{sale.sale_date}</h3>
                      <p className="text-sm text-gray-600">Pump Number: {sale.meter_reading.pump.code}</p>
                      <p className="text-sm text-gray-600">Quantity: {sale.quantity} L</p>
                      <p className="text-sm text-gray-600">Amount: {sale.amount} MAD</p>
                      <p className="text-sm text-gray-600">Payment Method: {sale.payment_method}</p>
                    </div>
                    <div className="flex space-x-2">
                      <div className="relative group">
                        <button
                          className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                          onClick={() => openEditModal(sale)}
                          aria-label={`Edit sale record for ${sale.sale_date}`}
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Edit</div>
                      </div>
                      <div className="relative group">
                        <button
                          className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                          onClick={() => handleDeleteSale(sale.id)}
                          aria-label={`Delete sale record for ${sale.sale_date}`}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                        <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Delete</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-6 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredSales.length)} of {filteredSales.length} sales records
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 transition-colors duration-150 flex items-center"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 transition-colors duration-150 flex items-center"
                  >
                    Next <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <SaleFormModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSubmit={editingSale ? handleUpdateSale : handleAddSale}
        initialData={editingSale}
      />

      <ToastContainer />
    </div>
  );
};

export default SalesList;