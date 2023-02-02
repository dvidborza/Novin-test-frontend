import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import { createPinia } from 'pinia'
import Toast, { PluginOptions } from "vue-toastification";
import { useAuthStorage } from './stores/auth-storage'
import "vue-toastification/dist/index.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css"

const pinia = createPinia()
const options: PluginOptions = {
    // You can set your default options here
};

createApp(App)
    .use(router)
    .use(pinia)
    .use(Toast, options)
    .directive('role-hide', {
        mounted: (el, binding) => {
            const loggedUSer = JSON.parse(localStorage.getItem("loggedUser") as string);

            if (binding.value !== undefined) {
                if (loggedUSer) {
                    let permit = false

                    binding.value.forEach((element: any) => {
                        if (loggedUSer.roles.includes(element)) {
                            permit = true;
                        }
                    });
                    if (permit || binding.value === null) {
                        el.style.display = "initial";
                    } else {
                        el.style.display = "none";
                    }
                }
            }
        },
    })
    .directive('role-disable', {
        mounted: (el, binding) => {
            const loggedUSer = JSON.parse(localStorage.getItem("loggedUser") as string);

            if (binding.value !== undefined) {
                if (loggedUSer) {
                    let permit = false

                    binding.value.forEach((element: any) => {
                        if (loggedUSer.roles.includes(element)) {
                            permit = true;
                        }
                    });
                    if (permit || binding.value === null) {
                        el.disabled = false;
                    } else {
                        el.disabled = true;
                    }
                }
            }
        },
    })
    .mount('#app')


axios.interceptors.request.use(async (request) => {
    const authStorage = useAuthStorage()

    const token = localStorage.getItem('token') || null
    // const token = await authStorage.getAccessToken()

    if (token !== null) {
        // request.headers.Authorization = `Bearer ${token}`;
        request.headers.Authorization = `Bearer ${await authStorage.getAccessToken()}`;
    }

    return request;
});