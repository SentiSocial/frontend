import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {NetworkBus} from '../classes/networkbus';
import {cutMerge} from '../classes/helpers';
import {RequestChain} from '../classes/requestchain';
import {InfiniteScroll} from '../classes/infinitescroll';

import {AllTrends, AllTrendsData} from '../classes/alltrends';
import {Article} from '../classes/article';
import {Tweet} from '../classes/tweet';

import {ArticleCard} from '../components/cards/article';
import {TweetCard} from '../components/cards/tweet';
import {GhostCard} from '../components/cards/ghost';

import {TrendsChart} from '../components/charts/alltrends';

interface PageTrendsProps {
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
export class PageTrends
  extends React.Component<PageTrendsProps, PageTrendsState> {
  trendsMeta;
  trendsMetaIndex;
  infiniteScroll;

  constructor(props) {
    super(props);

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
    NetworkBus.fetchAllTrends((err, response) => {
      if (err) {
        console.error(err);
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

    let index = this.trendsMetaIndex;
    let end = index + 3;
    while (index < end && index < trends.length) {
      const trend = trends[index];
      let content = [];
      let responseCounter = 0;

      const handleResponse = () => {
        responseCounter += 1;
        if (responseCounter < 2) {
          return;
        }

        content = cutMerge(content[0], content[1]);
        this.setState(prev => ({
          content: prev.content.concat(content)
        }));
      };

      if (trend.tweets_max_id !== null) {
        let tweetChainId = chain.register((error, tweets) => {
          if (error) {
            console.error(error);
            return;
          }

          if (!tweets.length) {
            trend.tweets_max_id = tweets[tweets.length - 1]._id;
          } else {
            trend.tweets_max_id = null;
          }

          content.push(tweets);

          handleResponse();
        });
        NetworkBus.fetchTrendTweets((error, response) => {
          chain.response(tweetChainId, [error, response]);
        }, trend.name, trend.tweets_max_id, 3);
      }


      if (trend.tweets_max_id !== null) {
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

          content.push(articles);

          handleResponse();
        });

        NetworkBus.fetchTrendArticles((error, response) => {
          chain.response(articleChainId, [error, response]);
        }, trend.name, trend.articles_max_id, 3);
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
    let cards = content.map((content, i) => {
      return content.type === 'Article'
      // content will not reorder index key is fine
      ? <ArticleCard key={i} article={content} />
      : <TweetCard key={i} tweet={content} />;
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
