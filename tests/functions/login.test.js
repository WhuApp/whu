import { login } from '../../src/api/functions';
import data from './data.json';

const credentials = data.existent;

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

test('Login with valid email and too short password', async () => {
  const response = await login({
    emailOrName: credentials.email,
    password: 'x',
  });

  expect(response.success).toBeFalsy();
  expect(response.error).toBe('Invalid password: Password must be at least 8 characters');
  expect(response.data).toBeUndefined();
});

test('Login with valid username and too short password', async () => {
  const response = await login({
    emailOrName: credentials.username,
    password: 'x',
  });

  expect(response.success).toBeFalsy();
  expect(response.error).toBe('Invalid password: Password must be at least 8 characters');
  expect(response.data).toBeUndefined();
});

test('Login with invalid email', async () => {
  const response = await login({
    emailOrName: 'x@test.com',
    password: credentials.password,
  });

  expect(response.success).toBeFalsy();
  expect(response.error).toBe('Invalid email or username');
  expect(response.data).toBeUndefined();
});

test('Login with invalid username', async () => {
  const response = await login({
    emailOrName: 'x',
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
