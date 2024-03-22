import { AxiosResponse } from "axios";

interface HttpClientInterface {
    get(url: string): Promise<AxiosResponse>;
}

export default HttpClientInterface;
