
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { createClient, defaultExchanges, subscriptionExchange } from 'urql';

export type ApiErrorAction = {
  error: string;
};

const subscriptionClient = new SubscriptionClient(
  'wss://react.eogresources.com/graphql',
  {
    reconnect: true,
    timeout: 20000
  }
);

export const apiClient = createClient({
  url: 'https://react.eogresources.com/graphql',
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation)
    })
  ]
});