import axios from "axios";
import {hostStore} from "../store/host.store";
import {CookieUtil} from "./cookie.util";

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
};

export const appAxios = axios.create({
    baseURL: hostStore.url,
    headers: headers,
});

appAxios.interceptors.request.use((config) => {
    let token = CookieUtil.get("token");
    if (!config.headers) return;
    if (token) {
        config.headers.credentials = "include";
        config.headers.Authorization = `Bearer ${token}`;
        config.headers["Access-Control-Allow-Origin"] = "*";
    } else if (config.url != "users/@me")
        config.headers.Authorization = false;
    return config;
});

