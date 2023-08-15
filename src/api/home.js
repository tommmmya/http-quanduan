import request from '../utils/request.js'

export const userInfoapi = (data) => {
    return request.post('/login', data)
}