/* eslint-disable no-console */
console.log('Mocking window.fetch')

const defaultOptions = {
  method: 'GET',
}

window.fetch = function(url, options=defaultOptions) {
  console.log(`Mocking ${options.method} ${url}`)

  switch (url) {
    case 'https://api.senti.social/alltrends':
      return jsonResponse(allTrends);

    case 'https://api.senti.social/trend/Chelsea':
      return jsonResponse(trendChelsea);

    default:
      return jsonResponse(trendChelsea);
  }
}

function jsonResponse(body) {
  return Promise.resolve({
    json: () => Promise.resolve(body)
  })
}

const allTrends = {
  "trends": [
    {
      "name": "Chelsea",
      "sentiment_score": 2.175
    },
    {
      "name": "David Luiz",
      "sentiment_score": 1.852
    },
    {
      "name": "#WannaCry",
      "sentiment_score": -0.574
    },
    {
      "name": "#ransomware",
      "sentiment_score": -0.365
    },
    {
      "name": "#nhscyberattack",
      "sentiment_score": -0.422
    },
    {
      "name": "#MasterChefUK",
      "sentiment_score": 2.629
    },
    {
      "name": "#withfewexceptions",
      "sentiment_score": -0.072
    },
    {
      "name": "#SevenDaysToDead",
      "sentiment_score": 0.089
    },
    {
      "name": "#BritishLGBTAwards",
      "sentiment_score": 2.231
    },
    {
      "name": "#Gogglebox",
      "sentiment_score": 0.622
    },
    {
      "name": "#InconvenienceAFilm",
      "sentiment_score": -0.424
    },
    {
      "name": "#FlashbackFriday",
      "sentiment_score": 0.198
    }
  ]
}

const trendChelsea = {
  "name": "Chelsea",
  "rank": 1,
  "tracking_since": 1494984862585,
  "sentiment_score": 2.018,
  "sentiment_description": "Very Positive",
  "tweets_analyzed": 126556,
  "tweet_volume": 403246,
  "locations": [
    "AU",
    "IE",
    "GB",
    "US"
  ],
  "keywords": [
    {
      "occurences": 66,
      "word": "chelsea"
    },
    {
      "occurences": 59,
      "word": "football"
    },
    {
      "occurences": 30,
      "word": "win"
    },
    {
      "occurences": 15,
      "word": "team"
    },
    {
      "occurences": 15,
      "word": "soccer"
    },
    {
      "occurences": 9,
      "word": "goal"
    },
    {
      "occurences": 8,
      "word": "points"
    },
    {
      "occurences": 8,
      "word": "penalty"
    },
    {
      "occurences": 8,
      "word": "league"
    },
    {
      "occurences": 8,
      "word": "premier"
    }
  ],
  "articles": [
    {
      "media": "http://ichef.bbci.co.uk/onesport/cps/624/cpsprodpb/15A57/production/_96036688_chelseacelebrate.jpg",
      "link": "http://www.bbc.co.uk/sport/football/39813798",
      "source": "BBC News",
      "timestamp": 1494626338,
      "description": "Chelsea are crowned Premier League champions as Michy Batshuayi's late goal gives them the win they needed to secure the title at West Brom.",
      "title": "West Bromwich Albion 0-1 Chelsea"
    },
    {
      "media": "http://ichef.bbci.co.uk/onesport/cps/624/cpsprodpb/15A57/production/_96036688_chelseacelebrate.jpg",
      "link": "http://www.bbc.co.uk/sport/football/39813798",
      "source": "BBC Sport",
      "timestamp": 1494626338,
      "description": "Chelsea are crowned Premier League champions as Michy Batshuayi's late goal gives them the win they needed to secure the title at West Brom.",
      "title": "West Bromwich Albion 0-1 Chelsea"
    },
    {
      "media": "http://ichef.bbci.co.uk/onesport/cps/624/cpsprodpb/EEF5/production/_96037116_antonioconte.jpg",
      "link": "http://www.bbc.co.uk/sport/football/39905241",
      "source": "BBC Sport",
      "timestamp": 1494632312,
      "description": "Chelsea need to win the FA Cup to turn a \"great season\" into a \"fantastic\" one after clinching the title, says manager Antonio Conte.",
      "title": "Chelsea are Premier League champions: Antonio Conte targets Double"
    }
  ],
  "tweets": [
    {
      "embed_id": "863134776651374592"
    },
    {
      "embed_id": "862940061624659968"
    },
    {
      "embed_id": "863141907999973379"
    },
    {
      "embed_id": "863136242279620608"
    },
    {
      "embed_id": "863141446957846532"
    },
    {
      "embed_id": "862863664327610369"
    },
    {
      "embed_id": "863136436203261952"
    },
    {
      "embed_id": "863138919822614529"
    },
    {
      "embed_id": "863135537313533952"
    },
    {
      "embed_id": "863117986768486401"
    }
  ]
}
