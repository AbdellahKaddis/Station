import axiosClient from "../../../api/axios";

const stationApi = {
    getCsrfToken : async()=> {
        return await axiosClient.get('/sanctum/csrf-cookie',{
                baseURL : process.env.REACT_APP_BACKEND_URL,
            })},
    addNewStation:async(data)=> await axiosClient.post('/stations',data),
    getStation:async(stationId)=> await axiosClient.get(`/stations/${stationId}`),
    getAllStations:async()=> await axiosClient.get('/stations'),
    updateStation:async(station)=> await axiosClient.put(`/stations/${station.id}`,station),
    deleteStation:async(stationId)=> await axiosClient.delete(`/stations/${stationId}`),
    isEmailExist:async(email)=> await axiosClient.post('/check-email ',{email}),
};
export default stationApi;