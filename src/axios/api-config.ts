import axios from 'axios';

export const api = axios.create({
    baseURL: `https://jsonplaceholder.typicode.com`
})

export const EndPoints = {
    users: 'users'
} as const;

// create a type out of the object
type EndPointType = typeof EndPoints;

// create a union from the objects keys
type EndPointsKeys = keyof EndPointType;

// create a union from the objects value
export type EndPointsValues = EndPointType[EndPointsKeys];