import { userExists } from '../../src/api/functions';
import data from './data.json';

const existentCredentials = data.existent;
const nonExistentCredentials = data.nonExistent;

test('Check existent email', async () => {
  const response = await userExists({ email: existentCredentials.email });

  expect(response.success).toBeTruthy();
  expect(response.error).toBeUndefined();
  expect(response.data.exists).toBeTruthy();
});

test('Check non existent email', async () => {
  const response = await userExists({ email: nonExistentCredentials.email });

  expect(response.success).toBeTruthy();
  expect(response.error).toBeUndefined();
  expect(response.data.exists).toBeFalsy();
});

test('Check without email', async () => {
  const response = await userExists({});

  expect(response.success).toBeFalsy();
  expect(response.error).toBe('Missing email');
  expect(response.data).toBeUndefined();
});
