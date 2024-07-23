'use client';
import React from 'react';

const AboutUs: React.FC = () => {
    return (
        <div className="h-screen flex flex-col text-sm font-sans p-4 bg-gray-50 text-gray-800" style={{ fontFamily: 'Open Sans, Roboto, sans-serif' }}>
            <h1 className="text-2xl font-bold mb-4 text-blue-600">About Us</h1>
            <p className="mb-4">
                This application is a hobby project developed by a dedicated developer. It features a backend built with <strong>Spring WebFlux</strong> and a frontend developed using <strong>ReactJS</strong> with <strong>Next.js</strong>. The transformation capabilities are powered by <a href="https://github.com/bazaarvoice/jolt" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Jolt</a>, and the app is hosted on <strong>Azure Web Apps</strong>.
            </p>
            <h2 className="text-xl font-semibold mb-2 text-blue-600">Main Purpose</h2>
            <p className="mb-4">
                This platform allows you to experiment with Jolt transformations directly online, eliminating the need to download or run any Java code to test them.
            </p>
            <h2 className="text-xl font-semibold mb-2 text-blue-600">Technologies Used</h2>
            <ul className="list-disc list-inside mb-4">
                <li><strong>Backend:</strong> Spring WebFlux</li>
                <li><strong>Frontend:</strong> ReactJS, Next.js</li>
                <li><strong>Transformation Engine:</strong> <a href="https://github.com/bazaarvoice/jolt" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Jolt</a></li>
                <li><strong>Hosting:</strong> Azure Web Apps</li>
            </ul>
        </div>
    );
};

export default AboutUs;
