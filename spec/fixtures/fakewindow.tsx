const actions = {
  'scroll': () => {}
};

export const fakeWindow = {
  addEventListener: (type, callback) => {
    actions[type] = callback;
  },
  removeEventListener: (type, callback) => {
    actions[type] = undefined;
  },
  innerHeight: 0,
  document: {
    body: {
      scrollHeight: 0,
      scrollTop: 0,
      setScrollTop: (value) => {
        fakeWindow.document.body.scrollTop = value;
        actions['scroll']();
      }
    }
  }
};