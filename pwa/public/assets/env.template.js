;(function (window) {
  window.env = window.env || {}

  // Environment variables
  window['env']['API_URL'] = '${API_URL}'
  window['env']['SOCKET_URL'] = '${SOCKET_URL}'
})(this)
