import { userExists } from '../../src/api/functions';

const user = {
  id: '64c442b0f159796f9062',
  email: 'userExists01@test.com',
  password: 'userExists01.Password',
  name: 'userExists01',
};

test('user mail test', async () => {
  const response = await userExists({ emailOrName: user.email });
  expect(response.success).toBe(true);
  expect(response.data.exists).toBe(true);
});

test('user name test', async () => {
  const response = await userExists({ emailOrName: user.name });
  expect(response.success).toBe(true);
  expect(response.data.exists).toBe(true);
});

test('wrong data test', async () => {
  const response = await userExists({ emailOrName: 'n/A' });
  expect(response.success).toBe(true);
  expect(response.data.exists).toBe(false);
});
