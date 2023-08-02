import { login } from '../../src/api/functions';

const credentials = {
  id: '64c997a6bea13a0a1fcf',
  username: 'userLogin01',
  email: 'userlogin01@test.com',
  password: 'userLogin01.Password',
};

test('Login with valid email and valid password', async () => {
  const response = await login({
    emailOrName: credentials.email,
    password: credentials.password,
  });

  expect(response.success).toBeTruthy();
  expect(response.error).toBeUndefined();
  expect(response.data).toBeDefined();

  expect(response.data.session.$id).toBeDefined();
  expect(response.data.session.userId).toBe(credentials.id);
});

test('Login with valid username and valid password', async () => {
  const response = await login({
    emailOrName: credentials.username,
    password: credentials.password,
  });

  expect(response.success).toBeTruthy();
  expect(response.error).toBeUndefined();
  expect(response.data).toBeDefined();

  expect(response.data.session.$id).toBeDefined();
  expect(response.data.session.userId).toBe(credentials.id);
});

test('Login with valid email and invalid password', async () => {
  const response = await login({
    emailOrName: credentials.email,
    password: 'invalid',
  });

  expect(response.success).toBeFalsy();
  expect(response.error).toBe('ToDo'); // TODO fix
  expect(response.data).toBeUndefined();
});

test('Login with valid username and invalid password', async () => {
  const response = await login({
    emailOrName: credentials.username,
    password: 'invalid',
  });

  expect(response.success).toBeFalsy();
  expect(response.error).toBe('ToDo'); // TODO fix
  expect(response.data).toBeUndefined();
});

test('Login with invalid email', async () => {
  const response = await login({
    emailOrName: 'invalid@test.com',
    password: credentials.password,
  });

  expect(response.success).toBeFalsy();
  expect(response.error).toBe('Invalid email or username');
  expect(response.data).toBeUndefined();
});

test('Login with invalid username', async () => {
  const response = await login({
    emailOrName: 'invalid',
    password: credentials.password,
  });

  expect(response.success).toBeFalsy();
  expect(response.error).toBe('Invalid email or username');
  expect(response.data).toBeUndefined();
});

test('Login without username/email', async () => {
  const response = await login({
    password: credentials.password,
  });

  expect(response.success).toBeFalsy();
  expect(response.error).toBe('Missing email or username');
  expect(response.data).toBeUndefined();
});

test('Login without password', async () => {
  const response = await login({
    emailOrName: credentials.username,
  });

  expect(response.success).toBeFalsy();
  expect(response.error).toBe('Missing password');
  expect(response.data).toBeUndefined();
});
