'use client';
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import LoginDialog from "@/app/components/LoginDialog";

const Header: React.FC = () => {
    const router = useRouter();
    const [showTemplateMenu, setShowTemplateMenu] = useState<boolean>(false);
    const [profilePictureUrl, setProfilePictureUrl] = useState<string>('');
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
    const [showLoginDialog, setShowLoginDialog] = useState<boolean>(false);
    const [user, setUser] = useState<string | null>(null);

    // Check authentication status on component mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('name');
        const picture = localStorage.getItem('picture');

        if (token && username) {
            setUser(username);
            setProfilePictureUrl(picture || '');
        } else {
            setUser(null);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('picture');
        setUser(null);
        setProfilePictureUrl('');
        router.push('/');
        // Refresh the page to ensure all states and components are reinitialized
        window.location.reload();
    };

    const openLoginDialog = () => {
        setShowLoginDialog(true);
    };

    const closeLoginDialog = () => {
        setShowLoginDialog(false);
    };

    const handleLoginSuccess = () => {
        // After successful login, update user state based on local storage
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('name');
        const picture = localStorage.getItem('picture');

        if (token && username) {
            setUser(username);
            setProfilePictureUrl(picture || '');
        }
        closeLoginDialog(); // Close dialog after successful login
    };

    return (
        <div className="bg-blue-600 text-white p-2 flex justify-between items-center shadow-md">
            <div className="flex space-x-8 text-sm">
                {/* Additional Navigation Links */}
                <div>
                    <Link href="/" className="text-gray-200 hover:underline">Home</Link>
                </div>
                <div>
                    <Link href="/documentation" className="text-gray-200 hover:underline">Documentation</Link>
                </div>
                <div>
                    <Link href="/architecture" className="text-gray-200 hover:underline">Spring Architecture</Link>
                </div>
                <div>
                    <Link href="/guide" className="text-gray-200 hover:underline">Getting Started</Link>
                </div>
                <div>
                    <Link href="/privacy" className="text-gray-200 hover:underline">Privacy</Link>
                </div>
                <div>
                    <Link href="/about" className="text-gray-200 hover:underline">About</Link>
                </div>
                <div>
                    <Link href="/contact" className="text-gray-200 hover:underline">Contact</Link>
                </div>
            </div>

            <div className="flex space-x-4 text-sm ml-auto items-center">
                {user ? (
                    <>
                        <span className="text-gray-200 mr-2">Welcome, {user}</span>
                        {profilePictureUrl && (
                            <img
                                src={profilePictureUrl}
                                alt=""
                                className="w-6 h-6 rounded-full"
                            />
                        )}
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white font-bold py-1 px-3 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <button onClick={openLoginDialog} className="hover:underline focus:outline-none">
                        Login
                    </button>
                )}

                {/* Login Dialog */}
                {showLoginDialog && (
                    <LoginDialog onSuccessLogin={handleLoginSuccess} onClose={closeLoginDialog}/>
                )}
                <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>

            </div>
        </div>
    );
};

export default Header;
