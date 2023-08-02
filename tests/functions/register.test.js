import { register } from '../../src/api/functions';
import data from './data.json';

const existentCredentials = data.existent;
const nonExistentCredentials = data.nonExistent;

test('Register with non existent valid credentials', async () => {
  // TODO implement
  expect(true).toBeFalsy();
});

test('Register with invalid email', async () => {
  const response = await register({
    email: 'x',
    name: nonExistentCredentials.username,
    password: nonExistentCredentials.password,
  });

  expect(response.success).toBeFalsy();
  expect(response.error).toBe('Invalid email');
  expect(response.data).toBeUndefined();
});

test('Register with existent email', async () => {
  const response = await register({
    email: existentCredentials.email,
    name: nonExistentCredentials.username,
    password: nonExistentCredentials.password,
  });

  expect(response.success).toBeFalsy();
  expect(response.error).toBe('Email already registered');
  expect(response.data).toBeUndefined();
});

test('Register with invalid username', async () => {
  const response = await register({
    email: nonExistentCredentials.email,
    name: 'x',
    password: nonExistentCredentials.password,
  });

  expect(response.success).toBeFalsy();
  expect(response.error).toBe('Invalid username');
  expect(response.data).toBeUndefined();
});

test('Register with existent username', async () => {
  const response = await register({
    email: nonExistentCredentials.email,
    name: existentCredentials.username,
    password: nonExistentCredentials.password,
  });

  expect(response.success).toBeFalsy();
  expect(response.error).toBe('Name is unavailable');
  expect(response.data).toBeUndefined();
});

test('Register with invalid password', async () => {
  const response = await register({
    email: nonExistentCredentials.email,
    name: nonExistentCredentials.username,
    password: 'x',
  });

  expect(response.success).toBeFalsy();
  expect(response.error).toBe('Invalid password');
  expect(response.data).toBeUndefined();
});

test('Register without email', async () => {
  const response = await register({
    name: nonExistentCredentials.username,
    password: nonExistentCredentials.password,
  });

  expect(response.success).toBeFalsy();
  expect(response.error).toBe('Missing email');
  expect(response.data).toBeUndefined();
});

test('Register without username', async () => {
  const response = await register({
    email: nonExistentCredentials.email,
    password: nonExistentCredentials.password,
  });

  expect(response.success).toBeFalsy();
  expect(response.error).toBe('Missing username');
  expect(response.data).toBeUndefined();
});

test('Register without password', async () => {
  const response = await register({
    email: nonExistentCredentials.email,
    name: nonExistentCredentials.username,
  });

  expect(response.success).toBeFalsy();
  expect(response.error).toBe('Missing password');
  expect(response.data).toBeUndefined();
});
