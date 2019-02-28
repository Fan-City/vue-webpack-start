import request from '@/utils/request'

export function login1(username, password) {
    return request({
        url: '/api1/login',
        method: 'post',
        data: {
            username,
            password
        }
    })
}
export function login2(username, password) {
    return request({
        url: '/api2/login',
        method: 'post',
        data: {
            username,
            password
        }
    })
}

