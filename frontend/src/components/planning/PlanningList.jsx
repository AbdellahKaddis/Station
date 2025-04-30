// import React, { useState, useEffect } from "react";
// import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Swal from 'sweetalert2';
// import planningApi from "../../services/api/planning/planningApi"; 
// import PlanningFormModal from "./PlanningForm";
// import EmployeePlanningChart from "./EmployeePlanningChart";
// import { startOfWeek, addDays } from 'date-fns';

// export const getDateFromWeekAndDay=(week, day, year)=> {
//   // Get the first day of the year
//   const jan1 = new Date(year, 0, 1);

//   // Start of first ISO week (Monday)
//   const firstWeekStart = startOfWeek(jan1, { weekStartsOn: 1 });

//   // Calculate the number of days to add
//   const totalDays = (week - 1) * 7 + day;

//   return addDays(firstWeekStart, totalDays);
// }

// const PlanningList = () => {
//   const [plannings, setPlannings] = useState([]);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [editingPlanning, setEditingPlanning] = useState(null);

  

//   const fetchPlannings = async () => {
//     setLoading(true);
//     try {
//       const { data } = await planningApi.getAllPlannings(); 
//       setPlannings(data.data);
//       setLoading(false);
//     } catch (err) {
//       toast.error("Failed to load plannings list. Please try again.", {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   useEffect(() => {
//     fetchPlannings();
//   }, []);
//   const getDayOfWeek=(dayNumber)=> {
//     const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     if (dayNumber >= 0 && dayNumber <= 6) {
//       return days[dayNumber];
//     } else {
//       throw new Error('Invalid day number. Please provide a number between 0 and 6.');
//     }
//   }
//   const handleAddPlanning = async (planning) => {
//     try {
//       await planningApi.addNewPlanning(planning); 
//       fetchPlannings();
//       toast.success("Planning added successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     } catch (err) {
//       console.log(err);
//       toast.error(`Failed to add planning. ${err.response.data.message}`, {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   const handleUpdatePlanning = async (planning) => {
//     try {
//       await planningApi.updatePlanning(planning); 
//       fetchPlannings();
//       toast.success("Planning updated successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     } catch (err) {
//       console.log(err);
//       toast.error(`Failed to update planning. ${err.response.data.message}`, {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   const handleDeletePlanning = async (planningId) => {
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
//           await planningApi.deletePlanning(planningId);
//           fetchPlannings();
//           toast.success("Planning deleted successfully!", {
//             position: "top-right",
//             autoClose: 3000,
//             theme: "colored",
//           });
//         } catch (err) {
//           console.log(err);
//           toast.error(`Failed to delete planning. ${err.response.data.message}`, {
//             position: "top-right",
//             autoClose: 3000,
//             theme: "colored",
//           });
//         }
//       }
//     });
//   };

//   const openEditModal = (planning = null) => {
//     setEditingPlanning(planning);
//     setIsEditModalOpen(true);
//   };

//   const closeEditModal = () => {
//     setEditingPlanning(null);
//     setIsEditModalOpen(false);
//   };

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
//       <h1 className="text-3xl font-bold mb-6">Plannings</h1>
//       <button
//         onClick={() => openEditModal()}
//         className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//       >
//         Add Planning
//       </button>

//       {/* <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
//         <EmployeePlanningChart plannings={plannings} />
//       </div> */}
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="overflow-x-auto">
//           <table className="min-w-full">
//             <thead>
//               <tr>
//               <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Employee
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Date
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Start Time
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   End Time
//                 </th>
//                 <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {plannings.map((planning) => (
//                 <tr key={planning.id}>
//                   <td className="px-6 py-4 whitespace-nowrap">{planning.employee.first_name } {planning.employee.last_name}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{getDateFromWeekAndDay(planning.week,planning.day,planning.year).toDateString()}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{planning.start_time}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{planning.end_time}</td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-4">
//                     <button
//                       className="text-indigo-600 hover:text-indigo-900"
//                       onClick={() => openEditModal(planning)}
//                     >
//                       <Edit className="h-5 w-5" />
//                     </button>
//                     <button
//                       className="text-red-600 hover:text-red-900"
//                       onClick={() => handleDeletePlanning(planning.id)}
//                     >
//                       <Trash2 className="h-5 w-5" />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <PlanningFormModal
//         isOpen={isEditModalOpen}
//         onClose={closeEditModal}
//         onSubmit={editingPlanning ? handleUpdatePlanning : handleAddPlanning}
//         initialData={editingPlanning}
//       />

//       <ToastContainer />
//     </div>
//   );
// };

// export default PlanningList;

// import React, { useState, useEffect } from "react";
// import { Plus, Edit, Trash2, Eye, Search, ArrowUp, ArrowDown, ChevronDown, X, ChevronLeft, ChevronRight } from 'lucide-react';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Swal from 'sweetalert2';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import planningApi from "../../services/api/planning/planningApi";
// import PlanningFormModal from "./PlanningForm";
// import { startOfWeek, addDays } from 'date-fns';

// export const getDateFromWeekAndDay = (week, day, year) => {
//   // Get the first day of the year
//   const jan1 = new Date(year, 0, 1);

//   // Start of first ISO week (Monday)
//   const firstWeekStart = startOfWeek(jan1, { weekStartsOn: 1 });

//   // Calculate the number of days to add
//   const totalDays = (week - 1) * 7 + day;

//   return addDays(firstWeekStart, totalDays);
// };

// // Constants for error messages
// const ERROR_MESSAGES = {
//   LOAD_PLANNINGS: "Failed to load plannings list. Please try again.",
//   ADD_PLANNING: "Failed to add planning.",
//   UPDATE_PLANNING: "Failed to update planning.",
//   DELETE_PLANNING: "Failed to delete planning.",
// };

