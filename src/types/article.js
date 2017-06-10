export default class Article {
  constructor (article) {
    this._id = article._id
    this.title = article.title
    this.link = article.link
    this.timestamp = fromNow(article.timestamp * 1000)
    this.source = article.source
    this.media = article.media
    this.description = article.description
    this.type = 'Article'
  }
}

export function fromNow (timestamp) {
  const seconds = (Date.now() - timestamp) / 1000
  const MINUTE = 60
  const HOUR = 3600
  const DAY = 86400
  if (seconds < MINUTE) return Math.floor(seconds) + 's'
  if (seconds < HOUR) return Math.floor(seconds / MINUTE) + 'm'
  if (seconds < DAY) return Math.floor(seconds / HOUR) + 'h'
  timestamp = new Date(timestamp)
  const day = timestamp.getDate()
  const month = timestamp.toDateString().match(/\s\w+/)[0].replace(/\s/, '')
  const year = timestamp.getFullYear() === new Date().getFullYear()
    ? ''
    : ' ' + timestamp.getFullYear()
  return `${day} ${month}${year}`
}
