<template>
  <poem-main page-name="about">
  
    <div class="about">
      <h1> {{$t('about.title')}} </h1>
      <div class="intro">
        <div class="left">
          <p>
            {{$t('poemDescription')}}
          </p>
        </div>
        <div class="right">
          <img src="~assets/img/prezi.png" alt="image prezi">
          <p><a href="http://prezi.com/pcmbojxnbypc" target="_blank"> {{$t('about.preziLink')}} </a></p>
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="second">
        <div class="left">
          <p>
            {{$t('about.longPresentationPart1')}}
          </p>
        </div>
        <div class="right">
          <p>
            {{$t('about.longPresentationPart2')}}
          </p>
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="separator">
        <img src="~assets/img/chemin.png" alt="separator">
      </div>
      <div class="third">
        <div class="left">
          <p>
            {{$t('about.longPresentationPart3')}}
          </p>
        </div>
        <div class="middle">
          <p>
            {{$t('about.longPresentationPart4')}}
          </p>
        </div>
        <div class="right">
          <p>
            {{$t('about.longPresentationPart5')}}
          </p>
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="go">
        <p>
          <router-link to="/explorer" class="btn btn-big"> {{$t('home.explore')}} </router-link>
        </p>
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
