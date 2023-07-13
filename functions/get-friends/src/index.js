const {
  Client,
  Databases,
  Users,
  Query,
} = require('node-appwrite');

module.exports = async function (request, response) {

  const database = request.variables['DATABASE_ID'];
  const friendsCollection = request.variables['COLLECTION_FRIENDS_ID']; 
  const locationsCollection = request.variables['COLLECTION_LOCATIONS_ID'];
  const client = new Client();
  const databases = new Databases(client);
  const users = new Users(client);

  client
    .setEndpoint(request.variables['APPWRITE_FUNCTION_ENDPOINT'])
    .setProject(request.variables['APPWRITE_FUNCTION_PROJECT_ID'])
    .setKey(request.variables['APPWRITE_FUNCTION_API_KEY']);

  const sender = await users.get(request.variables['APPWRITE_FUNCTION_USER_ID']).catch(async () => {
    console.log('Sender not found! Trying to use payload sender..');

    if (!request.payload) {
      return response.json({ success: false, message: 'No payload provided' })
    }
    const payload = JSON.parse(request.payload);

    if (!payload.sender) {
      return response.json({ success: false, message: 'No sender provided' });
    }

    return await users.get(payload.sender).catch(() => {
      return response.json({ success: false, message: 'Sender not found' });
    })
  });

  const outgoingFrienships = (await databases.listDocuments(
    database, 
    friendsCollection,
    [
      Query.equal('sender', sender.$id),
      Query.equal('accepted', true)
    ]
  ));
  
  const incomingFrienships = (await databases.listDocuments(
    database, 
    friendsCollection,
    [
      Query.equal('receiver', sender.$id),
      Query.equal('accepted', true)
    ]
  ));

  const friendiDs = [];
  outgoingFrienships.documents.forEach((friendship) => friendiDs.push(friendship.receiver));
  incomingFrienships.documents.forEach((friendship) => friendiDs.push(friendship.sender));
  
  const result = [];
  console.log(friendiDs);
  for (const friendId of friendiDs) {
    console.log(friendId);
    const friend = await users.get(friendId);
    const location = await databases.getDocument(database, locationsCollection, friendId);

    result.push(
      {
        name: friend.name,
        location: {
          timestamp: location.timestamp,
          longitude: location.longitude,
          latitude: location.latitude,
          altitude: location.altitude,
        },
      }
    );
  }

  response.json(result);
};
