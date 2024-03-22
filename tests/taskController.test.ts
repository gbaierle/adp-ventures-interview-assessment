import { beforeEach, describe, it, mock } from "node:test";
import TaskController from "../src/http/controllers/taskController.js";
import { AxiosResponse } from "axios";
import Task from "../src/types/task.js";
import AxiosClient from "../src/http/client/axiosClient.js";
import assert from "node:assert";
import IncorrectResultException from "../src/eceptions/incorrectResultException.js";

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

  describe("submitTask", () => {

    let axiosClientMock: AxiosClient;
    let task: Task;

    beforeEach(() => {
      axiosClientMock = new AxiosClient();
      task = {
        id: "test-id-123",
        operation: "addition",
        left: 1,
        right: 2,
      };
    })

    it("should return task is Correct when status is 200", async () => {
      mock.method(
        axiosClientMock,
        "post",
        async () => ({ status: 200, data: "Correct" } as AxiosResponse<string>)
      );

      const taskController = new TaskController(axiosClientMock);
      const result = await taskController.submitTask(task);
      assert.equal(result, "Correct");
    });

    it("should throw IncorrectResultException when task is Incorrect and status is 400", async () => {
      const message = "Incorrect result.";
      mock.method(
        axiosClientMock,
        "post",
        async () => ({ status: 400, data: message } as AxiosResponse<string>)
      );

      const taskController = new TaskController(axiosClientMock);
      assert.rejects(async () => {
        await taskController.submitTask(task);
      });

      try {
        await taskController.submitTask(task);
      } catch (error: unknown) {
        assert.equal(error instanceof IncorrectResultException, true);
        assert.equal((error as IncorrectResultException).message, message);
      }
    });

    it("should return 'Bad Request' and status is 400", async () => {
      const message = "Bad Request";
      mock.method(
        axiosClientMock,
        "post",
        async () => ({ status: 400, data: message } as AxiosResponse<string>)
      );

      const taskController = new TaskController(axiosClientMock);
      assert.rejects(async () => {
        await taskController.submitTask(task);
      });

      try {
        await taskController.submitTask(task);
      } catch (error: unknown) {
        assert.equal((error as Error).message, message);
      }
    });

    it("should return 'Value not found' when status is 404", async () => {
      const message = "Value not found for specified ID";
      mock.method(
        axiosClientMock,
        "post",
        async () => ({ status: 404, data: message } as AxiosResponse<string>)
      );

      const taskController = new TaskController(axiosClientMock);
      assert.rejects(async () => {
        await taskController.submitTask(task);
      });

      try {
        await taskController.submitTask(task);
      } catch (error: unknown) {
        assert.equal((error as Error).message, message);
      }
    });

    it("should return 'Value not found when status is 500", async () => {
      const message = "Unknown error";
      mock.method(
        axiosClientMock,
        "post",
        async () => ({ status: 500, statusText: message } as AxiosResponse<string>)
      );

      const taskController = new TaskController(axiosClientMock);
      assert.rejects(async () => {
        await taskController.submitTask(task);
      });

      try {
        await taskController.submitTask(task);
      } catch (error: unknown) {
        assert.equal((error as Error).message, message);
      }
    });
  });
});
