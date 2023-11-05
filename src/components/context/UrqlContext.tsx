import { Client, Provider as UrqlProvider, fetchExchange } from 'urql';
import { retryExchange } from '@urql/exchange-retry';
import { authExchange } from '@urql/exchange-auth';
import { useAuth0 } from 'react-native-auth0';
import { PropsWithChildren, useMemo } from 'react';
import { offlineExchange } from '@urql/exchange-graphcache';
import { refocusExchange } from '../../refocusExchange';
import { requestPolicyExchange } from '@urql/exchange-request-policy';
import { makeAsyncStorage } from '@urql/storage-rn';
import schema from '../../../graphql.schema.json';

const Component: React.FC<PropsWithChildren> = ({ children }) => {
  const { user, getCredentials } = useAuth0();

  const storage = makeAsyncStorage({
    dataKey: 'graphcache-data', // The AsyncStorage key used for the data (defaults to graphcache-data)
    metadataKey: 'graphcache-metadata', // The AsyncStorage key used for the metadata (defaults to graphcache-metadata)
    maxAge: 7, // How long to persist the data in storage (defaults to 7 days)
  });

  const client = useMemo(
    () =>
      new Client({
        url: 'https://api.whu.app/graphql',
        exchanges: [
          requestPolicyExchange({
            ttl: 30000, // be fairly aggressive about updates
          }),
          refocusExchange() as any, // for some reason TS complains about @urql/core.Exchange != urql.Exchange
          offlineExchange({
            schema: schema,
            storage: storage,
            keys: {
              Location(_) {
                return null;
              },
            },
            updates: {
              Mutation: {
                sendFriendRequest(_result, args, cache, _info) {
                  const outgoingKey = cache
                    .inspectFields('Query')
                    .find((f) => f.fieldName == 'outgoingFriendRequests');
                  if (outgoingKey) {
                    cache.invalidate('Query', outgoingKey.fieldName, outgoingKey.arguments);
                  }
                },
                acceptFriendRequest(_result, args, cache, _info) {
                  const incomingKey = cache
                    .inspectFields('Query')
                    .find((f) => f.fieldName == 'incomingFriendRequests');
                  if (incomingKey) {
                    cache.invalidate('Query', incomingKey.fieldName, incomingKey.arguments);
                  }

                  const outgoingKey = cache
                    .inspectFields('Query')
                    .find((f) => f.fieldName == 'outgoingFriendRequests');
                  if (outgoingKey) {
                    cache.invalidate('Query', outgoingKey.fieldName, outgoingKey.arguments);
                  }
                },
                ignoreFriendRequest(_result, args, cache, _info) {
                  const incomingKey = cache
                    .inspectFields('Query')
                    .find((f) => f.fieldName == 'incomingFriendRequests');
                  if (incomingKey) {
                    cache.invalidate('Query', incomingKey.fieldName, incomingKey.arguments);
                  }
                },
                cancelFriendRequest(_result, args, cache, _info) {
                  const outgoingKey = cache
                    .inspectFields('Query')
                    .find((f) => f.fieldName == 'outgoingFriendRequests');
                  if (outgoingKey) {
                    cache.invalidate('Query', outgoingKey.fieldName, outgoingKey.arguments);
                  }
                },
              },
            },
          }),
          retryExchange({
            initialDelayMs: 1000,
            maxDelayMs: 15000,
            randomDelay: true,
            maxNumberAttempts: 5,
            retryIf: (err) => !!(err && err.networkError),
          }),
          authExchange(async (utils) => {
            let credentials = await getCredentials();
            return {
              addAuthToOperation(operation) {
                if (!credentials.idToken) return operation;
                return utils.appendHeaders(operation, {
                  Authorization: `Bearer ${credentials.idToken}`,
                });
              },
              didAuthError(error, operation) {
                return error.graphQLErrors.some(
                  (e) => e.message === 'You have to be logged in to query this'
                );
              },
              async refreshAuth() {
                console.log('refreshing auth');
                credentials = await getCredentials(undefined, 30000);
              },
              willAuthError(_operation) {
                // Check expiry, adjusting for up to a second of clock skew
                return credentials.expiresAt > Date.now() - 1000;
              },
            };
          }),
          fetchExchange,
        ],
      }),
    [user]
  );

  return <UrqlProvider value={client}>{children}</UrqlProvider>;
};

export default Component;
