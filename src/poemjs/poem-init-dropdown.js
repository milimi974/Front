var $ = require('jquery')
import axios from 'axios'

export function initDropdown (url, elementsId, initCallback, selectCallback) {
  axios.get(url)
    .then(response => {
      elementsId.forEach(name => updateDropdown(name, response.data, selectCallback))
      initCallback ? initCallback(response.data) : null
    })
}

export function updateDropdown (name, data, selectCallback) {
  data = data.map(item => item.label)
  $('#' + name).puiautocomplete({
    completeSource: data,
    forceSelection: true,
    dropdown: true,
    select: selectCallback
  })
}
