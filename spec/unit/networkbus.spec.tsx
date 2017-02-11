import {assert} from 'chai';
import {fakeFetch} from '../fixtures/fakefetch';

import {
  NetworkBus,
  APIURL,
  VERSION
} from '../../src/ts/classes/networkbus';

import {
  AllTrends
} from '../../src/ts/types/alltrends';

describe('NetworkBus', () => {
  const endpoint = `${APIURL}/${VERSION}`;

  it('spec', () => {
    assert.typeOf(NetworkBus, 'function');

    const networkBus = new NetworkBus(fakeFetch);
    assert.typeOf(networkBus.fetchAllTrends, 'function');
    assert.typeOf(networkBus.fetchTrend, 'function');
    assert.typeOf(networkBus.fetchTrendArticles, 'function');
    assert.typeOf(networkBus.fetchTrendTweets, 'function');
  })

  it('fetches /v1/alltrends', () => {
    const fakeFetch = url => {
      assert.equal(url, `${endpoint}/alltrends`);
      return new Promise(function(resolve) {});
    };

    const networkBus = new NetworkBus(fakeFetch);
    networkBus.fetchAllTrends(() => {});
  })

  it('parses /v1/alltrends into AllTrends', () => {
    const someResponse = {
      trends: [{
        'name': 'Jerusalem',
        'sentiment': -3.6
      },{
        'name': 'Martin Shkreli',
        'sentiment': -2.2
      }]
    };

    const fakeFetch = url => {
      assert.equal(url, `${endpoint}/alltrends`);
      return new Promise(function(resolve) {
        resolve({
          json: () => Promise.resolve(someResponse)
        })
      });
    };

    const networkBus = new NetworkBus(fakeFetch);
    networkBus.fetchAllTrends((error, response) => {
      assert.equal(response, new AllTrends(someResponse));
    });
  })

  it('fetches /v1/trend/{name}', () => {
    const someTrend = 'Jerusalem';

    const fakeFetch = url => {
      assert.equal(url, `${endpoint}/trend/${someTrend}`);
      return new Promise(function(resolve) {});
    };

    const networkBus = new NetworkBus(fakeFetch);
    networkBus.fetchTrend(() => {}, someTrend);
  })

  it('fetches /v1/trend/{name}/tweets?limit', () => {
    const someTrend = 'Jerusalem';
    const someLimit = 3;

    const fakeFetch = url => {
      assert.equal(url, `${endpoint}/trend/${someTrend}/tweets?limit=${someLimit}`);
      return new Promise(function(resolve) {});
    };

    const networkBus = new NetworkBus(fakeFetch);
    networkBus.fetchTrendTweets(() => {}, someTrend, someLimit, undefined);
  })

  it('fetches /v1/trend/{name}/tweets?limit&max_id', () => {
    const someTrend = 'Jerusalem';
    const someLimit = 3;
    const someMaxId = 'ABC123';

    const fakeFetch = url => {
      assert.equal(url, `${endpoint}/trend/${someTrend}/tweets?limit=${someLimit}&max_id=${someMaxId}`);
      return new Promise(function(resolve) {});
    };

    const networkBus = new NetworkBus(fakeFetch);
    networkBus.fetchTrendTweets(() => {}, someTrend, someLimit, someMaxId);
  })
})
