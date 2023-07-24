import axios from "axios";
import { IRegisterRequest } from "../models/IRegisterRequest.interface";
import { APIResponse } from "../../../models/APIResponse.interface";


export default class SignUpService {
    async postRegister(data: IRegisterRequest): Promise<APIResponse> {
        try {
            const res = await axios.post(`auth/register`, data);
            return res.data;
        } catch (err) {
            throw err;
        }
    }
}