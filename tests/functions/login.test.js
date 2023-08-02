import { Account } from 'appwrite';
import { login } from '../../src/api/functions';
import { client } from '../../src/appwrite';

const account = new Account(client);
const validUser = {
  id: '64c997a6bea13a0a1fcf',
  name: 'userLogin01',
  email: 'userlogin01@test.com',
  password: 'userLogin01.Password',
};

test('login with valid email', async () => {
  const response = await login({
    emailOrName: validUser.email,
    password: validUser.password,
  });
  expect(response.success).toBe(true);
  expect(account.getSession).toBeDefined();
});
