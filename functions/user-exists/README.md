# user-exists

## 🤖 Documentation

This function is used to check if a username exists.

_Input:_

```ts
{
  name: string;
}
```

_Output:_

```ts
{
  data: {
    exists: boolean,
  } | undefined,
  message: string | undefined; // Error
}
```

## 📝 Environment Variables

List of environment variables used by this cloud function:

- **APPWRITE_FUNCTION_PROJECT_ID** - ID of Appwrite project
- **APPWRITE_FUNCTION_ENDPOINT** - Endpoint of Appwrite project
- **APPWRITE_FUNCTION_API_KEY** - Appwrite API Key

## 🚀 Deployment

### Using CLI

Make sure you are in the same folder as your `appwrite.json` file and run `appwrite deploy function` to deploy your function. You will be prompted to select which functions you want to deploy.
