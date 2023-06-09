import { api } from './api-config';
import type { EndPointsValues } from './api-config';

export async function getAxios(endpoint: EndPointsValues) {
    return await api.get(`${endpoint}`);
}

export async function deleteAxios(endpoint: EndPointsValues, id: number) {
    return await api.delete(`${endpoint}/${id}`);
}