const { Client, Account, Users, Query } = require('node-appwrite');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const login = async function (request, response) {
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
  const credentials = JSON.parse(request.payload);

  const matchingName = await users.list([Query.equal('name', [credentials.emailOrName])]);
  const matchingMail = await users.list([Query.equal('email', [credentials.emailOrName])]);
  const matchingUsers = [].concat(matchingName.users).concat(matchingMail.users);

  if (matchingUsers.length === 0) {
    return response.json({ message: 'No user with this name found' });
  } else if (matchingUsers.length > 1) {
    console.log('More than one user share unique values', matchingUsers);
  }

  const receiver = matchingUsers[0];

  if (!credentials.password) return response.json({ message: 'Missing password' });
  const url = request.variables['APPWRITE_FUNCTION_ENDPOINT'] + '/account/sessions/email';
  let options = {
    method: 'post',
    headers: {
      'X-Appwrite-Project': request.variables['APPWRITE_FUNCTION_PROJECT_ID'],
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      email: receiver.email,
      password: credentials.password,
    }),
  };

  const session = await (await fetch(url, options)).json();
  return response.json({ data: { session } });
};

module.exports = login;
