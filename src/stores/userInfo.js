
import { loginapi } from '../api/login.js'
import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'

export const userStore = defineStore('userInfo', () => {

    const userInfo = ref({

    })
    const token = ref()
    const Login = async (data) => {
        try {
            const res = await loginapi(data)
            token.value = res.token
            userInfo.value = res.user
            router.push('/')
        } catch (error) {

        }

    }

    return { token, userInfo, Login }
})