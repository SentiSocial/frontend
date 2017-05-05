/**
 * Watches the scrolling of a user, callsback when the user is close to the
 * end of the document.
 * @author Omar Chehab
 */
export default class InfiniteScroll {
  /**
   * Pass the global variable window for use in production.
   *
   * Call #mount to start listening to scrolling.
   *
   * window;
   * callback: () => void;
   * isActive: boolean;
   * isPaused: boolean;
   *
   * @param {object} window dependency injection
   * @param {function} callback
   */
  constructor (window, callback) {
    this._handleScroll = this._handleScroll.bind(this)

    this.window = window
    this.callback = callback
    this.isActive = false
    this.isPaused = true
  }

  /**
   * Activates InfiniteScroll and begins listening for scrolling events.
   *
   * Call #unmount to stop listening to scrolling.
   */
  mount () {
    if (!this.isActive) {
      this.isActive = true
      this.window.addEventListener('scroll', this._handleScroll)
    }
  }

  /**
   * Deactivates InfiniteScroll and stops listening for scrolling events.
   */
  unmount () {
    if (this.isActive) {
      this.isActive = false
      this.window.removeEventListener('scroll', this._handleScroll)
    }
  }

  /**
   * Disallows InfiniteScroll to invoke the callback.
   */
  pause () {
    this.isPaused = true
  }

  /**
   * Allows InfiniteScroll to invoke the callback.
   */
  resume () {
    this.isPaused = false
  }

  /**
   * Event handler for the window scroll event.
   */
  _handleScroll (event) {
    const reachedEnd = this._getScrollRemaining() <= this.window.innerHeight * 2
    const isNotPaused = !this.isPaused
    if (isNotPaused && reachedEnd) {
      this.callback()
    }
  }

  /**
   * Returns the number of pixels remaining till the end of the document.
   * @return {number}
   */
  _getScrollRemaining () {
    const height = this.window.document.body.scrollHeight
    const position = this.window.document.body.scrollTop ||
      this.window.document.documentElement.scrollTop
    return height - position
  }
}
