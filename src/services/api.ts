import axios from "axios"
import * as SecureStore from "expo-secure-store"
import { obterToken } from "./servicoToken";

export const api = axios.create({
    baseURL: "https://back-endmascotedex-homolog.up.railway.app"
});

api.interceptors.request.use(async (config) => {
    const token = await obterToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
}) 