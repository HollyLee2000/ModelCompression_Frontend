import request from "@/api";

export function test(query){
    return request({
        url:'/test',
        method:'get',
        params:query
    })
}