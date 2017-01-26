import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {NetworkBus} from '../inc/network-bus';
import {cutMerge} from '../inc/utility';

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
  prevRequestTime;

  constructor(props) {
    super(props);
    this.trendsMeta = [];
    this.trendsMetaIndex = 0;
    this.prevRequestTime = 0;

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
    window.addEventListener("scroll", this.handleScroll);
  }

  /**
   * When the component is going to unmount stop detecting the scrolling.
   * @author Omar Chehab
   */
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }


  /**
   * Gets news and tweets from the server
   * @author Omar Chehab
   */
  getContent() {
    this.prevRequestTime = Date.now();
    const trends = this.state.trendsPacket;
  }

  /**
   * When the news and tweet container is scrolled, monitor it so you can load
   * more content.
   * @author Omar Chehab
   */
  handleScroll = event => {
    // how many pixels can the user scroll?
    const scrollLeft = document.body.scrollHeight - document.body.scrollTop;
    const reachedEnd = scrollLeft < window.innerHeight * 1.5;
    const waited = Date.now() > this.prevRequestTime + 3000;
    if (waited && reachedEnd) {
      this.setState(prevState => ({
        ghostCards: 4,
      }));
      this.getContent();
    }
  }

  render() {
    const content = this.state.content;
    var cards = content.map((content, i) => {
      return content.type == 'Article'
      // content will not reorder index key is fine
      ? <ArticleCard key={i} article={content} />
      : <TweetCard key={i} tweet={content} />;
    });

    const ghostCards = [];
    for (let i = 0; i < this.state.ghostCards; i++) {
      // content will not reorder index key is fine
      ghostCards.push(<GhostCard key={content.length + i} />);
    }

    cards = cards.concat(ghostCards)

    var cardsComponent;
    if (window.innerWidth >= 992) {
      cardsComponent = (
        <main className="card-container container">
          <div className="col-md-6">
            {cards.filter((card, i) => i % 2 == 0)}
          </div>
          <div className="col-md-6">
            {cards.filter((card, i) => i % 2 == 1)}
          </div>
        </main>
      );
    } else {
      cardsComponent = (
        <main className="card-container container">
          {cards}
        </main>
      );
    }
    return (
      <div>
        <TrendsChart trends={this.state.trendsPacket}
          onTrendClick={this.props.onTrendClick}
        />
        {cardsComponent}
      </div>
    );
  }
}
