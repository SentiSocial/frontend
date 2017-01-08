import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {NetworkBus, TrendPacket} from './network-bus';
import {cutMerge} from './utility';

import {NewsComponent} from './news-component';
import {TweetComponent} from './tweet-component';

import {Trends} from './trends';
import {News} from './news';
import {Tweet} from './tweet';
import {GhostCard, EndOfContent} from './ghostcard-component';

import {TrendsChart} from './trends-chart';

interface PageTrendsProps {
  onTrendClick: (selectedTrend) => void;
}

interface PageTrendsState {
  trends?: Trends;
  content?: any[];
  ghostCards?: number;
};

/**
 * This class handles rendering the homepage, it contains a graph and cards.
 * @author Omar Chehab
 */
export class PageTrends
  extends React.Component<PageTrendsProps, PageTrendsState> {
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
      trends: undefined,
      content: [],
      ghostCards: 3,
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
      NetworkBus.getContent((err, response) => {
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
      }, page);
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
      ghostCards.push(<GhostCard key={"gc:"+i} />);
    }
    if (window.innerWidth < 992) {
      return (
        <div>
          <main className="card-container container">
            <div className="card col-xs-12">
              <h1 className="website--title">News you care about.</h1>
              <p className="website--description">All the trends you are most passionate about, tailored in one place</p>
              <img src="http://c10.nrostatic.com/sites/default/files/styles/original_image_with_cropping/public/uploaded/donald-trump-grow-up.jpg?itok=n1PW3Myr"
                className="img-responsive" />
            </div>
          </main>
          <TrendsChart trends={this.state.trends}
            onTrendClick={this.props.onTrendClick}
          />
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
          <TrendsChart trends={this.state.trends}
            onTrendClick={this.props.onTrendClick}
          />
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
