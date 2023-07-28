import { Client } from 'appwrite';

export const ENDPOINT = 'https://cloud.appwrite.io/v1';
export const PROJECT_ID = '648644a80adadf63b7d4';

export const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);