// const PlanningList = () => {
//   const [plannings, setPlannings] = useState([]);
//   const [filteredPlannings, setFilteredPlannings] = useState([]);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [editingPlanning, setEditingPlanning] = useState(null);
//   const [selectedPlanning, setSelectedPlanning] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [selectedEmployee, setSelectedEmployee] = useState('');
//   const [employees, setEmployees] = useState([]);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   const fetchPlannings = async () => {
//     setLoading(true);
//     try {
//       const { data } = await planningApi.getAllPlannings();
//       const planningData = data.data;
//       setPlannings(planningData);
//       setFilteredPlannings(planningData);

//       const uniqueEmployees = [...new Set(planningData.map(planning => `${planning.employee.first_name} ${planning.employee.last_name}`))];
//       setEmployees(uniqueEmployees);

//       setLoading(false);
//     } catch (err) {
//       toast.error(ERROR_MESSAGES.LOAD_PLANNINGS, {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPlannings();
//   }, []);

//   useEffect(() => {
//     let filtered = plannings.filter(planning => {
//       const employeeName = `${planning.employee.first_name} ${planning.employee.last_name}`;
//       const searchMatch =
//         !searchQuery ||
//         employeeName.toLowerCase().includes(searchQuery.toLowerCase());
//       const planningDate = getDateFromWeekAndDay(planning.week, planning.day, planning.year);
//       const dateMatch =
//         (!startDate || planningDate >= startDate) &&
//         (!endDate || planningDate <= endDate);
//       const employeeMatch = !selectedEmployee || employeeName === selectedEmployee;
//       return searchMatch && dateMatch && employeeMatch;
//     });

//     if (sortConfig.key) {
//       filtered.sort((a, b) => {
//         let aValue, bValue;
//         if (sortConfig.key === 'employee') {
//           aValue = `${a.employee.first_name} ${a.employee.last_name}`.toLowerCase();
//           bValue = `${b.employee.first_name} ${b.employee.last_name}`.toLowerCase();
//         } else if (sortConfig.key === 'date') {
//           aValue = getDateFromWeekAndDay(a.week, a.day, a.year);
//           bValue = getDateFromWeekAndDay(b.week, b.day, b.year);
//         } else {
//           aValue = a[sortConfig.key];
//           bValue = b[sortConfig.key];
//         }

//         if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
//         if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
//         return 0;
//       });
//     }

//     setFilteredPlannings(filtered);
//   }, [plannings, searchQuery, startDate, endDate, selectedEmployee, sortConfig]);

//   // Handle pagination
//   useEffect(() => {
//     const totalPages = Math.ceil(filteredPlannings.length / itemsPerPage);
//     if (currentPage > totalPages && totalPages > 0) {
//       setCurrentPage(totalPages);
//     } else if (filteredPlannings.length === 0) {
//       setCurrentPage(1);
//     }
//   }, [filteredPlannings, currentPage, itemsPerPage]);

//   const handleAddPlanning = async (planning) => {
//     try {
//       await planningApi.addNewPlanning(planning);
//       fetchPlannings();
//       toast.success("Planning added successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "colored",
//       });
//     } catch (err) {
//       toast.error(`${ERROR_MESSAGES.ADD_PLANNING} ${err.response?.data?.message || "Please try again."}`, {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   const handleUpdatePlanning = async (planning) => {
//     try {
//       await planningApi.updatePlanning(planning);
//       fetchPlannings();
//       toast.success("Planning updated successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "colored",
//       });
//     } catch (err) {
//       toast.error(`${ERROR_MESSAGES.UPDATE_PLANNING} ${err.response?.data?.message || "Please try again."}`, {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   const handleDeletePlanning = async (planningId) => {
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
//           await planningApi.deletePlanning(planningId);
//           fetchPlannings();
//           toast.success("Planning deleted successfully!", {
//             position: "top-right",
//             autoClose: 3000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             theme: "colored",
//           });
//         } catch (err) {
//           toast.error(`${ERROR_MESSAGES.DELETE_PLANNING} ${err.response?.data?.message || "Please try again."}`, {
//             position: "top-right",
//             autoClose: 3000,
//             theme: "colored",
//           });
//         }
//       }
//     });
//   };

//   const openEditModal = (planning = null) => {
//     setEditingPlanning(planning);
//     setIsEditModalOpen(true);
//   };

//   const openDetailsModal = (planning) => {
//     setSelectedPlanning(planning);
//     setIsDetailsModalOpen(true);
//   };

//   const closeEditModal = () => {
//     setEditingPlanning(null);
//     setIsEditModalOpen(false);
//   };

//   const closeDetailsModal = () => {
//     setSelectedPlanning(null);
//     setIsDetailsModalOpen(false);
//   };

//   const resetFilters = () => {
//     setSearchQuery('');
//     setStartDate(null);
//     setEndDate(null);
//     setSelectedEmployee('');
//     setCurrentPage(1);
//     setSortConfig({ key: null, direction: 'asc' });
//     toast.info("Filters reset", {
//       position: "top-right",
//       autoClose: 2000,
//     });
//   };

//   const removeFilter = (filterType) => {
//     switch (filterType) {
//       case 'search':
//         setSearchQuery('');
//         break;
//       case 'date':
//         setStartDate(null);
//         setEndDate(null);
//         break;
//       case 'employee':
//         setSelectedEmployee('');
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

