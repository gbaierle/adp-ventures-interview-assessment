import Task from "../../types/task.js";
import HttpClientInterface from "../client/httpClient.js";

const BASE_URL = "https://interview.adpeai.com/api/v1";

export default class TaskController {
  private axiosClient: HttpClientInterface;

  constructor(axiosClient: HttpClientInterface) {
    this.axiosClient = axiosClient;
  }

  /**
   * Retrieves a task from the interview API.
   *
   * @returns Promise<Task>
   */
  async getTask(): Promise<Task> {
    try {
      const response = await this.axiosClient.get(`${BASE_URL}/get-task`);

      if (response.status !== 200) {
        throw new Error(response.statusText || "Error fetching task");
      }

      return response.data;

    } catch (error) {
      throw error;
    }
  }
}
