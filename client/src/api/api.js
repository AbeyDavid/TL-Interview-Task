import axios from 'axios'

const axiosApi = axios.create({
    baseURL: 'http://localhost:4000/'
});

export const userRegistration = async(userData)=>{
    try {
        const res = await axiosApi.post("/userRegister",userData)
        return res.data  
    } catch (error) {
        console.log(error.data);
    }   
}

export const userLogin = async(userData)=>{
    try {
        const res = await axiosApi.post("/userLogin",userData)
        return res.data
    } catch (error) {
        console.log(error.message);
        return error
    }
} 


export {axiosApi}