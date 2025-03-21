import axiosClient from "../../../api/axios";

const tankApi = {
    addNewTank:async(data)=> await axiosClient.post('/tanks',data),
    getTank:async(tankId)=> await axiosClient.get(`/tanks/${tankId}`),
    getAllTanks:async()=> await axiosClient.get('/tanks'),
    updateTank:async(tank)=> await axiosClient.put(`/tanks/${tank.id}`,tank),
    deleteTank:async(tankId)=> await axiosClient.delete(`/tanks/${tankId}`),
};
export default tankApi;