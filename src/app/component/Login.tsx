'use client';
import React from 'react';
import { useRouter } from 'next/router';
import { GoogleLogin } from '@react-oauth/google';

const Login: React.FC = () => {
    const router = useRouter();

    const handleGoogleLoginSuccess = (response: any) => {
        console.log('Google Login Success:', response);
        router.push('/'); // Redirect to home page after successful login
    };

    const handleGoogleLoginError = () => {
        console.error('Google Login Error');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl mb-4">Login</h1>
            <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={handleGoogleLoginError} />
        </div>
    );
};

export default Login;
