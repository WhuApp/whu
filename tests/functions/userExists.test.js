import { userExists } from '../../src/api/functions';
import data from './data.json';

const existentCredentials = data.existent;
const nonExistentCredentials = data.nonExistent;

test('Check existent email', async () => {
  const response = await userExists({ emailOrName: existentCredentials.email });

  expect(response.success).toBeTruthy();
  expect(response.error).toBeUndefined();
  expect(response.data.exists).toBeTruthy();
});

test('Check existent name', async () => {
  const response = await userExists({ emailOrName: existentCredentials.username });

  expect(response.success).toBeTruthy();
  expect(response.error).toBeUndefined();
  expect(response.data.exists).toBeTruthy();
});

test('Check non existent email', async () => {
  const response = await userExists({ emailOrName: nonExistentCredentials.email });

  expect(response.success).toBeTruthy();
  expect(response.error).toBeUndefined();
  expect(response.data.exists).toBeFalsy();
});

test('Check non existent name', async () => {
  const response = await userExists({ emailOrName: nonExistentCredentials.username });

  expect(response.success).toBeTruthy();
  expect(response.error).toBeUndefined();
  expect(response.data.exists).toBeFalsy();
});

test('Check without email or name', async () => {
  const response = await userExists({});

  expect(response.success).toBeFalsy();
  expect(response.error).toBe('Missing email or name');
  expect(response.data).toBeUndefined();
});
