'use client';
import React from 'react';

const JoltDocumentationPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-semibold mb-4 text-center">Contact Us</h1>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">You can reach us at:</p>
                    <a href="mailto:thinkcloudmasters@gmail.com" className="text-blue-500">
                        thinkcloudmasters@gmail.com
                    </a>
                </div>
            </div>
        </div>
    );
};

export default JoltDocumentationPage;
