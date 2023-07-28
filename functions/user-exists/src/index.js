const { Client, Users, Query } = require('node-appwrite');

const userExists = async function (request, response) {
  // Check if everything is set up correctly
  if (
    [
      'APPWRITE_FUNCTION_ENDPOINT',
      'APPWRITE_FUNCTION_PROJECT_ID',
      'APPWRITE_FUNCTION_API_KEY',
    ].some((x) => !request.variables[x])
  ) {
    throw new Error('Some variables are missing');
  }

  const client = new Client();
  const users = new Users(client);

  client
    .setEndpoint(request.variables['APPWRITE_FUNCTION_ENDPOINT'])
    .setProject(request.variables['APPWRITE_FUNCTION_PROJECT_ID'])
    .setKey(request.variables['APPWRITE_FUNCTION_API_KEY']);

  if (!request.payload) {
    throw new Error('No payload provided');
  }

  const payload = JSON.parse(request.payload);

  if (!payload.data) {
    throw new Error('No data provided');
  }

  const user = payload.data;
  console.log('user provided: ', user);

  const machingName = await users.list([Query.equal('name', [user.name])]);
  const machingMail = await users.list([Query.equal('email', [user.email])]);
  const machingUsers = [].concat(machingName.users).concat(machingMail.users);

  if (machingUsers.length === 0) {
    console.log('user not found');
    return response.json({});
  } else if (machingUsers.length > 1) {
    console.log('More than one user share unique values', user);
  }
  console.log('user(s) found:', [...machingUsers]);
  return response.json({ user: machingUsers[0] });
};

module.exports = userExists;
