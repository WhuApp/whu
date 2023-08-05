# get-friends

## 🤖 Documentation

This function is used to get all friend objects of the sender.

_Input:_

This function expects no input.

_Output:_

```ts
{
  data: {
    friends: {
        id: string,
        name: string,
        lastLocationUpdate: number,
        location: Location,
    }[],
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
- **COLLECTION_LOCATIONS_ID** - ID of the locations collection

## 🚀 Deployment

### Using CLI

Make sure you are in the same folder as your `appwrite.json` file and run `appwrite deploy function` to deploy your function. You will be prompted to select which functions you want to deploy.
