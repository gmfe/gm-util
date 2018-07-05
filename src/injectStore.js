import React from 'react'

export default function injectStore (store) {
  console.warn('injectStore 没意义，已废弃。 请在 react 内直接使用 store！')

  return function withStoreComponent (Component) {
    return (props) => <Component {...props} {...store} />
  }
}
