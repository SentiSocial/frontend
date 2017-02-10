/**
* This function merges two arrays by inserting the values of the smaller array
* into the larger array. Note: Function will always place a 'news' item first.
* (array, array) -> array
* @author Dennis Tismenko
*/
export function cutMerge(news, tweets) {
  if (!news.length && !tweets.length) return [];
  else if (!news.length) return tweets;
  else if (!tweets.length) return news;
  let smallArray, largeArray;
  // Determines the smaller and larger array
  if (news.length < tweets.length) {
    smallArray = news;
    largeArray = tweets;
  } else {
    smallArray = tweets;
    largeArray = news;
  }
  // Determines an interval to insert the smaller array into the larger array
  let cutInterval = Math.round(largeArray.length / smallArray.length);
  // Configure the a new 'merged array' to return of length "merged length"
  let mergedArray = [];
  let mergedLength = smallArray.length + largeArray.length;
  // Set-up loop conditions
  let intervalCounter = cutInterval;
  let firstIter = false;
  while (mergedArray.length < mergedLength) {
    // If news exists, always include news as the first element
    if (!firstIter && news.length > 0) {
      firstIter = true;
      mergedArray.push(news.shift());
      intervalCounter --;
    }
    // If the loop reaches the interval, 'insert' next value from small array
    // If larger array is emply (for whatever reason), insert small array
    if ((intervalCounter === 0 && smallArray.length > 0)
      || largeArray.length === 0) {
      mergedArray.push(smallArray.shift());
      // Reset interval counter to original interval value
      intervalCounter = cutInterval;
    } else {
      mergedArray.push(largeArray.shift());
      intervalCounter --;
    }
  }
  return mergedArray;
}

const moment = require('moment');

/**
 * This configures the format of the time displayed on the news card.
 * @author Omar Chehab
 */
moment.updateLocale('en', {
  relativeTime : {
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
    yy: '%dy',
  }
});

export {moment};


/**
 * Returns true half the time false otherwise. Fifty fifty yo. Fifty fifty.
 * @author Omar Chehab
 */
export function fiftyFifty() {
  return Math.round(Math.random()) === 1;
}

/**
 * Returns a random range of two integers
 * @param  {number} min
 * @param  {number} max
 * @return {number}
 */
export function randomRange(min, max) {
  const diff = max - min;
  return Math.random() * min + diff;
}

/**
 * Object.assign polyfill
 */
if (typeof Object['assign'] !== 'function') {
  Object['assign'] = function (target, varArgs) { // .length of function is 2
    if (target == null) { // TypeError if undefined or null
      throw new TypeError('Cannot convert undefined or null to object');
    }

    let to = Object(target);

    for (let index = 1; index < arguments.length; index++) {
      let nextSource = arguments[index];

      if (nextSource != null) { // Skip over if undefined or null
        for (let nextKey in nextSource) {
          // Avoid bugs when hasOwnProperty is shadowed
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  };
}
