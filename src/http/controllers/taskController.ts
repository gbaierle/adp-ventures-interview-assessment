import { AxiosError, AxiosResponse } from "axios";
import IncorrectResultException from "../../eceptions/incorrectResultException.js";
import TaskService from "../../services/taskService.js";
import Task from "../../types/task.js";
import TaskResult from "../../types/taskResult.js";
import AxiosClient from "../client/axiosClient.js";
import HttpClientInterface from "../client/httpClient.js";

const BASE_URL = "https://interview.adpeai.com/api/v1";

export default class TaskController {
  private axiosClient: HttpClientInterface;
  private taskService: TaskService;

  constructor(
    axiosClient: HttpClientInterface = new AxiosClient(),
    taskService: TaskService = new TaskService()
  ) {
    this.axiosClient = axiosClient;
    this.taskService = taskService;
  }

  /**
   * Retrieves a task from the interview API.
   *
   * @returns Promise<Task>
   * @throws Error
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

  /**
   * Submits a task result to the interview API.
   *
   * @param task Task
   * @returns Promise<string>
   * @throws Error|IncorrectResultException
   */
  async submitTask(task: Task): Promise<TaskResult> {
    const result = this.taskService.calculateTaskResult(task);
    const taskResult: TaskResult = {
      id: task.id,
      result,
    };

    try {
      const response = await this.axiosClient.post(
        `${BASE_URL}/submit-task`,
        taskResult
      );

      if (response.status === 200) {
        return taskResult;
      }
    } catch (error) {
      const response = (error as AxiosError).response as AxiosResponse;

      if (response.status === 400) {
        if (response.data === "Incorrect result.") {
          throw new IncorrectResultException(`Incorrect result: ${result}`);
        }
        throw new Error(response.data || "Bad Request");
      }

      if (response.status === 404) {
        throw new Error(response.data || "Not Found");
      }

      if (response.status >= 500) {
        throw new Error(response.statusText || "Error submitting task");
      }
    }

    return taskResult;
  }
}
