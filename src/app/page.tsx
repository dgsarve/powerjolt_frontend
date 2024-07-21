'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import HistoryComponent from '@/app/components/HistoryComponent';
import ApiService from '@/app/service/ApiService';
import LoginDialog from "@/app/components/LoginDialog";
import JoltTemplateComponent from "@/app/components/JoltTemplates";

const JSONEditorComponent = dynamic(() => import('@/app/components/JSONEditorComponent'), { ssr: false });

const Page: React.FC = () => {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [profilePictureUrl, setProfilePictureUrl] = useState<string>('');
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
    const [isTemplateSidebarOpen, setIsTemplateSidebarOpen] = useState<boolean>(true);
    const [jsonError, setJsonError] = useState<string>('');
    const [joltSpecError, setJoltSpecError] = useState<string>('');
    const [outputError, setOutputError] = useState<string>('');
    const [inputJSON, setInputJSON] = useState<string>('');
    const [joltSpecJSON, setJoltSpecJSON] = useState<string>('');
    const [outputJSON, setOutputJSON] = useState<string>('');
    const [history, setHistory] = useState<any[]>([]);
    const [showLoginDialog, setShowLoginDialog] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showTemplateMenu, setShowTemplateMenu] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('name');
        const picture: any = localStorage.getItem('picture');
        if (token) {
            setUser(username);
            setProfilePictureUrl(picture);
        }
    }, []);

    useEffect(() => {
        if (isSidebarOpen) {
            fetchHistory();
        }
    }, [isSidebarOpen]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('picture');
        setUser(null);
        setProfilePictureUrl('');
        router.push('/');
    };

    const handleTransform = async () => {
        setIsLoading(true);
        try {
            const inputJsonParsed = JSON.parse(inputJSON);
            const joltSpecJsonParsed = JSON.parse(joltSpecJSON);

            const request = {
                inputJson: inputJSON,
                specJson: joltSpecJSON
            };

            const result = await ApiService.transform(request);

            setOutputJSON(JSON.stringify(result, null, 2));
            setJsonError('');
            setJoltSpecError('');
            setOutputError('');

            if (isSidebarOpen) {
                setIsSidebarOpen(false);
            }
        } catch (error) {
            if (error) {
                console.log('User is not authenticated.' + error);
            } else {
                setJsonError('Invalid JSON in input or spec');
                setJoltSpecError('Invalid JSON in input or spec');
                setOutputError('Failed to transform data: ' + error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const fetchHistory = async () => {
        try {
            const history = await ApiService.fetchHistory();
            setHistory(history);
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    };

    const handleSelectHistory = (record: any) => {
        setInputJSON(record.inputJson);
        setJoltSpecJSON(record.specJson);
        setOutputJSON(record.outputJson);
    };

    const handleSelectTemplate = (record: any) => {
        setInputJSON(record.inputJson);
        setJoltSpecJSON(record.specJson);
        setOutputJSON(record.outputJson);
    };

    const handleSpecAction = () => {
        console.log('Spec Action button clicked');
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const toggleTemplateSidebar = () => {
        setIsTemplateSidebarOpen(!isTemplateSidebarOpen);
    };

    const openLoginDialog = () => {
        setShowLoginDialog(true);
    };

    const closeLoginDialog = () => {
        setShowLoginDialog(false);
    };

    const handleLoginSuccess = () => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('name');
        const picture: any = localStorage.getItem('picture');
        if (token) {
            setUser(username);
            setProfilePictureUrl(picture);
        }
    };

    return (
        <div className="h-screen flex flex-col text-[6px] font-sans"
             style={{ fontFamily: 'Open Sans, Roboto, sans-serif' }}>


                    <div className="bg-blue-600 text-white p-2 flex justify-between items-center shadow-md">
                        <div className="flex space-x-8 text-sm">
                            <div>
                                <Link href="#" onClick={toggleSidebar} className="text-gray-200 hover:underline">
                                    {isSidebarOpen ? 'Hide History' : 'Show History'}
                                </Link>
                            </div>

                            <div>
                                <Link href="https://medium.com/@thinkcloudmasters/integrating-jolt-with-spring-boot-for-json-transformation-bd414a1080d1" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:underline">
                                    Spring Boot Example
                                </Link>
                            </div>
                            <div
                                className="relative"
                                onMouseEnter={() => setShowTemplateMenu(true)}
                                onMouseLeave={() => setShowTemplateMenu(false)}
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

                    <div className="flex flex-grow overflow-hidden text-sm bg-gray-50">

                        <div
                            className={`transition-all duration-300 ${isSidebarOpen ? 'w-[10%]' : 'w-0'} bg-white p-2 overflow-y-auto border-r border-gray-300 flex flex-col`}>
                            {isSidebarOpen && <HistoryComponent onSelect={handleSelectHistory}/>}
                        </div>

                        <div className="flex-grow flex">
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
                                        Jolt Spec
                                    </h2>
                                    <button
                                        className="ml-2 bg-green-500 text-white font-bold py-1 px-3 rounded hover:bg-green-600 relative"
                                        disabled={true}
                                        style={{position: 'relative'}}
                                    >
                                        AI Spec (Next release)
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
                                        Transformed Output
                                    </h2>
                                    {isLoading ? (
                                        <div className="ml-2 bg-blue-500 text-white font-bold py-1 px-3 rounded hover:bg-blue-600">
                                            Loading...
                                        </div>
                                    ) : (
                                        <button
                                            className="ml-2 bg-blue-500 text-white font-bold py-1 px-3 rounded hover:bg-blue-600"
                                            onClick={handleTransform}
                                        >
                                            Transform Data
                                        </button>
                                    )}
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

                    {/* Login Dialog */}
                    {showLoginDialog && (
                        <LoginDialog onSuccessLogin={handleLoginSuccess} onClose={closeLoginDialog}/>
                    )}

        </div>
    );
};

export default Page;