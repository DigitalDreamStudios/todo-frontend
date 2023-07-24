import axios from "axios";
import { ILoginRequest } from "../models/ILoginRequest.interface";
import { APIResponse } from "../../../models/APIResponse.interface";

export default class SignInService {
    async postLogin(data: ILoginRequest): Promise<APIResponse> {
        try {
            const res = await axios.post(`auth/login`, data);
            return res.data;
        } catch (err) {
            throw err;
        }
    }
}