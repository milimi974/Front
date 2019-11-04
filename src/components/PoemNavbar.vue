<template>
  <div id="poem-navbar">
    <nav class="navbar inner-container">
        <div class="brand">
            <!-- co ? '?want=front_dashboard' : '' -->
            <a href="/">
              <img src="~assets/img/logo.png" alt="logo POEM">
            </a>
        </div>
        <div class="menu" v-bind:class="{'anonymous': !user.authenticated}">
            <poem-menu></poem-menu>
        </div>
        <div class="user" v-if="user.authenticated">
            <img src="~assets/img/user.png" alt="logo POEM">
            <p>{{user.name}}</p>
        </div>
    </nav>
  </div>
</template>

<script>
import PoemMenu from './PoemMenu'
import auth from 'src/auth'

export default {
  components: {
    PoemMenu
  },
  data () {
    return {
      user: auth.getUser
    }
  }
}
</script>