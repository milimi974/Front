<template>
  <poem-main page-name="explorer">
    <div class="inputs">
      <h1> {{$t('menu.explorer')}} </h1>
      <div class="col3">
        <h3><a href="#"> {{$t('domains')}} </a></h3>
        <input id="dropdown1" name="dropdown" type="text" :placeholder="$t('domains')"/>
      </div>
      <div class="col3">
        <h3><a href="#"> {{$t('specialities')}} </a></h3>
        <input id="dropdown2" name="dropdown" type="text" :placeholder="$t('specialities')"/>
      </div>
      <div class="col3">
        <h3><a href="#"> {{$t('lessons')}} </a></h3>
        <input id="dropdown3" name="dropdown" type="text" :placeholder="$t('lessons')"/>
      </div>
      <div class="clearfix"></div>
      <div class="col3">
        <p class="elo-slider">
          <label for="elo-range">Elo:</label>
          <input type="text" id="elo-min" readonly size="9"/>
          <input type="text" id="elo-max" readonly size="9"/>
        </p>
        <div id="elo-slider" class="elo-slider"></div>
      </div>
      <div class="col3">
        <p class="language"> {{$t('explorer.onlyFavouriteLanguage')}} </p>
        <div class="language">
          <input type="checkbox" id="language" name="language"/>
        </div>
      </div>
      <div class="col3">
        <p class="filter"> {{$t('explorer.textSearch')}} </p>
        <div class="search">
          <input type="search" name="search" />
          <button type="button"><i class="fa fa-search"></i></button>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>

    <div class="explorer">
<!--       <div class="load">
        <img src="/css/assets/loader1.gif" alt="loader fourmis" />
      </div> -->
      <div id="tagcloud" class="tag-cloud">
        <h3>POEM</h3>
        <ul id="tag-list">
        </ul>
        <img id="imgcloud" src='~assets/img/ball5.png'>
      </div>
      <button class="btn btn-info-outline backward"></button>
      <button class="btn btn-info-outline forward"></button>
      <!--
      <?php if($_SESSION['explorermode'] == 'attractive'){ ?>
      <p class="info-track">Mode souris attractive<br />(<a href="/index.php?want=front_explorer&explorermode=trackball" title="glisser votre doigt sur la sphere ou maintenez le clic de la souris pour tourner">recharger l'exploreur en mode digital trackball</a>)</p>
      <?php } else { ?>
      <p class="info-track">Mode digital trackball<br />(<a href="/index.php?want=front_explorer&explorermode=attractive" title="la position du curseur de la souris attire les tags vers lui">recharger l'explorer en mode souris attractive</a>)</p>
      <?php } ?>
    -->
    </div>

    <div class="selection">
      <h2> {{$t('explorer.lessonDetail')}} </h2>
      <p class="banner">
        <span> {{ selection.domain }} </span>
        <i class="fa fa-chevron-right" aria-hidden="true"></i>
        <span> {{ selection.speciality }} </span>
      </p>

      <!--<a href="/index.php?want=front_lesson#tabs-5" class="vignette">-->
      <router-link class="vignette" :to="'/lesson/' + selection.lessonId" >
        <div class="orange"></div>
        <div class="content">
          <img class="img" src="~assets/img/lesson-default-logo.png"></img>
        </div>
      </router-link>
      <h4> {{ selection.title }} </h4>
      <div class="clearfix"></div>
    </div>

    <div class="clearfix"></div>
  </poem-main>
</template>

<script>
import PoemMain from 'components/PoemMain'

import initExplorer from 'src/poemjs/init-explorer.js'

export default {
  components: {
    PoemMain
  },
  data () {
    return {
      domains: [],
      specialities: [],
      lessons: [],
      selection: {
        domain: '',
        speciality: '',
        title: '',
        lessonId: ''
      }
    }
  },
  mounted () {
    initExplorer(this)
  }
}
</script>
