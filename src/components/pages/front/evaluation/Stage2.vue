<template>
  <div id="tabs-3" class="etape2">
    <h1>Etape 2 - Répondre</h1>
    <div class="tab-header">
      <p class="consigne">
        <strong>Répondez aux questions et notez leur qualité.</strong> Vous pouvez à tout moment retourner voir la leçon et revenir ici.
      </p>
      <div class="buttons">
        <!--<a class="btn" href="#">Sauvegarder</a>-->
        <a class="btn" href="#" v-if="unlocked" @click="validate2()">Valider</a>
      </div>
    </div>

    <stage2-block
      v-for="i in stage2Size"
      :number="i"
    />
  </div>
</template>

<script>
  import { stage2Size, validate2 } from 'src/poemjs/init-lesson.js'
  import Stage2Block from './Stage2Block'
  
  export default {
    components: {
      Stage2Block
    },
    props: {
      unlocked: {type: Boolean, default: true}
    },
    data () {
      return {
        stage2Size
      }
    },
    methods: {
      validate2
    }
  }
</script>
