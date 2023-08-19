import { config } from '@vue/test-utils'
import axios from 'axios'
import { userStore } from '../stores/userInfo'
import { ElMessage, ElMessageBox } from 'element-plus';

const request = axios.create({
    baseURL: "/api",
    timeout: 30000,
})
request.interceptors.request.use(
    (config) => {
        let token = userStore().token
        if (token) {
            config.headers.token = token
        }

        return config
    }
)
request.interceptors.response.use((response) => {
    const res = response.data
    if (res.status !== "success") {
        ElMessage({
            message: (typeof res.data == 'string' && res.data) || res.message || '服务器错误',
            type: 'error',
            duration: 5 * 1000
        })
    } else {
        ElMessage({
            message: "请求成功",
            type: 'success',
            duration: 5 * 1000
        })
        return res
    }

},
    (error) => {
        // 对响应错误做点什
        ElMessage.error('网络超时');
        return Promise.reject(error);
    }
)
export default request