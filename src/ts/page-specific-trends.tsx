import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {NetworkBus, SpecificTrendsDataPacket} from './network-bus';

import {NewsComponent} from './news-component';
import {TweetComponent} from './tweet-component';

import {News} from './news';
import {Tweet} from './tweet';

import {SpecificTrendsChart} from './specific-trends-chart';

interface PageSpecificTrendsProps {
  id: number;
  name: string;
}

interface PageSpecificTrendsState {
  history?: {
    start: number;
    end: number;
    data: SpecificTrendsDataPacket[];
  },
  news?: News[];
  tweets?: Tweet[];
  remaining?: number;
};

/**
 * This class handles rendering the homepage, it contains a graph and cards.
 * @author Omar Chehab
 */
export class PageSpecificTrends
  extends React.Component<PageSpecificTrendsProps, PageSpecificTrendsState> {

  constructor(props) {
    super(props);
    this.state = {
      history: undefined,
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
    NetworkBus.getSpecificTrends((err, response) => {
      if (err) {
        console.error(err);
        return;
      }
      const specificTrend = response;
      this.setState({
        history: specificTrend.history,
      });
    }, this.props.id);

    this.getPage(0);
  }

  /**
   * Gets news and tweets from the server
   * @param {number}  page  pagination page number
   * @author Omar Chehab
   */
  getPage(page) {
    NetworkBus.getSpecificContent((err, response) => {
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
    }, this.props.id, page);
  }

  render() {
    return (
      <div>
        <SpecificTrendsChart history={this.state.history}/>
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
