// import React, { useState, useEffect } from "react";
// import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Swal from 'sweetalert2';
// import presenceApi from "../../services/api/presence/presenceApi"; 
// import PresenceFormModal from "./PresenceFormModal";
// import { getDateFromWeekAndDay } from "../planning/PlanningList";

// const PresenceList = () => {
//   const [presences, setPresences] = useState([]);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [editingPresence, setEditingPresence] = useState(null);

//   const fetchPresences = async () => {
//     setLoading(true);
//     try {
//       const { data } = await presenceApi.getAllPresences();
//       setPresences(data.data);
//       setLoading(false);
//     } catch (err) {
//       toast.error("Failed to load presences list. Please try again.", {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   useEffect(() => {
//     fetchPresences();
//   }, []);

//   const getDayOfWeek = (dayNumber) => {
//     const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     if (dayNumber >= 0 && dayNumber <= 6) {
//       return days[dayNumber];
//     } else {
//       throw new Error('Invalid day number. Please provide a number between 0 and 6.');
//     }
//   };

//   const handleAddPresence = async (presence) => {
//     try {
//       await presenceApi.addNewPresence(presence); 
//       fetchPresences();
//       toast.success("Presence added successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     } catch (err) {
//       console.log(err);
//       toast.error(`Failed to add presence. ${err.response.data.message}`, {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   const handleUpdatePresence = async (presence) => {
//     try {
//       await presenceApi.updatePresence(presence);
//       fetchPresences();
//       toast.success("Presence updated successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     } catch (err) {
//       console.log(err);
//       toast.error(`Failed to update presence. ${err.response.data.message}`, {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   const handleDeletePresence = async (presenceId) => {
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
//           await presenceApi.deletePresence(presenceId); 
//           fetchPresences();
//           toast.success("Presence deleted successfully!", {
//             position: "top-right",
//             autoClose: 3000,
//             theme: "colored",
//           });
//         } catch (err) {
//           console.log(err);
//           toast.error(`Failed to delete presence. ${err.response.data.message}`, {
//             position: "top-right",
//             autoClose: 3000,
//             theme: "colored",
//           });
//         }
//       }
//     });
//   };

//   const openEditModal = (presence = null) => {
//     setEditingPresence(presence);
//     setIsEditModalOpen(true);
//   };

//   const closeEditModal = () => {
//     setEditingPresence(null);
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
//       <h1 className="text-3xl font-bold mb-6">Presences</h1> {/* Updated title */}
//       <button
//         onClick={() => openEditModal()}
//         className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//       >
//         Add Presence {/* Updated button text */}
//       </button>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <div className="overflow-x-auto">
//           <table className="min-w-full">
//           <thead>
//   <tr>
//   <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
//     <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//     <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//   </tr>
// </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {presences.map((presence) => (
//                 <tr key={presence.id}>
//                       <td className="px-6 py-4 whitespace-nowrap">{presence.employee.first_name } {presence.employee.last_name}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{getDateFromWeekAndDay(presence.week,presence.day,presence.year).toDateString()}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{presence.start_time}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{presence.end_time}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                   <span
//                       className={`px-2 py-1 ${
//                         presence.status === "present" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//                       } rounded-full text-sm`}
//                     >
//                       {presence.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-4">
//                     <button
//                       className="text-indigo-600 hover:text-indigo-900"
//                       onClick={() => openEditModal(presence)}
//                     >
//                       <Edit className="h-5 w-5" />
//                     </button>
//                     <button
//                       className="text-red-600 hover:text-red-900"
//                       onClick={() => handleDeletePresence(presence.id)}
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

//       <PresenceFormModal
//         isOpen={isEditModalOpen}
//         onClose={closeEditModal}
//         onSubmit={editingPresence ? handleUpdatePresence : handleAddPresence}
//         initialData={editingPresence}
//       />

//       <ToastContainer />
//     </div>
//   );
// };

// export default PresenceList;
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye, Search, ArrowUp, ArrowDown, ChevronDown, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import presenceApi from "../../services/api/presence/presenceApi";
import { getDateFromWeekAndDay } from "../planning/PlanningList";
import PresenceFormModal from "./PresenceFormModal";

// Constants for error messages
const ERROR_MESSAGES = {
  LOAD_PRESENCES: "Failed to load presences list. Please try again.",
  ADD_PRESENCE: "Failed to add presence.",
  UPDATE_PRESENCE: "Failed to update presence.",
  DELETE_PRESENCE: "Failed to delete presence.",
};

