 // Adjust path as needed

import axiosInstance from "@/app/service/ApiInterceptor";

 interface TransformRequest {
    inputJson: string;
    specJson: string;
}

const transform = (request: TransformRequest): Promise<string> => {
    return axiosInstance.post<string>('/api/transform', request)
        .then(response => {
            return response.data;
        });
};

const ApiService = {
    transform
};

export default ApiService;
