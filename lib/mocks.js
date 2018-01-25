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

    case 'https://api.github.com/repos/sentisocial/frontend/contributors':
      return jsonResponse(frontendContributors);

    case 'https://api.github.com/repos/sentisocial/backend/contributors':
      return jsonResponse(backendContributors);

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

const frontendContributors = [
  {
    "login": "omarchehab98",
    "id": 12089120,
    "avatar_url": "https://avatars2.githubusercontent.com/u/12089120?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/omarchehab98",
    "html_url": "https://github.com/omarchehab98",
    "followers_url": "https://api.github.com/users/omarchehab98/followers",
    "following_url": "https://api.github.com/users/omarchehab98/following{/other_user}",
    "gists_url": "https://api.github.com/users/omarchehab98/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/omarchehab98/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/omarchehab98/subscriptions",
    "organizations_url": "https://api.github.com/users/omarchehab98/orgs",
    "repos_url": "https://api.github.com/users/omarchehab98/repos",
    "events_url": "https://api.github.com/users/omarchehab98/events{/privacy}",
    "received_events_url": "https://api.github.com/users/omarchehab98/received_events",
    "type": "User",
    "site_admin": false,
    "contributions": 240
  },
  {
    "login": "DennisTismenko",
    "id": 11730903,
    "avatar_url": "https://avatars0.githubusercontent.com/u/11730903?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/DennisTismenko",
    "html_url": "https://github.com/DennisTismenko",
    "followers_url": "https://api.github.com/users/DennisTismenko/followers",
    "following_url": "https://api.github.com/users/DennisTismenko/following{/other_user}",
    "gists_url": "https://api.github.com/users/DennisTismenko/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/DennisTismenko/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/DennisTismenko/subscriptions",
    "organizations_url": "https://api.github.com/users/DennisTismenko/orgs",
    "repos_url": "https://api.github.com/users/DennisTismenko/repos",
    "events_url": "https://api.github.com/users/DennisTismenko/events{/privacy}",
    "received_events_url": "https://api.github.com/users/DennisTismenko/received_events",
    "type": "User",
    "site_admin": false,
    "contributions": 35
  },
  {
    "login": "suchaHassle",
    "id": 16737380,
    "avatar_url": "https://avatars1.githubusercontent.com/u/16737380?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/suchaHassle",
    "html_url": "https://github.com/suchaHassle",
    "followers_url": "https://api.github.com/users/suchaHassle/followers",
    "following_url": "https://api.github.com/users/suchaHassle/following{/other_user}",
    "gists_url": "https://api.github.com/users/suchaHassle/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/suchaHassle/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/suchaHassle/subscriptions",
    "organizations_url": "https://api.github.com/users/suchaHassle/orgs",
    "repos_url": "https://api.github.com/users/suchaHassle/repos",
    "events_url": "https://api.github.com/users/suchaHassle/events{/privacy}",
    "received_events_url": "https://api.github.com/users/suchaHassle/received_events",
    "type": "User",
    "site_admin": false,
    "contributions": 1
  }
]

const backendContributors = [
  {
    "login": "omarchehab98",
    "id": 12089120,
    "avatar_url": "https://avatars2.githubusercontent.com/u/12089120?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/omarchehab98",
    "html_url": "https://github.com/omarchehab98",
    "followers_url": "https://api.github.com/users/omarchehab98/followers",
    "following_url": "https://api.github.com/users/omarchehab98/following{/other_user}",
    "gists_url": "https://api.github.com/users/omarchehab98/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/omarchehab98/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/omarchehab98/subscriptions",
    "organizations_url": "https://api.github.com/users/omarchehab98/orgs",
    "repos_url": "https://api.github.com/users/omarchehab98/repos",
    "events_url": "https://api.github.com/users/omarchehab98/events{/privacy}",
    "received_events_url": "https://api.github.com/users/omarchehab98/received_events",
    "type": "User",
    "site_admin": false,
    "contributions": 13
  },
  {
    "login": "suchaHassle",
    "id": 16737380,
    "avatar_url": "https://avatars1.githubusercontent.com/u/16737380?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/suchaHassle",
    "html_url": "https://github.com/suchaHassle",
    "followers_url": "https://api.github.com/users/suchaHassle/followers",
    "following_url": "https://api.github.com/users/suchaHassle/following{/other_user}",
    "gists_url": "https://api.github.com/users/suchaHassle/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/suchaHassle/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/suchaHassle/subscriptions",
    "organizations_url": "https://api.github.com/users/suchaHassle/orgs",
    "repos_url": "https://api.github.com/users/suchaHassle/repos",
    "events_url": "https://api.github.com/users/suchaHassle/events{/privacy}",
    "received_events_url": "https://api.github.com/users/suchaHassle/received_events",
    "type": "User",
    "site_admin": false,
    "contributions": 10
  },
  {
    "login": "GunshipPenguin",
    "id": 8054598,
    "avatar_url": "https://avatars1.githubusercontent.com/u/8054598?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/GunshipPenguin",
    "html_url": "https://github.com/GunshipPenguin",
    "followers_url": "https://api.github.com/users/GunshipPenguin/followers",
    "following_url": "https://api.github.com/users/GunshipPenguin/following{/other_user}",
    "gists_url": "https://api.github.com/users/GunshipPenguin/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/GunshipPenguin/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/GunshipPenguin/subscriptions",
    "organizations_url": "https://api.github.com/users/GunshipPenguin/orgs",
    "repos_url": "https://api.github.com/users/GunshipPenguin/repos",
    "events_url": "https://api.github.com/users/GunshipPenguin/events{/privacy}",
    "received_events_url": "https://api.github.com/users/GunshipPenguin/received_events",
    "type": "User",
    "site_admin": false,
    "contributions": 5
  }
]
