import * as React from 'react'
import './about.scss'

export default function AboutPage (props) {
  return (
    <div className="about container">
      <h1 className="about--brand">
        <span className="about--brand-green">Senti</span>
        <span className="about--brand-red">Social</span>
      </h1>

      <p className="about--description">
        Open source social media sentiment analysis and news aggregation website.
      </p>

      <p className="about--description">
        SentiSocial follows trending topics and analyses tweets and messages for their sentiment.
      </p>

      <h2 className="about--timeline">
        Timeline
      </h2>

      <img className="about--timeline-bubble"
        src="/img/radio-on-button.svg"/>

      <div className="about--timeline-date">
        January 7th, 2017
      </div>

      <div className="about--timeline-text">
        Hacked this project together and presented at Hack The Valey.
      </div>

      <img className="about--timeline-bubble"
        src="/img/radio-on-button.svg"/>

      <div className="about--timeline-date">
        February 10th, 2017
      </div>

      <div className="about--timeline-text">
        Presented at UTSC Entrepreneur Expo.
      </div>

      <img className="about--timeline-bubble"
        src="/img/radio-on-button.svg"/>

      <div className="about--timeline-date">
        February 24th, 2017
      </div>

      <div className="about--timeline-text">
        Presented at MPP Mitzie Hunter's Annual Youth Career Fair.
      </div>
    </div>
  )
}
