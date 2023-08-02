import { userExists } from '../../src/api/functions';

const nonExistentCredentials = {
  id: '64c445ccb399021ee62f',
  email: 'userRegister01@test.com',
  password: 'userRegister01.Password',
  username: 'userRegister01',
};

const existentCredentials = {
  id: '64c997a6bea13a0a1fcf',
  username: 'userLogin01',
  email: 'userlogin01@test.com',
  password: 'userLogin01.Password',
};

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
