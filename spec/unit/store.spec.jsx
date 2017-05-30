import {h, render} from 'preact'
import chai, {assert} from 'chai'
import preactAssert from 'preact-jsx-chai'

describe('store', function () {
  it('specification', function () {
    const store = require('src/store')
    assert.isObject(store)
    assert.isObject(store.default)
    assert.isFunction(store.default.dispatch)
    assert.isFunction(store.default.subscribe)
    assert.isFunction(store.default.getState)
    assert.isFunction(store.default.replaceReducer)
  })
})
