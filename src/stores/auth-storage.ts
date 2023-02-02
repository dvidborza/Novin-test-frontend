import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import LoginRequest from '@/model/request/LoginRequest'
import LoginResponse from '@/model/response/LoginResponse'
import LoggedUserModel from '@/model/LoggedUser'
import jwtDecode from 'jwt-decode'
import { useToast } from "vue-toastification";

export const useAuthStorage = defineStore('authStorage', () => {

    const toast = useToast();
    const loggedUser = ref(JSON.parse(localStorage.getItem('loggedUser') as string))

    function setAuthenticatedUser(data: LoginResponse) {
        localStorage.setItem('token', data.token as string)
        localStorage.setItem('refreshToken', data.refreshToken as string)

        const user = new LoggedUserModel(data.username, data.id, data.roles, data.lastLogIn)

        localStorage.setItem('loggedUser', JSON.stringify(user))
    }

    function login(loginData: LoginRequest) {
        return axios.post(`${process.env.VUE_APP_BACKEND_URL}/auth/login`, loginData)
            .then((result) => {
                setAuthenticatedUser(result.data)
                return result.data
            })
    }

    function register(registerData: any) {
        return axios.post(`${process.env.VUE_APP_BACKEND_URL}/auth/register`, registerData)
            .then((result) => {
                return result.data
            })
    }

    function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('loggedUser')

        toast.success("Logout Successfully!")
        window.location.href = "/login"
    }

    async function getAccessToken() {

        const accessToken = localStorage.getItem('token') as string
        const refreshToken = localStorage.getItem('refreshToken') as string

        const accessTokenDecoded = jwtDecode(accessToken) as any
        const refreshTokenDecoded = jwtDecode(refreshToken) as any

        if (new Date(accessTokenDecoded.exp * 1000) > new Date()) {
            return accessToken
        } else {
            if (new Date(refreshTokenDecoded.exp * 1000) > new Date()) {
                const uninterceptedAxiosInstance = axios.create();
                const newAccessToken = await uninterceptedAxiosInstance.post(`${process.env.VUE_APP_BACKEND_URL}/auth/refresh-token`, {
                    refreshToken: refreshToken
                })
                    .then(result => {
                        localStorage.setItem('token', result.data.accessToken)
                        localStorage.setItem('refreshToken', result.data.refreshToken)

                        return result.data.accessToken
                    })
                    .catch(error => {
                        toast.error("Token refreshing error!")
                        new Error('Token refreshing error!')
                    })

                return newAccessToken
            } else {
                logout();
            }
        }
    }

    return {
        loggedUser,
        login,
        logout,
        register,
        getAccessToken
    }
})