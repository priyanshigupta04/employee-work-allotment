import axios from 'axios';
//  const API_BASE_URL = import.meta.env.PROD 
//    ? 'https://your-backend-app.vercel.app/api'
//    : 'http://localhost:5000/api';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});



// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
};

export const adminAPI = {
  getUsers: () => api.get('/admin/users'),
  createUser: (userData) => api.post('/admin/users', userData),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
};

export const managerAPI = {
  getTasks: () => api.get('/manager/tasks'),
  createTask: (taskData) => api.post('/manager/tasks', taskData),
  updateTaskProgress: (id, progress) => api.put(`/manager/tasks/${id}/progress`, { progress }),
  getEmployees: () => api.get('/manager/employees'),
};

export const employeeAPI = {
  getTasks: () => api.get('/employee/tasks'),
  updateTaskProgress: (id, progress) => api.put(`/employee/tasks/${id}/progress`, { progress }),
};

export default api;