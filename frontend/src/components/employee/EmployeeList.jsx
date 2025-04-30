// import React, { useState, useEffect } from "react";
// import { Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Swal from 'sweetalert2';
// import employeeApi from "../../services/api/employee/employeeApi";
// import EmployeeDetailsModal from "./EmployeeDetailsModal";
// import EmployeeFormModal from "./EmployeeFormModal";
// import employeeSationApi from "../../services/api/employeeStation/employeeSationApi";
// import EmployeeStationFormModal from "./EmployeeStationFormModal";

// const EmployeeList = () => {
//   const [employees, setEmployees] = useState([]);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); 
//   const [isEmployeeStationModalOpen, setIsEmployeeStationModalOpen] = useState(false); 
//   const [loading, setLoading] = useState(true);
//   const [editingEmployee, setEditingEmployee] = useState(null);
//   const [selectedEmployee, setSelectedEmployee] = useState(null); 
//   const [expandedRows, setExpandedRows] = useState({});
//   // Function to toggle row expansion
//   const toggleRow = (employeeId) => {
//     setExpandedRows((prev) => ({
//       ...prev,
//       [employeeId]: !prev[employeeId], // Toggle the expanded state
//     }));
//   };
//   const fetchEmployees = async () => {
//     setLoading(true);
//     try {
//       const {data} = await employeeApi.getAllEmployees();
//       setEmployees(data.data);
//       setLoading(false);
//     } catch (err) {
//       toast.error("Failed to load employees list. Please try again.", {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const handleAddEmployee = async (employee) => {
//     const {station_id,...employeeInfo} = employee;

//     try {
//       const {data} = await employeeApi.addNewEmployee(employeeInfo);
//       const employeeStationData = {
//         station_id,
//         employee_id:data.id,
//         start_date: new Intl.DateTimeFormat('en-CA').format(new Date()),
//       };
//       addEmployeeToStation(employeeStationData);
//     } catch (err) {
//       console.log(err);
//       toast.error(`Failed to add employee. ${err.response.data.message}`, {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

  
//   const handleAddEmployeeToNewStation = async (data) => {
//     const {station_id,employee_id,contract_type,status} = data;

//     try {
//       handleUpdateEmployee({
//         id:employee_id,
//         contract_type,
//         status,
//       });
//       const employeeStationData = {
//         station_id,
//         employee_id,
//         start_date: new Intl.DateTimeFormat('en-CA').format(new Date()),
//       };
//       addEmployeeToStation(employeeStationData);
//     } catch (err) {
//       console.log(err);
//       toast.error(`Failed to add employee. ${err.response.data.message}`, {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   const addEmployeeToStation = async(employeeStationData)=>{
//     try {
      
//       await employeeSationApi.addEmployeeToStation(employeeStationData);
//       fetchEmployees();
//       toast.success("Employee added successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "colored",
//       });
//     } catch (err) {
//       console.log(err);
//       toast.error(`Failed to add employee. ${err.response.data.message}`, {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   const handleUpdateEmployee = async (employee) => {
//     try {
//       await employeeApi.updateEmployee(employee);
//       if(employee.status === 'terminated'){
//         const employeeStationId = employee.stations.at(-1).pivot.id;
//         const end_date = new Intl.DateTimeFormat('en-CA').format(new Date());
//         setEmployeeEndDateInStation(employeeStationId,end_date);
//         return;
//       }
//       fetchEmployees();
//       toast.success("Employee updated successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "colored",
//       });
//     } catch (err) {
//       console.log(err);
//       toast.error(`Failed to update employee. ${err.response.data.message}`, {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   const setEmployeeEndDateInStation =  async (employeeStationId,end_date) => {
//     try {
//       await employeeSationApi.setEmployeeEndDateInStation(employeeStationId,end_date); 
//       fetchEmployees();
//       toast.success("Employee terminated successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "colored",
//       });
//     } catch (err) {
//       console.log(err);
//       toast.error(`Failed to terminate employee. ${err.response.data.message}`, {
//         position: "top-right",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   const handleDeleteEmployee = async (employeeId) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!"
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await employeeApi.deleteEmployee(employeeId);
//           fetchEmployees();
//           toast.success("Employee deleted successfully!", {
//             position: "top-right",
//             autoClose: 3000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             theme: "colored",
//           });
//         } catch (err) {
//           console.log(err);
//           toast.error(`Failed to delete employee. ${err.response.data.message}`, {
//             position: "top-right",
//             autoClose: 3000,
//             theme: "colored",
//           });
//         }
//       }
//     });
//   };

