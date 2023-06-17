import { Account, Client, ID } from 'appwrite'; 

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('648644a80adadf63b7d4');
const account = new Account(client);

const createUser = async (mail: string, password: string, name: string) =>
  account.create(ID.unique(), mail, password, name);

const createSession = async (mail: string, password: string) =>
  account.createEmailSession(mail, password);

export { createUser, createSession };
