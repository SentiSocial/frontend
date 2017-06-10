import {h, render} from 'preact'
import chai, {assert} from 'chai'
import preactAssert from 'preact-jsx-chai'

describe('store', function () {
  it('specification', function () {
    const store = require('src/store').default
    assert.isObject(store)
    assert.isFunction(store.dispatch)
    assert.isFunction(store.subscribe)
    assert.isFunction(store.getState)
    assert.isFunction(store.replaceReducer)
  })
})
