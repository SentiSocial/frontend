import {assert} from 'chai'

import InfiniteScroll from 'views/classes/infinitescroll.js'

import FakeWindow from '../fixtures/fakewindow.js'

describe('InfiniteScroll', function () {
  let fakeWindow
  let infiniteScroll

  beforeEach(function () {
    fakeWindow = new FakeWindow()
    infiniteScroll = undefined
  })

  it('spec', function () {
    assert.typeOf(InfiniteScroll, 'function')

    infiniteScroll = new InfiniteScroll(fakeWindow, () => {})
    assert.typeOf(infiniteScroll.mount, 'function')
    assert.typeOf(infiniteScroll.unmount, 'function')
    assert.typeOf(infiniteScroll.pause, 'function')
    assert.typeOf(infiniteScroll.resume, 'function')
  })

  it('does not callback if .mount() was not invoked', function (done) {
    infiniteScroll = new InfiniteScroll(fakeWindow, () => {
      assert(false, 'should not callback')
    })

    fakeWindow.innerHeight = 250
    fakeWindow.document.body.scrollHeight = 1000
    fakeWindow.document.body.setScrollTop(1000)
    done()
  })

  it('initially requires .resume() to callback', function (done) {
    infiniteScroll = new InfiniteScroll(fakeWindow, () => {
      assert(false, 'should not callback')
    })

    infiniteScroll.mount()
    fakeWindow.innerHeight = 250
    fakeWindow.document.body.scrollHeight = 1000
    fakeWindow.document.body.setScrollTop(1000)
    done()
  })

  it('calls back when user reaches end of document', function (done) {
    infiniteScroll = new InfiniteScroll(fakeWindow, () => {
      done()
    })

    infiniteScroll.mount()
    fakeWindow.innerHeight = 250
    fakeWindow.document.body.scrollHeight = 1000
    infiniteScroll.resume()
    fakeWindow.document.body.setScrollTop(1000)
  })

  it('callbacks when viewport is 200vh from end', function (done) {
    infiniteScroll = new InfiniteScroll(fakeWindow, () => {
      done()
    })

    infiniteScroll.mount()
    fakeWindow.innerHeight = 250
    fakeWindow.document.body.scrollHeight = 1000
    infiniteScroll.resume()
    fakeWindow.document.body.setScrollTop(500)
  })

  it('does not pause after callback', function (done) {
    let counter = 0

    infiniteScroll = new InfiniteScroll(fakeWindow, () => {
      counter += 1
      if (counter < 2) {
        done()
      } else {
        setTimeout(() => {
          assert(false, 'should callback twice')
        }, 25)
      }
    })

    infiniteScroll.mount()
    fakeWindow.innerHeight = 250
    fakeWindow.document.body.scrollHeight = 1000
    infiniteScroll.resume()
    fakeWindow.document.body.setScrollTop(900)
    // You should manually pause the infinite scroll when you make a request
    // Resume it when the response arrives.
    fakeWindow.document.body.setScrollTop(1000)
  })

  it('does not callback if .unmount() is invoked', function (done) {
    infiniteScroll = new InfiniteScroll(fakeWindow, () => {
      assert(false, 'should not callback')
    })

    fakeWindow.innerHeight = 250
    fakeWindow.document.body.scrollHeight = 1000
    fakeWindow.document.body.setScrollTop(1000)
    done()
  })
})
