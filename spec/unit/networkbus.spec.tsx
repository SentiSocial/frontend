import {assert} from 'chai';

import {
  NetworkBus,
  APIURL,
  VERSION
} from '../../src/ts/classes/networkbus';

import {
  AllTrends,
  AllTrendsTrend
} from '../../src/ts/types/alltrends';

import {
  Trend
} from '../../src/ts/types/trend';

import {
  Tweet
} from '../../src/ts/types/tweet';

import {
  Article
} from '../../src/ts/types/article';

describe('NetworkBus', function() {
  const endpoint = `${APIURL}/${VERSION}`;

  it('spec', function() {
    assert.typeOf(NetworkBus, 'function');

    const networkBus = new NetworkBus(undefined);
    assert.typeOf(networkBus.fetchAllTrends, 'function');
    assert.typeOf(networkBus.fetchTrend, 'function');
    assert.typeOf(networkBus.fetchTrendArticles, 'function');
    assert.typeOf(networkBus.fetchTrendTweets, 'function');
  })

  it('fetches /v1/alltrends', function(done) {
    const someResponse = {
      trends: []
    };

    const fakeFetch = url => {
      assert.equal(url, `${endpoint}/alltrends`);
      done();
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(someResponse)
      });
    };

    const networkBus = new NetworkBus(fakeFetch);
    networkBus.fetchAllTrends(() => {});
  })

  it('parses /v1/alltrends into AllTrends', function(done) {
    const someResponse = {
      trends: [{
        'name': 'Jerusalem',
        'sentiment': -3.6
      },{
        'name': 'Martin Shkreli',
        'sentiment': -2.2
      }]
    };

    const fakeFetch = url => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(someResponse)
    });

    const networkBus = new NetworkBus(fakeFetch);
    networkBus.fetchAllTrends((error, response) => {
      assert.instanceOf(response, AllTrends);
      assert.isArray(response.trends);
      response.trends.forEach((trend, i) => {
        assert.instanceOf(trend, AllTrendsTrend);
        assert.equal(trend.name, someResponse.trends[i].name);
        assert.equal(trend.sentiment, someResponse.trends[i].sentiment);
      });
      done();
    });
  })

  it('fetches /v1/trend/{name}', function(done) {
    const someTrend = 'Jerusalem';
    const someResponse = {
      'name': someTrend,
      'history': []
    };

    const fakeFetch = url => {
      assert.equal(url, `${endpoint}/trend/${someTrend}`);
      done();
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(someResponse)
      });
    };

    const networkBus = new NetworkBus(fakeFetch);
    networkBus.fetchTrend(() => {}, someTrend);
  })

  it('parses /v1/trend/{name} into Trend', function(done) {
    const someTrend = 'Jerusalem';
    const someResponse = {
      'name': someTrend,
      'history': [{
        'sentiment': 2.0,
        'timestamp': Date.now() / 1000 - 20 * 60 * 7
      }, {
        'sentiment': 3.0,
        'timestamp': Date.now() / 1000 - 20 * 60 * 6
      }, {
        'sentiment': -1.0,
        'timestamp': Date.now() / 1000 - 20 * 60 * 5
      }]
    };

    const fakeFetch = url => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(someResponse)
    });

    const networkBus = new NetworkBus(fakeFetch);
    networkBus.fetchTrend((error, response) => {
      assert.instanceOf(response, Trend);
      assert.equal(response.name, someResponse.name);
      assert.deepEqual(response.history, someResponse.history);
      done();
    }, someTrend);
  })

  it('fetches /v1/trend/{name}/tweets?limit', function(done) {
    const someTrend = 'Jerusalem';
    const someResponse = {
      tweets: []
    };
    const someLimit = 3;
    const someMaxId = undefined;

    const fakeFetch = url => {
      assert.equal(url, `${endpoint}/trend/${someTrend}/tweets?limit=${someLimit}`);
      done();
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(someResponse)
      });
    };

    const networkBus = new NetworkBus(fakeFetch);
    networkBus.fetchTrendTweets(() => {}, someTrend, someLimit, someMaxId);
  })

  it('fetches /v1/trend/{name}/tweets?limit&max_id', function(done) {
    const someTrend = 'Jerusalem';
    const someResponse = {
      tweets: []
    };
    const someLimit = 3;
    const someMaxId = 'abc123';

    const fakeFetch = url => {
      assert.equal(url, `${endpoint}/trend/${someTrend}/tweets?limit=${someLimit}&max_id=${someMaxId}`);
      done();
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(someResponse)
      });
    };

    const networkBus = new NetworkBus(fakeFetch);
    networkBus.fetchTrendTweets(() => {}, someTrend, someLimit, someMaxId);
  })

  it('parses /v1/trend/{name}/tweets?limit into Tweet[]', function(done) {
    const someResponse = {
      tweets: [{
        '_id': '0',
        'embed_id': '818066438997020672'
      }, {
        '_id': '1',
        'embed_id': '818100554400460800'
      }, {
        '_id': '2',
        'embed_id': '818071378469519361'
      }]
    };

    const fakeFetch = url => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(someResponse)
      });
    };

    const networkBus = new NetworkBus(fakeFetch);
    networkBus.fetchTrendTweets((error, response) => {
      assert.isArray(response);
      assert.equal(response.length, 3);
      response.forEach((tweet, i) => {
        assert.instanceOf(tweet, Tweet);
        assert.equal(tweet._id, someResponse.tweets[i]._id);
        assert.equal(tweet.embed_id, someResponse.tweets[i].embed_id);
        assert.equal(tweet.type, 'Tweet');
      });
      done();
    }, 'Jerusalem', 3, undefined);
  })

  it('fetches /v1/trend/{name}/articles?limit', function(done) {
    const someTrend = 'Jerusalem';
    const someResponse = {
      articles: []
    };
    const someLimit = 3;
    const someMaxId = undefined;

    const fakeFetch = url => {
      assert.equal(url, `${endpoint}/trend/${someTrend}/articles?limit=${someLimit}`);
      done();
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(someResponse)
      });
    };

    const networkBus = new NetworkBus(fakeFetch);
    networkBus.fetchTrendArticles(() => {}, someTrend, someLimit, someMaxId);
  })

  it('fetches /v1/trend/{name}/articles?limit&max_id', function(done) {
    const someTrend = 'Jerusalem';
    const someResponse = {
      articles: []
    };
    const someLimit = 3;
    const someMaxId = 'abc123';

    const fakeFetch = url => {
      assert.equal(url, `${endpoint}/trend/${someTrend}/articles?limit=${someLimit}&max_id=${someMaxId}`);
      done();
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(someResponse)
      });
    };

    const networkBus = new NetworkBus(fakeFetch);
    networkBus.fetchTrendArticles(() => {}, someTrend, someLimit, someMaxId);
  })

  it('fetches /v1/trend/{name}/articles?limit', function(done) {
    const someTrend = 'Jerusalem';
    const someResponse = {
      articles: [{
        '_id': '0',
        'title': 'Jerusalem truck attack kills four Israeli soldiers',
        'timestamp': 1483904505,
        'source': 'ABC News',
        'link': 'http:\/\/www.abc.net.au\/news\/2017-01-08\/four-soldiers-dead-in-jerusalem-truck-attack\/8168824',
        'media': 'http:\/\/www.abc.net.au\/news\/image\/8168964-1x1-700x700.jpg',
        'description': 'Four Israeli soldiers are killed after a Palestinian deliberately rams his truck into a crowd, police say.'
      }, {
        '_id': '1',
        'title': 'Truck attack kills 4 Israeli soldiers in Jerusalem',
        'timestamp': 1483901451,
        'source': 'Associated Press',
        'link': 'http:\/\/bigstory.ap.org\/article\/6a460b12b5534f1d92601811cee0ec2c\/israeli-police-says-truck-rams-soldiers-jerusalem',
        'media': 'http:\/\/binaryapi.ap.org\/9821cea8313b42f58fb1b3e71f3a6c99\/460x.jpg',
        'description': 'JERUSALEM (AP) \u2014 A Palestinian truck driver on Sunday rammed his vehicle into a crowd of Israeli soldiers at a popular Jerusalem tourist spot, killing four people and wounding 17 others in the deadliest single attack of\u2026'
      }, {
        '_id': '2',
        'title': 'Jerusalem lorry attack: Four Israelis soldiers killed',
        'timestamp': 1483904848,
        'source': 'BBC News',
        'link': 'http:\/\/www.bbc.co.uk\/news\/world-middle-east-38546740',
        'media': 'http:\/\/ichef-1.bbci.co.uk\/news\/1024\/cpsprodpb\/1091\/production\/_93314240_mediaitem93314239.jpg',
        'description': 'Four Israeli officer cadets, all in their twenties, are killed by a Palestinian attacker in a lorry.'
      }]
    };
    const someLimit = 3;
    const someMaxId = undefined;

    const fakeFetch = url => {
      assert.equal(url, `${endpoint}/trend/${someTrend}/articles?limit=${someLimit}`);
      done();
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(someResponse)
      });
    };

    const networkBus = new NetworkBus(fakeFetch);
    networkBus.fetchTrendArticles((error, response) => {
      assert.isArray(response);
      assert.equal(response.length, 3);
      response.forEach((article, i) => {
        assert.instanceOf(article, Article);
        assert.equal(article.title, someResponse.articles[i].title);
        assert.equal(article.source, someResponse.articles[i].source);
        assert.typeOf(article.timestamp, 'string');
        assert.equal(article.link, someResponse.articles[i].link);
        assert.equal(article.media, someResponse.articles[i].media);
        assert.equal(article.description, someResponse.articles[i].description);
        assert.equal(article.type, 'Article');
      });
    }, someTrend, someLimit, someMaxId);
  })
})
