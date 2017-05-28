export default class Tweet {
  constructor (tweet) {
    this._id = tweet._id
    this.embed_id = tweet.embed_id
    this.type = 'Tweet'
  }
}
