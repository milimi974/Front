import Vue from 'vue'
import App from './App'
import VueI18n from 'vue-i18n'
import VueRouter from 'vue-router'
import axios from 'axios'

import Dashboard from 'components/pages/front/Dashboard'
import DashboardTEst from 'components/pages/front/profil/DashboardTEst'
import Explorer from 'components/pages/front/Explorer'
import Lesson from 'components/pages/front/Lesson'
import Profil from 'components/pages/front/Profil'
import ProfilStudents from 'components/pages/front/profil/ProfilStudents'
import ProfilTeacher from 'components/pages/front/profil/ProfilTeacher'
import Legal from 'components/pages/front/Legal'
import About from 'components/pages/front/About'
import Home from 'components/pages/front/Home'

import auth from './auth'
import {messageConnectionError} from 'src/poemjs/init-notif-and-messages'
import backendUrl from './backend_url'

import en from 'assets/lang/en'
import fr from 'assets/lang/fr'

Vue.use(VueI18n)
Vue.use(VueRouter)

// Check the users auth status when the app starts
var user = auth.getUser()

// Option for VueI18n
var locales = {en, fr}
Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})
Vue.config.lang = user.lang ? user.lang : 'en'

axios.defaults.baseURL = backendUrl
axios.defaults.headers.common['Authorization'] = auth.getAuthHeader()
axios.interceptors.response.use(res => res, error => {
  messageConnectionError(error)
  return Promise.reject(error)
})

export var router = new VueRouter({
  base: __dirname,
  routes: [
    { path: '/home', component: Home },
    { path: '/dashboard', component: Dashboard,
      beforeEnter: (to, from, next) => {
        user.authenticated ? next() : next('/')
      }
    },
    { path: '/profil/DashboardTEst', component: DashboardTEst,
      beforeEnter: (to, from, next) => {
        user.authenticated ? next() : next('/')
      }
    },
    { path: '/explorer', component: Explorer },
    { path: '/profil/ProfilStudents', component: ProfilStudents,
      beforeEnter: (to, from, next) => user.authenticated ? next() : next('/')
    },
    { path: '/profil/ProfilTeacher', component: ProfilTeacher,
      beforeEnter: (to, from, next) => user.authenticated ? next() : next('/')
    },
    { path: '/registration', component: Profil,
      beforeEnter: (to, from, next) => user.authenticated ? next('/profil') : next()
    },
    { path: '/legal', component: Legal },
    { path: '/about', component: About },
    { path: '/lesson/:id(\\d+)', component: Lesson },
    { path: '*', component: Home }
  ]
})

export default new Vue({
  router,
  el: '#vue-instance',
  components: { App }
})

