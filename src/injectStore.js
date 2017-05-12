import React from 'react';

export default function injectStore(store) {
    return function withStoreComponent(Component) {
        return () => <Component {...store}/>;
    };
}
