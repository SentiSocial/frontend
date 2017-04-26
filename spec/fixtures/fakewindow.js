export default function FakeWindow () {
  const actions = {
    'scroll': () => {}
  }
  const window = {
    addEventListener: (type, callback) => {
      actions[type] = callback
    },
    removeEventListener: (type, callback) => {
      actions[type] = undefined
    },
    innerHeight: 0,
    document: {
      body: {
        scrollHeight: 0,
        scrollTop: 0,
        setScrollTop: (value) => {
          window.document.body.scrollTop = value
          actions['scroll']()
        }
      }
    }
  }
  return window
}
