import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {NetworkBus} from '../classes/networkbus';
import {InfiniteScroll} from '../classes/infinitescroll';
import {RequestChain} from '../classes/requestchain';
import {cutMerge} from '../classes/helpers';

import {AllTrends, AllTrendsData} from '../types/alltrends';
import {Article} from '../types/article';
import {Tweet} from '../types/tweet';

import {ArticleCard} from '../components/cards/article';
import {TweetCard} from '../components/cards/tweet';
import {GhostCard} from '../components/cards/ghost';

import {TrendsChart} from '../components/charts/alltrends';

// import {fakeFetch} from './fakefetch';

interface PageTrendsProps {
  onLoad: (error) => void;
  onTrendClick: (selectedTrend) => void;
}

interface PageTrendsState {
  trendsPacket?: AllTrends;
  content?: any[];
  ghostCards?: number;
};

/**
 * This class handles rendering the homepage, it contains a graph and cards.
 * @author Omar Chehab
 */
export class AllTrendsPage
  extends React.Component<PageTrendsProps, PageTrendsState> {
  networkBus;
  infiniteScroll;

  trendsMeta;
  trendsMetaIndex;

  constructor(props) {
    super(props);

    this.networkBus = new NetworkBus(window['fetch'].bind(window));
    // this.networkBus = new NetworkBus(fakeFetch);
    this.getContent = this.getContent.bind(this);

    this.trendsMeta = [];
    this.trendsMetaIndex = 0;
    this.infiniteScroll = new InfiniteScroll(this.getContent);

    this.state = {
      trendsPacket: undefined,
      content: [],
      ghostCards: 4,
    };
  }

  /**
   * When the component WILL mount, request the trends and content from the
   * endpoint. Once they are loaded, update the state which will cause react to
   * re-render.
   * @author Omar Chehab
   */
  componentWillMount() {
    this.networkBus.fetchAllTrends((err, response) => {
      if (err) {
        this.props.onLoad(err);
        return;
      }
      const trendsPacket = response;

      this.setState({
        trendsPacket: trendsPacket,
      });

      trendsPacket.trends.forEach(trend => {
        this.trendsMeta.push({
          name: trend.name,
          tweets_max_id: undefined,
          articles_max_id: undefined,
        });
      });

      this.getContent();
    });
  }

  /**
   * When the component has mounted start detecting the scrolling.
   * @author Omar Chehab
   */
  componentDidMount() {
    this.infiniteScroll.mount();
  }

  /**
   * When the component is going to unmount stop detecting the scrolling.
   * @author Omar Chehab
   */
  componentWillUnmount() {
    this.infiniteScroll.unmount();
  }


  /**
   * Gets news and tweets from the server
   * @author Omar Chehab
   */
  getContent() {
    const trends = this.trendsMeta;
    let chain = new RequestChain();

    // how many trend endpoints should we request data from?
    const numberOfEndpoints = 2;
    // how many requests are made per endpoints?
    // tweets and articles, so 2
    const requestsPerEndpoint = 2;

    let index = this.trendsMetaIndex;
    let end = index + numberOfEndpoints;
    let responseCounter = 0;
    while (index < end && index < trends.length) {
      const trend = trends[index];
      let content = {
        tweets: [],
        articles: []
      };

      const handleResponse = () => {
        responseCounter += 1;
        if (responseCounter < numberOfEndpoints * requestsPerEndpoint) {
          return;
        }
        let newContent = cutMerge(content.tweets, content.articles);
        this.setState(prev => ({
          content: prev.content.concat(newContent)
        }));
        this.props.onLoad(undefined);
      };

      if (trend.tweets_max_id !== null) {
        let tweetChainId = chain.register((error, tweets) => {
          if (error) {
            console.error(error);
            return;
          }

          if (tweets.length) {
            trend.tweets_max_id = tweets[tweets.length - 1]._id;
          } else {
            trend.tweets_max_id = null;
          }

          content.tweets = content.tweets.concat(tweets);

          handleResponse();
        });
        this.networkBus.fetchTrendTweets((error, response) => {
          chain.response(tweetChainId, [error, response]);
        }, trend.name, 3, trend.tweets_max_id);
      } else {
        handleResponse();
      }


      if (trend.articles_max_id !== null) {
        let articleChainId = chain.register((error, articles) => {
          if (error) {
            console.error(error);
            return;
          }

          if (articles.length) {
            trend.articles_max_id = articles[articles.length - 1]._id;
          } else {
            trend.articles_max_id = null;
          }

          content.articles = content.articles.concat(articles);

          handleResponse();
        });

        this.networkBus.fetchTrendArticles((error, response) => {
          chain.response(articleChainId, [error, response]);
        }, trend.name, 3, trend.articles_max_id);
      } else {
        handleResponse();
      }

      index += 1;
    }
    this.trendsMetaIndex = index;

    const moreContent = index < trends.length;
    if (!moreContent) {
      this.setState({
        ghostCards: 0,
      });
    }
  }

  render() {
    const content = this.state.content;
    let cards = content.map((c, i) => {
      return c.type === 'Article'
      // content will not reorder index key is fine
      ? <ArticleCard key={i} article={c} />
      : <TweetCard key={i} tweet={c} />;
    });

    const ghostCards = [];
    for (let i = 0; i < this.state.ghostCards; i++) {
      // content will not reorder index key is fine
      ghostCards.push(<GhostCard key={`GC${i}`} />);
    }

    cards = cards.concat(ghostCards);

    let cardsComponent;
    if (window.innerWidth < 768) {
      cardsComponent = (
        <div className="col-xs-12">
          {cards}
        </div>
      );
    } else {
      cardsComponent = [
        <div className="col-sm-6">
          {cards.filter((card, i) => i % 2 === 0)}
        </div>,
        <div className="col-sm-6">
          {cards.filter((card, i) => i % 2 === 1)}
        </div>
      ];
    }

    return (
      <div>
        <TrendsChart trends={this.state.trendsPacket}
          onTrendClick={this.props.onTrendClick}/>
        <main className="card-container container">
          {cardsComponent}
        </main>
      </div>
    );
  }
}
