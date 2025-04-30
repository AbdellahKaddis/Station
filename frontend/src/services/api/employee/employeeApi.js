import axiosClient from "../../../api/axios";

const employeeApi = {

    addNewEmployee:async(data)=> await axiosClient.post('/employees',data),
    getEmployee:async(employeeId)=> await axiosClient.get(`/employees/${employeeId}`),
    getAllEmployees:async()=> await axiosClient.get('/employees'),
    updateEmployee:async(employee)=> await axiosClient.put(`/employees/${employee.id}`,employee),
    deleteEmployee:async(employeeId)=> await axiosClient.delete(`/employees/${employeeId}`),
};
export default employeeApi;