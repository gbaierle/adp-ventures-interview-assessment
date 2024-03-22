import axios, { AxiosResponse } from "axios";
import HttpClientInterface from "./httpClient.js";

export default class AxiosClient implements HttpClientInterface {
    async get(url: string): Promise<AxiosResponse> {
        try {
            const response = await axios.get(url);
            return response;
        } catch (error) {
            throw error;
        }
    }
}