//   const totalPages = Math.ceil(filteredPlannings.length / itemsPerPage);
//   const paginatedPlannings = filteredPlannings.slice(
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
//       {/* Filters and Actions */}
//       <div className="mb-6 p-6 bg-gray-50 rounded-xl shadow-sm">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold text-gray-800">Filter Planning Records</h2>
//           <button
//             onClick={() => openEditModal()}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors duration-150 flex items-center"
//             aria-label="Add a new planning record"
//           >
//             <Plus className="h-5 w-5 mr-2" /> Add Planning
//           </button>
//         </div>
//         <div className="flex flex-wrap gap-4">
//           <div className="flex-1 min-w-[200px]">
//             <label htmlFor="search-planning" className="block text-sm font-medium text-gray-800 mb-1">Search Plannings</label>
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <input
//                 id="search-planning"
//                 type="text"
//                 placeholder="Search by employee name..."
//                 value={searchQuery}
//                 onChange={(e) => {
//                   setSearchQuery(e.target.value);
//                   setCurrentPage(1);
//                 }}
//                 className="pl-10 p-2 border border-gray-400 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
//                 aria-label="Search planning records by employee name"
//               />
//             </div>
//           </div>
//           <div className="flex-1 min-w-[200px] z-50">
//             <label className="block text-sm font-medium text-gray-800 mb-1">Date Range</label>
//             <div className="flex gap-2">
//               <DatePicker
//                 selected={startDate}
//                 onChange={(date) => {
//                   setStartDate(date);
//                   setCurrentPage(1);
//                 }}
//                 selectsStart
//                 startDate={startDate}
//                 endDate={endDate}
//                 placeholderText="Start Date"
//                 className="p-2 border border-gray-400 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
//                 aria-label="Select start date for filtering planning records"
//               />
//               <DatePicker
//                 selected={endDate}
//                 onChange={(date) => {
//                   setEndDate(date);
//                   setCurrentPage(1);
//                 }}
//                 selectsEnd
//                 startDate={startDate}
//                 endDate={endDate}
//                 minDate={startDate}
//                 placeholderText="End Date"
//                 className="p-2 border border-gray-400 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
//                 aria-label="Select end date for filtering planning records"
//               />
//             </div>
//           </div>
//           <div className="flex-1 min-w-[200px]">
//             <label htmlFor="employee-filter" className="block text-sm font-medium text-gray-800 mb-1">Employee</label>
//             <div className="relative">
//               <select
//                 id="employee-filter"
//                 value={selectedEmployee}
//                 onChange={(e) => {
//                   setSelectedEmployee(e.target.value);
//                   setCurrentPage(1);
//                 }}
//                 className={`p-2 pr-8 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 appearance-none ${
//                   selectedEmployee ? 'border-blue-500' : 'border-gray-400'
//                 }`}
//                 aria-label="Filter planning records by employee"
//               >
//                 <option value="">All Employees</option>
//                 {employees.map((employee) => (
//                   <option key={employee} value={employee}>{employee}</option>
//                 ))}
//               </select>
//               <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//             </div>
//           </div>
//           <div className="flex items-end">
//             <button
//               onClick={resetFilters}
//               className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-blue-500 transition-colors duration-150 flex items-center w-full sm:w-auto"
//               aria-label="Reset all filters"
//             >
//               <X className="h-4 w-4 mr-2" /> Reset Filters
//             </button>
//           </div>
//         </div>
//         {(searchQuery || startDate || endDate || selectedEmployee) && (
//           <div className="mt-4 text-sm text-gray-600 flex flex-wrap gap-2">
//             <span className="font-medium">Filtered by:</span>
//             {searchQuery && (
//               <button
//                 onClick={() => removeFilter('search')}
//                 className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-150 flex items-center"
//               >
//                 Search: "{searchQuery}" <X className="ml-1 h-4 w-4" />
//               </button>
//             )}
//             {(startDate || endDate) && (
//               <button
//                 onClick={() => removeFilter('date')}
//                 className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-150 flex items-center"
//               >
//                 Date: {startDate ? startDate.toLocaleDateString() : 'Any'} - {endDate ? endDate.toLocaleDateString() : 'Any'} <X className="ml-1 h-4 w-4" />
//               </button>
//             )}
//             {selectedEmployee && (
//               <button
//                 onClick={() => removeFilter('employee')}
//                 className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-150 flex items-center"
//               >
//                 Employee: {selectedEmployee} <X className="ml-1 h-4 w-4" />
//               </button>
//             )}
//           </div>
//         )}
//       </div>

