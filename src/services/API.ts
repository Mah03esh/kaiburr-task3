import axios from 'axios';
import { Task, CreateTaskDto } from '../models/Task';

// Base URL for the backend API
const API_BASE_URL = 'http://localhost:8080/api/tasks';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * API service for interacting with the Task Management backend
 */
export const TaskAPI = {
  /**
   * Fetch all tasks
   * GET /api/tasks
   */
  fetchTasks: async (): Promise<Task[]> => {
    const response = await apiClient.get<Task[]>('');
    return response.data;
  },

  /**
   * Search tasks by name
   * GET /api/tasks/find?name={searchTerm}
   */
  searchTasksByName: async (searchTerm: string): Promise<Task[]> => {
    const response = await apiClient.get<Task[]>('/find', {
      params: { name: searchTerm },
    });
    return response.data;
  },

  /**
   * Get a single task by ID
   * GET /api/tasks?id={id}
   */
  getTaskById: async (id: string): Promise<Task> => {
    const response = await apiClient.get<Task>('', {
      params: { id },
    });
    return response.data;
  },

  /**
   * Create a new task
   * PUT /api/tasks
   */
  createTask: async (taskData: CreateTaskDto): Promise<Task> => {
    const response = await apiClient.put<Task>('', taskData);
    return response.data;
  },

  /**
   * Delete a task by ID
   * DELETE /api/tasks/{id}
   */
  deleteTask: async (id: string): Promise<void> => {
    await apiClient.delete(`/${id}`);
  },

  /**
   * Execute a task command
   * PUT /api/tasks/execute/{id}
   */
  runTask: async (id: string): Promise<Task> => {
    const response = await apiClient.put<Task>(`/execute/${id}`);
    return response.data;
  },
};
