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
    const [collapsed, setCollapsed] = useState<CollapsedState>({});

    useEffect(() => {
        const cachedTemplates = localStorage.getItem('joltTemplates');
        if (cachedTemplates) {
            setTemplates(JSON.parse(cachedTemplates));
            setLoading(false);
        } else {
            ApiService.fetchJoltTemplates()
                .then((data) => {
                    setTemplates(data);
                    localStorage.setItem('joltTemplates', JSON.stringify(data));
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error);
                    setLoading(false);
                });
        }
    }, []);

    const toggleCollapse = (category: string) => {
        setCollapsed(prevState => ({
            ...prevState,
            [category]: !prevState[category],
        }));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="joltemplate-content">
            <ul>
                {joltemplates.map((item, index) => (
                    <li key={index} className="mb-1 p-1 border-b border-gray-300">
                        <div className="flex items-center cursor-pointer" onClick={() => toggleCollapse(item.category)}>
                            <FolderIcon
                                className={`h-4 w-4 text-gray-500 mr-2 ${collapsed[item.category] ? 'rotate-90' : ''}`} />
                            <div className="font-semibold text-black">{item.category}</div>
                        </div>
                        {collapsed[item.category] && (
                            <ul className="pl-6 mt-1">
                                {item.joltTemplates.map((record, idx) => (
                                    <li
                                        key={idx}
                                        className="mb-1 cursor-pointer"
                                        onClick={() => onSelect(record)}
                                    >
                                        <div className="text-xs text-black"> {idx + 1} : {record.name}</div>
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
