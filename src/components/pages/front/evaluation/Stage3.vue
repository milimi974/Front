<template>
  <div id="tabs-4" class="etape3">
    <h1>Etape 3 - Évaluer</h1>

    <div class="tab-header">
      <p class="consigne">
        <strong>Evaluez les réponses données aux questions suivantes.</strong> Vous pouvez à tout moment retourner voir la leçon et revenir ici. 
      </p>
      <div class="buttons">
        <!--<a class="btn" href="#">Sauvegarder</a>-->
        <a class="btn" href="#" v-if="unlocked" @click="validate3()">Valider</a>
      </div>
    </div>

    <stage3-block
      v-for="i in stage3Size"
      :number="i"
    />

  </div>
</template>

<script>
  import { stage3Size, validate3 } from 'src/poemjs/init-lesson.js'
  import Stage3Block from './Stage3Block'
  
  export default {
    components: {
      Stage3Block
    },
    props: {
      unlocked: {type: Boolean, default: true}
    },
    data () {
      return {
        stage3Size
      }
    },
    methods: {
      validate3
    }
  }
</script>
