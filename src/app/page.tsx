"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import HistoryComponent from "@/app/component/HistoryComponent";
import JSONEditorComponent from "@/app/component/JSONEditorComponent";
import AdModal from "@/app/component/AdModal";

const Page: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
    const [jsonError, setJsonError] = useState<string>('');
    const [joltSpecError, setJoltSpecError] = useState<string>('');
    const [outputError, setOutputError] = useState<string>('');
    const [isAdComplete, setIsAdComplete] = useState<boolean>(false);
    const [inputJSON, setInputJSON] = useState<string>('');
    const [joltSpecJSON, setJoltSpecJSON] = useState<string>('');
    const [outputJSON, setOutputJSON] = useState<string>('');

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="h-screen flex flex-col text-xs font-sans">
            {!isAdComplete && <AdModal onAdComplete={() => setIsAdComplete(true)} />}

            {isAdComplete && (
                <>
                    <div className="bg-blue-600 text-white p-2 flex justify-between items-center shadow-md">
                        <div className="flex space-x-4 text-sm">
                            <Link href="#" onClick={toggleSidebar} className="text-gray-200 hover:underline">
                                {isSidebarOpen ? 'Hide History' : 'Show History'}
                            </Link>
                            <Link href="/springboot" className="hover:underline">
                                Spring Boot Example
                            </Link>
                            <Link href="/architectexample" className="hover:underline">
                                Architecture Example
                            </Link>
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
                            <div className="w-1/3 bg-white p-4 overflow-y-auto border-r border-gray-300 flex flex-col">
                                <div className="bg-gray-100 p-2 rounded-t border-b border-gray-300">
                                    <h2 className="text-base font-semibold text-gray-700 flex-grow">Input JSON</h2>
                                </div>
                                <div className="flex-grow flex flex-col">
                                    <JSONEditorComponent
                                        value={inputJSON}
                                        onChange={setInputJSON}
                                        errorMessage={jsonError}
                                    />
                                </div>
                            </div>
                            <div className="w-1/3 bg-white p-4 overflow-y-auto border-r border-gray-300 flex flex-col">
                                <div className="bg-gray-100 p-2 rounded-t border-b border-gray-300">
                                    <h2 className="text-base font-semibold text-gray-700 flex-grow">JSON Jolt Spec</h2>
                                </div>
                                <div className="flex-grow flex flex-col">
                                    <JSONEditorComponent
                                        value={joltSpecJSON}
                                        onChange={setJoltSpecJSON}
                                        errorMessage={joltSpecError}
                                    />
                                </div>
                            </div>
                            <div className="w-1/3 bg-white p-4 overflow-y-auto flex flex-col">
                                <div className="bg-gray-100 p-2 rounded-t border-b border-gray-300">
                                    <h2 className="text-base font-semibold text-gray-700 flex-grow">Jolt Transformed Output</h2>
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

                    <footer className="bg-blue-600 text-white p-2 text-center text-xs">
                        © {new Date().getFullYear()} Magnasha. All rights reserved.
                    </footer>
                </>
            )}
        </div>
    );
};

export default Page;
