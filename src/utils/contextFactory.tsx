import React, { createContext, useContext, useMemo, useState } from 'react';

import { IPropChild } from './types';

interface IStore<T> {
    key: string;
    store: T;
    setStore: (payload: Partial<T>) => void;
}

function getContextProvider<T>(key: string, defaultValue: T, AppContext: React.Context<IStore<T>>) {
    return ({ children }: IPropChild) => {
        const [store, setStore] = useState(defaultValue);
        const value = useMemo(
            () => ({
                key,
                store,
                setStore: (payload = {}) =>
                    setStore((state) => ({
                        ...state,
                        ...payload,
                    })),
            }),
            [store],
        );

        return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
    };
}

const contextCache: Record<string, StoreContext> = {};

class StoreContext<T = any> {
    defaultStore: IStore<T>;

    AppContext: React.Context<IStore<T>>;

    Provider: ({ children }: IPropChild) => JSX.Element;

    constructor(key: string, defaultValue: T) {
        this.defaultStore = {
            key,
            store: defaultValue,
            setStore: () => {},
        };
        this.AppContext = createContext(this.defaultStore);
        this.Provider = getContextProvider(key, defaultValue, this.AppContext);
        contextCache[key] = this;
    }
}

export function useAppContext<T>(key: string) {
    const context = contextCache[key] as StoreContext<T>;
    const app = useContext(context.AppContext);
    return {
        store: app.store,
        setStore: app.setStore,
    };
}

export function connectFactory<T>(key: string, defaultValue: T) {
    const context = contextCache[key];
    const ProviderContext = context || new StoreContext<T>(key, defaultValue);
    return (Child: React.FunctionComponent<any>) => (props: any) => (
        <ProviderContext.Provider>
            <Child {...props} />
        </ProviderContext.Provider>
    );
}
