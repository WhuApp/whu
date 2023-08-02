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

  //receiver
  if (!request.payload) throw new Error('No payload provided');
  const payload = JSON.parse(request.payload);

  const emailOrName = payload.emailOrName;
  if (!emailOrName) return response.json({ message: 'Missing email or name' });

  const matchingName = await users.list([Query.equal('name', [emailOrName])]);
  const matchingMail = await users.list([Query.equal('email', [emailOrName])]);
  const matchingUsers = [].concat(matchingName.users).concat(matchingMail.users);

  if (matchingUsers.length === 0) {
    return response.json({
      data: {
        exists: false,
      },
    });
  } else if (matchingUsers.length > 1) {
    console.log('More than one user share unique values', matchingUsers);
  }
  console.log('user(s) found:', [...matchingUsers]);

  return response.json({
    data: {
      exists: true,
    },
  });
};

module.exports = userExists;
