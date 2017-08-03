import React from 'react';

export default function injectStore(store) {
    return function withStoreComponent(Component) {
        return (props) => <Component {...props} {...store}/>;
    };
}
