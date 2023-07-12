const sdk = require('node-appwrite');

/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - request body data as a string
    'variables' - object with function variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/

module.exports = async function (req, res) {
  const client = new sdk.Client();

  
  // You can remove services you don't use
  const account = new sdk.Account(client);
  const avatars = new sdk.Avatars(client);
  const database = new sdk.Databases(client);
  const functions = new sdk.Functions(client);
  const health = new sdk.Health(client);
  const locale = new sdk.Locale(client);
  const storage = new sdk.Storage(client);
  const teams = new sdk.Teams(client);
  const users = new sdk.Users(client);

  if (
    !req.variables['APPWRITE_FUNCTION_ENDPOINT'] ||
    !req.variables['APPWRITE_FUNCTION_API_KEY']
  ) {
    console.warn('Environment variables are not set. Function cannot use Appwrite SDK.');
  } else {
    client
      .setEndpoint(req.variables['APPWRITE_FUNCTION_ENDPOINT'])
      .setProject(req.variables['APPWRITE_FUNCTION_PROJECT_ID'])
      .setKey(req.variables['APPWRITE_FUNCTION_API_KEY'])
      .setSelfSigned(true);
  }

  const payload = JSON.parse(req.payload);
  const DATABASE_ID = req.variables['DATABASE_ID'];
  const COLLECTION_FRIENDS_ID = req.variables['COLLECTION_FRIENDS_ID'];
  let senderId = req.variables['APPWRITE_FUNCTION_USER_ID'];
  const receiverId = payload.receiver;

  await users.get(senderId).catch(() => { 
    console.log('using payload instead of sender');
    senderId = payload.sender;
    users.get(senderId).catch(() => res.json({ success: false, error: 'Sender not found' }));
  });
  
  await users.get(receiverId).catch(() => res.json({ success: false, error: 'Receiver not found' }));

  if (senderId === receiverId) res.json({ success: false, error: 'Can not be friends with yourself' });
  
  const other = await database.listDocuments(
    DATABASE_ID, 
    COLLECTION_FRIENDS_ID,
    [
      sdk.Query.equal('sender', [senderId, receiverId]),
      sdk.Query.equal('receiver', [senderId, receiverId]),
    ],
  ).catch(() => { return undefined });

  //assert other.size <= 1

  if (!other) {
    const id = sdk.ID.unique();
    await database.createDocument(
      DATABASE_ID, 
      COLLECTION_FRIENDS_ID, 
      id, 
      {
        sender: senderId,
        receiver: receiverId,
        accepted: false,
      },
      [
        sdk.Permission.read(sdk.Role.user(senderId)),
        sdk.Permission.read(sdk.Role.user(receiverId)),
        sdk.Permission.delete(sdk.Role.user(senderId)),
        sdk.Permission.delete(sdk.Role.user(receiverId)),    
      ]
    ).then(
      () => res.json({ success: true, error: undefined }),
      (reason) => {
        database.deleteDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, id);
        res.json({ success: false, error: `Failed to setup ${id} because ${reason}`});
      }
    );
  }

  if (other[0].sender === senderId) res.json({ success: false, error: 'Already requested' });

  if (other[0].sender === receiverId) {
    //assert other[0].receiver === senderId
    await database.updateDocument(
      DATABASE_ID,
      COLLECTION_FRIENDS_ID,
      other[0].$id,
      { accepted: true },
    ).then(
      () => res.json({ success: true, error: undefined}),
      (reason) => {
        database.updateDocument(DATABASE_ID, COLLECTION_FRIENDS_ID, other[0].$id, other[0]);
        res.json({ success: false, error: `Failed to setup ${id} because ${reason}`});
      }
    );
  }
};
