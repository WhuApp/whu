const {
  Client,
  Databases,
  Users,
  Query,
  ID,
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
    throw new Error('Receiver not found');
  });
  
  const sender = await users.get(request.variables['APPWRITE_FUNCTION_USER_ID']).catch(async () => {
    console.log('Sender not found! Trying to use payload sender..');
    
    if (!payload.sender) {
      throw new Error('No sender provided');
    }

    return await users.get(payload.sender).catch(() => {
      throw new Error('Sender not found');
    })
  });

  if (sender.$id === receiver.$id) {
    throw new Error('Sender can not be same as receiver');
  };
  
  // Check if a request exists
  const requests = await databases.listDocuments(
    database,
    friendsCollection,
    [
      Query.equal('sender', [sender.$id, receiver.$id]),
      Query.equal('receiver', [sender.$id, receiver.$id])
    ]
  );

  // Create request
  if (requests.total === 0) {
    await databases.createDocument(
      database,
      friendsCollection,
      ID.unique(),
      { sender: sender.$id, receiver: receiver.$id, accepted: false }
    );

    console.log('Sent request to', receiver.$id);
    return response.json({ success: true });
  } else {
    if (requests.total > 1) {
      throw new Error('Something is completly wrong here!');
    };

    const friendRequest = requests.documents[0];

    if (friendRequest.accepted) {
      return response.json({ success: false, message: 'Already friends' });
    };

    // Accept request
    if (friendRequest.sender === receiver.$id) {
      await databases.updateDocument(
        database,
        friendsCollection,
        friendRequest.$id,
        { accepted: true }
      );

      console.log('Accepted request of', receiver.$id);
      return response.json({ success: true });
    };

    if (friendRequest.sender === sender.$id) {
      return response.json({ success: false, message: 'Already requested' });
    };
  };
};

module.exports = addFriend;