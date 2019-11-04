<template>
  <poem-main page-name="lesson">
    <div id="etapes">
      <div class="filter">
        <p> {{$t('lessonPage.distractionFree')}} </p>
        <input type="checkbox" id="no-distraction" name="no-distraction" />
      </div>
      <ul>
        <li><a href="#tabs-1"> {{$t('lessonPage.courseMaterial')}} </a></li>
        <li><a href="#tabs-2"> {{$t('lessonPage.evaluation')}} - {{$t('lessonPage.stage')}} 1 </a></li>
        <li><a href="#tabs-3"> {{$t('lessonPage.evaluation')}} - {{$t('lessonPage.stage')}} 2 </a></li>
        <li><a href="#tabs-4"> {{$t('lessonPage.evaluation')}} - {{$t('lessonPage.stage')}} 3 </a></li>
        <li><a href="#tabs-5"> {{$t('lessonPage.description')}} </a></li>
      </ul>
      <div id="tabs-1">
        <!--<?php include('./includes/front/layout/main/page/lesson/tab1.php') ?>-->
        <h1> {{$t('lessonPage.content')}} </h1>
        <iframe v-bind:src='course_materialUrl' width="100%" height="600" allowfullscreen="" mozallowfullscreen="" webkitallowfullscreen=""></iframe>
      </div>

      <stage1 :unlocked="stage==1"/>
  
      <stage2 :unlocked="stage==2"/>
  
      <stage3 :unlocked="stage==3"/>
  
      <div id="tabs-4">
      </div>

      <div id="tabs-5">
        <h1> {{$t('lessonPage.description')}} </h1>
        <div class="lesson-description">
          <div class="lesson-vignette">
            <img src="~assets/img/lesson-default-logo.png"></img>
          </div>
          <div class="prof-avatar">
            <img src="~assets/img/lesson-default-logo.png" />
            <p> {{$t('lessonPage.anonymous')}} </p>
          </div>
          <div class="middle">
            <h4> {{ domainText + ' > ' + specialityText }} </h4>
            <h2 class="title-lesson"> {{ lesson.label }} </h2>
            <h3 class="description-courte"> {{ lesson.summary || $t('lessonPage.summary') }} </h3>
            <p class="description-longue"> {{ lesson.description || $t('lessonPage.description') }} </p>
            <p class="prof-quote"> {{ lesson.word_to_students || $t('lessonPage.wordToStudent') }} </p>
          </div>
          <div class="clearfix"></div>
          <div class="infos">
            <p>
              <span class="btn btn-info">Elo : {{ lesson.elo_level || '?' }} </span>
              <span class="btn btn-info"> {{$t('lessonPage.estimatedDuration')}} : {{ lesson.estimated_duration || '?' }} </span>
            </p>
          </div>
        </div>
        <div class="lesson-action">
          <p>
            <a class="btn btn-big" href="#" v-on:click='seeLesson()'> {{$t('lessonPage.seeLesson')}} </a>
            <a class="btn btn-big" href="#" v-on:click='joiningLesson()' v-if="(userId && !participationId)"> {{$t('lessonPage.registerLesson')}} </a>
            <router-link class="btn btn-big" to="/explorer"> {{$t('lessonPage.backToExplorer')}} </router-link>
          </p>
        </div>
        <div class="complements">
          <h2> {{$t('lessonPage.additionalInformation')}} </h2>
          <p class="guide"> {{$t('lessonPage.goFurther')}} </p>
          <p class="infos"> {{ lesson.appendix }} </p>
        </div>
      </div>
    </div>
  </poem-main>
</template>

<script>
  import PoemMain from 'components/PoemMain'
  import Stage1 from 'components/pages/front/evaluation/Stage1'
  import Stage2 from 'components/pages/front/evaluation/Stage2'
  import Stage3 from 'components/pages/front/evaluation/Stage3'
  import methods from 'src/poemjs/init-lesson.js'
  import auth from 'src/auth'
  
  export default {
    components: {
      PoemMain,
      Stage1,
      Stage2,
      Stage3
    },
    data () {
      return {
        userId: auth.getUser().id,
        lesson: {},
        specialityText: '',
        domainText: '',
        course_materialUrl: '',
        participationId: '',
        stage: 0,
        asked_questions: [],
        submitted_answers_id: [],
        evaluated_answers: []
      }
    },
    methods,
    mounted () {
      methods.initLesson(this, this.$route.params.id)
    },
    beforeDestroy () {
      methods.cancelNoDistrac()
    }
  }
</script>

<style>
  #lesson-title {
    text-transform: capitalize;
  }
</style>
