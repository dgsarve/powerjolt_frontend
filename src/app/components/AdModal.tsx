import React, { useEffect } from 'react';
import {Helmet} from 'react-helmet';

const AdModal: React.FC<{ onAdComplete: () => void }> = ({ onAdComplete }) => {
    useEffect(() => {
        // Simulate the ad completion
        const timer = setTimeout(() => {
            onAdComplete();
        }, 5000); // Assume the ad takes 5 seconds

        return () => clearTimeout(timer);
    }, [onAdComplete]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <Helmet>
                <meta name="google-adsense-account" content="ca-pub-5750827820025211"></meta>
            </Helmet>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-3xl mx-auto">
                <h2 className="text-2xl font-semibold mb-4">Please watch this ad</h2>
                <div className="mb-4">
                    <ins
                        className="adsbygoogle"
                        style={{ display: 'block', width: '100%', height: '300px' }}
                        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your AdSense client ID
                        data-ad-slot="XXXXXXXXXX" // Replace with your AdSense ad slot
                        data-ad-format="auto"
                        data-full-width-responsive="true"
                    ></ins>
                </div>
                <p className="mt-4 text-lg">The page will load after the ad is finished.</p>
            </div>
        </div>
    );
};

export default AdModal;
