import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {NetworkBus} from '../classes/networkbus';
import {InfiniteScroll} from '../classes/infinitescroll';
import {cutMerge} from '../classes/helpers';

import {TrendHistory} from '../types/trend';
import {Article} from '../types/article';
import {Tweet} from '../types/tweet';

import {CardLayout} from '../components/cardlayout';

import {ArticleCard} from '../components/cards/article';
import {TweetCard} from '../components/cards/tweet';
import {GhostCard} from '../components/cards/ghost';

import {TrendChartVisual} from '../components/charts/trend';

interface PageSpecificTrendsProps {
  name: string;
  dependencies: {
    window: any;
    fetch: any;
  };
};

interface PageSpecificTrendsState {
  history?: TrendHistory[];
  content?: any[];
  ghostCards?: number;
};

/**
 * This class handles rendering the homepage, it contains a graph and cards.
 * @author Omar Chehab
 */
export class TrendPage
  extends React.Component<PageSpecificTrendsProps, PageSpecificTrendsState> {
  private networkBus;
  private infiniteScroll;

  private tweets_max_id;
  private articles_max_id;
  private onGoingRequest;

  constructor(props) {
    super(props);

    this.getContent = this.getContent.bind(this);

    const fetch = this.props.dependencies.fetch;
    this.networkBus = new NetworkBus(fetch);
    const window = this.props.dependencies.window;
    this.infiniteScroll = new InfiniteScroll(window, this.getContent);

    this.tweets_max_id = undefined;
    this.articles_max_id = undefined;
    this.onGoingRequest = false;

    this.state = {
      history: undefined,
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
    this.networkBus.fetchTrend((err, response) => {
      if (err) {
        console.error(err);
        return;
      }
      const specificTrend = response;
      this.setState({
        history: specificTrend.history,
      });
    }, this.props.name);

    this.getContent();
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
    this.infiniteScroll.pause();
    this.onGoingRequest = true;

    let content = {
       tweets: [],
       articles: []
    };
    let responseCounter = 0;

    const handleResponse = () => {
      responseCounter += 1;
      if (responseCounter < 2) return;

      this.onGoingRequest = false;

      content = cutMerge(content.articles, content.tweets);
      this.renderContent(content);
    };

    if (this.tweets_max_id !== null) {
      this.networkBus.fetchTrendTweets((err, tweets) => {
        if (err) {
          console.error(err);
          return;
        }

        if (tweets.length) {
          this.tweets_max_id = tweets[tweets.length - 1]._id;
        } else {
          this.tweets_max_id = null;
        }

        content.tweets = tweets;

        handleResponse();
      }, this.props.name, 10, this.tweets_max_id);
    } else {
      handleResponse();
    }

    if (this.articles_max_id !== null) {
      this.networkBus.fetchTrendArticles((err, articles) => {
        if (err) {
          console.error(err);
          return;
        }

        if (articles.length) {
          this.articles_max_id = articles[articles.length - 1]._id;
        } else {
          this.articles_max_id = null;
        }

        content.articles = articles;

        handleResponse();
      }, this.props.name, 10, this.articles_max_id);
    } else {
      handleResponse();
    }
  }

  /**
   * Helper function specfic to #getContent.
   *
   * Renders the content from a specific trend's response.
   * @param {(Tweet[]|Article[])} content
   */
  private renderContent(content) {
    const offset = this.state.content.length;
    content = content.map((c, i) => {
      switch (c.type) {
        case 'Article':
          return <ArticleCard key={offset + i} article={c} />;
        case 'Tweet':
          return <TweetCard key={offset + i} tweet={c} />;
      }
      throw new ReferenceError();
    });

    this.setState(prevState => ({
      content: prevState.content.concat(content)
    }));
  }

  /**
   * Returns whether or not the endpoint fueling the infinite scroll is
   * depleted.
   * @returns {boolean}
   */
  private endpointIsNotDepleted() {
    return this.tweets_max_id !== null || this.articles_max_id !== null;
  }

  render() {
    const content = this.state.content;
    let cards = [<CardLayout key="cl:0" cards={content}/>];

    if (this.endpointIsNotDepleted()) {
      if (!this.onGoingRequest) {
        this.infiniteScroll.resume();
      }

      const ghostCards = [];
      for (let i = 0; i < this.state.ghostCards; i++) {
        ghostCards.push(<GhostCard key={`gc:${i}`} />);
      }
      cards = cards.concat(<CardLayout key="gc:*" cards={ghostCards}/>);
    }

    return (
      <div>
        <TrendChartVisual history={this.state.history}/>
        {cards}
      </div>
    );
  }
}
