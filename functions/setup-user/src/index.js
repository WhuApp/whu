const {
  Client,
  Databases,
  Users,
} = require('node-appwrite');

const setupUser = async function (request, response) {
  // Check if everything is set up correctly
  if ([
    'DATABASE_ID',
    'COLLECTION_LOCATIONS_ID',
    'APPWRITE_FUNCTION_ENDPOINT',
    'APPWRITE_FUNCTION_PROJECT_ID',
    'APPWRITE_FUNCTION_API_KEY'
  ].some((x) => !request.variables[x])) {
    throw new Error('Some variables are missing');
  };

  const database = request.variables['DATABASE_ID'];
  const locationsCollection = request.variables['COLLECTION_LOCATIONS_ID'];
  const client = new Client();
  const databases = new Databases(client);
  const users = new Users(client);

  client
    .setEndpoint(request.variables['APPWRITE_FUNCTION_ENDPOINT'])
    .setProject(request.variables['APPWRITE_FUNCTION_PROJECT_ID'])
    .setKey(request.variables['APPWRITE_FUNCTION_API_KEY']);

  if (!request.payload) {
    throw new Error('No payload provided');
  };

  const payload = JSON.parse(request.payload);

  // Validate sender
  const sender = await users.get(request.variables['APPWRITE_FUNCTION_USER_ID']).catch(async () => {
    console.log('Sender not found! Trying to use payload sender..');

    if (!payload.sender) {
      throw new Error('No sender provided');
    };

    return await users.get(payload.sender).catch(() => {
      throw new Error('Sender not found');
    });
  });

  if (!payload.data) {
    throw new Error('No data provided');
  }
  
  await databases.createDocument(database, locationsCollection, sender.$id, payload.data);
  return response.json({ success: true });
};

module.exports = setupUser;
