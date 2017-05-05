import {assert} from 'chai'

import RequestChain, {RequestDoesNotExist} from 'views/facades/RequestChain.js'

describe('RequestChain', function () {
  it('spec', function () {
    assert.typeOf(RequestChain, 'function')
    assert.typeOf(RequestDoesNotExist, 'function')

    const requestChain = new RequestChain()
    assert.typeOf(requestChain.request, 'function')
    const responseRequest = requestChain
      .request(() => {})
    assert.typeOf(responseRequest, 'number')

    assert.typeOf(requestChain.response, 'function')
    const responseResponse = requestChain
      .response(responseRequest, () => {})
    assert.typeOf(responseResponse, 'undefined')

    assert.typeOf(requestChain.isEmpty, 'function')
    const responseisEmpty = requestChain
      .isEmpty()
    assert.typeOf(responseisEmpty, 'boolean')
  })

  it('#isEmpty', function () {
    const requestChain = new RequestChain()
    assert.isTrue(requestChain.isEmpty())

    const id = requestChain.request(() => {})
    assert.isFalse(requestChain.isEmpty())
    requestChain.response(id, () => {})
  })

  it('returns the response data', function (done) {
    const chain = new RequestChain()
    const responses = []
    const someResponse1 = 'I am the first response'
    const someResponse2 = 'I am the second response'
    const req1 = chain.request((err, res) => {
      if (err) {
        assert(false, 'error')
      }
      responses.push(res)
      response()
    })
    const req2 = chain.request((err, res) => {
      if (err) {
        assert(false, 'error')
      }
      responses.push(res)
      response()
    })

    chain.response(req2, [undefined, someResponse2])
    chain.response(req1, [undefined, someResponse1])

    function response () {
      if (responses.length < 2) {
        return
      }
      assert.deepEqual(responses, [
        someResponse1,
        someResponse2
      ])
      done()
    }
  })

  it('delays response until it is the oldest', function (done) {
    const chain = new RequestChain()
    const order = []
    const req1 = chain.request(() => {
      order.push(1)
      response()
    })
    const req2 = chain.request(() => {
      order.push(2)
      response()
    })
    const req3 = chain.request(() => {
      order.push(3)
      response()
    })
    chain.response(req2, [undefined, undefined])
    chain.response(req3, [undefined, undefined])
    chain.response(req1, [undefined, undefined])

    function response () {
      if (order.length < 3) {
        return
      }
      assert.deepEqual(order, [1, 2, 3])
      done()
    }
  })
})
