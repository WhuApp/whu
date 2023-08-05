# get-friend-requests

## 🤖 Documentation

This function is used to get all friend request of the sender.

_Input:_

This function expects no input.

_Output:_

```ts
{
  data: {
    incoming: string[], // IDs of incoming requests
    outgoing: string[], // IDs of outgoing requests
  },
}
```

## 📝 Environment Variables

List of environment variables used by this cloud function:

- **APPWRITE_FUNCTION_PROJECT_ID** - ID of Appwrite project
- **APPWRITE_FUNCTION_ENDPOINT** - Endpoint of Appwrite project
- **APPWRITE_FUNCTION_API_KEY** - Appwrite API Key
- **DATABASE_ID** - ID of database
- **COLLECTION_FRIENDS_ID** - ID of friends collection

## 🚀 Deployment

### Using CLI

Make sure you are in the same folder as your `appwrite.json` file and run `appwrite deploy function` to deploy your function. You will be prompted to select which functions you want to deploy.
