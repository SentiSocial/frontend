import React, {Component, PureComponent} from 'react'
import PropTypes from 'prop-types'

import NetworkBus from 'views/facades/NetworkBus.js'
import InfiniteScroll from 'views/facades/InfiniteScroll.js'
import RequestChain from 'views/facades/RequestChain.js'
import {cutMerge} from 'views/helpers.js'

import CardLayout from 'views/CardLayout'

import ArticleCard from 'views/ArticleCard'
import TweetCard from 'views/TweetCard'
import TrackingProtectionCard from 'views/TrackingProtectionCard'
import GhostCard from 'views/GhostCard'

import AllTrendsChart from 'views/AllTrendsChart'

/**
 * AllTrendsPage is the homepage of SentiSocial.
 * It contains a bar chart with all the trends and their associated sentiment.
 * It also contains a feed of snippets from each trend's content.
 *
 * networkBus;
 * infiniteScroll;
 * trendsMeta;
 * trendsMetaIndex;
 * onGoingRequest;
 */
export default class AllTrendsPage extends Component {
  static propTypes = {
    dependencies: React.PropTypes.object,
    router: React.PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.getContent = this.getContent.bind(this)
    this.onTrendClick = this.onTrendClick.bind(this)

    const dependencies = this.props.dependencies || {}
    const _window = dependencies.window || window
    const _fetch = dependencies.fetch || window.fetch.bind(window)

    this.networkBus = new NetworkBus(_fetch)
    this.infiniteScroll = new InfiniteScroll(_window, this.getContent)
    this.trendsMeta = []
    this.trendsMetaIndex = 0
    this.onGoingRequest = false

    this.state = {
      trendsPacket: undefined,
      trendCards: [],
      ghostCards: 4
    }
  }

  /**
   * Request the trends and snippets of content from /v1/alltrends endpoint.
   */
  componentWillMount () {
    this.networkBus.fetchAllTrends((err, response) => {
      if (err) {
        console.error(err)
        this.props.router.replace('/500')
        return
      }
      const trendsPacket = response

      this.setState({
        trendsPacket: trendsPacket
      })

      trendsPacket.trends.forEach(trend => {
        this.trendsMeta.push({
          name: trend.name,
          max_id: {
            tweets: undefined,
            articles: undefined
          }
        })
      })

      this.getContent()
    })
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
   * Gets news and tweets from the server.
   */
  getContent () {
    this.infiniteScroll.pause()
    this.onGoingRequest = true

    const trends = this.trendsMeta
    const numberOfTrends = 2
    const requestsPerTrend = 2

    let chain = new RequestChain()

    let i = this.trendsMetaIndex
    let end = i + numberOfTrends
    while (i < end && i < trends.length) {
      // Block scope is important here.
      // It keeps track of trend's responses.
      const trendIndex = i
      const trend = trends[trendIndex]
      let responses = 0 // how many trend endpoints have responded?
      let content = {
        tweets: [],
        articles: []
      }

      const handleResponse = () => {
        // Only proceed if all requests for this trend have
        responses += 1
        if (responses < requestsPerTrend) {
          return
        }

        this.onGoingRequest = false

        // Scramble them like eggs, just kidding.
        // Merge the content into each other.
        let mergedContent = cutMerge(content.articles, content.tweets)
        // Update the state
        this.renderContent(trendIndex, mergedContent)
      }

      const context = {chain, content, handleResponse, trend}
      this.fetchContent(context, 'tweets', 4,
                        this.networkBus.fetchTrendTweets)
      this.fetchContent(context, 'articles', 3,
                        this.networkBus.fetchTrendArticles)

      i += 1
    }

    // Save which endpoint we left off at for next #getContent call.
    this.trendsMetaIndex = i
  }

  /**
   * Helper function specfic to #getContent.
   *
   * Fetches content from a specific trend through the NetworkBus.
   * @param {object} context
   * @param {string} contentType
   * @param {function} endpoint
   */
  fetchContent (context, contentType, contentLimit, networkBusFetch) {
    // If endpoint is not depleted from content
    if (context.trend.max_id[contentType] !== null) {
      // Register the callback in the request response.
      let chainId = context.chain.request((error, content) => {
        if (error) {
          console.error(error)
          return
        }

        // If there is content from this response
        if (content.length) {
          context.trend.max_id[contentType] = content[content.length - 1]._id
        } else {
          context.trend.max_id[contentType] = null
        }

        context.content[contentType] = content
        context.handleResponse()
      })

      // Make the request
      networkBusFetch((error, response) => {
        // Notify chain of the response
        context.chain.response(chainId, [error, response])
      }, context.trend.name, contentLimit, context.trend.max_id[contentType])
    } else {
      context.handleResponse()
    }
  }

  /**
   * Helper function specfic to #getContent.
   *
   * Renders the content from a specific trend's response.
   * @param {number} trendIndex
   * @param {(Tweet[]|Article[])} content
   */
  renderContent (trendIndex, content) {
    content = content.map((c, i) => {
      switch (c.type) {
        case 'Article':
          return <ArticleCard key={i} article={c}/>
        case 'Tweet':
          return window.trackingProtection
            ? <TrackingProtectionCard key={i} type="twitter" />
            : <TweetCard key={i} tweet={c}/>
      }
      throw new ReferenceError()
    })

    const trendCards = this.state.trendCards.slice(0)
    trendCards[trendIndex] = content
    this.setState({trendCards})
  }

  onTrendClick (trend) {
    trend = encodeURIComponent(trend.name)
    this.props.router.push(`/trend/${trend}`)
  }

  /**
   * Returns whether or not the endpoint fueling the infinite scroll is
   * depleted.
   * @returns {boolean}
   */
  endpointIsNotDepleted () {
    return this.trendsMetaIndex < this.trendsMeta.length
  }

  render () {
    const trendCards = this.state.trendCards

    let cardsArray = trendCards
      .reduce((prev, cards, i) => {
        const trend = this.trendsMeta[i]
        return prev.concat([
          <TrendHeading
            key={i * 2} value={trend.name}
            onClick={this.onTrendClick.bind(this, trend)}
            />,
          <CardLayout key={(i * 2) + 1} cards={cards}/>
        ])
      }, [])

    if (this.endpointIsNotDepleted()) {
      if (!this.onGoingRequest) {
        this.infiniteScroll.resume()
      }

      const ghostCards = []
      for (let i = 0; i < this.state.ghostCards; i++) {
        ghostCards.push(<GhostCard key={`gc:${i}`}/>)
      }
      cardsArray = cardsArray.concat(
        <CardLayout key="gc:*" cards={ghostCards}/>
      )
    }

    return (
      <div>
        <AllTrendsChart
          trends={this.state.trendsPacket}
          onTrendClick={this.onTrendClick}
          />
        {cardsArray}
      </div>
    )
  }
}

class TrendHeading extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
  }

  render () {
    const {
      onClick,
      value
    } = this.props

    return (
      <div className="trend-heading container" onClick={onClick}>
        <h3 className="trend-heading--text">
          {value}
        </h3>

        <a className="trend-heading--link">
          <img
            className="trend-heading--link-icon"
            src="/img/more.svg"
          />
        </a>
      </div>
    )
  }
}
