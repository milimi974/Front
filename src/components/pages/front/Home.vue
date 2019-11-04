<template>
  <poem-main page-name="home">

    <div class="home">
      <h1> {{$t('home.title')}} </h1>
      <div class="intro">
        <p>
          {{$t('poemDescription')}}
        </p>
        <router-link to="/about"> {{$t('home.more')}} </router-link>
      </div>
      <div class="third">
        <div class="left">
          <img src="~assets/img/masses.png" alt="picto masse etudiants" />
        </div>
        <div class="middle">
          <img src="~assets/img/pair.png" alt="picto pairs etudiants" />
        </div>
        <div class="right">
          <img src="~assets/img/surMesure.png" alt="picto sur mesure" />
        </div>
        <div class="clearfix"></div>
        <div class="left">
          <p> {{$t('home.left')}} </p>
        </div>
        <div class="middle">
          <p> {{$t('home.center')}} </p>
        </div>
        <div class="right">
          <p> {{$t('home.right')}} </p>
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="go">
        <p><router-link to="/explorer" class="btn btn-big"> {{$t('home.explore')}} </router-link></p>
      </div>
    </div>

  </poem-main>
</template>

<script>
import PoemMain from 'components/PoemMain'

export default {
  components: {
    PoemMain
  }
}
</script>
