'use client';
import React, {useState, useEffect} from 'react';
import dynamic from 'next/dynamic';
import {useRouter} from 'next/navigation';
import HistoryComponent from '@/app/components/HistoryComponent';
import ApiService from '@/app/service/ApiService';
import LoginDialog from "@/app/components/LoginDialog";
import JSONEditorComponent from '@/app/components/JSONEditorComponent';
import Header from '@/app/components/Header';
import Link from "next/link";
import JoltTemplateComponent from "@/app/components/JoltTemplates";

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
    let timeoutId: NodeJS.Timeout;

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

    const handleSpecAction = () => {
        console.log('Spec Action button clicked');
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };


    const handleSelectTemplate = (record: any) => {
        setInputJSON(record.inputJson);
        setJoltSpecJSON(record.specJson);
        setOutputJSON(record.outputJson);
    };

    return (
        <div className="h-screen flex flex-col text-[6px] font-sans"
             style={{fontFamily: 'Open Sans, Roboto, sans-serif'}}>

            <div className="flex flex-grow overflow-hidden text-sm bg-gray-50">
                <script async
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5750827820025211"
                        crossOrigin="anonymous"></script>
                <ins className="adsbygoogle"
                     data-ad-client="ca-pub-5750827820025211"
                     data-ad-slot="2618506314"
                     data-ad-format="auto"
                     data-full-width-responsive="true"></ins>
                <script>
                    (adsbygoogle = window.adsbygoogle || []).push({});
                </script>
                <div
                    className={`transition-all duration-300 ${isSidebarOpen ? 'w-[10%]' : 'w-0'} bg-white p-2 overflow-y-auto border-r border-gray-300 flex flex-col`}>
                    {isSidebarOpen && <HistoryComponent onSelect={handleSelectHistory}/>}
                </div>

                <div className="flex-grow flex">
                    <div className="w-1/3 bg-white p-2 overflow-y-auto border-r border-gray-300 flex flex-col">
                        <div className="flex items-center bg-gray-100 p-1 rounded-t border-b border-gray-300">
                            <div className="flex-grow flex justify-start">
                                <h2 className="text-base font-semibold text-gray-700">
                                    Input JSON
                                </h2>
                            </div>

                            <div className="flex-grow flex justify-center relative"
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
                                <Link href="#" className="text-base font-semibold text-gray-700">
                                    Templates
                                </Link>
                                {showTemplateMenu && (
                                    <div
                                        className="absolute bg-white text-black border border-gray-300 mt-1 p-2 w-48 z-10">
                                        <JoltTemplateComponent onSelect={handleSelectTemplate}/>
                                    </div>
                                )}
                            </div>

                            <div className="flex-grow flex justify-end">
                                <button
                                    className={`font-bold py-1 px-3 rounded ${isSidebarOpen ? 'bg-gray-600 text-white' : 'bg-gray-300 text-black'}`}
                                    onClick={toggleSidebar}
                                >
                                    {isSidebarOpen ? 'Hide History' : 'Show History'}
                                </button>
                            </div>
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
                                <div
                                    className="ml-2 bg-blue-500 text-white font-bold py-1 px-3 rounded hover:bg-blue-600">
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

            <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        </div>
    )
        ;
};

export default Page;
