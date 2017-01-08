/**
* This function merges two arrays by inserting the values of the smaller array
* into the larger array. Note: Function will always place a 'news' item first.
* (array, array) -> array
* @author Dennis Tismenko
*/
export function cutMerge(news, tweets) {
  // Determines the smaller and larger array
  if (news.length < tweets.length) {
    var smallArray = news;
    var largeArray = tweets;
  } else {
    var smallArray = tweets;
    var largeArray = news;
  }
  // Determines an interval to insert the smaller array into the larger array
  var cutInterval = Math.round(largeArray.length / smallArray.length);
  // Configure the a new "merged array" to return of length "merged length"
  var mergedArray = [];
  var mergedLength = smallArray.length + largeArray.length;
  // Set-up loop conditions
  var intervalCounter = cutInterval;
  var firstIter = false;
  while (mergedArray.length < mergedLength) {
    // If news exists, always include news as the first element
    if (!firstIter && news.length > 0){
      firstIter = true;
      mergedArray.push(news.shift());
      intervalCounter --;
    }
    // If the loop reaches the interval, 'insert' next value from small array
    // If larger array is emply (for whatever reason), insert small array
    if ((intervalCounter == 0 && smallArray.length > 0) || largeArray.length == 0){
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
