import React, { useEffect, useState } from 'react';
import {ClockIcon} from "@heroicons/react/16/solid";

const HistoryComponent: React.FC = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Replace with your actual API endpoint
        fetch('/api/history')
            .then((response) => response.json())
            .then((data) => {
                setHistory(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>....</div>;
    }

    return (
        <div className="history-content">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold">History</h2>
                <ClockIcon className="h-6 w-6 text-gray-500" />
            </div>
            <ul>
                {history.map((item, index) => (
                    <li key={index} className="mb-2 p-2 border-b border-gray-300">
                        History Loading...
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HistoryComponent;
