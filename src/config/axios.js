import axios from 'axios'



export let axiosAuth = () => {
    let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
    return axios.create({
        headers: {
            Authorization: `Bearer ${user.tokens?.access?.token}`,   
        }
    })
}


export let axiosAuthUpload = () => {
    let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
    return axios.create({
    headers: {
        Authorization: `Bearer ${user.tokens?.access?.token}`,
        'Content-Type': 'multipart/form-data',
        "Access-Control-Allow-Origin": "*", 
        "Accept": "application/json"
    }
})}
