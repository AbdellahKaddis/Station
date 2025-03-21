import axiosClient from "../../../api/axios";

const utilityApi = {
    isEmailExist:async(email,model)=> await axiosClient.post(`/check-email/${model}`,{email}),
    getAllNationalities:async()=> await axiosClient.get('/nationalities'),
};
export default utilityApi;