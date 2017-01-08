import {Promise} from 'promise-polyfill';
if (!window['Promise']) window['Promise'] = Promise;
import 'whatwg-fetch';

import {Trends} from './trends';
import {Content} from './content';
import {SpecificTrends} from './specific-trends';
import {SpecificContent} from './specific-content';

import {News} from './news';
import {Tweet} from './tweet';

const APIURL = 'http://neptune.gunshippenguin.com:8080/v1';
const ENDPOINTS = {
  trends: '/trends',
  specificTrends: '/trends/{id}',
  content: '/content?page={page}',
  specificContent: '/content/{id}?page={page}'
};

/**
 * NetworkBus class handles all communications with the REST API.
 * @author Omar Chehab
 */
export class NetworkBus {

  /**
   * Requests and parses the trends from the REST API.
   * @author Omar Chehab
   */
  static getTrends(callback: (error, response: Trends) => void) {
    const endpoint = ENDPOINTS.trends;
    const url = `${APIURL}${endpoint}`;
    window['fetch'](url)
      .then(function(response) {
        return response.json();
      }, function(error) {
        callback(error, undefined);
      })
      .then(function(response) {
        response = new Trends(response);
        callback(undefined, response);
      });
      console.log('getTrends', url);
  }

  /**
   * Requests and parses the content from the REST API.
   * @author Omar Chehab
   */
  static getContent(callback: (error, response: Content) => void,
    page: number) {
    const endpoint = ENDPOINTS.content
      .replace(/{page}/, `${page}`);
    const url = `${APIURL}${endpoint}`;
    window['fetch'](url)
      .then(function(response) {
        return response.json();
      }, function(error) {
        callback(error, undefined);
      })
      .then(function(response: ContentPacket) {
        response.news = response.news.map(news => new News(news));
        response.tweets = response.tweets.map(tweet => new Tweet(tweet));
        response = new Content(response);
        callback(undefined, response);
      });
      console.log('getContent', url);
  }

  /**
   * Requests and parses the specific trends from the REST API.
   * @author Omar Chehab
   */
  static getSpecificTrends(callback: (error, response: SpecificTrends) => void,
    id: number) {
    const endpoint = ENDPOINTS.specificTrends
      .replace(/{id}/, `${id}`);
    const url = `${APIURL}${endpoint}`;
    window['fetch'](url)
      .then(function(response) {
        return response.json();
      }, function(error) {
        callback(error, undefined);
      })
      .then(function(response) {
        response = new SpecificTrends(response);
        callback(undefined, response);
      });
      console.log('getSpecificTrends', url);
  }

