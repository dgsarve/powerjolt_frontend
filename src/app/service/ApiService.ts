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


const ApiService = {
    transform,
    fetchHistory
};

export default ApiService;

