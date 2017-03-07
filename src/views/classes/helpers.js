/**
* This function merges two arrays by inserting the values of the smaller array
* into the larger array. Note: Function will always place a 'news' item first.
* (array, array) -> array
* @author Dennis Tismenko
*/
export function cutMerge (news, tweets) {
  if (!news.length && !tweets.length) {
    return []
  } else if (!news.length) {
    return tweets
  } else if (!tweets.length) {
    return news
  }
  let smallArray, largeArray
  // Determines the smaller and larger array
  if (news.length < tweets.length) {
    smallArray = news
    largeArray = tweets
  } else {
    smallArray = tweets
    largeArray = news
  }
  // Determines an interval to insert the smaller array into the larger array
  let cutInterval = Math.round(largeArray.length / smallArray.length)
  // Configure the a new 'merged array' to return of length "merged length"
  let mergedArray = []
  let mergedLength = smallArray.length + largeArray.length
  // Set-up loop conditions
  let intervalCounter = cutInterval
  let firstIter = false
  while (mergedArray.length < mergedLength) {
    // If news exists, always include news as the first element
    if (!firstIter && news.length > 0) {
      firstIter = true
      mergedArray.push(news.shift())
      intervalCounter--
    }
    // If the loop reaches the interval, 'insert' next value from small array
    // If larger array is emply (for whatever reason), insert small array
    if ((intervalCounter === 0 && smallArray.length > 0) ||
      largeArray.length === 0) {
      mergedArray.push(smallArray.shift())
      // Reset interval counter to original interval value
      intervalCounter = cutInterval
    } else {
      mergedArray.push(largeArray.shift())
      intervalCounter--
    }
  }
  return mergedArray
}

/**
 * Returns true half the time false otherwise.
 * @return {boolean}
 * @author Omar Chehab
 */
export function fiftyFifty () {
  return Math.round(Math.random()) === 1
}

/**
 * Returns a whole number between a minimum and a maximum.
 * @param  {number} min inclusive
 * @param  {number} max exclusive
 * @return {number}
 */
export function randomRange (min, max) {
  if (min >= max) {
    throw new RangeError('min must be less than max')
  }
  const diff = max - min - 1
  return Math.round((Math.random() * diff) + min)
}

/**
 * Returns whether or not the device is a mobile device.
 * @returns {boolean}
 */
export function isMobileDevice () {
  return window.innerWidth < 768
}

const moment = require('moment')
/**
 * Configures the string format of moment's relative time.
 * @author Omar Chehab
 */
moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s',
    s: '1s',
    ss: '%ds',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1m',
    MM: '%dm',
    y: '1y',
    yy: '%dy'
  }
})

export {moment}
