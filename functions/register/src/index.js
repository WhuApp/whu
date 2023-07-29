const { Client, Databases, Users, Query, ID } = require('node-appwrite');

const register = async function (request, response) {
  // Check if everything is set up correctly
  if (
    [
      'NAME_REGEX',
      'PASSWORD_REGEX',
      'DATABASE_ID',
      'COLLECTION_LOCATIONS_ID',
      'APPWRITE_FUNCTION_ENDPOINT',
      'APPWRITE_FUNCTION_PROJECT_ID',
      'APPWRITE_FUNCTION_API_KEY',
    ].some((x) => !request.variables[x])
  ) {
    throw new Error('Some variables are missing');
  }

  const database = request.variables['DATABASE_ID'];
  const locationsCollection = request.variables['COLLECTION_LOCATIONS_ID'];
  const client = new Client();
  const databases = new Databases(client);
  const users = new Users(client);

  client
    .setEndpoint(request.variables['APPWRITE_FUNCTION_ENDPOINT'])
    .setProject(request.variables['APPWRITE_FUNCTION_PROJECT_ID'])
    .setKey(request.variables['APPWRITE_FUNCTION_API_KEY']);

  const senderId = request.variables['APPWRITE_FUNCTION_USER_ID'];
  const senders = await users.list([Query.equal('$id', [senderId])]);

  if (senders.total > 0) throw new Error('Requesting user already has an account');

  if (!request.payload) throw new Error('No payload provided');
  const userData = JSON.parse(request.payload);
  
  //check user data is correct
  const reg = request.variables['NAME_REGEX'];
  console.log(reg)
  const nameRegEx = new RegExp(reg);
  console.log(nameRegEx);
  if (!nameRegEx.test(userData.name)) {
    console.log('name:', userData.name);
    return response.json({ message: 'Invalid username' });
  }

  const passwordRegEx = new RegExp(request.variables['PASSWORD_REGEX']);
  if (!passwordRegEx.test(userData.password)) {
    console.log('password:', userData.password);
    return response.json({ message: 'Invalid password' });
  }

  if ((await users.list([Query.equal('name', [userData.name])])).total > 0) {
    return response.json({ message: 'Name already taken' });
  }

  if ((await users.list([Query.equal('email', [userData.email])])).total > 0) {
    return response.json({ message: 'Email already taken' });
  }

  //for the unlikely case that an id is already used
  let userId = ID.unique();
  while ((await users.list([Query.equal('$id', [userId])])).total > 0) {
    console.log('UserId already exists, randomizing new id');
    userId = ID.unique();
  }

  await users.create(userId, userData.email, undefined, userData.password, userData.name);

  await databases.createDocument(database, locationsCollection, userId, {
    timestamp: null,
    longitude: null,
    latitude: null,
    altitude: null,
  });
  return response.json({});
};

module.exports = register;
