import { register } from '../../src/api/functions';

const validUser = {
  id: '64c445ccb399021ee62f',
  email: 'userRegister01@test.com',
  password: 'userRegister01.Password',
  name: 'userRegister01',
};

const invalidUser = {
  email: 'a',
  password: 'a',
  name: 'a',
};

test('valid user (maybe already existent)', async () => {
  const response = await register({
    email: validUser.email,
    name: validUser.name,
    password: validUser.password,
  });
  expect(response.success).toBe(false);
  expect(response.error).toBe('Name is unavailable');
});

test('invalid email', async () => {
  const response = await register({
    email: invalidUser.email,
    name: validUser.name,
    password: validUser.password,
  });
  expect(response.success).toBe(false);
  expect(response.error).toBe('Invalid email');
});

test('invalid name', async () => {
  const response = await register({
    email: validUser.email,
    name: invalidUser.name,
    password: validUser.password,
  });
  expect(response.success).toBe(false);
  expect(response.error).toBe('Invalid username');
});

test('invalid password', async () => {
  const response = await register({
    email: validUser.email,
    name: validUser.name,
    password: invalidUser.password,
  });
  expect(response.success).toBe(false);
  expect(response.error).toBe('Invalid password');
});
