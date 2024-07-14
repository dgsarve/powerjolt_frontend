import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { XMarkIcon } from "@heroicons/react/16/solid";
import axiosInstance from "@/app/service/ApiInterceptor";
interface LoginDialogProps {
    onSuccessLogin: (token: string) => void;
    onClose: () => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ onSuccessLogin, onClose }) => {
    const handleGoogleLoginError = () => {
        console.error('Google Login Error');
    };

    const handleGoogleLoginSuccess = (response: any) => {
        const token = response.credential;
        axiosInstance.post('/api/auth/google', { token })
            .then(response => {
                const { data } = response;
                localStorage.setItem('token', data.token);
                localStorage.setItem('name', data.username);
                localStorage.setItem('picture', data.profilepic);
                onSuccessLogin(data.token); // Notify parent component of successful login
                onClose(); // Close the dialog
            })
            .catch(error => {
                console.error('API Error:', error);
            });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg relative">
                {/* Close Button */}
                <button
                    className="absolute top-0 right-0 m-3 p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                    onClick={onClose}
                >
                    <XMarkIcon className="h-6 w-6 text-gray-600" aria-hidden="true" />
                </button>

                {/* Login Content */}
                <div className="flex flex-col items-center">
                    <h1 className="text-4xl mb-4 text-blue-600 font-bold">Login</h1>
                    <GoogleOAuthProvider clientId="441048547916-hifhc54dcclbil0n6sqr8p062maggk3h.apps.googleusercontent.com">
                        <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={handleGoogleLoginError} />
                    </GoogleOAuthProvider>
                </div>
            </div>
        </div>
    );
};

export default LoginDialog;
