/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        REACT_APP_API_URL: process.env.REACT_APP_API_URL
    }
};

if (typeof self === 'undefined') {
    global.self = global;
}

export default nextConfig;
