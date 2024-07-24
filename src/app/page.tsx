'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import Link from "next/link";
import ApiService from "@/app/service/ApiService";
import JoltTemplateComponent from "@/app/components/JoltTemplates";

// Dynamically import components that rely on browser APIs
const HistoryComponent = dynamic(() => import('@/app/components/HistoryComponent'), { ssr: false });
const JSONEditorComponent = dynamic(() => import('@/app/components/JSONEditorComponent'), { ssr: false });

const Page: React.FC = () => {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [profilePictureUrl, setProfilePictureUrl] = useState<string>('');
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
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

    // Use ref to keep track of timeout ID
    const timeoutId = useRef<NodeJS.Timeout | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);

    // Fetch history data
    const fetchHistory = useCallback(async () => {
        try {
            const historyData = await ApiService.fetchHistory();
            setHistory(historyData);
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    }, []);

    // Handle user data and local storage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('name');
            const picture = localStorage.getItem('picture');
            if (token) {
                setUser(username);
                if (picture) {
                    setProfilePictureUrl(picture);
                }
            }
        }
    }, []);

    // Fetch history when sidebar is opened
    useEffect(() => {
        if (isSidebarOpen) {
            fetchHistory();
        }
    }, [isSidebarOpen, fetchHistory]);

    // Handle transformation
    const handleTransform = useCallback(async () => {
        setIsLoading(true);
        try {
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
        } catch (error: any) {
            if (error.response?.status === 401) {
                console.log('User is not authenticated.', error);
            } else {
                setJsonError('Invalid JSON in input or spec');
                setJoltSpecError('Invalid JSON in input or spec');
                setOutputError('Failed to transform data: ' + error.message);
            }
        } finally {
            setIsLoading(false);
        }
    }, [inputJSON, joltSpecJSON, isSidebarOpen]);

    // Handle history selection
    const handleSelectHistory = useCallback((record: any) => {
        setInputJSON(record.inputJson);
        setJoltSpecJSON(record.specJson);
        setOutputJSON(record.outputJson);
    }, []);

    // Toggle sidebar visibility
    const toggleSidebar = useCallback(() => {
        setIsSidebarOpen(prev => !prev);
    }, []);

    // Handle template selection
    const handleSelectTemplate = useCallback((record: any) => {
        setInputJSON(record.inputJson);
        setJoltSpecJSON(record.specJson);
        setOutputJSON(record.outputJson);
    }, []);

    // Handle template menu visibility
    const handleMouseEnter = () => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }
        setShowTemplateMenu(true);
    };

    const handleMouseLeave = () => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }
        timeoutId.current = setTimeout(() => {
            if (menuRef.current && !menuRef.current.matches(':hover')) {
                setShowTemplateMenu(false);
            }
        }, 200);
    };

    return (
        <div className="h-screen flex flex-col text-[6px] font-sans"
             style={{ fontFamily: 'Open Sans, Roboto, sans-serif' }}>
            <div className="flex flex-grow overflow-hidden text-sm bg-gray-50">
                <Script
                    strategy="afterInteractive"
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5750827820025211"
                    crossOrigin="anonymous"
                />
                <ins className="adsbygoogle" data-ad-client="ca-pub-5750827820025211" data-ad-slot="2618506314"
                     data-ad-format="auto" data-full-width-responsive="true"></ins>
                <div
                    className={`transition-all duration-300 ${isSidebarOpen ? 'w-[10%]' : 'w-0'} bg-white p-2 overflow-y-auto border-r border-gray-300 flex flex-col`}>
                    {isSidebarOpen && <HistoryComponent onSelect={handleSelectHistory} />}
                </div>
                <div className="flex-grow flex">
                    <div className="w-1/3 bg-white p-2 overflow-y-auto border-r border-gray-300 flex flex-col">
                        <div className="flex items-center bg-gray-100 p-1 rounded-t border-b border-gray-300">
                            <div className="flex-grow flex justify-start">
                                <h2 className="text-base font-semibold text-gray-700">Input JSON</h2>
                            </div>
                            <div className="flex-grow flex justify-center relative"
                                 onMouseEnter={handleMouseEnter}
                                 onMouseLeave={handleMouseLeave}>
                                <Link href="#" className="text-base font-semibold text-gray-700">Templates</Link>
                                {showTemplateMenu && (
                                    <div
                                        ref={menuRef}
                                        className="absolute bg-white text-black border border-gray-300 mt-1 p-2 w-48 z-10">
                                        <JoltTemplateComponent onSelect={handleSelectTemplate} />
                                    </div>
                                )}
                            </div>
                            <div className="flex-grow flex justify-end">
                                <button
                                    className={`font-bold py-1 px-3 rounded ${isSidebarOpen ? 'bg-gray-600 text-white' : 'bg-gray-300 text-black'}`}
                                    onClick={toggleSidebar}>
                                    {isSidebarOpen ? 'Hide History' : 'Show History'}
                                </button>
                            </div>
                        </div>
                        <div className="flex-grow flex flex-col">
                            <JSONEditorComponent value={inputJSON} onChange={setInputJSON} errorMessage={jsonError} />
                        </div>
                    </div>
                    <div className="w-1/3 bg-white p-2 overflow-y-auto border-r border-gray-300 flex flex-col">
                        <div className="bg-gray-100 p-1 rounded-t border-b border-gray-300 flex items-center">
                            <h2 className="text-base font-semibold text-gray-700 flex-grow">Jolt Spec</h2>
                            <button
                                className="ml-2 bg-green-500 text-white font-bold py-1 px-3 rounded hover:bg-green-600 relative"
                                disabled={true}>
                                AI Spec (Next release)
                            </button>
                        </div>
                        <div className="flex-grow flex flex-col">
                            <JSONEditorComponent value={joltSpecJSON} onChange={setJoltSpecJSON}
                                                 errorMessage={joltSpecError} />
                        </div>
                    </div>
                    <div className="w-1/3 bg-white p-2 overflow-y-auto flex flex-col">
                        <div className="bg-gray-100 p-1 rounded-t border-b border-gray-300 flex items-center">
                            <h2 className="text-base font-semibold text-gray-700 flex-grow">Transformed Output</h2>
                            {isLoading ? (
                                <div className="ml-2 bg-blue-500 text-white font-bold py-1 px-3 rounded hover:bg-blue-600">Loading...</div>
                            ) : (
                                <button
                                    className="ml-2 bg-blue-500 text-white font-bold py-1 px-3 rounded hover:bg-blue-600"
                                    onClick={handleTransform}>
                                    Transform Data
                                </button>
                            )}
                        </div>
                        <div className="flex-grow flex flex-col">
                            <JSONEditorComponent value={outputJSON} onChange={setOutputJSON}
                                                 errorMessage={outputError} />
                        </div>
                    </div>
                </div>
            </div>
            <Script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
                    id="adsbygoogle-inline-script"></Script>
        </div>
    );
};

export default Page;
