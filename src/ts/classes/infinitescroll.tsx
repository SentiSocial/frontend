/**
 * @author Omar Chehab
 */
export class InfiniteScroll {
  callback;
  prevRequestTime;

  /**
   * @author Omar Chehab
   */
  constructor(callback) {
    this.callback = callback;
    this.prevRequestTime = 0;
  }

  /**
   * @author Omar Chehab
   */
  mount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  /**
   * @author Omar Chehab
   */
  unmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  /**
   * @author Omar Chehab
   */
  handleScroll = event => {
    // how many pixels can the user scroll?
    const scrollLeft = document.body.scrollHeight - document.body.scrollTop;
    const reachedEnd = scrollLeft < window.innerHeight * 2;
    const waited = Date.now() > this.prevRequestTime + 1000;
    if (waited && reachedEnd) {
      this.prevRequestTime = Date.now();
      this.callback();
    }
  }
}
