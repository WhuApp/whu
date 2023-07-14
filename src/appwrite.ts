import { Client } from 'appwrite';

const ENDPOINT = 'https://cloud.appwrite.io/v1';
const PROJECT_ID = '648644a80adadf63b7d4';

export const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID);
