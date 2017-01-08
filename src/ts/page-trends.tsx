import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {NetworkBus, TrendPacket} from './network-bus';

import {NewsComponent} from './news-component';
import {TweetComponent} from './tweet-component';

import {Trends} from './trends';
import {News} from './news';
import {Tweet} from './tweet';

import {TrendsChart} from './trends-chart';


interface PageTrendsState {
  trends?: Trends;
  news?: News[];
  tweets?: Tweet[];
  remaining?: number;
};

export class PageTrends extends React.Component<undefined, PageTrendsState> {

  constructor(props) {
    super(props);
    this.state = {
      trends: undefined,
      news: [],
      tweets: [],
      remaining: -1,
    };
  }

  componentWillMount() {
    console.log('Component will mount');
    NetworkBus.getTrends((err, response) => {
      if (err) {
        console.error(err);
        return;
      }
      const trends = response;
      this.setState({
        trends: trends,
      })
    });

    NetworkBus.getContent((err, response) => {
      if (err) {
        console.error(err);
        return;
      }
      const newNews = response.news;
      const newTweets = response.tweets;
      const newRemaining = response.remaining;
      this.setState(prevState => {
        const news = prevState.news.concat(newNews);
        const tweets = prevState.tweets.concat(newTweets);
        return {
          news: news,
          tweets: tweets,
          remaining: newRemaining,
        };
      })
    }, 0);
  }

  render() {
    return (
      <div>
      <div>
        <TrendsChart trends={this.state.trends} />
      </div>
        <main>
          {this.state.news.map((news, i) =>
            <NewsComponent key={i} news={news} />)}
          {this.state.tweets.map(tweet =>
            <TweetComponent key={tweet.id} tweet={tweet} />)}
        </main>
      </div>
    );
  }
}
