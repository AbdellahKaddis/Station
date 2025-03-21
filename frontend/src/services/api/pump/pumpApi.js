import axiosClient from "../../../api/axios";

const pumpApi = {
    addNewPump:async(data)=> await axiosClient.post('/pumps',data),
    getPump:async(pumpId)=> await axiosClient.get(`/pumps/${pumpId}`),
    getAllPumps:async()=> await axiosClient.get('/pumps'),
    updatePump:async(pump)=> await axiosClient.put(`/pumps/${pump.id}`,pump),
    deletePump:async(pumpId)=> await axiosClient.delete(`/pumps/${pumpId}`),
};
export default pumpApi;