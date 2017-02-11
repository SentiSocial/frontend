import {assert} from 'chai';

import {
  InfiniteScroll
} from '../../src/ts/classes/infinitescroll';

import {
  fakeWindow
} from '../fixtures/fakewindow';

describe('InfiniteScroll', () => {

  it('spec', () => {
    assert.typeOf(InfiniteScroll, 'function');
    
    const infiniteScroll = new InfiniteScroll(fakeWindow, ()=>{});
    assert.typeOf(infiniteScroll.mount, 'function');
    assert.typeOf(infiniteScroll.unmount, 'function');
  })

  it('calls back when user reaches end of document', done => {
    const infiniteScroll = new InfiniteScroll(fakeWindow, () => {
      done();
    });

    infiniteScroll.mount();
    fakeWindow.innerHeight = 250;
    fakeWindow.document.body.scrollHeight = 1000;
    fakeWindow.document.body.setScrollTop(1000);
  })

  it('calls back again after waiting 1 second', done => {
    let counter = 0;
    
    const infiniteScroll = new InfiniteScroll(fakeWindow, () => {
      counter += 1;
      if (counter < 2) {
        return;
      }

      done();
    });

    infiniteScroll.mount();
    fakeWindow.innerHeight = 250;
    fakeWindow.document.body.scrollHeight = 1000;
    fakeWindow.document.body.setScrollTop(500);
    setTimeout(() => {
      fakeWindow.document.body.setScrollTop(750);
    }, 1000);
  })

})