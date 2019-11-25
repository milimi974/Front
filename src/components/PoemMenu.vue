<template>
  <div id="poem-menu">
    <ul class="nav navbar-nav" v-if="user.authenticated">
      <router-link class="nav-item" tag="li" to="/dashboard">
        <a class="nav-link" :title="$t('tooltip.dashboard')"> {{$t('menu.dashboard')}} </a>
      </router-link>
      <router-link class="nav-item" tag="li" to="/profil/DashboardTEst">
        <a class="nav-link" :title="$t('tooltip.dashboard')"> {{$t('menu.dashboardtest')}} </a>
      </router-link>
      <router-link class="nav-item" tag="li" to="/explorer">
        <a class="nav-link" :title="$t('tooltip.explorer')"> {{$t('menu.explorer')}} </a>
      </router-link>
      <router-link class="nav-item" tag="li" to="/profil/ProfilStudents">
        <a class="nav-link" :title="$t('tooltip.profile')"> {{$t('menu.profile')}} </a>
      </router-link>
      <li class="nav-item">
        <a class="nav-link" href="#" id="logout" :title="$t('tooltip.logout')" @click='logout'> {{$t('menu.logout')}} </a>
      </li>
    </ul>

    <ul class="nav navbar-nav" v-else>
      <router-link class="nav-item" tag="li" to="/explorer">
        <a class="nav-link" :title="$t('tooltip.explorer')"> {{$t('menu.explorer')}} </a>
      </router-link>
      <router-link class="nav-item" tag="li" to="/registration">
        <a class="nav-link" :title="$t('tooltip.registration')"> {{$t('menu.registration')}} </a>
      </router-link>
      <li class="nav-item">
        <a class="nav-link" href="#" id="login" :title="$t('tooltip.login')" @click='openLoginForm'> {{$t('menu.login')}} </a>
        <transition name="fade" enter-active-class="fadeInDown" leave-active-class="fadeOut">
          <poem-login id="login-box" class="inputs login animated" v-show="loginFormVisible"></poem-login>
        </transition>
      </li>
    </ul>
  </div>
</template>

<script>
require('animate.css')

import PoemLogin from './PoemLogin'
import auth from 'src/auth'

export default {
  components: {
    PoemLogin
  },
  data () {
    return {
      user: auth.getUser(),
      loginFormVisible: false
    }
  },
  methods: {
    logout () {
      auth.logout()
    },
    openLoginForm () {
      /*
       TODO: give focus on mail input
      */
      this.loginFormVisible = !this.loginFormVisible
    }
  }
}
</script>
