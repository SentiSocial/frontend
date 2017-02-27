import {assert} from 'chai';

import {
  InfiniteScroll
} from '../../src/ts/classes/infinitescroll';

import {
  fakeWindow
} from '../fixtures/fakewindow';

describe('InfiniteScroll', function() {

  it('spec', function() {
    assert.typeOf(InfiniteScroll, 'function');
    
    const infiniteScroll = new InfiniteScroll(fakeWindow, ()=>{});
    assert.typeOf(infiniteScroll.mount, 'function');
    assert.typeOf(infiniteScroll.unmount, 'function');
    assert.typeOf(infiniteScroll.pause, 'function');
    assert.typeOf(infiniteScroll.resume, 'function');
  })

  it('does not callback if .mount() was not invoked', function(done) {
    let counter = 0;
    
    const infiniteScroll = new InfiniteScroll(fakeWindow, () => {
      assert(false, 'should not callback');
    });
    
    fakeWindow.innerHeight = 250;
    fakeWindow.document.body.scrollHeight = 1000;
    fakeWindow.document.body.setScrollTop(1000);
    done();
  })

  it('initially requires .resume() to callback', function(done) {
    const infiniteScroll = new InfiniteScroll(fakeWindow, () => {
      assert(false, 'should not callback')
    });

    infiniteScroll.mount();
    fakeWindow.innerHeight = 250;
    fakeWindow.document.body.scrollHeight = 1000;
    fakeWindow.document.body.setScrollTop(1000);
    done();
  })

  it('calls back when user reaches end of document', function(done) {
    const infiniteScroll = new InfiniteScroll(fakeWindow, () => {
      done();
    });

    infiniteScroll.mount();
    fakeWindow.innerHeight = 250;
    fakeWindow.document.body.scrollHeight = 1000;
    infiniteScroll.resume();
    fakeWindow.document.body.setScrollTop(1000);
  })

  it('callbacks when viewport is 200vh from end', function(done) {
    const infiniteScroll = new InfiniteScroll(fakeWindow, () => {
      done();
    });

    infiniteScroll.mount();
    fakeWindow.innerHeight = 250;
    fakeWindow.document.body.scrollHeight = 1000;
    infiniteScroll.resume();
    fakeWindow.document.body.setScrollTop(500);
  })

  it('does not pause after callback', function(done) {
    let counter = 0;
    
    const infiniteScroll = new InfiniteScroll(fakeWindow, () => {
      counter += 1;
      if (counter < 2) {
        done();
      } else {
        setTimeout(() => {
          assert(false, 'should callback twice');
        }, 25);
      }
    });

    infiniteScroll.mount();
    fakeWindow.innerHeight = 250;
    fakeWindow.document.body.scrollHeight = 1000;
    infiniteScroll.resume();
    fakeWindow.document.body.setScrollTop(900);
    // You should manually pause the infinite scroll when you make a request
    // Resume it when the response arrives.
    fakeWindow.document.body.setScrollTop(1000);
  })

  it('does not callback if .unmount() is invoked', function(done) {
    let counter = 0;
    
    const infiniteScroll = new InfiniteScroll(fakeWindow, () => {
      assert(false, 'should not callback');
    });

    fakeWindow.innerHeight = 250;
    fakeWindow.document.body.scrollHeight = 1000;
    fakeWindow.document.body.setScrollTop(1000);
    done();
  })

})