import {assert} from 'chai';

import {
  cutMerge,
  fiftyFifty,
  randomRange
} from '../../src/ts/classes/helpers';

describe('Helpers', () => {

  describe('#cutMerge', () => {

    it('spec', () => {
      assert.isFunction(cutMerge);

      assert.isArray(cutMerge([], []));
    })

    it('functionality', () => {
      // TODO
      assert.isTrue(true);
    })

  })

  describe('#fiftyFifty', () => {

    it('spec', () => {
      assert.isFunction(fiftyFifty);
      
      assert.isBoolean(fiftyFifty());
    })

  })

  describe('#randomRange', () => {

    it('spec', () => {
      assert.isFunction(randomRange);

      assert.isNumber(randomRange(0, 11));
    })

    it('functionality', () => {
      for(let i = 0; i < 100; i++) {
        assert.approximately(randomRange(0, 11), 5, 5);
      }
    })

  })

})