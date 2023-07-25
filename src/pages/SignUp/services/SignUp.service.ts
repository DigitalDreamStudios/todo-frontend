import axios from "axios";
import { RegisterRequest } from "../models/RegisterRequest.interface";
import { ApiResponse } from "../../../models/ApiResponse.type";


export default class SignUpService {
    async postRegister(data: RegisterRequest): Promise<ApiResponse> {
        try {
            const res = await axios.post(`auth/register`, data);
            return res.data;
        } catch (err) {
            throw err;
        }
    }
}