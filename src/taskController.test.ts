import { describe, it, mock } from "node:test";
import TaskController from "./http/controllers/taskController.js";
import { AxiosResponse } from "axios";
import TaskType from "./types/taskType.js";
import AxiosClient from "./http/client/axiosClient.js";
import assert from "node:assert";

describe("TaskController", () => {
  describe("getTask", () => {
    it("should get task from API", async () => {
      const axiosClientMock = new AxiosClient();
      const task: TaskType = {
        id: "test-id-123",
        operation: "addition",
        left: 1,
        right: 2,
      };

      mock.method(
        axiosClientMock,
        "get",
        async () => ({ status: 200, data: task } as AxiosResponse<TaskType>)
      );

      const taskController = new TaskController(axiosClientMock);
      const result = await taskController.getTask();
      assert.equal(result.id, task.id);
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
  });
});
