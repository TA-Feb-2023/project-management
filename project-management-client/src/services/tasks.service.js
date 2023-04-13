import axios from "axios";

class TasksService {
  constructor() {
    this.api = axios.creste({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005",
    });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  createTask = requestBody => {
    return this.api.post('api/tasks', requestBody)
  }
}

const tasksService = new TasksService()

export default tasksService;
