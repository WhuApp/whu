import { pipe, tap } from 'wonka';
import { Exchange, Operation } from '@urql/core';
import { AppState } from 'react-native';

// prettier-ignore
export const refocusExchange = (): Exchange => ({ client, forward }) => (ops$) => {
  const watchedOperations = new Map<number, Operation>();
  const observedOperations = new Map<number, number>();

  let appState = AppState.currentState;

  AppState.addEventListener('change', (nextAppState) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
      watchedOperations.forEach((op) => {
        client.reexecuteOperation(
          client.createRequestOperation('query', op, {
            requestPolicy: 'cache-and-network',
          }),
        );
      });
    }

    appState = nextAppState;
  });

  const processIncomingOperation = (op: Operation) => {
    if (op.kind === 'query' && !observedOperations.has(op.key)) {
      observedOperations.set(op.key, 1);
      watchedOperations.set(op.key, op);
    }

    if (op.kind === 'teardown' && observedOperations.has(op.key)) {
      observedOperations.delete(op.key);
      watchedOperations.delete(op.key);
    }
  };

  return forward(pipe(ops$, tap(processIncomingOperation)));
};