const { Client, Databases, Users, Query } = require('node-appwrite');

module.exports = async function (request, response) {
  if (
    [
      'DATABASE_ID',
      'COLLECTION_FRIENDS_ID',
      'COLLECTION_LOCATIONS_ID',
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
  const COLLECTION_LOCATIONS_ID = request.variables['COLLECTION_LOCATIONS_ID'];

  const client = new Client()
    .setEndpoint(request.variables['APPWRITE_FUNCTION_ENDPOINT'])
    .setProject(request.variables['APPWRITE_FUNCTION_PROJECT_ID'])
    .setKey(request.variables['APPWRITE_FUNCTION_API_KEY']);
  const users = new Users(client);
  const databases = new Databases(client);

  const senderId = request.variables['APPWRITE_FUNCTION_USER_ID'];

  const outgoing = await databases.listDocuments(DATABASE_ID, COLLECTION_FRIENDS_ID, [
    Query.equal('sender', senderId),
    Query.equal('accepted', true),
  ]);
  const incoming = await databases.listDocuments(DATABASE_ID, COLLECTION_FRIENDS_ID, [
    Query.equal('receiver', senderId),
    Query.equal('accepted', true),
  ]);
  const ids = [
    ...outgoing.documents.map((x) => x.receiver),
    ...incoming.documents.map((x) => x.sender),
  ];

  console.log({ senderId });
  console.log(ids);

  const friends = await Promise.all(
    ids.map(async (id) => {
      const friend = await users.get(id);
      const location = await databases.getDocument(DATABASE_ID, COLLECTION_LOCATIONS_ID, id);

      return {
        name: friend.name,
        lastLocationUpdate: location.timestamp,
        location: location,
      };
    })
  );

  response.json({ data: { friends: friends ?? [] } });
};
