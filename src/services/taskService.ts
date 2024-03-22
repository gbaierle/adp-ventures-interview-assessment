import Task from "../types/task.js";

export default class TaskService {

  /**
   * Calculates the result of a task based on the operation.
   *
   * @param task Task
   * @returns number
   */
  calculateTaskResult(task: Task): number {

    switch (task.operation) {
      case "addition":
        return task.left + task.right;

      case "subtraction":
        return task.left - task.right;

      case "multiplication":
        return task.left * task.right;

      case "division":
        return task.left / task.right;

      case "remainder":
        return task.left % task.right;

      default:
        throw new Error(`Unknown operation: ${task.operation}`);
    }
  }
}
