import axios from 'axios';

// Define your base URL for API requests
const baseURL = 'http://localhost:8080';

// Create Axios instance with base URL
const axiosInstance = axios.create({
    baseURL,
    timeout: 10000, // Adjust timeout as needed
});

// Add interceptor for requests
axiosInstance.interceptors.request.use(
    config => {
        // Get the token from localStorage
        const token = localStorage.getItem('token');
        if (token) {
            // Add Authorization header
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Add interceptor for responses
axiosInstance.interceptors.response.use(
    response => {
        // Return the response data if successful
        return response;
    },
    error => {
        // Handle errors globally
        if (error.response && error.response.status === 401) {
            // Handle unauthorized error (e.g., redirect to login)
            console.log('User is not authenticated. Redirecting to login page...');
            // Uncomment the following line if using a traditional approach to redirect
            // window.location.href = '/login';
        }

        // Return the error to the calling function
        return Promise.reject(error);
    }
);

export default axiosInstance;
