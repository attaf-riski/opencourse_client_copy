import Axios, { AxiosRequestConfig } from "axios";
import {jwtDecode} from "jwt-decode";
import AuthUser from "./AuthUser";
import AuthAttributes from "../types/AuthUserInterface";

const Http = Axios.create({
    baseURL: "http://localhost:8000",
    timeout: 1000,
});

Http.interceptors.request.use(
    async (req) => {
        if (req.headers?.Authorization) {
            const user = AuthUser.GetAuth();
            const token = user?.token;

            const authHeader = req.headers?.Authorization;

            const currentToken = authHeader && authHeader.toString().split(" ")[1];

            const decoded: any = currentToken && jwtDecode(currentToken);

            const expired = decoded?.exp;

            const currentDate = new Date();
            if (expired * 1000 < currentDate.getTime()) {
                const resData = await Http.post(
                    "/api/refresh",
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                const response: AuthAttributes = {
                    id: resData.data?.user?.id,
                    full_name: resData.data?.user?.full_name,
                    email: resData.data?.user?.email,
                    role: resData.data?.user?.role,
                    token: resData.data?.token,
                };

                req.headers.Authorization = `Bearer ${resData.data?.token}`;

                AuthUser.SetAuth(response);
            }
        }

        return req;
    },
    (err: any) => {
        return Promise.reject(err);
    }
);

Http.interceptors.request.use(
    (response) => {
        return response;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

export default Http;