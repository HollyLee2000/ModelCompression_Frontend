import request from "./index"

export default function loginIn(userData) {
    return request({
        url: "",
        method: "post",
        params: userData
    })
}