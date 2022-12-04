;(function (window) {
  window.env = window.env || {}

  // Environment variables
  window['env']['MQTT_URL'] = '${MQTT_URL}'
  window['env']['API_INFLUX_URL'] = '${API_INFLUX_URL}'
  window['env']['AIRTABLE_KEY'] = '${AIRTABLE_KEY}'
})(this)
