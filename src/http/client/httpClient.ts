import { AxiosResponse } from "axios";
import TaskResult from "../../types/taskResult.js";

interface HttpClientInterface {
    get(url: string): Promise<AxiosResponse>;
    post(url: string, taskResult: TaskResult): Promise<AxiosResponse>;
}

export default HttpClientInterface;
