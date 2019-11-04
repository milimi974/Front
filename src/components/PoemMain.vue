<template>
  <section :id="pageName">
    <div class="header">
      <div class="inner-container">
        <div class="arianne">
          <p>
            <router-link to="/">POEM</router-link>
            &gt
            <span class="actif"> {{ $t('menu.'+pageName) }} </span>
          </p>
        </div>
      </div>
      <div :class="'extend-header ' + pageName"></div>
      <div class="clearfix"></div>
    </div>
    
    <div class="page">
      <div :class="'inner-container ' + pageName">
        <div id="messages"></div>
        <slot>
          This default text shouldn't be displayed. Please provide a slot tag. 
          (See : http://vuejs.org/guide/components.html#Named-Slots)
        </slot>
      </div>
      <div class="clearfix"></div>
    </div>
  </section>
</template>

<script>
import initNotificationAndMessages from 'src/poemjs/init-notif-and-messages'

export default {
  props: ['pageName'],
  mounted () {
    initNotificationAndMessages(this)
  }
}
</script>
