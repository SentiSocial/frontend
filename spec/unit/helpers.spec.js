import {assert} from 'chai'

import {
  cutMerge,
  fiftyFifty,
  randomRange
} from 'views/classes/helpers.js'

describe('Helpers', () => {
  it('#cutMerge spec', () => {
    assert.isFunction(cutMerge)

    assert.isArray(cutMerge([], []))
  })

  it('#cutMerge functionality', () => {
    // TODO
    assert.isTrue(true)
  })

  it('#fiftyFifty spec', () => {
    assert.isFunction(fiftyFifty)

    assert.isBoolean(fiftyFifty())
  })

  it('#randomRange spec', () => {
    assert.isFunction(randomRange)

    assert.isNumber(randomRange(0, 11))
  })

  it('#randomRange functionality', () => {
    for (let i = 0; i < 100; i++) {
      assert.approximately(randomRange(0, 11), 5, 5)
    }
  })
})
