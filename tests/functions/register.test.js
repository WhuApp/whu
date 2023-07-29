import { register, userExists } from '../../src/api/functions';

const user = {
  id: '64c445ccb399021ee62f',
  email: 'userRegister01@test.com',
  password: 'userRegister01.Password',
  name: 'userRegister01',
};

test('register test', async () => {
  const response = await register({
    email: user.email,
    name: user.name,
    password: user.password,
  });
  expect(response.success).toBe(true);
});
