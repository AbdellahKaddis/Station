
import axiosClient from "../../../api/axios";

const employeeSationApi = {
    addEmployeeToStation:async(data)=> await axiosClient.post('/employee-stations',data),
    setEmployeeEndDateInStation:async(employeeStationId,end_date)=> await axiosClient.put(`/employee-stations/${employeeStationId}`,{end_date}),
};
export default employeeSationApi;