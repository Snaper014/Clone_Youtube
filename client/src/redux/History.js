import axios from "axios";

export const API = axios.create({
  baseURL: 'http://localhost:5000'
});

API.interceptors.request.use((req) => {
    if(localStorage.getItem("jwt-auth")){
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('jwt-auth'))}`;
    }
   return req; 
})

 const GetHistory = () => API.post('/history', { firstname: "Children", LastName: "Mastaque"});
 const GetLogin = () => API.post('/login');

  export {GetHistory, GetLogin};


