import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {NetworkBus, SpecificTrendsDataPacket} from './network-bus';
import {cutMerge} from './utility';

import {NewsComponent} from './news-component';
import {TweetComponent} from './tweet-component';

import {News} from './news';
import {Tweet} from './tweet';
import {GhostCard, EndOfContent} from './ghostcard-component';

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
  content?: any[];
  ghostCards?: number;
};

/**
 * This class handles rendering the homepage, it contains a graph and cards.
 * @author Omar Chehab
 */
export class PageSpecificTrends
  extends React.Component<PageSpecificTrendsProps, PageSpecificTrendsState> {
  // keeping track if there is a pagination request going on.
  onGoingRequest;
  // keeping track which page we are on
  page;
  // keeping track of how many pieces of content per request
  contentPerRequest;
  // keepung track of how much content is left on the server
  contentRemaining;

  constructor(props) {
    super(props);
    this.state = {
      history: undefined,
      content: [],
      ghostCards: 4,
    };
    this.onGoingRequest = false;
    this.page = 0;
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
    }, this.props.name);

    this.getPage(0);
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
   * @param {number}  page  pagination page number
   * @author Omar Chehab
   */
  getPage(page) {
    this.onGoingRequest = true;
    NetworkBus.getSpecificContent((err, response) => {
        if (err) {
          console.error(err);
          return;
        }
        const newNews = response.news;
        const newTweets = response.tweets;
        const newRemaining = response.remaining;
        const numberOfNewContent = newNews.length + newTweets.length;
        this.contentRemaining = newRemaining;
        this.setState(prevState => {

          prevState.content = prevState.content
            .concat(cutMerge(newNews.map(news => {
              news['type'] = 'news';
              return news;
            }), newTweets.map(content => {
              content['type'] = 'tweet';
              return content;
            })));
          // time is running out i have to bodge this till it works.
          if (page == 0) {
            this.contentPerRequest = prevState.content.length;
          }
          return {
            content: prevState.content,
            remaining: newRemaining,
            ghostCards: 0
          };
        })
        this.onGoingRequest = false;
    }, this.props.name, page);
  }

  /**
   * When the news and tweet container is scrolled, monitor it so you can load
   * more content.
   * @author Omar Chehab
   */
  handleScroll = event => {
    // how many pixels can the user scroll?
    const scrollLeft = document.body.scrollHeight - document.body.scrollTop;
    const serverHasContent = this.contentRemaining > 0;
    const noOnGoingRequest = !this.onGoingRequest;
    const reachedEnd = scrollLeft < window.innerHeight * 2;
    if (serverHasContent && noOnGoingRequest && reachedEnd) {
      this.setState(prevState => ({
        ghostCards: this.contentRemaining % this.contentPerRequest,
      }));
      this.getPage(++this.page);
    }
  }

  render() {
    const ghostCards = [];
    for (let i = 0; i < this.state.ghostCards; i++) {
      // content will not reorder index key is fine
      ghostCards.push(<GhostCard key={i} />);
    }
    if (window.innerWidth < 992) {
      return (
        <div>
          <SpecificTrendsChart history={this.state.history}/>
          <main className="card-container container">
            {this.state.content.map((content, i) => {
              return content.type == 'news'
              // content will not reorder index key is fine
              ? <NewsComponent key={i} news={content} />
              : <TweetComponent key={i} tweet={content} />;
            })}
            {ghostCards}
            {this.contentRemaining == 0 && <EndOfContent />}
          </main>
        </div>
      );
    } else {
      const cards = this.state.content.map((content, i) => {
        return content.type == 'news'
        // content will not reorder index key is fine
        ? <NewsComponent key={i} news={content} />
        : <TweetComponent key={i} tweet={content} />;
      }).concat(ghostCards)
        .concat(this.contentRemaining == 0 && [<EndOfContent />]);
      const cards1 = cards.filter((card, i) => i % 2 == 0);
      const cards2 = cards.filter((card, i) => i % 2 == 1);
      return (
        <div>
          <SpecificTrendsChart history={this.state.history}/>
          <main className="card-container container">
            <div className="col-md-6">
              {cards1}
            </div>
            <div className="col-md-6">
              {cards2}
            </div>
          </main>
        </div>
      );
    }
  }
}