//   const openEditModal = (employee = null) => {
//     setEditingEmployee(employee);
//     setIsEditModalOpen(true);
//   };

//   const openDetailsModal = (employee) => {
//     setSelectedEmployee(employee);
//     setIsDetailsModalOpen(true);
//   };
//   const openEmployeeStationModal=(employee)=> {
//     setSelectedEmployee(employee);
//     setIsEmployeeStationModalOpen(true);
//   }

//   const closeEditModal = () => {
//     setEditingEmployee(null);
//     setIsEditModalOpen(false);
//   };

//   const closeDetailsModal = () => {
//     setSelectedEmployee(null);
//     setIsDetailsModalOpen(false);
//   };

//   const closeEmployeeStationModal=()=>{
//     setSelectedEmployee(null);
//     setIsEmployeeStationModalOpen(false);
//   }

//   if (loading) {
//     return <div className="looping-rhombuses-spinner">
//       <div className="rhombus"></div>
//       <div className="rhombus"></div>
//       <div className="rhombus"></div>
//     </div>
//   }


//   return (
// <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">Employees</h1>
//       <button
//         onClick={() => openEditModal()}
//         className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//       >
//         Add Employee
//       </button>
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <div className="overflow-x-auto">
//         <table className="min-w-full">
//           <thead>
//             <tr>
//             <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Name
//               </th>
//               <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Cin
//               </th>
//               <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Email
//               </th>
//               <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Phone
//               </th>
//               <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Gender
//               </th>
//               <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Contract Type
//               </th>
//               <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Current Station
//               </th>
//               <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {employees.map((employee) => (
//               <React.Fragment key={employee.id}>
//                 {/* Main Row */}
//                 <tr>
//                 <td className="px-6 py-4 whitespace-nowrap">{employee.first_name + " " + employee.last_name}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{employee.employee_cin}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{employee.email}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{employee.phone}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{employee.gender === "male" ? "♂️" : "♀️"}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{employee.contract_type}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">{employee.stations.at(-1).name}</td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span
//                       className={`px-2 py-1 ${
//                         employee.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//                       } rounded-full text-sm`}
//                     >
//                       {employee.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-4">
//                     <button
//                       className="text-indigo-600 hover:text-indigo-900"
//                       disabled={employee.status === "terminated"}
//                     >
//                       <Edit className="h-5 w-5" onClick={() => openEditModal(employee)} />
//                     </button>
//                     {/* <button className="text-red-600 hover:text-red-900">
//                         <Trash2 className="h-5 w-5" onClick={() => handleDeleteEmployee(employee.id)} />
//                     </button> */}
//                     <button className="text-gray-600 hover:text-orange-900 cursor-pointer">
//                       <Eye className="h-5 w-5" onClick={() => openDetailsModal(employee)} />
//                     </button>
//                     <button
//                       className="text-indigo-600 hover:text-indigo-900"
//                       disabled={employee.status !== "terminated"}
//                     >
//                       <Plus className="h-5 w-5" onClick={() => openEmployeeStationModal(employee)} />
//                     </button>
//                     {/* Expand/Collapse Button */}
//                     <button
//                       className="text-gray-600 hover:text-gray-900"
//                       onClick={() => toggleRow(employee.id)}
//                     >
//                       {expandedRows[employee.id] ? "▼" : "▶"}
//                     </button>
//                   </td>
//                 </tr>

