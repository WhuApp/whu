const { Client, Databases, Users, Query, ID } = require('node-appwrite');

const register = async function (request, response) {
  // Check if everything is set up correctly
  if (
    [
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
  if (senders.total > 0) {
    throw new Error('Requesting user already has an account');
  }

  if (!request.payload) {
    throw new Error('No payload provided');
  }

  const payload = JSON.parse(request.payload);

  if (!payload.data) {
    throw new Error('No data provided');
  }

  const userData = {
    name: payload.data.name,
    email: payload.data.email,
    password: payload.data.password,
  };

  //check user data is correct
  const nameRegEx = new RegExp(
    '/^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/',
  );
  if (nameRegEx.test(userData.name)) {
    console.log('name:', userData.name);
    return response.json({ message: 'name invalid' });
  }

  const passwordRegEx = new RegExp('/(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$/');
  if (passwordRegEx.test(userData.name)) {
    console.log('password:', userData.password);
    return response.json({ message: 'password invalid' });
  }

  if ((await users.list([Query.equal('name', [userData.name])])).total > 0) {
    return response.json({ message: 'name already taken' });
  }

  if ((await users.list([Query.equal('email', [userData.email])])).total > 0) {
    return response.json({ message: 'email already taken' });
  }

  //for the unlikely case that an id is already used
  let userId = ID.unique();
  while ((await users.list([Query.equal('$id', [userId])])).total > 0) {
    console.log('id already exists, randomizing new id');
    userId = ID.unique();
  }

  await users.create(
    userId,
    userData.email,
    undefined,
    userData.password,
    userData.name,
  );

  await databases.createDocument(database, locationsCollection, userId, {
    timestamp: null,
    longitude: null,
    latitude: null,
    altitude: null,
  });
  return response.json({ success: true });
};

module.exports = register;
