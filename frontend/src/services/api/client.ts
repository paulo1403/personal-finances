import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token JWT
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  // Solo agregar header si el token existe
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    // Eliminar header Authorization si existe pero no hay token
    delete config.headers.Authorization;
  }
  return config;
});

// Interceptor para manejar errores 401
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Solo redirigir a login si:
    // 1. El error es 401
    // 2. NO es una ruta de autenticación (/auth/*)
    // 3. Hay un token almacenado (significa que estaba autenticado)
    if (error.response?.status === 401) {
      const isAuthRoute = error.config?.url?.includes('/auth/');
      const hasToken = localStorage.getItem('token');

      // Si NO es ruta de auth y hay token almacenado, el token expiró
      if (!isAuthRoute && hasToken) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
