const { Client, Databases, Query } = require('node-appwrite');

module.exports = async function (request, response) {
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

  const DATABASE_ID = request.variables['DATABASE_ID'];
  const COLLECTION_FRIENDS_ID = request.variables['COLLECTION_FRIENDS_ID'];

  const client = new Client()
    .setEndpoint(request.variables['APPWRITE_FUNCTION_ENDPOINT'])
    .setProject(request.variables['APPWRITE_FUNCTION_PROJECT_ID'])
    .setKey(request.variables['APPWRITE_FUNCTION_API_KEY']);
  const databases = new Databases(client);

  const senderId = request.variables['APPWRITE_FUNCTION_USER_ID'];

  const outgoing = await databases.listDocuments(DATABASE_ID, COLLECTION_FRIENDS_ID, [
    Query.equal('sender', senderId),
    Query.equal('accepted', false),
  ]);
  const incoming = await databases.listDocuments(DATABASE_ID, COLLECTION_FRIENDS_ID, [
    Query.equal('receiver', senderId),
    Query.equal('accepted', false),
  ]);

  console.log({ senderId });
  console.log({ incoming, outgoing });

  response.json({
    data: {
      outgoing: outgoing.documents.map((x) => x.receiver),
      incoming: incoming.documents.map((x) => x.sender),
    },
  });
};