const PresenceList = () => {
  const [presences, setPresences] = useState([]);
  const [filteredPresences, setFilteredPresences] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingPresence, setEditingPresence] = useState(null);
  const [selectedPresence, setSelectedPresence] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [employees, setEmployees] = useState([]);
  const [statuses] = useState(['present', 'absent']); // Hardcoded statuses as per the original logic
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchPresences = async () => {
    setLoading(true);
    try {
      const { data } = await presenceApi.getAllPresences();
      const presenceData = data.data;
      setPresences(presenceData);
      setFilteredPresences(presenceData);

      const uniqueEmployees = [...new Set(presenceData.map(presence => `${presence.employee.first_name} ${presence.employee.last_name}`))];
      setEmployees(uniqueEmployees);

      setLoading(false);
    } catch (err) {
      toast.error(ERROR_MESSAGES.LOAD_PRESENCES, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPresences();
  }, []);

  useEffect(() => {
    let filtered = presences.filter(presence => {
      const employeeName = `${presence.employee.first_name} ${presence.employee.last_name}`;
      const searchMatch =
        !searchQuery ||
        employeeName.toLowerCase().includes(searchQuery.toLowerCase());
      const presenceDate = getDateFromWeekAndDay(presence.week, presence.day, presence.year);
      const dateMatch =
        (!startDate || presenceDate >= startDate) &&
        (!endDate || presenceDate <= endDate);
      const employeeMatch = !selectedEmployee || employeeName === selectedEmployee;
      const statusMatch = !selectedStatus || presence.status === selectedStatus;
      return searchMatch && dateMatch && employeeMatch && statusMatch;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue, bValue;
        if (sortConfig.key === 'employee') {
          aValue = `${a.employee.first_name} ${a.employee.last_name}`.toLowerCase();
          bValue = `${b.employee.first_name} ${b.employee.last_name}`.toLowerCase();
        } else if (sortConfig.key === 'date') {
          aValue = getDateFromWeekAndDay(a.week, a.day, a.year);
          bValue = getDateFromWeekAndDay(b.week, b.day, b.year);
        } else if (sortConfig.key === 'status') {
          aValue = a.status.toLowerCase();
          bValue = b.status.toLowerCase();
        } else {
          aValue = a[sortConfig.key];
          bValue = b[sortConfig.key];
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredPresences(filtered);
  }, [presences, searchQuery, startDate, endDate, selectedEmployee, selectedStatus, sortConfig]);

  // Handle pagination
  useEffect(() => {
    const totalPages = Math.ceil(filteredPresences.length / itemsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (filteredPresences.length === 0) {
      setCurrentPage(1);
    }
  }, [filteredPresences, currentPage, itemsPerPage]);

  const handleAddPresence = async (presence) => {
    try {
      await presenceApi.addNewPresence(presence);
      fetchPresences();
      toast.success("Presence added successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } catch (err) {
      toast.error(`${ERROR_MESSAGES.ADD_PRESENCE} ${err.response?.data?.message || "Please try again."}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const handleUpdatePresence = async (presence) => {
    try {
      await presenceApi.updatePresence(presence);
      fetchPresences();
      toast.success("Presence updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } catch (err) {
      toast.error(`${ERROR_MESSAGES.UPDATE_PRESENCE} ${err.response?.data?.message || "Please try again."}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const handleDeletePresence = async (presenceId) => {
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
          await presenceApi.deletePresence(presenceId);
          fetchPresences();
          toast.success("Presence deleted successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
        } catch (err) {
          toast.error(`${ERROR_MESSAGES.DELETE_PRESENCE} ${err.response?.data?.message || "Please try again."}`, {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        }
      }
    });
  };

  const openEditModal = (presence = null) => {
    setEditingPresence(presence);
    setIsEditModalOpen(true);
  };

  const openDetailsModal = (presence) => {
    setSelectedPresence(presence);
    setIsDetailsModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingPresence(null);
    setIsEditModalOpen(false);
  };

  const closeDetailsModal = () => {
    setSelectedPresence(null);
    setIsDetailsModalOpen(false);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setStartDate(null);
    setEndDate(null);
    setSelectedEmployee('');
    setSelectedStatus('');
    setCurrentPage(1);
    setSortConfig({ key: null, direction: 'asc' });
    toast.info("Filters reset", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const removeFilter = (filterType) => {
    switch (filterType) {
      case 'search':
        setSearchQuery('');
        break;
      case 'date':
        setStartDate(null);
        setEndDate(null);
        break;
      case 'employee':
        setSelectedEmployee('');
        break;
      case 'status':
        setSelectedStatus('');
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

  const totalPages = Math.ceil(filteredPresences.length / itemsPerPage);
  const paginatedPresences = filteredPresences.slice(
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
      {/* Filters and Actions */}
      <div className="mb-6 p-6 bg-gray-50 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Filter Presence Records</h2>
          <button
            onClick={() => openEditModal()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors duration-150 flex items-center"
            aria-label="Add a new presence record"
          >
            <Plus className="h-5 w-5 mr-2" /> Add Presence
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="search-presence" className="block text-sm font-medium text-gray-800 mb-1">Search Presences</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="search-presence"
                type="text"
                placeholder="Search by employee name..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 p-2 border border-gray-400 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
                aria-label="Search presence records by employee name"
              />
            </div>
          </div>
          <div className="flex-1 min-w-[200px] z-50">
            <label className="block text-sm font-medium text-gray-800 mb-1">Date Range</label>
            <div className="flex gap-2">
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  setCurrentPage(1);
                }}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Start Date"
                className="p-2 border border-gray-400 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
                aria-label="Select start date for filtering presence records"
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => {
                  setEndDate(date);
                  setCurrentPage(1);
                }}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="End Date"
                className="p-2 border border-gray-400 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
                aria-label="Select end date for filtering presence records"
              />
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="employee-filter" className="block text-sm font-medium text-gray-800 mb-1">Employee</label>
            <div className="relative">
              <select
                id="employee-filter"
                value={selectedEmployee}
                onChange={(e) => {
                  setSelectedEmployee(e.target.value);
                  setCurrentPage(1);
                }}
                className={`p-2 pr-8 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 appearance-none ${
                  selectedEmployee ? 'border-blue-500' : 'border-gray-400'
                }`}
                aria-label="Filter presence records by employee"
              >
                <option value="">All Employees</option>
                {employees.map((employee) => (
                  <option key={employee} value={employee}>{employee}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="status-filter" className="block text-sm font-medium text-gray-800 mb-1">Status</label>
            <div className="relative">
              <select
                id="status-filter"
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className={`p-2 pr-8 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 appearance-none ${
                  selectedStatus ? 'border-blue-500' : 'border-gray-400'
                }`}
                aria-label="Filter presence records by status"
              >
                <option value="">All Statuses</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
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
        {(searchQuery || startDate || endDate || selectedEmployee || selectedStatus) && (
          <div className="mt-4 text-sm text-gray-600 flex flex-wrap gap-2">
            <span className="font-medium">Filtered by:</span>
            {searchQuery && (
              <button
                onClick={() => removeFilter('search')}
                className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-150 flex items-center"
              >
                Search: "{searchQuery}" <X className="ml-1 h-4 w-4" />
              </button>
            )}
            {(startDate || endDate) && (
              <button
                onClick={() => removeFilter('date')}
                className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-150 flex items-center"
              >
                Date: {startDate ? startDate.toLocaleDateString() : 'Any'} - {endDate ? endDate.toLocaleDateString() : 'Any'} <X className="ml-1 h-4 w-4" />
              </button>
            )}
            {selectedEmployee && (
              <button
                onClick={() => removeFilter('employee')}
                className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-150 flex items-center"
              >
                Employee: {selectedEmployee} <X className="ml-1 h-4 w-4" />
              </button>
            )}
            {selectedStatus && (
              <button
                onClick={() => removeFilter('status')}
                className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-150 flex items-center"
              >
                Status: {selectedStatus} <X className="ml-1 h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        {paginatedPresences.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No presence records found. Try adjusting your filters.
          </div>
        ) : (
          <>
            {/* Table Layout for Larger Screens */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full">
                <caption className="sr-only">Presence Records List</caption>
                <thead>
                  <tr>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('employee')} className="flex items-center">
                        Employee
                        {sortConfig.key === 'employee' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('date')} className="flex items-center">
                        Date
                        {sortConfig.key === 'date' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('start_time')} className="flex items-center">
                        Start Time
                        {sortConfig.key === 'start_time' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('end_time')} className="flex items-center">
                        End Time
                        {sortConfig.key === 'end_time' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('status')} className="flex items-center">
                        Status
                        {sortConfig.key === 'status' && (
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
                  {paginatedPresences.map((presence) => (
                    <tr key={presence.id} className="hover:bg-gray-100 transition-colors duration-150">
                      <td className="px-4 py-3 whitespace-nowrap text-gray-800">{presence.employee.first_name} {presence.employee.last_name}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-800">{getDateFromWeekAndDay(presence.week, presence.day, presence.year).toLocaleDateString()}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-800">{presence.start_time}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-gray-800">{presence.end_time}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="relative group">
                          <span
                            className={`px-2 py-1 ${
                              presence.status === "present"
                                ? "bg-green-200 text-green-800"
                                : "bg-red-200 text-red-800"
                            } rounded-full text-sm font-medium`}
                          >
                            {presence.status}
                          </span>
                          <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0 whitespace-nowrap">
                            {presence.status === "present" ? "Employee was present" : "Employee was absent"}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium flex space-x-3">
                        <div className="relative group">
                          <button
                            className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                            onClick={() => openEditModal(presence)}
                            aria-label={`Edit presence record for ${presence.employee.first_name} ${presence.employee.last_name}`}
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Edit</div>
                        </div>
                        <div className="relative group">
                          <button
                            className="text-gray-600 hover:text-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                            onClick={() => openDetailsModal(presence)}
                            aria-label={`View details of presence record for ${presence.employee.first_name} ${presence.employee.last_name}`}
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">View Details</div>
                        </div>
                        <div className="relative group">
                          {/* <button
                            className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                            onClick={() => handleDeletePresence(presence.id)}
                            aria-label={`Delete presence record for ${presence.employee.first_name} ${presence.employee.last_name}`}
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

            {/* Card Layout for Smaller Screens */}
            <div className="block md:hidden space-y-4">
              {paginatedPresences.map((presence) => (
                <div key={presence.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{presence.employee.first_name} {presence.employee.last_name}</h3>
                      <p className="text-sm text-gray-600">Date: {getDateFromWeekAndDay(presence.week, presence.day, presence.year).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-600">Start Time: {presence.start_time}</p>
                      <p className="text-sm text-gray-600">End Time: {presence.end_time}</p>
                      <p className="text-sm text-gray-600">
                        Status: <span
                          className={`px-2 py-1 ${
                            presence.status === "present"
                              ? "bg-green-200 text-green-800"
                              : "bg-red-200 text-red-800"
                          } rounded-full text-sm font-medium`}
                        >
                          {presence.status}
                        </span>
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <div className="relative group">
                        <button
                          className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                          onClick={() => openEditModal(presence)}
                          aria-label={`Edit presence record for ${presence.employee.first_name} ${presence.employee.last_name}`}
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Edit</div>
                      </div>
                      <div className="relative group">
                        <button
                          className="text-gray-600 hover:text-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                          onClick={() => openDetailsModal(presence)}
                          aria-label={`View details of presence record for ${presence.employee.first_name} ${presence.employee.last_name}`}
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">View Details</div>
                      </div>
                      <div className="relative group">
                        <button
                          className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                          onClick={() => handleDeletePresence(presence.id)}
                          aria-label={`Delete presence record for ${presence.employee.first_name} ${presence.employee.last_name}`}
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

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredPresences.length)} of {filteredPresences.length} presence records
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 transition-colors duration-150 flex items-center"
                    aria-label="Go to previous page"
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
                    aria-label="Go to next page"
                  >
                    Next <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <PresenceFormModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSubmit={editingPresence ? handleUpdatePresence : handleAddPresence}
        initialData={editingPresence}
      />

      {/* Presence Details Modal */}
      {isDetailsModalOpen && selectedPresence && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => e.target === e.currentTarget && closeDetailsModal()}
        >
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Presence Details</h2>
            <div className="space-y-2">
              <p><strong>ID:</strong> {selectedPresence.id}</p>
              <p><strong>Employee:</strong> {selectedPresence.employee.first_name} {selectedPresence.employee.last_name}</p>
              <p><strong>Date:</strong> {getDateFromWeekAndDay(selectedPresence.week, selectedPresence.day, selectedPresence.year).toLocaleDateString()}</p>
              <p><strong>Week:</strong> {selectedPresence.week}</p>
              <p><strong>Day:</strong> {selectedPresence.day}</p>
              <p><strong>Year:</strong> {selectedPresence.year}</p>
              <p><strong>Start Time:</strong> {selectedPresence.start_time}</p>
              <p><strong>End Time:</strong> {selectedPresence.end_time}</p>
              <p><strong>Status:</strong> {selectedPresence.status}</p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeDetailsModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 transition-colors duration-150"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default PresenceList;