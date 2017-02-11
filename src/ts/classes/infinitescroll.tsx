/**
 * Watches the scrolling of a user, callsback when the user is close to the
 * end of the document.
 * @author Omar Chehab
 */
export class InfiniteScroll {
  protected window;
  protected callback: () => void;
  protected prevRequestTime: number;
  protected isActive: boolean;

  /**
   * Pass the global variable window for use in production.
   *
   * Call #mount to start listening to scrolling.
   * @param {object} window dependency injection
   * @param {function} callback
   */
  constructor(window, callback) {
    this.handleScroll = this.handleScroll.bind(this);

    this.window = window;
    this.callback = callback;
    this.prevRequestTime = 0;
    this.isActive = false;
  }

  /**
   * Activates InfiniteScroll and begins listening for scrolling events.
   *
   * Call #unmount to stop listening to scrolling.
   */
  public mount() {
    if (!this.isActive) {
      this.isActive = true;
      this.window.addEventListener('scroll', this.handleScroll);
    }
  }

  /**
   * Deactivates InfiniteScroll and stops listening for scrolling events.
   */
  public unmount() {
    if (this.isActive) {
      this.isActive = false;
      this.window.removeEventListener('scroll', this.handleScroll);
    }
  }

  /**
   * Event handler for the window scroll event.
   */
  protected handleScroll(event) {
    const reachedEnd = this.getScrollRemaining() < this.window.innerHeight * 2;

    const waited = Date.now() > this.prevRequestTime + 1000;
    if (waited && reachedEnd) {
      this.prevRequestTime = Date.now();
      this.callback();
    }
  }

  /**
   * Returns the number of pixels remaining till the end of the document.
   * @return {number}
   */
  protected getScrollRemaining() {
    const height = this.window.document.body.scrollHeight;
    const position = this.window.document.body.scrollTop;
    return height - position;
  }
}
