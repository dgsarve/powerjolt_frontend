import React, { useEffect, useState } from 'react';
import { ClockIcon, FolderIcon } from "@heroicons/react/16/solid";
import ApiService, { JoltTemplateResponse } from "@/app/service/ApiService";

interface JoltTemplateComponentProps {
    onSelect: (record: any) => void;
}

interface CollapsedState {
    [key: string]: boolean;
}

const JoltTemplateComponent: React.FC<JoltTemplateComponentProps> = ({ onSelect }) => {
    const [joltemplates, setTemplates] = useState<JoltTemplateResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);
    const [collapsed, setCollapsed] = useState<CollapsedState>({}); // Explicit type for collapsed state

    useEffect(() => {
        ApiService.fetchJoltTemplates()
            .then((data) => {
                setTemplates(data);
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
        return <div>Error: {error.message}</div>;
    }

    const toggleCollapse = (date: string) => {
        setCollapsed(prevState => ({
            ...prevState,
            [date]: !prevState[date],
        }));
    };

    return (
        <div className="joltemplate-content">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold">Templates</h2>
                <ClockIcon className="h-6 w-6 text-gray-500" />
            </div>
            <ul>
                {joltemplates.map((item, index) => (
                    <li key={index} className="mb-1 p-1 border-b border-gray-300">
                        <div className="flex items-center cursor-pointer" onClick={() => toggleCollapse(item.category)}>
                            <FolderIcon
                                className={`h-4 w-4 text-gray-500 mr-2 ${collapsed[item.category] ? 'rotate-90' : ''}`} />
                            <div className="font-semibold text-black">{item.category}</div>
                        </div>
                        {!collapsed[item.category] && (
                            <ul className="pl-6 mt-1">
                                {item.joltTemplates.map((record, idx) => (
                                    <li
                                        key={idx}
                                        className="mb-1 cursor-pointer"
                                        onClick={() => onSelect(record)}
                                    >
                                        <div className="text-xs text-black"> {idx+1} : {record.name}</div>
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

export default JoltTemplateComponent;
