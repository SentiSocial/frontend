const fakeFetch = (url) => {
  let data;
  if (url.endsWith('/alltrends')) {
    data = {
      trends: [{
        'name': 'Jerusalem',
        'sentiment': -3.6
      }, {
        'name': 'Martin Shkreli',
        'sentiment': -2.2
      }]
    };
  } else if (url.match('/tweets')) {
    data = {
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
  } else if (url.match('/articles')) {
    data = {
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
  } else if (url.match('/trend/')) {
    data = {
      'name': 'Jerusalem',
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
  }
  return new Promise((resolve) => {
    resolve({
      json: () => Promise.resolve(data)
    });
  });
};

export {fakeFetch};
