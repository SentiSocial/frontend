import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {NetworkBus} from '../classes/networkbus';
import {cutMerge} from '../classes/helpers';
import {InfiniteScroll} from '../classes/infinitescroll';

import {ArticleCard} from '../components/cards/article';
import {Article} from '../classes/article';
import {TweetCard} from '../components/cards/tweet';
import {Tweet} from '../classes/tweet';
import {TrendHistory} from '../classes/trend';

import {GhostCard} from '../components/cards/ghost';

import {SpecificTrendsChart} from '../components/charts/trend';

interface PageSpecificTrendsProps {
  name: string;
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
export class PageSpecificTrends
  extends React.Component<PageSpecificTrendsProps, PageSpecificTrendsState> {
  tweets_max_id;
  articles_max_id;
  infiniteScroll;

  constructor(props) {
    super(props);
    this.tweets_max_id = undefined;
    this.articles_max_id = undefined;
    this.infiniteScroll = new InfiniteScroll(this.getContent);

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
    NetworkBus.fetchTrend((err, response) => {
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
    let content = [];
    let responseCounter = 0;

    const handleResponse = () => {
      if (responseCounter < 2) {
        return;
      }

      content = cutMerge(content[0], content[1]);
      this.setState(prevState => ({
        content: prevState.content.concat(content)
      }));
    };

    if (this.tweets_max_id !== null) {
      NetworkBus.fetchTrendTweets((err, tweets) => {
        if (err) {
          console.error(err);
          return;
        }

        responseCounter += 1;
        if (!tweets.length) {
          this.tweets_max_id = null;
          return;
        }

        content.push(tweets);
        this.tweets_max_id = tweets[tweets.length - 1]._id;

        handleResponse();
      }, this.props.name, this.tweets_max_id, 10);
    }

    if (this.articles_max_id !== null) {
      NetworkBus.fetchTrendArticles((err, articles) => {
        if (err) {
          console.error(err);
          return;
        }

        responseCounter += 1;
        if (!articles.length) {
          this.articles_max_id = null;
          return;
        }

        content.push(articles);
        this.articles_max_id = articles[articles.length - 1]._id;

        handleResponse();
      },
      this.props.name, this.articles_max_id, 10 );
    }

    const moreContent = this.tweets_max_id !== null && this.articles_max_id !== null;
    if (!moreContent) {
      this.setState({
        ghostCards: 0
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
        <SpecificTrendsChart history={this.state.history}/>
        <main className="card-container container">
          {cardsComponent}
        </main>
      </div>
    );
  }
}
