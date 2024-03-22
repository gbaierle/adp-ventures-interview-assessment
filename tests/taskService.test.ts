import { describe, it } from "node:test";
import assert from "node:assert";
import TaskService from "../src/services/taskService.js";
import additionTask from "./fixtures/addition.json";
import subtractionTask from "./fixtures/subtraction.json";
import multiplicationTask from "./fixtures/multiplication.json";
import divisionTask from "./fixtures/division.json";
import remainderTask from "./fixtures/remainder.json";

describe("TaskService", () => {
  it("should be able to calculate addition", async () => {
    const taskService = new TaskService();
    const task = additionTask;
    const result = taskService.calculateTaskResult(task);
    const expected = task.left + task.right;
    assert.equal(result, expected);
  });

  it("should be able to calculate subtraction", async () => {
    const taskService = new TaskService();
    const task = subtractionTask;
    const result = taskService.calculateTaskResult(task);
    const expected = task.left - task.right;
    assert.equal(result, expected);
  });

  it("should be able to calculate multiplication", async () => {
    const taskService = new TaskService();
    const task = multiplicationTask;
    const result = taskService.calculateTaskResult(task);
    const expected = task.left * task.right;
    assert.equal(result, expected);
  });

  it("should be able to calculate division", async () => {
    const taskService = new TaskService();
    const task = divisionTask;
    const result = taskService.calculateTaskResult(task);
    const expected = task.left / task.right;
    assert.equal(result, expected);
  });

  it("should be able to calculate remainder", async () => {
    const taskService = new TaskService();
    const task = remainderTask;
    const result = taskService.calculateTaskResult(task);
    const expected = task.left % task.right;
    assert.equal(result, expected);
  });

  it("should throw error if operation is unknown", async () => {
    const taskService = new TaskService();
    const task = {
      id: "a9335b28-f701-4363-bd1c-846a9d8e33f8",
      operation: "unknown",
      left: 1,
      right: 2,
    };
    assert.throws(() => taskService.calculateTaskResult(task), {
      message: "Unknown operation: unknown",
    })
  });
});
