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

/**
 * This class handles rendering the homepage, it contains a graph and cards.
 * @author Omar Chehab
 */
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

  /**
   * When the component WILL mount, request the trends and content from the
   * endpoint. Once they are loaded, update the state which will cause react to
   * re-render.
   * @author Omar Chehab
   */
  componentWillMount() {
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
        </div >
        <main className="card-container container">
          {this.state.news.map((news, i) =>
            <NewsComponent key={i} news={news} />)}
          {this.state.tweets.map(tweet =>
            <TweetComponent key={tweet.id} tweet={tweet} />)}
        </main>
      </div>
    );
  }
}
