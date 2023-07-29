const { Client, Databases, Users, Query, ID } = require('node-appwrite');

const addFriend = async (request, response) => {
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

  //receiver
  if (!request.payload) throw new Error('No payload provided');
  const payload = JSON.parse(request.payload);

  const emailOrName = payload.emailOrName;
  if (!emailOrName) return response.json({ message: 'No email or name provided' });

  const matchingName = await users.list([Query.equal('name', [emailOrName])]);
  const matchingMail = await users.list([Query.equal('email', [emailOrName])]);
  const matchingUsers = [].concat(matchingName.users).concat(matchingMail.users);

  if (matchingUsers.length === 0) {
    return response.json({ message: 'No user with this name found' });
  } else if (matchingUsers.length > 1) {
    console.log('More than one user share unique values', matchingUsers);
  }

  const receiver = matchingUsers[0];

  if (sender.$id === receiver.$id) {
    return response.json({ message: 'You can not be friends with yourself' });
  }

  // Check if a request exists
  const requests = await databases.listDocuments(database, friendsCollection, [
    Query.equal('sender', [sender.$id, receiver.$id]),
    Query.equal('receiver', [sender.$id, receiver.$id]),
  ]);

  // Create request
  switch (requests.total) {
    case 0:
      await databases.createDocument(database, friendsCollection, ID.unique(), {
        sender: sender.$id,
        receiver: receiver.$id,
        accepted: false,
      });
      return response.json({});

    case 1:
      const friendRequest = requests.documents[0];
      if (friendRequest.accepted) {
        return response.json({ message: 'You are already friends with this user' });
      }

      // Accept request
      if (friendRequest.sender === receiver.$id) {
        await databases.updateDocument(database, friendsCollection, friendRequest.$id, {
          accepted: true,
        });
        return response.json({});
      } else {
        return response.json({ message: 'You already sent this user a friendrequest' });
      }
    default:
      throw new Error('Something is completly wrong here!');
  }
};

module.exports = addFriend;
