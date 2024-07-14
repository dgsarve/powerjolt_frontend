import React, { useEffect, useState } from 'react';
import { ClockIcon, FolderIcon } from "@heroicons/react/16/solid";
import ApiService, { TransformationHistoryResponse } from "@/app/service/ApiService";

interface HistoryComponentProps {
    onSelect: (record: any) => void;
}

const HistoryComponent: React.FC<HistoryComponentProps> = ({ onSelect }) => {
    const [history, setHistory] = useState<TransformationHistoryResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);
    const [collapsed, setCollapsed] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        ApiService.fetchHistory()
            .then((data) => {
                setHistory(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const toggleCollapse = (date: string) => {
        setCollapsed(prevState => ({
            ...prevState,
            [date]: !prevState[date],
        }));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="history-content">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold">History</h2>
                <ClockIcon className="h-6 w-6 text-gray-500" />
            </div>
            <ul>
                {history.map((item, index) => (
                    <li key={index} className="mb-1 p-1 border-b border-gray-300">
                        <div className="flex items-center cursor-pointer" onClick={() => toggleCollapse(item.date)}>
                            <FolderIcon className={`h-4 w-4 text-gray-500 mr-2 ${collapsed[item.date] ? 'rotate-90' : ''}`} />
                            <div className="font-semibold text-black">{item.date}</div>
                        </div>
                        {!collapsed[item.date] && (
                            <ul className="pl-6 mt-1">
                                {item.records.map((record, idx) => (
                                    <li
                                        key={idx}
                                        className="mb-1 cursor-pointer"
                                        onClick={() => onSelect(record)}
                                    >
                                        <div className="text-xs text-black"> {record.timestamp}</div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HistoryComponent;
