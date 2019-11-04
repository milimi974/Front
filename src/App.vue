<template>
  <div id="app">
    <div id="notification"></div>
    <div id="ligthbox"></div>
    <div class="container">
      <poem-navbar></poem-navbar>
      <div class="clearfix"></div>
      
      <div id="main">
        <router-view></router-view>
      </div>

      <poem-footer></poem-footer>
    </div>
  </div>
</template>

<script>
require('assets/css/front.css')
require('jquery-ui-bundle')
require('primeui')

import PoemNavbar from 'components/PoemNavbar'
import PoemFooter from 'components/PoemFooter'

export default {
  components: {
    PoemNavbar, PoemFooter
  }
}
</script>