//                 {/* Expanded Row */}
//                 {expandedRows[employee.id] && (
//                   <tr>
//                     <td colSpan={9} className="px-6 py-4">
//                       <div className="bg-gray-50 p-4 rounded-lg">
//                         <h3 className="font-semibold mb-2">Stations Worked</h3>
//                         <table className="min-w-full">
//                           <thead>
//                             <tr>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Station Name
//                               </th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 Start Date
//                               </th>
//                               <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                 End Date
//                               </th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {employee.stations.map((station, index) => (
//                               <tr key={index}>
//                                 <td className="px-4 py-2 whitespace-nowrap">{station.name}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap">{station.pivot.start_date}</td>
//                                 <td className="px-4 py-2 whitespace-nowrap">{station.pivot.end_date || "Present"}</td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </React.Fragment>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>

//         <EmployeeFormModal
//         isOpen={isEditModalOpen}
//         onClose={closeEditModal}
//         onSubmit={editingEmployee ? handleUpdateEmployee : handleAddEmployee}
//         initialData={editingEmployee}
//         />

//         <EmployeeDetailsModal
//         isOpen={isDetailsModalOpen}
//         onClose={closeDetailsModal}
//         employee={selectedEmployee}
//         /> 

//       <EmployeeStationFormModal
//         isOpen={isEmployeeStationModalOpen}
//         onClose={closeEmployeeStationModal}
//         onSubmit={handleAddEmployeeToNewStation}
//         employee={selectedEmployee}
//         /> 

//         <ToastContainer />
//     </div>
//   );
// };

// export default EmployeeList;
import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye, Search, ArrowUp, ArrowDown, ChevronDown, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2';
import employeeApi from "../../services/api/employee/employeeApi";
import EmployeeDetailsModal from "./EmployeeDetailsModal";
import EmployeeFormModal from "./EmployeeFormModal";
import employeeSationApi from "../../services/api/employeeStation/employeeSationApi";
import EmployeeStationFormModal from "./EmployeeStationFormModal";