//       <div className="bg-white p-6 rounded-xl shadow-sm">
//         {paginatedPlannings.length === 0 ? (
//           <div className="text-center py-8 text-gray-500">
//             No planning records found. Try adjusting your filters.
//           </div>
//         ) : (
//           <>
//             {/* Table Layout for Larger Screens */}
//             <div className="hidden md:block overflow-x-auto">
//               <table className="min-w-full">
//                 <caption className="sr-only">Planning Records List</caption>
//                 <thead>
//                   <tr>
//                     <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
//                       <button onClick={() => handleSort('employee')} className="flex items-center">
//                         Employee
//                         {sortConfig.key === 'employee' && (
//                           sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
//                         )}
//                       </button>
//                     </th>
//                     <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
//                       <button onClick={() => handleSort('date')} className="flex items-center">
//                         Date
//                         {sortConfig.key === 'date' && (
//                           sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
//                         )}
//                       </button>
//                     </th>
//                     <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
//                       <button onClick={() => handleSort('start_time')} className="flex items-center">
//                         Start Time
//                         {sortConfig.key === 'start_time' && (
//                           sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
//                         )}
//                       </button>
//                     </th>
//                     <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
//                       <button onClick={() => handleSort('end_time')} className="flex items-center">
//                         End Time
//                         {sortConfig.key === 'end_time' && (
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
//                   {paginatedPlannings.map((planning) => (
//                     <tr key={planning.id} className="hover:bg-gray-100 transition-colors duration-150">
//                       <td className="px-4 py-3 whitespace-nowrap text-gray-800">{planning.employee.first_name} {planning.employee.last_name}</td>
//                       <td className="px-4 py-3 whitespace-nowrap text-gray-800">{getDateFromWeekAndDay(planning.week, planning.day, planning.year).toLocaleDateString()}</td>
//                       <td className="px-4 py-3 whitespace-nowrap text-gray-800">{planning.start_time}</td>
//                       <td className="px-4 py-3 whitespace-nowrap text-gray-800">{planning.end_time}</td>
//                       <td className="px-4 py-3 whitespace-nowrap text-sm font-medium flex space-x-3">
//                         <div className="relative group">
//                           <button
//                             className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
//                             onClick={() => openEditModal(planning)}
//                             aria-label={`Edit planning record for ${planning.employee.first_name} ${planning.employee.last_name}`}
//                           >
//                             <Edit className="h-5 w-5" />
//                           </button>
//                           <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Edit</div>
//                         </div>
//                         <div className="relative group">
//                           <button
//                             className="text-gray-600 hover:text-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
//                             onClick={() => openDetailsModal(planning)}
//                             aria-label={`View details of planning record for ${planning.employee.first_name} ${planning.employee.last_name}`}
//                           >
//                             <Eye className="h-5 w-5" />
//                           </button>
//                           <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">View Details</div>
//                         </div>
//                         <div className="relative group">
//                           <button
//                             className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
//                             onClick={() => handleDeletePlanning(planning.id)}
//                             aria-label={`Delete planning record for ${planning.employee.first_name} ${planning.employee.last_name}`}
//                           >
//                             <Trash2 className="h-5 w-5" />
//                           </button>
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
//               {paginatedPlannings.map((planning) => (
//                 <div key={planning.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-800">{planning.employee.first_name} {planning.employee.last_name}</h3>
//                       <p className="text-sm text-gray-600">Date: {getDateFromWeekAndDay(planning.week, planning.day, planning.year).toLocaleDateString()}</p>
//                       <p className="text-sm text-gray-600">Start Time: {planning.start_time}</p>
//                       <p className="text-sm text-gray-600">End Time: {planning.end_time}</p>
//                     </div>
//                     <div className="flex space-x-2">
//                       <div className="relative group">
//                         <button
//                           className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
//                           onClick={() => openEditModal(planning)}
//                           aria-label={`Edit planning record for ${planning.employee.first_name} ${planning.employee.last_name}`}
//                         >
//                           <Edit className="h-5 w-5" />
//                         </button>
//                         <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Edit</div>
//                       </div>
//                       <div className="relative group">
//                         <button
//                           className="text-gray-600 hover:text-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
//                           onClick={() => openDetailsModal(planning)}
//                           aria-label={`View details of planning record for ${planning.employee.first_name} ${planning.employee.last_name}`}
//                         >
//                           <Eye className="h-5 w-5" />
//                         </button>
//                         <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">View Details</div>
//                       </div>
//                       <div className="relative group">
//                         <button
//                           className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
//                           onClick={() => handleDeletePlanning(planning.id)}
//                           aria-label={`Delete planning record for ${planning.employee.first_name} ${planning.employee.last_name}`}
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
//                   Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredPlannings.length)} of {filteredPlannings.length} planning records
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <button
//                     onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                     disabled={currentPage === 1}
//                     className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 transition-colors duration-150 flex items-center"
//                     aria-label="Go to previous page"
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
//                     aria-label="Go to next page"
//                   >
//                     Next <ChevronRight className="h-4 w-4 ml-1" />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       <PlanningFormModal
//         isOpen={isEditModalOpen}
//         onClose={closeEditModal}
//         onSubmit={editingPlanning ? handleUpdatePlanning : handleAddPlanning}
//         initialData={editingPlanning}
//       />

//       {/* Planning Details Modal */}
//       {isDetailsModalOpen && selectedPlanning && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//           onClick={(e) => e.target === e.currentTarget && closeDetailsModal()}
//         >
//           <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
//             <h2 className="text-xl font-semibold text-gray-900 mb-4">Planning Details</h2>
//             <div className="space-y-2">
//               <p><strong>ID:</strong> {selectedPlanning.id}</p>
//               <p><strong>Employee:</strong> {selectedPlanning.employee.first_name} {selectedPlanning.employee.last_name}</p>
//               <p><strong>Date:</strong> {getDateFromWeekAndDay(selectedPlanning.week, selectedPlanning.day, selectedPlanning.year).toLocaleDateString()}</p>
//               <p><strong>Week:</strong> {selectedPlanning.week}</p>
//               <p><strong>Day:</strong> {selectedPlanning.day}</p>
//               <p><strong>Year:</strong> {selectedPlanning.year}</p>
//               <p><strong>Start Time:</strong> {selectedPlanning.start_time}</p>
//               <p><strong>End Time:</strong> {selectedPlanning.end_time}</p>
//             </div>
//             <div className="mt-6 flex justify-end">
//               <button
//                 onClick={closeDetailsModal}
//                 className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 transition-colors duration-150"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <ToastContainer />
//     </div>
//   );
// };

// export default PlanningList;
// import React, { useState, useEffect } from "react";
// import { Plus, Search, ChevronDown, X } from 'lucide-react';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Swal from 'sweetalert2';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import moment from 'moment';
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import planningApi from "../../services/api/planning/planningApi";
// import PlanningFormModal from "./PlanningForm";
// import { startOfWeek, addDays } from 'date-fns';