  /**
   * Requests and parses the specific content from the REST API.
   * @author Omar Chehab
   */
  static getSpecificContent(callback: (error, response: SpecificContent) => void,
    id: number, page: number) {
    // const endpoint = ENDPOINTS.specificContent
    //   .replace(/{id}/, `${id}`)
    //   .replace(/{page}/, `${page}`);
    // const url = `${APIURL}${endpoint}`;
    // window['fetch'](url)
    //   .then(function(response) {
    //     return response.json();
    //   }, function(error) {
    //     callback(error, undefined);
    //   })
    //   .then(function(response) {
    //     response.news = response.news.map(news => new News(news));
    //     response.tweets = response.tweets.map(tweet => new Tweet(tweet));
    //     response = new SpecificContent(response);
    //     callback(undefined, response);
    //   });
    //   console.log('getSpecificContent', url);

      setTimeout(() => {
        var a = {
        news: [
          {
            title:"News and sentiment analysis project wins HTV 2017",
            description:"Fueled by Redbull and pizza, Rhys Rustad-Elliott, Jason Pham, Omar Chehab and Dennis Tismenko pulled through and won Hack the valley 2017, particularly impressing Brian Harrington, who decided to award them first prize...",
            timestamp:1483824528,
            link:"http://thenextweb.com/insider/2017/01/07/mixed-reality-will-be-most-important-tech-of-2017/",
            source:"The Wall Street Journal",
            media:"https://cdn2.tnwcdn.com/wp-content/blogs.dir/1/files/2016/12/mr8.jpg"
          },{
            title:"Trump says something edgy",
            description:"Donald trump just said something edgy on Twitter, let me tell you how offended I am...",
            timestamp:1483814528,
            link:"http://thenextweb.com/gadgets/2017/01/07/genican-scans-your-trash-to-make-grocery-lists-and-arrange-delivery/",
            source:"The New York Times",
            media:"https://cdn2.tnwcdn.com/wp-content/blogs.dir/1/files/2017/01/cU9f7wg.jpg"
          },{
            title:"Some other stuff happened",
            description:"Here's a description for some other stuff that happened today that was newsworthy",
            timestamp:1483829528,
            link:"http://thenextweb.com/insider/2017/01/07/mixed-reality-will-be-most-important-tech-of-2017/",
            source:"CNN",
            media:"https://cdn2.tnwcdn.com/wp-content/blogs.dir/1/files/2016/12/mr8.jpg"
          }
        ],
        tweets:[
          {id:"692527862369357824"},
          {id:"783943172057694208"},
          {id:"771763270273294336"}
        ],
        remaining:9
        }
        var b = {
          news: [
            {
              title:"Dennis Tismenko is snoring and I am coding.",
              description:"Fueled by Redbull and pizza, Rhys Rustad-Elliott, Jason Pham, Omar Chehab and Dennis Tismenko pulled through and won Hack the valley 2017, particularly impressing Brian Harrington, who decided to award them first prize...",
              timestamp:1483827352,
              link:"http://thenextweb.com/insider/2017/01/07/mixed-reality-will-be-most-important-tech-of-2017/",
              source:"The Wall Street Journal",
              media:"https://cdn2.tnwcdn.com/wp-content/blogs.dir/1/files/2016/12/mr8.jpg"
            },{
              title:"Jason Pham is writing and Rhys Rustad-Elliott is sleeping.",
              description:"Donald trump just said something edgy on Twitter, let me tell you how offended I am...",
              timestamp:1483815528,
              link:"http://thenextweb.com/gadgets/2017/01/07/genican-scans-your-trash-to-make-grocery-lists-and-arrange-delivery/",
              source:"The New York Times",
              media:"https://cdn2.tnwcdn.com/wp-content/blogs.dir/1/files/2017/01/cU9f7wg.jpg"
            },{
              title:"History is made every second, click here to find out how!",
              description:"Here's a description for some other stuff that happened today that was newsworthy",
              timestamp:1483823528,
              link:"http://thenextweb.com/insider/2017/01/07/mixed-reality-will-be-most-important-tech-of-2017/",
              source:"CNN",
              media:"https://cdn2.tnwcdn.com/wp-content/blogs.dir/1/files/2016/12/mr8.jpg"
            }
          ],
          tweets:[
            {id:"817898873549193216"},
            {id:"817883655301382144"},
            {id:"817876319262412803"}
          ],
          remaining:3
        }
        var c = {
          news: [],
          tweets:[
            {id:"818034927266631682"},
            {id:"817929421067788288"},
            {id:"817989628686991360"}
          ],
          remaining: 0
        }
        if (page == 0) {
          callback(null, new Content(a));
        } else if (page == 1) {
          callback(null, new Content(b));
        } else if (page == 2) {
          callback(null, new Content(c));
        }
      }, 2500);
  }
}

// Endpoint Interfaces

export interface TrendsPacket {
  trends: TrendPacket[]
};

export interface ContentPacket {
  news: NewsPacket[];
  tweets: TweetPacket[];
  remaining: number;
};

export interface SpecificTrendsPacket {
  name: string;
  history: {
    start: number;
    end: number;
    data: SpecificTrendsDataPacket[];
  }
};

export interface SpecificContentPacket {
  news: NewsPacket[];
  tweets: TweetPacket[];
  remaining: number;
};

// Interfaces used by Endpoint Interfaces

export interface TrendPacket {
  id: number;
  name: string;
  sentiment: number;
}

export interface SpecificTrendsDataPacket {
  sentiment: number;
  volume: number;
};

export interface NewsPacket {
  title: string;
  source: string;
  timestamp: number; // unix
  link: string; // url
  media?: string; // url
  description: string;
};

export interface TweetPacket {
  id: string;
};