// Constants for error messages
const ERROR_MESSAGES = {
  LOAD_EMPLOYEES: "Failed to load employees list. Please try again.",
  ADD_EMPLOYEE: "Failed to add employee.",
  UPDATE_EMPLOYEE: "Failed to update employee.",
  DELETE_EMPLOYEE: "Failed to delete employee.",
  ADD_EMPLOYEE_TO_STATION: "Failed to add employee to station.",
  SET_EMPLOYEE_END_DATE: "Failed to terminate employee.",
};

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEmployeeStationModalOpen, setIsEmployeeStationModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedContractType, setSelectedContractType] = useState('');
  const [selectedStation, setSelectedStation] = useState('');
  const [statuses] = useState(['active', 'terminated']);
  const [contractTypes, setContractTypes] = useState([]);
  const [stations, setStations] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const { data } = await employeeApi.getAllEmployees();
      const employeeData = data.data;
      setEmployees(employeeData);
      setFilteredEmployees(employeeData);

      const uniqueContractTypes = [...new Set(employeeData.map(employee => employee.contract_type))];
      const uniqueStations = [...new Set(employeeData.map(employee => employee.stations.at(-1)?.name).filter(Boolean))];
      setContractTypes(uniqueContractTypes);
      setStations(uniqueStations);

      setLoading(false);
    } catch (err) {
      toast.error(ERROR_MESSAGES.LOAD_EMPLOYEES, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    let filtered = employees.filter(employee => {
      const employeeName = `${employee.first_name} ${employee.last_name}`;
      const searchMatch =
        !searchQuery ||
        employeeName.toLowerCase().includes(searchQuery.toLowerCase());
      const statusMatch = !selectedStatus || employee.status === selectedStatus;
      const contractTypeMatch = !selectedContractType || employee.contract_type === selectedContractType;
      const stationMatch = !selectedStation || employee.stations.at(-1)?.name === selectedStation;
      return searchMatch && statusMatch && contractTypeMatch && stationMatch;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue, bValue;
        if (sortConfig.key === 'name') {
          aValue = `${a.first_name} ${a.last_name}`.toLowerCase();
          bValue = `${b.first_name} ${b.last_name}`.toLowerCase();
        } else if (sortConfig.key === 'cin') {
          aValue = a.employee_cin.toLowerCase();
          bValue = b.employee_cin.toLowerCase();
        } else if (sortConfig.key === 'email') {
          aValue = a.email.toLowerCase();
          bValue = b.email.toLowerCase();
        } else if (sortConfig.key === 'phone') {
          aValue = a.phone.toLowerCase();
          bValue = b.phone.toLowerCase();
        } else if (sortConfig.key === 'gender') {
          aValue = a.gender.toLowerCase();
          bValue = b.gender.toLowerCase();
        } else if (sortConfig.key === 'contract_type') {
          aValue = a.contract_type.toLowerCase();
          bValue = b.contract_type.toLowerCase();
        } else if (sortConfig.key === 'current_station') {
          aValue = a.stations.at(-1)?.name.toLowerCase() || '';
          bValue = b.stations.at(-1)?.name.toLowerCase() || '';
        } else if (sortConfig.key === 'status') {
          aValue = a.status.toLowerCase();
          bValue = b.status.toLowerCase();
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredEmployees(filtered);
  }, [employees, searchQuery, selectedStatus, selectedContractType, selectedStation, sortConfig]);

  const handleAddEmployee = async (employee) => {
    const { station_id, ...employeeInfo } = employee;
    try {
      const { data } = await employeeApi.addNewEmployee(employeeInfo);
      const employeeStationData = {
        station_id,
        employee_id: data.id,
        start_date: new Intl.DateTimeFormat('en-CA').format(new Date()),
      };
      await addEmployeeToStation(employeeStationData);
    } catch (err) {
      toast.error(`${ERROR_MESSAGES.ADD_EMPLOYEE} ${err.response?.data?.message || "Please try again."}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const handleAddEmployeeToNewStation = async (data) => {
    const { station_id, employee_id, contract_type, status } = data;
    try {
      await handleUpdateEmployee({
        id: employee_id,
        contract_type,
        status,
      });
      const employeeStationData = {
        station_id,
        employee_id,
        start_date: new Intl.DateTimeFormat('en-CA').format(new Date()),
      };
      await addEmployeeToStation(employeeStationData);
    } catch (err) {
      toast.error(`${ERROR_MESSAGES.ADD_EMPLOYEE} ${err.response?.data?.message || "Please try again."}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const addEmployeeToStation = async (employeeStationData) => {
    try {
      await employeeSationApi.addEmployeeToStation(employeeStationData);
      fetchEmployees();
      toast.success("Employee added successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } catch (err) {
      toast.error(`${ERROR_MESSAGES.ADD_EMPLOYEE_TO_STATION} ${err.response?.data?.message || "Please try again."}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const handleUpdateEmployee = async (employee) => {
    try {
      await employeeApi.updateEmployee(employee);
      if (employee.status === 'terminated') {
        const employeeStationId = employee.stations.at(-1).pivot.id;
        const end_date = new Intl.DateTimeFormat('en-CA').format(new Date());
        await setEmployeeEndDateInStation(employeeStationId, end_date);
        return;
      }
      fetchEmployees();
      toast.success("Employee updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } catch (err) {
      toast.error(`${ERROR_MESSAGES.UPDATE_EMPLOYEE} ${err.response?.data?.message || "Please try again."}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const setEmployeeEndDateInStation = async (employeeStationId, end_date) => {
    try {
      await employeeSationApi.setEmployeeEndDateInStation(employeeStationId, end_date);
      fetchEmployees();
      toast.success("Employee terminated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } catch (err) {
      toast.error(`${ERROR_MESSAGES.SET_EMPLOYEE_END_DATE} ${err.response?.data?.message || "Please try again."}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
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
          await employeeApi.deleteEmployee(employeeId);
          fetchEmployees();
          toast.success("Employee deleted successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
        } catch (err) {
          toast.error(`${ERROR_MESSAGES.DELETE_EMPLOYEE} ${err.response?.data?.message || "Please try again."}`, {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        }
      }
    });
  };

  const openEditModal = (employee = null) => {
    setEditingEmployee(employee);
    setIsEditModalOpen(true);
  };

  const openDetailsModal = (employee) => {
    setSelectedEmployee(employee);
    setIsDetailsModalOpen(true);
  };

  const openEmployeeStationModal = (employee) => {
    setSelectedEmployee(employee);
    setIsEmployeeStationModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingEmployee(null);
    setIsEditModalOpen(false);
  };

  const closeDetailsModal = () => {
    setSelectedEmployee(null);
    setIsDetailsModalOpen(false);
  };

  const closeEmployeeStationModal = () => {
    setSelectedEmployee(null);
    setIsEmployeeStationModalOpen(false);
  };

  const toggleRow = (employeeId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [employeeId]: !prev[employeeId],
    }));
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedStatus('');
    setSelectedContractType('');
    setSelectedStation('');
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
      case 'status':
        setSelectedStatus('');
        break;
      case 'contract_type':
        setSelectedContractType('');
        break;
      case 'station':
        setSelectedStation('');
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

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedEmployees = filteredEmployees.slice(
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
          <h2 className="text-lg font-semibold text-gray-800">Filter Employee Records</h2>
          <button
            onClick={() => openEditModal()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition-colors duration-150"
            aria-label="Add a new employee record"
          >
            <Plus className="inline-block mr-2 h-5 w-5" /> Add Employee
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="search-employee" className="block text-sm font-medium text-gray-800 mb-1">Search Employees</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="search-employee"
                type="text"
                placeholder="Search by employee name..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 p-2 border border-gray-400 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
              />
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
              >
                <option value="">All Statuses</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="contract-type-filter" className="block text-sm font-medium text-gray-800 mb-1">Contract Type</label>
            <div className="relative">
              <select
                id="contract-type-filter"
                value={selectedContractType}
                onChange={(e) => {
                  setSelectedContractType(e.target.value);
                  setCurrentPage(1);
                }}
                className={`p-2 pr-8 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 appearance-none ${
                  selectedContractType ? 'border-blue-500' : 'border-gray-400'
                }`}
              >
                <option value="">All Contract Types</option>
                {contractTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="station-filter" className="block text-sm font-medium text-gray-800 mb-1">Current Station</label>
            <div className="relative">
              <select
                id="station-filter"
                value={selectedStation}
                onChange={(e) => {
                  setSelectedStation(e.target.value);
                  setCurrentPage(1);
                }}
                className={`p-2 pr-8 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 appearance-none ${
                  selectedStation ? 'border-blue-500' : 'border-gray-400'
                }`}
              >
                <option value="">All Stations</option>
                {stations.map((station) => (
                  <option key={station} value={station}>{station}</option>
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
        {(searchQuery || selectedStatus || selectedContractType || selectedStation) && (
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
            {selectedStatus && (
              <button
                onClick={() => removeFilter('status')}
                className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-150 flex items-center"
              >
                Status: {selectedStatus} <X className="ml-1 h-4 w-4" />
              </button>
            )}
            {selectedContractType && (
              <button
                onClick={() => removeFilter('contract_type')}
                className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-150 flex items-center"
              >
                Contract Type: {selectedContractType} <X className="ml-1 h-4 w-4" />
              </button>
            )}
            {selectedStation && (
              <button
                onClick={() => removeFilter('station')}
                className="bg-gray-200 px-2 py-1 rounded-lg hover:bg-gray-300 transition-colors duration-150 flex items-center"
              >
                Station: {selectedStation} <X className="ml-1 h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        {paginatedEmployees.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No employee records found. Try adjusting your filters.
          </div>
        ) : (
          <>
            {/* Table Layout for Larger Screens */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full">
                <caption className="sr-only">Employee Records List</caption>
                <thead>
                  <tr>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('name')} className="flex items-center">
                        Name
                        {sortConfig.key === 'name' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('cin')} className="flex items-center">
                        Cin
                        {sortConfig.key === 'cin' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('email')} className="flex items-center">
                        Email
                        {sortConfig.key === 'email' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('phone')} className="flex items-center">
                        Phone
                        {sortConfig.key === 'phone' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('gender')} className="flex items-center">
                        Gender
                        {sortConfig.key === 'gender' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('contract_type')} className="flex items-center">
                        Contract Type
                        {sortConfig.key === 'contract_type' && (
                          sortConfig.direction === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th scope="col" className="px-4 py-3 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider sticky top-0 z-10 border-b border-gray-200">
                      <button onClick={() => handleSort('current_station')} className="flex items-center">
                        Current Station
                        {sortConfig.key === 'current_station' && (
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
                  {paginatedEmployees.map((employee) => (
                    <React.Fragment key={employee.id}>
                      <tr className="hover:bg-gray-100 transition-colors duration-150">
                        <td className="px-4 py-3 whitespace-nowrap text-gray-800">{employee.first_name} {employee.last_name}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-800">{employee.employee_cin}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-800">{employee.email}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-800">{employee.phone}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-800">{employee.gender === "male" ? "♂️" : "♀️"}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-800">{employee.contract_type}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-800">{employee.stations.at(-1)?.name || 'N/A'}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="relative group">
                            <span
                              className={`px-2 py-1 ${
                                employee.status === "active" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                              } rounded-full text-sm font-medium`}
                            >
                              {employee.status}
                            </span>
                            <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0 whitespace-nowrap">
                              {employee.status === "active" ? "Employee is active" : "Employee is terminated"}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium flex space-x-3">
                          <div className="relative group">
                            <button
                              className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                              onClick={() => openEditModal(employee)}
                              disabled={employee.status === "terminated"}
                              aria-label={`Edit employee record for ${employee.first_name} ${employee.last_name}`}
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                            <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Edit</div>
                          </div>
                          <div className="relative group">
                            {/* <button
                              className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                              onClick={() => handleDeleteEmployee(employee.id)}
                              aria-label={`Delete employee record for ${employee.first_name} ${employee.last_name}`}
                            >
                              <Trash2 className="h-5 w-5" />
                            </button> */}
                            <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Delete</div>
                          </div>
                          <div className="relative group">
                            <button
                              className="text-gray-600 hover:text-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                              onClick={() => openDetailsModal(employee)}
                              aria-label={`View details of employee record for ${employee.first_name} ${employee.last_name}`}
                            >
                              <Eye className="h-5 w-5" />
                            </button>
                            <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">View Details</div>
                          </div>
                          <div className="relative group">
                            <button
                              className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                              onClick={() => openEmployeeStationModal(employee)}
                              disabled={employee.status !== "terminated"}
                              aria-label={`Add ${employee.first_name} ${employee.last_name} to a new station`}
                            >
                              <Plus className="h-5 w-5" />
                            </button>
                            <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Add to Station</div>
                          </div>
                          <div className="relative group">
                            <button
                              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded"
                              onClick={() => toggleRow(employee.id)}
                              aria-label={`Toggle station history for ${employee.first_name} ${employee.last_name}`}
                            >
                              {expandedRows[employee.id] ? "▼" : "▶"}
                            </button>
                            <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">
                              {expandedRows[employee.id] ? "Collapse" : "Expand"}
                            </div>
                          </div>
                        </td>
                      </tr>
                      {expandedRows[employee.id] && (
                        <tr>
                          <td colSpan={9} className="px-4 py-3">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h3 className="font-semibold mb-2">Stations Worked</h3>
                              <table className="min-w-full">
                                <thead>
                                  <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Station Name
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      Start Date
                                    </th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      End Date
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {employee.stations.map((station, index) => (
                                    <tr key={index}>
                                      <td className="px-4 py-2 whitespace-nowrap">{station.name}</td>
                                      <td className="px-4 py-2 whitespace-nowrap">{station.pivot.start_date}</td>
                                      <td className="px-4 py-2 whitespace-nowrap">{station.pivot.end_date || "Present"}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Card Layout for Smaller Screens */}
            <div className="block md:hidden space-y-4">
              {paginatedEmployees.map((employee) => (
                <div key={employee.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{employee.first_name} {employee.last_name}</h3>
                      <p className="text-sm text-gray-600">CIN: {employee.employee_cin}</p>
                      <p className="text-sm text-gray-600">Email: {employee.email}</p>
                      <p className="text-sm text-gray-600">Phone: {employee.phone}</p>
                      <p className="text-sm text-gray-600">Gender: {employee.gender === "male" ? "♂️" : "♀️"}</p>
                      <p className="text-sm text-gray-600">Contract Type: {employee.contract_type}</p>
                      <p className="text-sm text-gray-600">Current Station: {employee.stations.at(-1)?.name || 'N/A'}</p>
                      <div className="relative group inline-block">
                        <span
                          className={`px-2 py-1 mt-1 ${
                            employee.status === "active" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                          } rounded-full text-sm font-medium`}
                        >
                          {employee.status}
                        </span>
                        <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0 whitespace-nowrap">
                          {employee.status === "active" ? "Employee is active" : "Employee is terminated"}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="relative group">
                        <button
                          className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                          onClick={() => openEditModal(employee)}
                          disabled={employee.status === "terminated"}
                          aria-label={`Edit employee record for ${employee.first_name} ${employee.last_name}`}
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Edit</div>
                      </div>
                      <div className="relative group">
                        <button
                          className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                          onClick={() => handleDeleteEmployee(employee.id)}
                          aria-label={`Delete employee record for ${employee.first_name} ${employee.last_name}`}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                        <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Delete</div>
                      </div>
                      <div className="relative group">
                        <button
                          className="text-gray-600 hover:text-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                          onClick={() => openDetailsModal(employee)}
                          aria-label={`View details of employee record for ${employee.first_name} ${employee.last_name}`}
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">View Details</div>
                      </div>
                      <div className="relative group">
                        <button
                          className="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                          onClick={() => openEmployeeStationModal(employee)}
                          disabled={employee.status !== "terminated"}
                          aria-label={`Add ${employee.first_name} ${employee.last_name} to a new station`}
                        >
                          <Plus className="h-5 w-5" />
                        </button>
                        <div className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 -top-8 left-0">Add to Station</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <button
                      onClick={() => toggleRow(employee.id)}
                      className="text-gray-600 hover:text-gray-900 flex items-center text-sm"
                      aria-label={`Toggle station history for ${employee.first_name} ${employee.last_name}`}
                    >
                      {expandedRows[employee.id] ? "▼ Hide Station History" : "▶ Show Station History"}
                    </button>
                    {expandedRows[employee.id] && (
                      <div className="mt-2 bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-semibold mb-2 text-sm">Stations Worked</h4>
                        <div className="space-y-2">
                          {employee.stations.map((station, index) => (
                            <div key={index} className="text-sm text-gray-600">
                              <p><strong>Station:</strong> {station.name}</p>
                              <p><strong>Start Date:</strong> {station.pivot.start_date}</p>
                              <p><strong>End Date:</strong> {station.pivot.end_date || "Present"}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredEmployees.length)} of {filteredEmployees.length} employee records
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

      <EmployeeFormModal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSubmit={editingEmployee ? handleUpdateEmployee : handleAddEmployee}
        initialData={editingEmployee}
      />

      <EmployeeDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={closeDetailsModal}
        employee={selectedEmployee}
      />

      <EmployeeStationFormModal
        isOpen={isEmployeeStationModalOpen}
        onClose={closeEmployeeStationModal}
        onSubmit={handleAddEmployeeToNewStation}
        employee={selectedEmployee}
      />

      <ToastContainer />
    </div>
  );
};

export default EmployeeList;