import axios from 'axios';

// Define your base URL for API requests
const baseURL = 'http://localhost:8080';


// Define your x-api-key
const apiKey = 'testapikey'; // Replace with your actual x-api-key

// Create Axios instance with base URL
const axiosInstance = axios.create({
    baseURL,
    timeout: 10000, // Adjust timeout as needed
});

// Add interceptor for requests
axiosInstance.interceptors.request.use(
    config => {
        // Modify request config before sending
        // Example: Add x-api-key header
        config.headers['x-api-key'] = apiKey;
        return config;
    },
    error => {
        if (error.response.status === 401) {
            // Redirect to login page or show login form
            console.log('User is not authenticated. Redirecting to login page...');
            // Example redirection using React Router
        }
    }
);

export default axiosInstance;
