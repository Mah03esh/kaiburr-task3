/**
 * Represents a single execution of a task command
 */
export interface TaskExecution {
  startTime: string; // ISO date string
  endTime: string;   // ISO date string
  output: string;    // Command output (stdout/stderr)
}

/**
 * Represents a Task object from the backend API
 */
export interface Task {
  id: string;
  name: string;
  owner: string;
  command: string;
  taskExecutions: TaskExecution[];
}

/**
 * DTO for creating a new task
 */
export interface CreateTaskDto {
  name: string;
  owner: string;
  command: string;
}
