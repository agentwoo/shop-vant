import http from './http'

export const getUser = () => http({ url: '/getUser', method: "get" })