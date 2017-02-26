/**
 * Watches the scrolling of a user, callsback when the user is close to the
 * end of the document.
 * @author Omar Chehab
 */
export class InfiniteScroll {
  protected window;
  protected callback: () => void;
  protected isActive: boolean;
  protected isPaused: boolean;

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
    this.isActive = false;
    this.isPaused = true;
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
   * Disallows InfiniteScroll to invoke the callback.
   */
  public pause() {
    this.isPaused = true;
  }

  /**
   * Allows InfiniteScroll to invoke the callback.
   */
  public resume() {
    this.isPaused = false;
  }

  /**
   * Event handler for the window scroll event.
   */
  protected handleScroll(event) {
    const reachedEnd = this.getScrollRemaining() <= this.window.innerHeight * 2;
    const isNotPaused = !this.isPaused;
    if (isNotPaused && reachedEnd) {
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
