import axiosClient from "../../../api/axios";

const fuelTypeApi = {
    addNewFuelType:async(data)=> await axiosClient.post('/fuel-types',data),
    getAllFuelTypes:async()=> await axiosClient.get('/fuel-types'),
    updateFuelType:async(fuelType)=> await axiosClient.put(`/fuel-types/${fuelType.id}`,fuelType),
    deleteFuelType:async(fuelTypeId)=> await axiosClient.delete(`/fuel-types/${fuelTypeId}`),
};
export default fuelTypeApi;