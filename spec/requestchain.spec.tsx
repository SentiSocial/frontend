import {assert} from 'chai';

import {RequestChain} from '../src/ts/classes/requestchain.tsx';

describe('RequestChain', () => {
  it('returns the response data', done => {
    const chain = new RequestChain();
    const responses = [];
    const someResponse1 = 'I am the first response';
    const someResponse2 = 'I am the second response';
    const req1 = chain.register((err, res) => {
      responses.push(res);
      response();
    });
    const req2 = chain.register((err, res) => {
      responses.push(res);
      response();
    });

    chain.response(req2, [undefined, someResponse2]);
    chain.response(req1, [undefined, someResponse1]);

    function response() {
      if (responses.length < 2) {
        return;
      }
      assert.deepEqual(responses, [
        someResponse1,
        someResponse2
      ]);
      done();
    }
  })

  it('delays response until it is the oldest', done => {
    const chain = new RequestChain();
    const order = [];
    const req1 = chain.register(() => {
      order.push(1);
      response();
    });
    const req2 = chain.register(() => {
      order.push(2);
      response();
    });
    const req3 = chain.register(() => {
      order.push(3);
      response();
    });
    chain.response(req2, [undefined, undefined]);
    chain.response(req3, [undefined, undefined]);
    chain.response(req1, [undefined, undefined]);

    function response() {
      if (order.length < 3) {
        return;
      }
      assert.deepEqual(order, [1,2,3]);
      done();
    }
  })
})
