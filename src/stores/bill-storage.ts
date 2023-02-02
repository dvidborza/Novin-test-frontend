import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import BillDto from '@/model/BillDto'

export const useBillStorage = defineStore('billStorage', () => {

    const bills = ref<Array<BillDto>>()
    const billDetails = ref<BillDto>()

    function setBills(payload: Array<BillDto>) {
        bills.value = payload
    }

    function setBillDetails(payload: BillDto) {
        billDetails.value = payload
    }

    function findAndDeleteBill(id: Number) {
        if (bills.value !== undefined) {
            const index = bills.value.findIndex((o: BillDto) => o.id === id);

            if (index > -1) {
                bills.value.splice(index, 1)
            }
        }
    }


    function getBills() {
        return axios.get(`${process.env.VUE_APP_BACKEND_URL}/bills`)
            .then(result => {
                setBills(result.data)
                return result.data
            })
            .catch(error => {
                console.log(error)
            })
    }

    function getById(id: string) {
        return axios.get(`${process.env.VUE_APP_BACKEND_URL}/bills/${id}`)
            .then(result => {
                setBillDetails(result.data)
                return result.data
            })
    }

    function save(bill: BillDto) {
        return axios.post(`${process.env.VUE_APP_BACKEND_URL}/bills`, bill)
            .then(result => {
                return result.data
            })
    }

    function deleteBill(id: Number) {
        return axios.delete(`${process.env.VUE_APP_BACKEND_URL}/bills/${id}`)
            .then(result => {
                findAndDeleteBill(id)
                return result.data
            })
    }

    return {
        bills,
        save,
        getById,
        getBills,
        deleteBill
    }
})