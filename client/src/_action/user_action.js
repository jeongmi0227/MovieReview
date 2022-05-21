import axios from "axios";
import {LOGIN_USER} from './types'
export function loginUser(dataTosumbit){
    const request = axios.post('/api/users/login', dataTosumbit)
        .then(response => response.data );
    
    return {
        type: LOGIN_USER,
        payload: request
    }
};