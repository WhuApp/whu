const { Client, Databases, Users, Query, ID } = require('node-appwrite');

module.exports = async (request, response) => {
  if (
    [
      'DATABASE_ID',
      'COLLECTION_FRIENDS_ID',
      'APPWRITE_FUNCTION_ENDPOINT',
      'APPWRITE_FUNCTION_PROJECT_ID',
      'APPWRITE_FUNCTION_API_KEY',
    ].some((x) => !request.variables[x])
  ) {
    throw new Error('Some variables are missing');
  }

  if (!request.variables['APPWRITE_FUNCTION_USER_ID']) {
    throw new Error('This function can only be called as a user');
  }

  if (!request.payload || !JSON.parse(request.payload).target) {
    return response.json({ message: 'Missing target' });
  }

  const DATABASE_ID = request.variables['DATABASE_ID'];
  const COLLECTION_FRIENDS_ID = request.variables['COLLECTION_FRIENDS_ID'];

  const client = new Client()
    .setEndpoint(request.variables['APPWRITE_FUNCTION_ENDPOINT'])
    .setProject(request.variables['APPWRITE_FUNCTION_PROJECT_ID'])
    .setKey(request.variables['APPWRITE_FUNCTION_API_KEY']);
  const databases = new Databases(client);
  const users = new Users(client);

  const payload = JSON.parse(request.payload);
  const targetId = payload.target;
  const senderId = request.variables['APPWRITE_FUNCTION_USER_ID'];

  if ((await users.list([Query.equal('$id', targetId)])).users.length === 0) {
    return response.json({ message: 'User not found' });
  }

  if (senderId === targetId) {
    return response.json({ message: 'You can not be friends with yourself' });
  }

  const requests = await databases.listDocuments(DATABASE_ID, COLLECTION_FRIENDS_ID, [
    Query.equal('sender', [senderId, targetId]),
    Query.equal('receiver', [senderId, targetId]),
  ]);

  console.log(payload);
  console.log({ senderId, targetId });
  console.log(requests);

  switch (requests.total) {
    // Send request
    case 0: {
      await databases.createDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, ID.unique(), {
        sender: senderId,
        receiver: targetId,
        accepted: false,
      });
      return response.json({ data: { success: true } });
    }
    // Accept request
    case 1: {
      const friendRequest = requests.documents[0];

      if (friendRequest.accepted) {
        throw new Error('Already friends');
      }

      if (friendRequest.sender === targetId) {
        await databases.updateDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, friendRequest.$id, {
          accepted: true,
        });
        return response.json({ data: { success: true } });
      } else {
        return response.json({ message: 'Already requested' });
      }
    }
    default:
      throw new Error('Something is completly wrong here');
  }
};
