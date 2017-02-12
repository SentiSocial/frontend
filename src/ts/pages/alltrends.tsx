import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {NetworkBus} from '../classes/networkbus';
import {InfiniteScroll} from '../classes/infinitescroll';
import {RequestChain} from '../classes/requestchain';
import {cutMerge} from '../classes/helpers';

import {AllTrends, AllTrendsTrend} from '../types/alltrends';
import {Article} from '../types/article';
import {Tweet} from '../types/tweet';

import {CardLayout} from '../components/cardlayout';

import {ArticleCard} from '../components/cards/article';
import {TweetCard} from '../components/cards/tweet';
import {GhostCard} from '../components/cards/ghost';

import {TrendsChart} from '../components/charts/alltrends';

interface PageTrendsProps {
  onLoad: (error) => void;
  onTrendClick: (selectedTrend) => void;
  dependencies: any;
}

interface PageTrendsState {
  trendsPacket?: AllTrends;
  trendCards?: any[];
  ghostCards?: number;
};

/**
 * AllTrendsPage is the homepage of SentiSocial.
 *
 * It contains a bar chart with all the trends and their associated sentiment.
 *
 * It also contains a feed of snippets from each trend's content.
 * @author Omar Chehab
 */
export class AllTrendsPage
  extends React.Component<PageTrendsProps, PageTrendsState> {
  private networkBus;
  private infiniteScroll;

  private trendsMeta;
  private trendsMetaIndex;

  /**
   * Creates a new AllTrendsPage.
   */
  constructor(props) {
    super(props);

    this.getContent = this.getContent.bind(this);

    const fetch = this.props.dependencies.fetch;
    this.networkBus = new NetworkBus(fetch);
    const window = this.props.dependencies.window;
    this.infiniteScroll = new InfiniteScroll(window, this.getContent);

    this.trendsMeta = [];
    this.trendsMetaIndex = 0;

    this.state = {
      trendsPacket: undefined,
      trendCards: [],
      ghostCards: 4,
    };
  }

  /**
   * Request the trends and snippets of content from the /alltrends endpoint.
   */
  public componentWillMount() {
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
          max_id: {
            tweets: undefined,
            articles: undefined,
          }
        });
      });

      this.getContent();
    });
  }

  /**
   * When the component has mounted start detecting the scrolling.
   */
  public componentDidMount() {
    this.infiniteScroll.mount();
  }

  /**
   * When the component is going to unmount stop detecting the scrolling.
   */
  public componentWillUnmount() {
    this.infiniteScroll.unmount();
  }


  /**
   * Gets news and tweets from the server.
   */
  private getContent() {
    const trends = this.trendsMeta;
    const numberOfTrends = 2;
    const requestsPerTrend = 2;

    let chain = new RequestChain();

    let i = this.trendsMetaIndex;
    let end = i + numberOfTrends;
    while (i < end && i < trends.length) {
      // Block scope is important here.
      // It keeps track of trend's responses.
      const trendIndex = i;
      const trend = trends[trendIndex];
      const isFirst = trendIndex === 0;
      let responses = 0; // how many trend endpoints have responded?
      let content = {
        tweets: [],
        articles: []
      };

      const handleResponse = () => {
        // Only proceed if all requests for this trend have
        if (++responses < requestsPerTrend) return;
        // Scramble them like eggs, just kidding.
        // Merge the content into each other.
        let mergedContent = cutMerge(content.tweets, content.articles);
        // Update the state
        this.renderContent(trendIndex, mergedContent);
        // If this is the first load, tell big boss (index.tsx) that we loaded.
        isFirst && this.props.onLoad(undefined);
      };

      const context = {chain, content, handleResponse, trend};
      this.fetchContent(context, 'tweets', 3,
                        this.networkBus.fetchTrendTweets);
      this.fetchContent(context, 'articles', 3,
                        this.networkBus.fetchTrendArticles);

      i += 1;
    }

    // Save which endpoint we left off at for next #getContent call.
    this.trendsMetaIndex = i;
  }

  /**
   * Helper function specfic to #getContent.
   *
   * Fetches content from a specific trend through the NetworkBus.
   * @param {object} context
   * @param {string} contentType
   * @param {function} endpoint
   */
  private fetchContent(context, contentType, contentLimit, networkBusFetch) {
    // If endpoint is not depleted from content
    if (context.trend.max_id[contentType] !== null) {
      // Register the callback in the request response.
      let chainId = context.chain.request((error, content) => {
        if (error) {
          console.error(error);
          return;
        }

        // If there is content from this response
        if (content.length) {
          context.trend.max_id[contentType] = content[content.length - 1]._id;
        } else {
          context.trend.max_id[contentType] = null;
        }

        context.content[contentType] = content;
        context.handleResponse();
      });

      // Make the request
      networkBusFetch((error, response) => {
        // Notify chain of the response
        context.chain.response(chainId, [error, response]);
      }, context.trend.name, contentLimit, context.trend.max_id[contentType]);
    } else {
      context.handleResponse();
    }
  }

  /**
   * Helper function specfic to #getContent.
   *
   * Renders the content from a specific trend's response.
   * @param {number} trendIndex
   * @param {(Tweet[]|Article[])} content
   */
  private renderContent(trendIndex, content) {
    content = content.map((c, i) => {
      switch (c.type) {
        case 'Article':
          return <ArticleCard key={i} article={c} />;
        case 'Tweet':
          return <TweetCard key={i} tweet={c} />;
      }
      throw new ReferenceError();
    });

    const trendCards = this.state.trendCards.slice(0);
    trendCards[trendIndex] = content;
    this.setState({trendCards});
  }

  public render() {
    const trendCards = this.state.trendCards;
    const ghostCards = [];
    for (let i = 0; i < this.state.ghostCards; i++) {
      ghostCards.push(<GhostCard key={`GC${trendCards.length + i}`} />);
    }

    const cardsArray = trendCards
      .reduce((prev, cards, i) => {
        const trend = this.trendsMeta[i];
        return prev.concat([
          <TrendHeading value={trend.name}
            onClick={() => this.props.onTrendClick(trend)}/>,
          cards
        ]);
      }, [])
      .concat(ghostCards);

    return (
      <div>
        <TrendsChart trends={this.state.trendsPacket}
          onTrendClick={this.props.onTrendClick}/>
        <CardLayout cards={cardsArray}/>
      </div>
    );
  }
}

function TrendHeading(props) {
  return (
    <div className="trend-heading" onClick={props.onClick}>
      <h3 className="trend-heading--text">{props.value}</h3>
      <a className="trend-heading--link">
          <img className="trend-heading--link-icon" src="img/more.svg"/>
      </a>
    </div>
  );
}