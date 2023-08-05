# add-friend

## 🤖 Documentation

This function is either used to send or to accept a friend request.

_Input:_

```ts
{
  target: string; // ID
}
```

_Output:_

```ts
{
  data: {
    success: boolean,
  } | undefined,
  message: string | undefined, // Error
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
