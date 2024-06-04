"use server"

import { cookies } from "next/headers";
import AuthAttributes from "../types/AuthUserInterface";

export const GetAuth = async () => {
    // const userString = localStorage.getItem("userData_Apps");

    // if (userString) {
    //     const user: AuthAttributes = JSON.parse(userString);

    //     return user;
    // }

    // return null;

    const mycookies = cookies()
    const user = mycookies.get("userData_Apps")
    return user;
};

export const SetAuth = async (data: AuthAttributes) => {
    const userString = JSON.stringify(data);
    console.log(userString)
    const mycookies = cookies()
    mycookies.set("userData_Apps", userString)
};

export const RemoveAuth = async () => {
    const userString = localStorage.getItem("userData_Apps");
    if (userString) {
        localStorage.removeItem("userData_Apps");
    }
};