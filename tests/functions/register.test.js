import { Functions, Client, Account } from 'appwrite';
import { ENDPOINT, PROJECT_ID } from '../../src/appwrite';

const REGISTER_ID = '64c4123000a5be24fa29';
const user = {
  id: '64c3d3253309cb3dfadf',
  email: 'userRegister1@test.com',
  password: 'userRegister01.Password',
  name: 'userRegister01',
};
const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);
const functions = new Functions(client);

test.only('register new user', async () => {
  const payload = JSON.stringify({ data: user });
  const execution = await functions.createExecution(REGISTER_ID, payload);
  const data = JSON.parse(execution.response);
  expect(data.success).toBe(true);
});
