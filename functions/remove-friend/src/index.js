const { Client, Databases, Users, Query } = require('node-appwrite');

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

  const friendships = await databases.listDocuments(DATABASE_ID, COLLECTION_FRIENDS_ID, [
    Query.equal('sender', [senderId, targetId]),
    Query.equal('receiver', [senderId, targetId]),
  ]);

  console.log(payload);
  console.log({ senderId, targetId });
  console.log(friendships);

  switch (friendships.total) {
    case 0:
      throw new Error('No friendship or request found');
    case 1: {
      await databases.deleteDocument(
        DATABASE_ID,
        COLLECTION_FRIENDS_ID,
        friendships.documents[0].$id
      );
      return response.json({ data: { success: true } });
    }
    default:
      throw new Error('Something is completly wrong here');
  }
};
