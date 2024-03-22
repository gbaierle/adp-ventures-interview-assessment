import TaskType from "../../types/taskType.js";
import HttpClientInterface from "../client/httpClient.js";

const BASE_URL = "https://interview.adpeai.com/api/v1";

export default class TaskController {
  private axiosClient: HttpClientInterface;

  constructor(axiosClient: HttpClientInterface) {
    this.axiosClient = axiosClient;
  }

  async getTask(): Promise<TaskType> {
    try {
      const response = await this.axiosClient.get(`${BASE_URL}/get-task`);

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      return response.data;

    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
