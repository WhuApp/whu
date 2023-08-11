import { Client } from 'appwrite';
import { ENDPOINT, PROJECT_ID } from '../constants';

export const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);