// // Setup moment localizer for react-big-calendar
// const localizer = momentLocalizer(moment);

// export const getDateFromWeekAndDay = (week, day, year) => {
//   const jan1 = new Date(year, 0, 1);
//   const firstWeekStart = startOfWeek(jan1, { weekStartsOn: 1 });
//   const totalDays = (week - 1) * 7 + (day-1);
//   return addDays(firstWeekStart, totalDays);
// };

// const ERROR_MESSAGES = {
//   LOAD_PLANNINGS: "Failed to load plannings list. Please try again.",
//   ADD_PLANNING: "Failed to add planning.",
//   UPDATE_PLANNING: "Failed to update planning.",
//   DELETE_PLANNING: "Failed to delete planning.",
// };

// const PlanningList = () => {
//   const [plannings, setPlannings] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [editingPlanning, setEditingPlanning] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [selectedEmployee, setSelectedEmployee] = useState('');
//   const [employees, setEmployees] = useState([]);

//   const fetchPlannings = async () => {
//     setLoading(true);
//     try {
//       const { data } = await planningApi.getAllPlannings();
//       const planningData = data.data;
//       setPlannings(planningData);
//       console.log(planningData)//

//       const uniqueEmployees = [...new Set(planningData.map(planning => `${planning.employee.first_name} ${planning.employee.last_name}`))];
//       setEmployees(uniqueEmployees);

//       // Transform plannings into calendar events
//       const calendarEvents = planningData.map(planning => {
//         const baseDate = getDateFromWeekAndDay(planning.week, planning.day, planning.year);
//         const start = moment(baseDate).set({
//           hour: parseInt(planning.start_time.split(':')[0]),
//           minute: parseInt(planning.start_time.split(':')[1]),
//         }).toDate();
//         const end = moment(baseDate).set({
//           hour: parseInt(planning.end_time.split(':')[0]),
//           minute: parseInt(planning.end_time.split(':')[1]),
//         }).toDate();

//         return {
//           id: planning.id,
//           title: `${planning.employee.first_name} ${planning.employee.last_name}`,
//           start,
//           end,
//           resource: planning, // Store full planning data for use in modals
//         };
//       });
//       setEvents(calendarEvents);
//       setLoading(false);
//     } catch (err) {
//       toast.error(ERROR_MESSAGES.LOAD_PLANNINGS, { position: "top-right", autoClose: 3000, theme: "colored" });
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPlannings();
//   }, []);

//   useEffect(() => {
//     let filteredEvents = plannings.map(planning => {
//       const baseDate = getDateFromWeekAndDay(planning.week, planning.day, planning.year);
//       const start = moment(baseDate).set({
//         hour: parseInt(planning.start_time.split(':')[0]),
//         minute: parseInt(planning.start_time.split(':')[1]),
//       }).toDate();
//       const end = moment(baseDate).set({
//         hour: parseInt(planning.end_time.split(':')[0]),
//         minute: parseInt(planning.end_time.split(':')[1]),
//       }).toDate();

//       return {
//         id: planning.id,
//         title: `${planning.employee.first_name} ${planning.employee.last_name}`,
//         start,
//         end,
//         resource: planning,
//       };
//     }).filter(event => {
//       const employeeName = event.title;
//       const searchMatch = !searchQuery || employeeName.toLowerCase().includes(searchQuery.toLowerCase());
//       const dateMatch = (!startDate || event.start >= startDate) && (!endDate || event.end <= endDate);
//       const employeeMatch = !selectedEmployee || employeeName === selectedEmployee;
//       return searchMatch && dateMatch && employeeMatch;
//     });

//     setEvents(filteredEvents);
//   }, [plannings, searchQuery, startDate, endDate, selectedEmployee]);

//   const handleAddPlanning = async (planning) => {
//     try {
//       await planningApi.addNewPlanning(planning);
//       fetchPlannings();
//       toast.success("Planning added successfully!", { position: "top-right", autoClose: 3000, theme: "colored" });
//     } catch (err) {
//       toast.error(`${ERROR_MESSAGES.ADD_PLANNING} ${err.response?.data?.message || "Please try again."}`, { position: "top-right", autoClose: 3000, theme: "colored" });
//     }
//   };

//   const handleUpdatePlanning = async (planning) => {
//     try {
//       await planningApi.updatePlanning(planning);
//       fetchPlannings();
//       toast.success("Planning updated successfully!", { position: "top-right", autoClose: 3000, theme: "colored" });
//     } catch (err) {
//       toast.error(`${ERROR_MESSAGES.UPDATE_PLANNING} ${err.response?.data?.message || "Please try again."}`, { position: "top-right", autoClose: 3000, theme: "colored" });
//     }
//   };

//   const handleDeletePlanning = async (planningId) => {
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
//           await planningApi.deletePlanning(planningId);
//           fetchPlannings();
//           toast.success("Planning deleted successfully!", { position: "top-right", autoClose: 3000, theme: "colored" });
//         } catch (err) {
//           toast.error(`${ERROR_MESSAGES.DELETE_PLANNING} ${err.response?.data?.message || "Please try again."}`, { position: "top-right", autoClose: 3000, theme: "colored" });
//         }
//       }
//     });
//   };

//   const openEditModal = (planning = null) => {
//     setEditingPlanning(planning);
//     setIsEditModalOpen(true);
//   };

//   const resetFilters = () => {
//     setSearchQuery('');
//     setStartDate(null);
//     setEndDate(null);
//     setSelectedEmployee('');
//     toast.info("Filters reset", { position: "top-right", autoClose: 2000 });
//   };

