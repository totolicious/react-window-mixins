/*global window */

var throttle = require("./throttle");

module.exports = {
  getInitialState: function() {
    return !this.onScroll ? { scroll: { x: 0, y: 0 } } : null;
  },

  componentDidMount: function() {
    if (!this.onScroll) {
      this.onScroll = function() {
        this.setState({ scroll: { x: window.pageXOffset, y: window.pageYOffset } });
      }.bind(this);
    }

    this.onScroll();
    this.onScrollThrottled = throttle(this.onScroll, 10);
    window.addEventListener("resize", this.onScrollThrottled);
  },

  componentWillUnmount: function() {
    if (this.onScroll) {
      window.removeEventListener("scroll", this.onScrollThrottled);
    }
  }
};