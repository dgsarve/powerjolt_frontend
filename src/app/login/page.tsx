'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';

const Login: React.FC = () => {
    const router = useRouter();

    const handleGoogleLoginError = () => {
        console.error('Google Login Error');
    };

    const handleGoogleLoginSuccess = (response: any) => {
        const token = response.credential;
        axios.post('http://localhost:8080/api/auth/google', { token })
            .then(response => {
                const { data } = response;
                localStorage.setItem('token', data.token);
                router.push('/');
            })
            .catch(error => {
                console.error('API Error:', error);
            });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl mb-4">Login</h1>

            <GoogleOAuthProvider clientId="441048547916-hifhc54dcclbil0n6sqr8p062maggk3h.apps.googleusercontent.com">
                <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={handleGoogleLoginError} />
            </GoogleOAuthProvider>
        </div>
    );
};

export default Login;
