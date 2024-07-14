import axiosInstance from "@/app/service/ApiInterceptor";


interface TransformRequest {
    inputJson: string;
    specJson: string;
}

interface TransformationHistory {
    id: number;
    userId: string;
    inputJson: string;
    specJson: string;
    outputJson: string;
    timestamp: string;
}

export interface TransformationHistoryResponse {
    date: string;
    records: TransformationHistory[];
}

interface JoltTemplate {
    id: number;
    category: string;
    name: string;
    description: string;
    inputJson: string;
    specJson: string;
    outputJson: string;
    tags: string;
    timestamp: string;
}


export interface JoltTemplateResponse {
    category: string;
    joltTemplates: JoltTemplate[];
}

const transform = (request: TransformRequest): Promise<string> => {
    return axiosInstance.post<string>('/api/transform', request)
        .then(response => {
            return response.data;
        });
};


const fetchHistory = (): Promise<TransformationHistoryResponse[]> => {
    return axiosInstance.get<TransformationHistoryResponse[]>('/api/history')
        .then(response => {
            return response.data;
        });
};

const fetchJoltTemplates = (): Promise<JoltTemplateResponse[]> => {
    return axiosInstance.get<JoltTemplateResponse[]>('/api/templates')
        .then(response => {
            return response.data;
        });
};


const ApiService = {
    transform,
    fetchHistory,
    fetchJoltTemplates
};

export default ApiService;

