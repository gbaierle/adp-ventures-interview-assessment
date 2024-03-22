import axios, { AxiosResponse } from "axios";
import HttpClientInterface from "./httpClient.js";
import TaskResult from "../../types/taskResult.js";

export default class AxiosClient implements HttpClientInterface {

    /**
     * Sends a GET request to the specified URL.
     *
     * @param url
     * @returns Promise
     */
    async get(url: string): Promise<AxiosResponse> {
        try {
            const response = await axios.get(url);
            return response;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Sends a POST request to the specified URL.
     *
     * @param url
     * @param task
     * @returns Promise
     */
    async post(url: string, taskResult: TaskResult): Promise<AxiosResponse> {
        try {
            const response = await axios.post(url, taskResult);
            return response;
        } catch (error) {
            throw error;
        }
    }
}