//   const removeFilter = (filterType) => {
//     switch (filterType) {
//       case 'search': setSearchQuery(''); break;
//       case 'date': setStartDate(null); setEndDate(null); break;
//       case 'employee': setSelectedEmployee(''); break;
//       default: break;
//     }
//   };

//   const handleSelectEvent = (event) => {
//     Swal.fire({
//       title: `${event.title}`,
//       html: `
//         <p><strong>Date:</strong> ${moment(event.start).format('MMMM Do YYYY')}</p>
//         <p><strong>Time:</strong> ${moment(event.start).format('HH:mm')} - ${moment(event.end).format('HH:mm')}</p>
//       `,
//       showCancelButton: true,
//       confirmButtonText: 'Edit',
//       cancelButtonText: 'Delete',
//       showDenyButton: true,
//       denyButtonText: 'Close',
//       // Button styling
//       confirmButtonColor: '#3085d6', // Blue for Edit
//       cancelButtonColor: '#d33',     // Red for Delete
//       denyButtonColor: '#6b7280',    // Gray for Close
//       customClass: {
//         confirmButton: 'swal-custom-btn swal-edit-btn',
//         cancelButton: 'swal-custom-btn swal-delete-btn',
//         denyButton: 'swal-custom-btn swal-close-btn',
//       },
//       buttonsStyling: true, // Set to false if you want to rely solely on custom classes
//     }).then((result) => {
//       if (result.isConfirmed) {
//         openEditModal(event.resource);
//       } else if (result.dismiss === Swal.DismissReason.cancel) {
//         handleDeletePlanning(event.id);
//       }
//     });
//   };

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
//     <div className="container mx-auto p-6">
//       {/* Filters and Actions */}
//       <div className="mb-6 p-6 bg-gray-50 rounded-xl shadow-sm">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold text-gray-800">Filter Planning Records</h2>
//           <button
//             onClick={() => openEditModal()}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors duration-150 flex items-center"
//             aria-label="Add a new planning record"
//           >
//             <Plus className="h-5 w-5 mr-2" /> Add Planning
//           </button>
//         </div>
//         <div className="flex flex-wrap gap-4">
//           <div className="flex-1 min-w-[200px]">
//             <label htmlFor="search-planning" className="block text-sm font-medium text-gray-800 mb-1">Search Plannings</label>
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <input
//                 id="search-planning"
//                 type="text"
//                 placeholder="Search by employee name..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-10 p-2 border border-gray-400 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
//                 aria-label="Search planning records by employee name"
//               />
//             </div>
//           </div>
//           <div className="flex-1 min-w-[200px] z-50">
//             <label className="block text-sm font-medium text-gray-800 mb-1">Date Range</label>
//             <div className="flex gap-2">
//               <DatePicker
//                 selected={startDate}
//                 onChange={(date) => setStartDate(date)}
//                 selectsStart
//                 startDate={startDate}
//                 endDate={endDate}
//                 placeholderText="Start Date"
//                 className="p-2 border border-gray-400 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
//                 aria-label="Select start date for filtering planning records"
//               />
//               <DatePicker
//                 selected={endDate}
//                 onChange={(date) => setEndDate(date)}
//                 selectsEnd
//                 startDate={startDate}
//                 endDate={endDate}
//                 minDate={startDate}
//                 placeholderText="End Date"
//                 className="p-2 border border-gray-400 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
//                 aria-label="Select end date for filtering planning records"
//               />
//             </div>
//           </div>
//           <div className="flex-1 min-w-[200px]">
//             <label htmlFor="employee-filter" className="block text-sm font-medium text-gray-800 mb-1">Employee</label>
//             <div className="relative">
//               <select
//                 id="employee-filter"
//                 value={selectedEmployee}
//                 onChange={(e) => setSelectedEmployee(e.target.value)}
//                 className={`p-2 pr-8 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 appearance-none ${selectedEmployee ? 'border-blue-500' : 'border-gray-400'}`}
//                 aria-label="Filter planning records by employee"
//               >
//                 <option value="">All Employees</option>
//                 {employees.map((employee) => (
//                   <option key={employee} value={employee}>{employee}</option>
//                 ))}
//               </select>
//               <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
//             </div>
//           </div>
//           <div className="flex items-end">
//             <button
//               onClick={resetFilters}
//               className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-blue-500 transition-colors duration-150 flex items-center w-full sm:w-auto"
//               aria-label="Reset all filters"
//             >
//               <X className="h-4 w-4 mr-2" /> Reset Filters
//             </button>
//           </div>
//         </div>
//         {(searchQuery || startDate || endDate || selectedEmployee) && (
//           <div className="mt-4 text-sm text-gray-600 flex flex-wrap gap-2">
//             <span className="font-medium">Filtered by:</span>
//             {searchQuery && (
//               <button onClick={() => removeFilter('search')} className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-150 flex items-center">
//                 Search: "{searchQuery}" <X className="ml-1 h-4 w-4" />
//               </button>
//             )}
//             {(startDate || endDate) && (
//               <button onClick={() => removeFilter('date')} className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-150 flex items-center">
//                 Date: {startDate ? startDate.toLocaleDateString() : 'Any'} - {endDate ? endDate.toLocaleDateString() : 'Any'} <X className="ml-1 h-4 w-4" />
//               </button>
//             )}
//             {selectedEmployee && (
//               <button onClick={() => removeFilter('employee')} className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-150 flex items-center">
//                 Employee: {selectedEmployee} <X className="ml-1 h-4 w-4" />
//               </button>
//             )}
//           </div>
//         )}
//       </div>

