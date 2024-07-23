'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import JoltTemplateComponent from '@/app/components/JoltTemplates';

interface HeaderProps {
    user: any;
    profilePictureUrl: string;
    handleLogout: () => void;
    openLoginDialog: () => void;
    handleSelectTemplate: (record: any) => void;
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({
                                           user,
                                           profilePictureUrl,
                                           handleLogout,
                                           openLoginDialog,
                                           handleSelectTemplate,
                                           isSidebarOpen,
                                           toggleSidebar,
                                       }) => {
    const [showTemplateMenu, setShowTemplateMenu] = useState<boolean>(false);
    let timeoutId: NodeJS.Timeout;

    return (
        <div className="bg-blue-600 text-white p-2 flex justify-between items-center shadow-md">
            <div className="flex space-x-8 text-sm">
                <div>
                    <Link href="#" onClick={toggleSidebar} className="text-gray-200 hover:underline">
                        {isSidebarOpen ? 'Hide History' : 'Show History'}
                    </Link>
                </div>
                <div
                    className="relative"
                    onMouseEnter={() => {
                        clearTimeout(timeoutId);
                        setShowTemplateMenu(true);
                    }}
                    onMouseLeave={() => {
                        timeoutId = setTimeout(() => {
                            setShowTemplateMenu(false);
                        }, 200);
                    }}
                >
                    <Link href="#" className="text-gray-200 hover:underline">
                        Templates
                    </Link>
                    {showTemplateMenu && (
                        <div className="absolute right-0 bg-white text-black border border-gray-300 mt-1 p-2 w-48 z-10">
                            <JoltTemplateComponent onSelect={handleSelectTemplate} />
                        </div>
                    )}
                </div>
            </div>

            <div className="flex space-x-4 text-sm ml-auto items-center">
                <div>
                    <Link href="https://medium.com/@thinkcloudmasters/integrating-jolt-with-spring-boot-for-json-transformation-bd414a1080d1" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:underline">
                        Spring Boot Example
                    </Link>
                </div>

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
            </div>
        </div>
    );
};

export default Header;
