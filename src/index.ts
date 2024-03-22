import IncorrectResultException from "./eceptions/incorrectResultException.js";
import TaskController from "./http/controllers/taskController.js";
import Task from "./types/task.js";

const THROTTLING_DELAY = 5000;

let totalTasks = 0;
let totalTasksSubmitted = 0;
let totalTasksFailed = 0;

const taskController = new TaskController();

console.log("Hello ADP Ventures!");

/**
 * Returns a timestamp for logging purposes.
 */
const getTimestamp = () => new Date().toLocaleString();

/**
 * Fetches a task from the interview API and calls submitTask.
 */
const processTasks = async () => {
  try {
    const task = await taskController.getTask();
    console.log(`[${getTimestamp()}] Task ID: ${task.id}, Operation: ${task.operation}, Left: ${task.left}, Right: ${task.right}`);
    totalTasks++;

    await submitTask(task);
  } catch (error: unknown) {
    console.log(`[${getTimestamp()}] Error fetching task: ${(error as Error).message}`);
  }
};

/**
 * Submits a task to the interview API
 *
 * @param task Task
 */
const submitTask = async (task: Task) => {
  try {
    const response = await taskController.submitTask(task);
    totalTasksSubmitted++;
    console.log(`[${getTimestamp()}] Submitted result is correct: ${response.result}`);
  } catch (error: unknown) {
    totalTasksFailed++;
    if (error instanceof IncorrectResultException) {
      console.log(`[${getTimestamp()}] Submitted failed for task ${task.id}: ${error.message}`);
    } else {
      console.log(`[${getTimestamp()}] Error submitting task: ${(error as Error).message}`);
    }
  }
};

setInterval(async () => {
  await processTasks();
}, THROTTLING_DELAY);

// Handle ctrl+c to print task statistics before exiting
process.on('SIGINT', () => {
  console.log('\n\nTask Statistics:');
  console.log(`Total Tasks Fetched: ${totalTasks}`);
  console.log(`Total Tasks Submitted: ${totalTasksSubmitted}`);
  console.log(`Total Tasks Failed: ${totalTasksFailed}`);
  process.exit();
});