//       <div className="bg-white p-6 rounded-xl shadow-sm">
//         {events.length === 0 ? (
//           <div className="text-center py-8 text-gray-500">
//             No planning records found. Try adjusting your filters.
//           </div>
//         ) : (
//           <Calendar
//             localizer={localizer}
//             events={events}
//             startAccessor="start"
//             endAccessor="end"
//             style={{ height: 600 }}
//             onSelectEvent={handleSelectEvent}
//             views={['month', 'week', 'day']}
//             defaultView="month"
//             className="rounded-lg"
//             eventPropGetter={(event) => ({
//               style: {
//                 backgroundColor: '#3174ad', // Customize event color
//                 borderRadius: '4px',
//                 color: 'white',
//                 border: 'none',
//               },
//             })}
//           />
//         )}
//       </div>

//       <PlanningFormModal
//         isOpen={isEditModalOpen}
//         onClose={() => setIsEditModalOpen(false)}
//         onSubmit={editingPlanning ? handleUpdatePlanning : handleAddPlanning}
//         initialData={editingPlanning}
//       />

//       <ToastContainer />
//     </div>
//   );
// };

// export default PlanningList;
import React, { useState, useEffect } from "react";
import { Plus, Search, ChevronDown, X } from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import planningApi from "../../services/api/planning/planningApi";
import PlanningFormModal from "./PlanningForm";
import { startOfWeek, addDays } from 'date-fns';

const localizer = momentLocalizer(moment);

export const getDateFromWeekAndDay = (week, day, year) => {
  const jan1 = new Date(year, 0, 1);
  const firstWeekStart = startOfWeek(jan1, { weekStartsOn: 1 });
  const totalDays = (week - 1) * 7 + (day - 1);
  return addDays(firstWeekStart, totalDays);
};

const ERROR_MESSAGES = {
  LOAD_PLANNINGS: "Failed to load plannings list. Please try again.",
  ADD_PLANNING: "Failed to add planning.",
  UPDATE_PLANNING: "Failed to update planning.",
  DELETE_PLANNING: "Failed to delete planning.",
};

