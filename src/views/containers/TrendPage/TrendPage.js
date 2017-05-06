import React from 'react'

import NetworkBus from 'views/facades/NetworkBus.js'
import InfiniteScroll from 'views/facades/InfiniteScroll.js'
import {cutMerge} from 'views/helpers.js'

import CardLayout from 'views/components/CardLayout'

import ArticleCard from 'views/components/ArticleCard'
import TweetCard from 'views/components/TweetCard'
import GhostCard from 'views/components/GhostCard'

/**
 * This class handles rendering the homepage, it contains a graph and cards.
 *
 * networkBus;
 * infiniteScroll;
 * tweets_max_id;
 * articles_max_id;
 * onGoingRequest;
 *
 * @author Omar Chehab
 */
export default class TrendPage extends React.Component {
  constructor (props) {
    super(props)

    this._getContent = this._getContent.bind(this)

    const dependencies = this.props.dependencies || {}
    const _window = dependencies.window || window
    const _fetch = dependencies.fetch || window.fetch.bind(window)

    this.networkBus = new NetworkBus(_fetch)
    this.infiniteScroll = new InfiniteScroll(_window, this._getContent)
    this.tweets_max_id = undefined
    this.articles_max_id = undefined
    this.onGoingRequest = false

    this.state = {
      history: undefined,
      content: [],
      ghostCards: 4
    }
  }

  /**
   * When the component WILL mount, request the trends and content from the
   * endpoint. Once they are loaded, update the state which will cause react to
   * re-render.
   */
  componentWillMount () {
    this.networkBus.fetchTrend((err, response) => {
      if (err) {
        console.error(err)
        return
      }
      const specificTrend = response
      this.setState({
        history: specificTrend.history
      })
    }, this.props.params.name)

    this._getContent()
  }

  /**
   * When the component has mounted start detecting the scrolling.
   */
  componentDidMount () {
    this.infiniteScroll.mount()
  }

  /**
   * When the component is going to unmount stop detecting the scrolling.
   */
  componentWillUnmount () {
    this.infiniteScroll.unmount()
  }

  /**
   * Gets news and tweets from the server
   */
  _getContent () {
    this.infiniteScroll.pause()
    this.onGoingRequest = true

    let content = {
      tweets: [],
      articles: []
    }
    let responseCounter = 0

    const handleResponse = () => {
      responseCounter += 1
      if (responseCounter < 2) {
        return
      }

      this.onGoingRequest = false

      content = cutMerge(content.articles, content.tweets)
      this._renderContent(content)
    }

    if (this.tweets_max_id !== null) {
      this.networkBus.fetchTrendTweets((err, tweets) => {
        if (err) {
          console.error(err)
          return
        }

        if (tweets.length) {
          this.tweets_max_id = tweets[tweets.length - 1]._id
        } else {
          this.tweets_max_id = null
        }

        content.tweets = tweets

        handleResponse()
      }, this.props.params.name, 10, this.tweets_max_id)
    } else {
      handleResponse()
    }

    if (this.articles_max_id !== null) {
      this.networkBus.fetchTrendArticles((err, articles) => {
        if (err) {
          console.error(err)
          return
        }

        if (articles.length) {
          this.articles_max_id = articles[articles.length - 1]._id
        } else {
          this.articles_max_id = null
        }

        content.articles = articles

        handleResponse()
      }, this.props.params.name, 10, this.articles_max_id)
    } else {
      handleResponse()
    }
  }

  /**
   * Helper function specfic to #_getContent.
   *
   * Renders the content from a specific trend's response.
   * @param {(Tweet[]|Article[])} content
   */
  _renderContent (content) {
    const offset = this.state.content.length
    content = content.map((c, i) => {
      switch (c.type) {
        case 'Article':
          return <ArticleCard key={offset + i} article={c}/>
        case 'Tweet':
          return <TweetCard key={offset + i} tweet={c}/>
      }
      throw new ReferenceError()
    })

    this.setState(prevState => ({
      content: prevState.content.concat(content)
    }))
  }

  /**
   * Returns whether or not the endpoint fueling the infinite scroll is
   * depleted.
   * @returns {boolean}
   */
  _endpointIsNotDepleted () {
    return this.tweets_max_id !== null || this.articles_max_id !== null
  }

  render () {
    const content = this.state.content
    let cards = [<CardLayout key="cl:0" cards={content}/>]

    if (this._endpointIsNotDepleted()) {
      if (!this.onGoingRequest) {
        this.infiniteScroll.resume()
      }

      const ghostCards = []
      for (let i = 0; i < this.state.ghostCards; i++) {
        ghostCards.push(<GhostCard key={`gc:${i}`}/>)
      }
      cards = cards.concat(<CardLayout key="gc:*" cards={ghostCards}/>)
    }

    return (
      <div>
        {cards}
      </div>
    )
  }
}

TrendPage.propTypes = {
  dependencies: React.PropTypes.object,
  params: React.PropTypes.object.isRequired
}
