var $ = require('jquery')

var vue = {}

export default function poemInitNotificationAndMessages (vueInstance) {
  vue = vueInstance
  $('#notification').puigrowl({life: 6000})
  $('#messages').puimessages()
}

export function notifyInfo (message, user = '') {
  $('#notification').puigrowl('show', [{
    severity: 'info',
    summary: vue.$t(message + '.title'),
    detail: vue.$t(message + '.content') + user
  }])
}

export function messageInfo (message) {
  $('#messages').puimessages('show', 'info', { summary: vue.$t(message + '.title'), detail: vue.$t(message + '.content') })
}

export function messageWarn (message) {
  $('#messages').puimessages('show', 'warn', { summary: vue.$t(message + '.title'), detail: vue.$t(message + '.content') })
}

export function messageConnectionError (reason) {
  console.log(reason)
  $('#messages').puimessages('show', 'error', { summary: vue.$t('messages.connectionError.title'), detail: vue.$t('messages.connectionError.content') })
}
