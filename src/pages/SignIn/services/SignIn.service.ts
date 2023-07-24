import axios from "axios";
import { LoginRequest } from "../models/LoginRequest.interface";
import { ApiResponse } from "../../../models/ApiResponse.type";

export default class SignInService {
    async postLogin(data: LoginRequest): Promise<ApiResponse> {
        try {
            const res = await axios.post(`auth/login`, data);
            return res.data;
        } catch (err) {
            throw err;
        }
    }
}