import request from '../utils/request.js'


export const getApis = (id) => {
    return request.get(`/project/${id}`)
}

export const addApi = (data, id) => {
    return request.post(`/project/${id}`, data)
}

export const deleteApi = (id) => {
    return request.delete(`/interface/${id}`,)
}