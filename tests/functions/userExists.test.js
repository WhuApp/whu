import { userExists } from '../../src/api/functions';
import data from './data.json';

const existentCredentials = data.existent;
const nonExistentCredentials = data.nonExistent;

test('Check existent name', async () => {
  const response = await userExists({ name: existentCredentials.name });

  expect(response.success).toBeTruthy();
  expect(response.error).toBeUndefined();
  expect(response.data.exists).toBeTruthy();
});

test('Check non existent name', async () => {
  const response = await userExists({ name: nonExistentCredentials.name });

  expect(response.success).toBeTruthy();
  expect(response.error).toBeUndefined();
  expect(response.data.exists).toBeFalsy();
});

test('Check without name', async () => {
  const response = await userExists({});

  expect(response.success).toBeFalsy();
  expect(response.error).toBe('Missing name');
  expect(response.data).toBeUndefined();
});
