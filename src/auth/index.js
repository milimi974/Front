import Vue from 'vue'
import {router} from '../main'
import axios from 'axios'

import {notifyInfo} from 'src/poemjs/init-notif-and-messages'

// Endpoint constants
const LOGIN_URL = 'poem_users/loginViaCSDC/'
const LOGOUT_URL = 'poem_users/logout'
const SIGNUP_URL = 'poem_users/registerViaCSDC'

// User object will let us check authentication status
var user = {
  authenticated: false,
  name: null,
  id: null,
  lang: null
}

export default {
  // Send a request to the login URL and save the returned JWT
  login (creds, redirect) {
    axios.post(LOGIN_URL, creds)
      .then(response => {
        saveUserLoginData(response.data)
        notifyInfo('messages.welcomeBack', response.data.username)
        if (redirect) router.push(redirect)
      })
  },

  signup (creds, redirect) {
    axios.post(SIGNUP_URL, creds)
      .then(response => {
        saveUserLoginData(response.data)
        notifyInfo('messages.welcome', creds.email)
        if (redirect) router.push(redirect)
      })
  },

  // To log out, we just need to remove the token
  logout () {
    axios.post(LOGOUT_URL + '?access_token=' + window.localStorage.getItem('id_token'))
      .then((response) => {
        router.push('/')
      })
    window.localStorage.clear()
    user.authenticated = false
  },

  getUser () {
    if (window.localStorage.getItem('id_token')) {
      user.authenticated = true
      user.name = window.localStorage.getItem('username')
      user.id = window.localStorage.getItem('id')
      user.lang = window.localStorage.getItem('display_lang')
      // context.$root.$lang.lang = window.localStorage.getItem('display_lang')
    } else {
      user.authenticated = false
    }
    return user
  },

  // The object to be passed as a header for authenticated requests
  getAuthHeader () {
    return {
      'Authorization': 'Bearer ' + window.localStorage.getItem('id_token')
    }
  }
}

function saveUserLoginData (data) {
  window.localStorage.setItem('id_token', data.token)
  user.authenticated = true

  window.localStorage.setItem('username', data.username)
  user.name = data.username

  window.localStorage.setItem('id', data.userId)
  user.id = data.id

  window.localStorage.setItem('display_lang', data.language)
  Vue.config.lang = data.language
}
