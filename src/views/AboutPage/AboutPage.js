import React, {PureComponent} from 'react'

export default class AboutPage extends PureComponent {
  static propTypes = {}

  render () {
    return (
      <div className="about container">

        <h1 className="brand">
          <span className="brand-green">Senti</span>
          <span className="brand-red">Social</span>
        </h1>

        <p className="about--description">
          SentiSocial is an open source social media sentiment analysis and news
          aggregation website. We follow trending topics and analyze tweets for
          their sentiment.
        </p>

        <p className="about--description">
          All code is available on
          &nbsp;<a href="https://github.com/SentiSocial">
            GitHub
          </a>&nbsp;
          under the MIT License.
        </p>

        <p className="about--contributers">
          <a className="about--contributers-item" href="https://github.com/gunshippenguin" target="_blank">
            <img src="https://github.com/gunshippenguin.png"/>
          </a>
          <a className="about--contributers-item" href="https://github.com/omarchehab98" target="_blank">
            <img src="https://github.com/omarchehab98.png"/>
          </a>
          <a className="about--contributers-item" href="https://github.com/dennistdev" target="_blank">
            <img src="https://github.com/dennistdev.png"/>
          </a>
          <a className="about--contributers-item" href="https://github.com/suchahassle" target="_blank">
            <img src="https://github.com/suchahassle.png"/>
          </a>
        </p>
      </div>
    )
  }
}
