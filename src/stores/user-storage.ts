import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import UserRequest from '@/model/request/UserRequest'
import UserResponse from '@/model/response/UserResponse'

export const useUserStorage = defineStore('userStorage', () => {

    const users = ref<Array<UserResponse>>()

    function setUsers(payload: Array<UserResponse>) {
        users.value = payload
    }

    function findAndDeleteUser(id: Number) {
        if (users.value !== undefined) {
            const index = users.value.findIndex((o: UserResponse) => o.id === id);

            if (index > -1) {
                users.value.splice(index, 1)
            }
        }
    }

    function findAndModify(payload: UserResponse) {
        if (users.value !== undefined) {
            const index = users.value.findIndex((o: UserResponse) => o.id === payload.id);

            if (index > -1) {
                users.value[index] = payload
            }
        }
    }

    function getUsers() {
        return axios.get(`${process.env.VUE_APP_BACKEND_URL}/users`)
            .then(result => {
                setUsers(result.data)
                return result.data
            })
            .catch(error => {
                console.log(error)
            })
    }

    function update(data: UserRequest) {
        return axios.put(`${process.env.VUE_APP_BACKEND_URL}/users/${data.id}`, data)
            .then(result => {
                console.log(result.data)
                findAndModify(result.data)
                return result.data
            })
    }

    function deleteUser(id: Number) {
        return axios.delete(`${process.env.VUE_APP_BACKEND_URL}/users/${id}`)
            .then(result => {
                findAndDeleteUser(id)
                return result.data
            })
    }

    return {
        users,
        update,
        getUsers,
        deleteUser
    }
})