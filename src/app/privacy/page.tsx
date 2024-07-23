'use client';
import React from 'react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="h-screen flex flex-col text-sm font-sans p-4 bg-gray-50 text-gray-800" style={{ fontFamily: 'Open Sans, Roboto, sans-serif' }}>
            <h1 className="text-2xl font-bold mb-4 text-blue-600">Privacy Policy</h1>
            <p className="mb-4">
                Your privacy is important to us. This privacy policy explains how we handle and protect your personal information.
            </p>
            <h2 className="text-xl font-semibold mb-2 text-blue-600">Information We Collect</h2>
            <ul className="list-disc list-inside mb-4">
                <li>History will be stored and deleted.</li>
                <li>Email ID, name, and profile picture will be stored.</li>
            </ul>
            <p className="mb-4">We will not share your information with any third party.</p>
            <h2 className="text-xl font-semibold mb-2 text-blue-600">European GDPR Compliance</h2>
            <p className="mb-4">
                If you are a resident of the European Economic Area (EEA), you have certain data protection rights. These include the right to access, update, delete, or restrict the use of your personal data. To exercise these rights, please contact us.
            </p>
            <h2 className="text-xl font-semibold mb-2 text-blue-600">United States Privacy Compliance</h2>
            <p className="mb-4">
                We comply with the relevant privacy laws and regulations in the United States. Your personal information will be protected in accordance with applicable laws.
            </p>
            <h2 className="text-xl font-semibold mb-2 text-blue-600">Other International Privacy Laws</h2>
            <p className="mb-4">
                We also comply with other relevant international privacy laws. If you have any concerns regarding the handling of your personal information, please contact us.
            </p>
            <h2 className="text-xl font-semibold mb-2 text-blue-600">Contact Us</h2>
            <p>
                If you have any questions or concerns about this privacy policy or our data practices, or if you wish to request the removal of your data, please contact us at <a href="mailto:thinkcloudmasters@gmail.com" className="text-blue-500 underline">thinkcloudmasters@gmail.com</a>.
            </p>
        </div>
    );
};

export default PrivacyPolicy;
