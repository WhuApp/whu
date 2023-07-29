const { Client, Databases, Users, Query } = require('node-appwrite');

module.exports = async function (request, response) {
  // Check if everything is set up correctly
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

  const database = request.variables['DATABASE_ID'];
  const friendsCollection = request.variables['COLLECTION_FRIENDS_ID'];
  const client = new Client();
  const databases = new Databases(client);
  const users = new Users(client);

  client
    .setEndpoint(request.variables['APPWRITE_FUNCTION_ENDPOINT'])
    .setProject(request.variables['APPWRITE_FUNCTION_PROJECT_ID'])
    .setKey(request.variables['APPWRITE_FUNCTION_API_KEY']);

  //sender
  const senderId = request.variables['APPWRITE_FUNCTION_USER_ID'];
  const sender = await users.get(senderId).catch(() => {
    console.log('sender:', senderId);
    throw new Error('Sender not found');
  });

  // Find incoming & outgoing requests
  const outgoing = await databases.listDocuments(database, friendsCollection, [
    Query.equal('sender', sender.$id),
    Query.equal('accepted', false),
  ]);
  const incoming = await databases.listDocuments(database, friendsCollection, [
    Query.equal('receiver', sender.$id),
    Query.equal('accepted', false),
  ]);

  response.json({
    data: {
      outgoing: outgoing.documents.map((x) => x.receiver),
      incoming: incoming.documents.map((x) => x.sender),
    },
  });
};
