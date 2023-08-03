const { Client, Users, Query } = require('node-appwrite');

module.exports = async (request, response) => {
  if (
    [
      'APPWRITE_FUNCTION_ENDPOINT',
      'APPWRITE_FUNCTION_PROJECT_ID',
      'APPWRITE_FUNCTION_API_KEY',
    ].some((x) => !request.variables[x])
  ) {
    throw new Error('Some variables are missing');
  }

  const client = new Client()
    .setEndpoint(request.variables['APPWRITE_FUNCTION_ENDPOINT'])
    .setProject(request.variables['APPWRITE_FUNCTION_PROJECT_ID'])
    .setKey(request.variables['APPWRITE_FUNCTION_API_KEY']);
  const users = new Users(client);

  if (!request.payload || !JSON.parse(request.payload).email) {
    return response.json({ message: 'Missing email' });
  }

  const email = JSON.parse(request.payload).email;
  const matching = await users.list([Query.equal('email', [email])]);

  console.log(matching.users);

  switch (matching.total) {
    case 0:
      return response.json({ data: { exists: false } });
    case 1:
      return response.json({ data: { exists: true } });
    default:
      throw new Error('Multiple users share the same email');
  }
};
