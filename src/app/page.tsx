'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import HistoryComponent from '@/app/components/HistoryComponent';
import AdModal from '@/app/components/AdModal';
import dynamic from 'next/dynamic';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from "@/app/service/ApiInterceptor";
import ApiService from "@/app/service/ApiService";

const JSONEditorComponent = dynamic(() => import('@/app/component/JSONEditorComponent'), { ssr: false });

const Page: React.FC = () => {
    const router = useRouter();
    const [user, setUser] = useState<any>(null); // State to hold user information
    const [profilePictureUrl, setProfilePictureUrl] = useState<string>(''); // State to hold profile picture URL
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
    const [jsonError, setJsonError] = useState<string>('');
    const [joltSpecError, setJoltSpecError] = useState<string>('');
    const [outputError, setOutputError] = useState<string>('');
    const [isAdComplete, setIsAdComplete] = useState<boolean>(false);
    const [inputJSON, setInputJSON] = useState<string>('');
    const [joltSpecJSON, setJoltSpecJSON] = useState<string>('');
    const [outputJSON, setOutputJSON] = useState<string>('');

    useEffect(() => {
        // Check if user is logged in (using stored JWT token)
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken: any = jwtDecode(token);
            console.log(decodedToken)
            setUser(decodedToken); // Set user details from decoded token
            // Example: Set profile picture if available in token
            if (decodedToken.picture) {
                setProfilePictureUrl(decodedToken.picture);
            }
        }
    }, []);

    const handleLogout = () => {
        // Clear user data and JWT token from local storage
        localStorage.removeItem('token');
        setUser(null);
        setProfilePictureUrl('');
        // Redirect to login page after logout
        router.push('/');
    };

    const handleTransform = async () => {
        console.log('--------------');
        try {
            console.log('--------aaaa------');
            console.log(inputJSON);
            console.log(joltSpecJSON);

            const inputJsonParsed = JSON.parse(inputJSON);
            const joltSpecJsonParsed = JSON.parse(joltSpecJSON);

            // Prepare the request object
            const request = {
                inputJson: inputJSON,
                specJson: joltSpecJSON
            };

            // Call the backend using the ApiService
            const result = await ApiService.transform(request);

            setOutputJSON(JSON.stringify(result, null, 2));
            setJsonError('');
            setJoltSpecError('');
            setOutputError('');
        } catch (error) {
            if (error) {
                // Handle unauthorized error
                console.log('User is not authenticated. Redirecting to login page...');
            } else if (error instanceof SyntaxError) {
                setJsonError('Invalid JSON in input or spec');
                setJoltSpecError('Invalid JSON in input or spec');
            } else {
                setOutputError('Failed to transform data: '+error );
            }
        }
    };

    const handleSpecAction = () => {
        // Define the action for the new button here
        console.log('Spec Action button clicked');
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="h-screen flex flex-col text-[6px] font-sans" style={{ fontFamily: 'Open Sans, Roboto, sans-serif' }}>
            {!isAdComplete && <AdModal onAdComplete={() => setIsAdComplete(true)} />}

            {isAdComplete && (
                <>
                    <div className="bg-blue-600 text-white p-2 flex justify-between items-center shadow-md">
                        <div className="flex space-x-4 text-sm">
                            <Link href="#" onClick={toggleSidebar} className="text-gray-200 hover:underline">
                                {isSidebarOpen ? 'Hide History' : 'Show History'}
                            </Link>
                        </div>
                        <div className="flex space-x-4 text-sm ml-auto items-center">
                            <Link href="/springboot" className="hover:underline">
                                Spring Boot Example
                            </Link>
                            <Link href="/architectexample" className="hover:underline">
                                Architecture Example
                            </Link>
                            {user ? (
                                <>
                                    <span className="text-gray-200 mr-2">Welcome, {user.name}</span>
                                    {profilePictureUrl && (
                                        <img
                                            src={profilePictureUrl}
                                            alt="Profile"
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
                                <Link href="/login" className="hover:underline">
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-grow overflow-hidden text-sm bg-gray-50">
                        <div
                            className={`transition-all duration-300 ${
                                isSidebarOpen ? 'w-1/4' : 'w-0'
                            } bg-white p-2 overflow-y-auto border-r border-gray-300 flex flex-col`}
                        >
                            {isSidebarOpen && <HistoryComponent />}
                        </div>

                        <div className="w-full flex">
                            <div className="w-1/3 bg-white p-2 overflow-y-auto border-r border-gray-300 flex flex-col">
                                <div className="bg-gray-100 p-1 rounded-t border-b border-gray-300">
                                    <h2 className="text-base font-semibold text-gray-700 flex-grow">
                                        Input JSON
                                    </h2>
                                </div>
                                <div className="flex-grow flex flex-col">
                                    <JSONEditorComponent
                                        value={inputJSON}
                                        onChange={setInputJSON}
                                        errorMessage={jsonError}
                                    />
                                </div>
                            </div>
                            <div className="w-1/3 bg-white p-2 overflow-y-auto border-r border-gray-300 flex flex-col">
                                <div className="bg-gray-100 p-1 rounded-t border-b border-gray-300 flex items-center">
                                    <h2 className="text-base font-semibold text-gray-700 flex-grow">
                                        JSON Jolt Spec
                                    </h2>
                                    <button
                                        className="ml-2 bg-green-500 text-white font-bold py-1 px-3 rounded hover:bg-green-600"
                                        onClick={handleSpecAction}
                                    >
                                        AI Spec
                                    </button>
                                </div>
                                <div className="flex-grow flex flex-col">
                                    <JSONEditorComponent
                                        value={joltSpecJSON}
                                        onChange={setJoltSpecJSON}
                                        errorMessage={joltSpecError}
                                    />
                                </div>
                            </div>
                            <div className="w-1/3 bg-white p-2 overflow-y-auto flex flex-col">
                                <div className="bg-gray-100 p-1 rounded-t border-b border-gray-300 flex items-center">
                                    <h2 className="text-base font-semibold text-gray-700 flex-grow">
                                        Jolt Transformed Output
                                    </h2>
                                    <button
                                        className="ml-2 bg-blue-500 text-white font-bold py-1 px-3 rounded hover:bg-blue-600"
                                        onClick={handleTransform}
                                    >
                                        Transform Data
                                    </button>
                                </div>
                                <div className="flex-grow flex flex-col">
                                    <JSONEditorComponent
                                        value={outputJSON}
                                        onChange={setOutputJSON}
                                        errorMessage={outputError}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <footer className="bg-blue-600 text-white p-2 text-center text-[10px]">
                        © {new Date().getFullYear()} Magnasha. All rights reserved.
                    </footer>
                </>
            )}
        </div>
    );
};

export default Page;
