import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createId as cuid } from '@paralleldrive/cuid2';

import type {
  ClientOptions,
  IframeClientType,
} from '~/services/libs/iframe-client';
import { getTargetElement } from '~/libs/browser-utils/dom';
import { useMemoizedFn } from '~/libs/hooks/useMemoizedFn';
import { useUnmount } from '~/libs/hooks/useUnmount';
import { generateUniqueId } from '~/services/libs';
import {
  type ListenerFunction,
  type UnsubscribeFunction,
} from '~/services/libs/iframe';
import { IframeClient } from '~/services/libs/iframe-client';

interface UseIframeProps {
  ref: React.RefObject<HTMLElement>;
  timeout?: number;
  options?: ClientOptions;
}

export type Status = 'initial' | 'idle' | 'running' | 'timeout' | 'done';

export function useIframe({ ref, options, timeout = 5000 }: UseIframeProps) {
  const clientId = useRef(cuid());
  const clients = useRef<Record<string, IframeClientType>>({});

  const [status, setStatus] = useState<Status>('initial');
  const timeoutHook = useRef<ReturnType<typeof setTimeout> | null>(null);

  const unsubscribeClientListeners = useRef<
    Record<string, Record<string, UnsubscribeFunction>>
  >({});
  const unsubscribe = useRef<() => void | undefined>();
  const queuedListeners = useRef<
    Record<string, Record<string, ListenerFunction>>
  >({ global: {} });

  const registeredIframes = useRef<Record<string, { iframe: HTMLElement }>>({});

  const handleMessage = (msg: Record<string, unknown>): void => {
    console.log('Message from iframe:', msg);
  };

  const unregisterClient = (clientId: string): void => {
    const client = clients.current[clientId];
    if (client) {
      client.destroy();
      client.iframe.contentWindow?.location.replace('about:blank');
      client.iframe.removeAttribute('src');
      delete clients.current[clientId];
    } else {
      delete registeredIframes.current[clientId];
    }

    if (timeoutHook.current) {
      clearTimeout(timeoutHook.current);
    }

    const unsubscribeQueuedClients = Object.values(
      unsubscribeClientListeners.current[clientId] ?? {},
    );

    // Unsubscribing all listener registered
    unsubscribeQueuedClients.forEach((listenerOfClient) => {
      const listenerFunctions = Object.values(listenerOfClient);
      listenerFunctions.forEach((unsubscribe) => unsubscribe());
    });

    // Keep running if it still have clients
    const status = Object.keys(clients.current).length > 0 ? 'running' : 'idle';

    setStatus(status);
  };

  const unregisterAllClients = useCallback((): void => {
    Object.keys(clients.current).map(unregisterClient);

    if (typeof unsubscribe.current === 'function') {
      unsubscribe.current();
      unsubscribe.current = undefined;
    }
  }, []);

  const createIframeClient = useCallback(
    (iframe: HTMLElement, clientId: string) => {
      // Clean up any existing clients that
      // have been created with the given id
      if (clients.current[clientId]) {
        clients.current[clientId].destroy();
      }

      if (timeoutHook.current) {
        clearTimeout(timeoutHook.current);
      }

      /**
       * Subscribe inside the context with the first client that gets instantiated.
       * This subscription is for global states like error and timeout, so no need for a per client listen
       * Also, set the timeout timer only when the first client is instantiated
       */
      const shouldSetTimeout = typeof unsubscribe.current !== 'function';

      if (shouldSetTimeout) {
        timeoutHook.current = setTimeout(() => {
          unregisterAllClients();
          setStatus('timeout');
        }, timeout);
      }

      const client = new IframeClient(iframe, options);

      if (typeof unsubscribe.current !== 'function') {
        unsubscribe.current = client.listen(handleMessage);
      }

      unsubscribeClientListeners.current[clientId] =
        unsubscribeClientListeners.current[clientId] || {};

      /**
       * Register any potential listeners that subscribed before sandpack ran
       */
      if (queuedListeners.current[clientId]) {
        Object.keys(queuedListeners.current[clientId]).forEach((listenerId) => {
          const listener = queuedListeners.current[clientId][listenerId];
          const unsubscribe = client.listen(listener) as () => void;
          unsubscribeClientListeners.current[clientId][listenerId] =
            unsubscribe;
        });

        // Clear the queued listeners after they were registered
        queuedListeners.current[clientId] = {};
      }

      /**
       * Register global listeners
       */
      const globalListeners = Object.entries(queuedListeners.current.global);
      globalListeners.forEach(([listenerId, listener]) => {
        const unsubscribe = client.listen(listener) as () => void;
        unsubscribeClientListeners.current[clientId][listenerId] = unsubscribe;

        /**
         * Important: Do not clean the global queue
         * Instead of cleaning the queue, keep it there for the
         * following clients that might be created
         */
      });

      clients.current[clientId] = client;
    },
    [options, timeout, unregisterAllClients],
  );

  const runClients = useCallback(() => {
    Object.entries(registeredIframes.current).map(([clientId, { iframe }]) => {
      createIframeClient(iframe, clientId);
    });

    setStatus('running');
  }, [createIframeClient]);

  const registerClient = useCallback(
    async (iframe: HTMLElement, clientId: string): Promise<void> => {
      // Store the iframe info so it can be
      // used later to manually run sandpack
      registeredIframes.current[clientId] = {
        iframe,
      };

      if (status === 'running') {
        createIframeClient(iframe, clientId);
      } else if (status === 'initial') {
        runClients();
      }
    },
    [createIframeClient, runClients, status],
  );

  const addListener = (
    listener: ListenerFunction,
    clientId?: string,
  ): UnsubscribeFunction => {
    if (clientId) {
      if (clients.current[clientId]) {
        const unsubscribeListener = clients.current[clientId].listen(listener);

        return unsubscribeListener;
      } else {
        /**
         * When listeners are added before the client is instantiated, they are stored with an unique id
         * When the client is eventually instantiated, the listeners are registered on the spot
         * Their unsubscribe functions are stored in unsubscribeClientListeners for future cleanup
         */
        const listenerId = generateUniqueId();
        queuedListeners.current[clientId] =
          queuedListeners.current[clientId] || {};
        unsubscribeClientListeners.current[clientId] =
          unsubscribeClientListeners.current[clientId] || {};

        queuedListeners.current[clientId][listenerId] = listener;

        const unsubscribeListener = (): void => {
          if (queuedListeners.current[clientId][listenerId]) {
            /**
             * Unsubscribe was called before the client was instantiated
             * common example - a component with autorun=false that unmounted
             */
            delete queuedListeners.current[clientId][listenerId];
          } else if (unsubscribeClientListeners.current[clientId][listenerId]) {
            /**
             * unsubscribe was called for a listener that got added before the client was instantiated
             * call the unsubscribe function and remove it from memory
             */
            unsubscribeClientListeners.current[clientId][listenerId]();
            delete unsubscribeClientListeners.current[clientId][listenerId];
          }
        };

        return unsubscribeListener;
      }
    } else {
      // Push to the **global** queue
      const listenerId = generateUniqueId();
      queuedListeners.current.global[listenerId] = listener;

      // Add to the current clients
      const clientsList = Object.values(clients.current);
      const currentClientUnsubscribeListeners = clientsList.map((client) =>
        client.listen(listener),
      );

      const unsubscribeListener = (): void => {
        // Unsubscribing from the clients already created
        currentClientUnsubscribeListeners.forEach((unsubscribe) =>
          unsubscribe(),
        );

        delete queuedListeners.current.global[listenerId];

        // Unsubscribe in case it was added later from `global`
        Object.values(unsubscribeClientListeners.current).forEach((client) => {
          client?.[listenerId]?.();
        });
      };

      return unsubscribeListener;
    }
  };

  const dispatchMessage = (
    message: Record<string, unknown>,
    clientId?: string,
  ): void => {
    if (status !== 'running') {
      return;
    }

    if (clientId) {
      clients.current[clientId].dispatch(message);
    } else {
      Object.values(clients.current).forEach((client) => {
        client.dispatch(message);
      });
    }
  };

  useEffect(() => {
    const element = getTargetElement(ref);
    if (!element) {
      return;
    }

    registerClient(element, clientId.current);
  }, [ref, registerClient]);

  useUnmount(() => {
    if (typeof unsubscribe.current === 'function') {
      unsubscribe.current();
    }

    if (timeoutHook.current) {
      clearTimeout(timeoutHook.current);
    }
  });

  return {
    status,
    get clients() {
      return clients.current;
    },
    get clientId() {
      return clientId.current;
    },
    get unsubscribeClientListeners() {
      return unsubscribeClientListeners.current;
    },
    get queuedListeners() {
      return queuedListeners.current;
    },
    runClients,
    registerClient,
    unregisterClient,
    addListener: useMemoizedFn(addListener),
    dispatchMessage: useMemoizedFn(dispatchMessage),
  };
}
