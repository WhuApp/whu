const {
  Client,
  Databases,
  Users,
  Query,
} = require('node-appwrite');

const addFriend = async (request, response) => {
  // Check if everything is set up correctly
  if ([
    'DATABASE_ID',
    'COLLECTION_FRIENDS_ID',
    'APPWRITE_FUNCTION_ENDPOINT',
    'APPWRITE_FUNCTION_PROJECT_ID',
    'APPWRITE_FUNCTION_API_KEY'
  ].some((x) => !request.variables[x])) {
    throw new Error('Some variables are missing');
  };

  const database = request.variables['DATABASE_ID'];
  const friendsCollection = request.variables['COLLECTION_FRIENDS_ID']; 
  const payload = JSON.parse(request.payload);
  const client = new Client();
  const databases = new Databases(client);
  const users = new Users(client);

  client
    .setEndpoint(request.variables['APPWRITE_FUNCTION_ENDPOINT'])
    .setProject(request.variables['APPWRITE_FUNCTION_PROJECT_ID'])
    .setKey(request.variables['APPWRITE_FUNCTION_API_KEY']);

  // Validate sender & receiver
  if (!payload.receiver) {
    throw new Error('No receiver provided');
  };

  const receiver = await users.get(payload.receiver).catch(() => {
    return response.json({ success: false, message: 'Receiver not found' });
  });
  const sender = await users.get(request.variables['APPWRITE_FUNCTION_USER_ID']).catch(async () => {
    console.log('Sender not found! Trying to use payload sender..');
    
    if (!payload.sender) {
      return response.json({ success: false, message: 'No sender provided' });
    }

    return await users.get(payload.sender).catch(() => {
      return response.json({ success: false, message: 'Sender not found' });
    })
  });

  if (sender.$id === receiver.$id) {
    return response.json({ success: false, message: 'Sender can not be same as receiver' });
  };
  
  // Check if a request or friendship exists
  const friendships = await databases.listDocuments(
    database,
    friendsCollection,
    [
      Query.equal('sender', [sender.$id, receiver.$id]),
      Query.equal('receiver', [sender.$id, receiver.$id])
    ]
  );

  if (friendships.total === 0) {
    return response.json({ success: false, message: 'No friendship or request for that user' });
  };

  if (friendships.total > 1) {
    throw new Error('Something is completly wrong here!');
  };

  await databases.deleteDocument(database, friendsCollection, friendships.documents[0].$id);
  response.json({ success: true });
};

module.exports = addFriend;