const PlanningList = () => {
  const [plannings, setPlannings] = useState([]);
  const [events, setEvents] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingPlanning, setEditingPlanning] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [employees, setEmployees] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date()); // State for current date
  const [currentView, setCurrentView] = useState('month'); // State for current view

  const fetchPlannings = async () => {
    setLoading(true);
    try {
      const { data } = await planningApi.getAllPlannings();
      const planningData = data.data;
      setPlannings(planningData);
      console.log(planningData);

      const uniqueEmployees = [...new Set(planningData.map(planning => `${planning.employee.first_name} ${planning.employee.last_name}`))];
      setEmployees(uniqueEmployees);

      const calendarEvents = planningData.map(planning => {
        const baseDate = getDateFromWeekAndDay(planning.week, planning.day, planning.year);
        const start = moment(baseDate).set({
          hour: parseInt(planning.start_time.split(':')[0]),
          minute: parseInt(planning.start_time.split(':')[1]),
        }).toDate();
        const end = moment(baseDate).set({
          hour: parseInt(planning.end_time.split(':')[0]),
          minute: parseInt(planning.end_time.split(':')[1]),
        }).toDate();

        return {
          id: planning.id,
          title: `${planning.employee.first_name} ${planning.employee.last_name}`,
          start,
          end,
          resource: planning,
        };
      });
      setEvents(calendarEvents);
      setLoading(false);
    } catch (err) {
      toast.error(ERROR_MESSAGES.LOAD_PLANNINGS, { position: "top-right", autoClose: 3000, theme: "colored" });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlannings();
  }, []);

  useEffect(() => {
    let filteredEvents = plannings.map(planning => {
      const baseDate = getDateFromWeekAndDay(planning.week, planning.day, planning.year);
      const start = moment(baseDate).set({
        hour: parseInt(planning.start_time.split(':')[0]),
        minute: parseInt(planning.start_time.split(':')[1]),
      }).toDate();
      const end = moment(baseDate).set({
        hour: parseInt(planning.end_time.split(':')[0]),
        minute: parseInt(planning.end_time.split(':')[1]),
      }).toDate();

      return {
        id: planning.id,
        title: `${planning.employee.first_name} ${planning.employee.last_name}`,
        start,
        end,
        resource: planning,
      };
    }).filter(event => {
      const employeeName = event.title;
      const searchMatch = !searchQuery || employeeName.toLowerCase().includes(searchQuery.toLowerCase());
      const dateMatch = (!startDate || event.start >= startDate) && (!endDate || event.end <= endDate);
      const employeeMatch = !selectedEmployee || employeeName === selectedEmployee;
      return searchMatch && dateMatch && employeeMatch;
    });

    setEvents(filteredEvents);
  }, [plannings, searchQuery, startDate, endDate, selectedEmployee]);

  const handleAddPlanning = async (planning) => {
    try {
      await planningApi.addNewPlanning(planning);
      fetchPlannings();
      toast.success("Planning added successfully!", { position: "top-right", autoClose: 3000, theme: "colored" });
    } catch (err) {
      toast.error(`${ERROR_MESSAGES.ADD_PLANNING} ${err.response?.data?.message || "Please try again."}`, { position: "top-right", autoClose: 3000, theme: "colored" });
    }
  };

  const handleUpdatePlanning = async (planning) => {
    try {
      await planningApi.updatePlanning(planning);
      fetchPlannings();
      toast.success("Planning updated successfully!", { position: "top-right", autoClose: 3000, theme: "colored" });
    } catch (err) {
      toast.error(`${ERROR_MESSAGES.UPDATE_PLANNING} ${err.response?.data?.message || "Please try again."}`, { position: "top-right", autoClose: 3000, theme: "colored" });
    }
  };

  const handleDeletePlanning = async (planningId) => {
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
          await planningApi.deletePlanning(planningId);
          fetchPlannings();
          toast.success("Planning deleted successfully!", { position: "top-right", autoClose: 3000, theme: "colored" });
        } catch (err) {
          toast.error(`${ERROR_MESSAGES.DELETE_PLANNING} ${err.response?.data?.message || "Please try again."}`, { position: "top-right", autoClose: 3000, theme: "colored" });
        }
      }
    });
  };

  const openEditModal = (planning = null) => {
    setEditingPlanning(planning);
    setIsEditModalOpen(true);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setStartDate(null);
    setEndDate(null);
    setSelectedEmployee('');
    toast.info("Filters reset", { position: "top-right", autoClose: 2000 });
  };

  const removeFilter = (filterType) => {
    switch (filterType) {
      case 'search': setSearchQuery(''); break;
      case 'date': setStartDate(null); setEndDate(null); break;
      case 'employee': setSelectedEmployee(''); break;
      default: break;
    }
  };

  const handleSelectEvent = (event) => {
    Swal.fire({
      title: `${event.title}`,
      html: `
        <p><strong>Date:</strong> ${moment(event.start).format('MMMM Do YYYY')}</p>
        <p><strong>Time:</strong> ${moment(event.start).format('HH:mm')} - ${moment(event.end).format('HH:mm')}</p>
      `,
      showCancelButton: true,
      confirmButtonText: 'Edit',
      cancelButtonText: 'Delete',
      showDenyButton: true,
      denyButtonText: 'Close',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      denyButtonColor: '#6b7280',
      customClass: {
        confirmButton: 'swal-custom-btn swal-edit-btn',
        cancelButton: 'swal-custom-btn swal-delete-btn',
        denyButton: 'swal-custom-btn swal-close-btn',
      },
      buttonsStyling: true,
    }).then((result) => {
      if (result.isConfirmed) {
        openEditModal(event.resource);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        handleDeletePlanning(event.id);
      }
    });
  };

  const handleNavigate = (newDate) => {
    setCurrentDate(newDate);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

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
      {/* Filters and Actions */}
      <div className="mb-6 p-6 bg-gray-50 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Filter Planning Records</h2>
          <button
            onClick={() => openEditModal()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors duration-150 flex items-center"
            aria-label="Add a new planning record"
          >
            <Plus className="h-5 w-5 mr-2" /> Add Planning
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="search-planning" className="block text-sm font-medium text-gray-800 mb-1">Search Plannings</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="search-planning"
                type="text"
                placeholder="Search by employee name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 p-2 border border-gray-400 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
                aria-label="Search planning records by employee name"
              />
            </div>
          </div>
          <div className="flex-1 min-w-[200px] z-50">
            <label className="block text-sm font-medium text-gray-800 mb-1">Date Range</label>
            <div className="flex gap-2">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Start Date"
                className="p-2 border border-gray-400 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
                aria-label="Select start date for filtering planning records"
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="End Date"
                className="p-2 border border-gray-400 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
                aria-label="Select end date for filtering planning records"
              />
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="employee-filter" className="block text-sm font-medium text-gray-800 mb-1">Employee</label>
            <div className="relative">
              <select
                id="employee-filter"
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                className={`p-2 pr-8 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 appearance-none ${selectedEmployee ? 'border-blue-500' : 'border-gray-400'}`}
                aria-label="Filter planning records by employee"
              >
                <option value="">All Employees</option>
                {employees.map((employee) => (
                  <option key={employee} value={employee}>{employee}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="flex items-end">
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-blue-500 transition-colors duration-150 flex items-center w-full sm:w-auto"
              aria-label="Reset all filters"
            >
              <X className="h-4 w-4 mr-2" /> Reset Filters
            </button>
          </div>
        </div>
        {(searchQuery || startDate || endDate || selectedEmployee) && (
          <div className="mt-4 text-sm text-gray-600 flex flex-wrap gap-2">
            <span className="font-medium">Filtered by:</span>
            {searchQuery && (
              <button onClick={() => removeFilter('search')} className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-150 flex items-center">
                Search: "{searchQuery}" <X className="ml-1 h-4 w-4" />
              </button>
            )}
            {(startDate || endDate) && (
              <button onClick={() => removeFilter('date')} className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-150 flex items-center">
                Date: {startDate ? startDate.toLocaleDateString() : 'Any'} - {endDate ? endDate.toLocaleDateString() : 'Any'} <X className="ml-1 h-4 w-4" />
              </button>
            )}
            {selectedEmployee && (
              <button onClick={() => removeFilter('employee')} className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-150 flex items-center">
                Employee: {selectedEmployee} <X className="ml-1 h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        {events.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No planning records found. Try adjusting your filters.
          </div>
        ) : (
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            onSelectEvent={handleSelectEvent}
            views={['month', 'week', 'day']}
            defaultView="month"
            date={currentDate} // Controlled date
            view={currentView} // Controlled view
            onNavigate={handleNavigate} // Handle navigation (Today, Back, Next)
            onView={handleViewChange} // Handle view change (Month, Week, Day)
            className="rounded-lg"
            eventPropGetter={(event) => ({
              style: {
                backgroundColor: '#3174ad',
                borderRadius: '4px',
                color: 'white',
                border: 'none',
              },
            })}
          />
        )}
      </div>

      <PlanningFormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={editingPlanning ? handleUpdatePlanning : handleAddPlanning}
        initialData={editingPlanning}
      />

      <ToastContainer />
    </div>
  );
};

export default PlanningList;