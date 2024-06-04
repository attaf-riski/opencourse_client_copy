import Axios, { AxiosRequestConfig } from "axios";
import {jwtDecode} from "jwt-decode";
import { GetAuth } from "./AuthUser";
import AuthAttributes from "../types/AuthUserInterface";

const Http = Axios.create({
    baseURL: "http://localhost:8000",
    timeout: 10000,
});

// console.log(Http.interceptors.request)

Http.interceptors.request.use(
    async (req) => {
        console.log(req.headers) // api kelas dosen
        
        // console.log(AuthUser)
        
        // jika ada api yang di bungkus
        if (req.headers?.Authorization) {
            console.log('ada auth nya di header')
            const user = GetAuth()

            console.log(user)

            // const token = user?.token;

            // const authHeader = req.headers?.Authorization;

            // const currentToken = authHeader && authHeader.toString().split(" ")[1];

            // const decoded: any = currentToken && jwtDecode(currentToken);

            // const expired = decoded?.exp;

            // const currentDate = new Date();
            // if (expired * 1000 < currentDate.getTime()) {
            //     const resData = await Http.post(
            //         "/api/refresh",
            //         { headers: { Authorization: `Bearer ${token}` } }
            //     );

            //     const response: AuthAttributes = {
            //         id: resData.data?.user?.id,
            //         full_name: resData.data?.user?.full_name,
            //         email: resData.data?.user?.email,
            //         role: resData.data?.user?.role,
            //         token: resData.data?.token,
            //     };

            //     req.headers.Authorization = `Bearer ${resData.data?.token}`;

            //     AuthUser.SetAuth(response);
            // }
        }

        // kalo ga ada auth
        return req;
    },
    (err: any) => {
        console.log(err)
        return Promise.reject(err);
    }
);

Http.interceptors.request.use(
    (response) => {
        return response;
    },
    (error: any) => {
        console.log(error)
        return Promise.reject(error);
    }
);

export default Http;