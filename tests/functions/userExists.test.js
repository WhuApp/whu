import { Functions, Client, Account } from 'appwrite';
import { ENDPOINT, PROJECT_ID } from '../../src/appwrite';

const USER_EXISTS_ID = '64c3b745e7e1fa7c9445';
const user = {
  id: '64c442b0f159796f9062',
  email: 'userExists01@test.com',
  password: 'userExists01.Password',
  name: 'userExists01',
};
const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);
const functions = new Functions(client);

test('user mail check', async () => {
  const payload = JSON.stringify({ data: { email: user.email } });
  const execution = await functions.createExecution(USER_EXISTS_ID, payload);
  const data = JSON.parse(execution.response);
  expect(data?.user?.$id).toBe(user.id);
});

test('user name check', async () => {
  const payload = JSON.stringify({ data: { name: user.name } });
  const execution = await functions.createExecution(USER_EXISTS_ID, payload);
  const data = JSON.parse(execution.response);
  expect(data.user.$id).toBe(user.id);
});
