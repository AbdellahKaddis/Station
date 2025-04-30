import axiosClient from "../../../api/axios";

const userApi = {
    login:async(credentials)=> await axiosClient.post('/login',credentials),
    logout:async()=> await axiosClient.post('/logout '),

};
export default userApi;