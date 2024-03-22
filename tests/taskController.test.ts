import { describe, it, mock } from "node:test";
import TaskController from "../src/http/controllers/taskController.js";
import { AxiosResponse } from "axios";
import Task from "../src/types/task.js";
import AxiosClient from "../src/http/client/axiosClient.js";
import assert from "node:assert";

describe("TaskController", () => {
  describe("getTask", () => {
    it("should get task from API", async () => {
      const axiosClientMock = new AxiosClient();
      const task: Task = {
        id: "test-id-123",
        operation: "addition",
        left: 1,
        right: 2,
      };

      mock.method(
        axiosClientMock,
        "get",
        async () => ({ status: 200, data: task } as AxiosResponse<Task>)
      );

      const taskController = new TaskController(axiosClientMock);
      const result = await taskController.getTask();
      assert.equal(result, task);
    });

    it('should handle error when getting task from API', async () => {
      const axiosClientMock = new AxiosClient();
      const error = new Error('Network error');
      mock.method(axiosClientMock, "get", async () => ({ status: 500, data: error }));
      assert.rejects(async () => {
        const taskController = new TaskController(axiosClientMock);
        await taskController.getTask();
      })
    });

    it('should throw error when status is not 200', async () => {
      const axiosClientMock = new AxiosClient();
      const task = {
        id: "test-id-123",
        operation: "addition",
        left: 1,
        right: 2,
      }
      mock.method(axiosClientMock, "get", async () => ({ status: 400, data: task }));
      assert.rejects(async () => {
        const taskController = new TaskController(axiosClientMock);
        await taskController.getTask();
      })
    });
  });
});
