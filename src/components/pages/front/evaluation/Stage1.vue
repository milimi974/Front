<template>
  <div id="tabs-2" class="etape1">
    <h1>Etape 1 - Questionner</h1>
    <div class="tab-header">
      <p class="consigne">
        <strong>Posez une question en rapport avec la leçon et fournissez la réponse associée.</strong> Vous pouvez à tout moment retourner voir la leçon et revenir ici.
      </p>
      <div class="buttons">
        <!--<a class="btn" href="#">Sauvegarder</a>-->
        <a class="btn" href="#" v-if="unlocked" @click="validate1()">Valider</a>
      </div>
    </div>
    <div class="row">
      <div class="left">
        <div class="question">
          <div class="title">Votre <strong>Question</strong> sur la leçon</div>
          <textarea id="stage1-question" class="tinymce"> </textarea>
        </div>
        <div class="reponse">
          <div class="title">Votre <strong>Réponse</strong></div>
          <textarea id="stage1-answer" class="tinymce"> </textarea>
        </div>
      </div>
      <div class="right">
        <p>Cette question fera l'objet d'une <strong>évaluation par vos pairs</strong> qui sera comptabilisée dans vos résultats</p>
        <img class="pairs" src="~assets/img/pair.png" alt="image figurative de pairs" />
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
  import { validate1 } from 'src/poemjs/init-lesson.js'
  
  export default {
    props: {
      unlocked: {type: Boolean, default: true}
    },
    methods: {
      validate1
    }
  }
</script>
