<template>
  <div id="poem-footer">
    <div class="clearfix"></div>
    <section id="infos">
      <div class="columns">
        <div class="left">
          <form action="#">
            <label for="email"> {{$t('footer.contact')}} </label>
            <input type="email" id="email" name="email" :placeholder="$t('footer.email')" />
            <textarea name="message" id="message" cols="30" rows="3"> {{$t('footer.message')}} </textarea>
            <button type="submit">Ok</button>
          </form>
        </div>
        <div class="right">
          <router-link class="apropos" to="/about" title="En savoir plus sur POEM"> 
            {{$t('footer.about')}} 
            <span>POEM</span>
          </router-link>
          <a href="~assets/img/partenaires.png"><div class="partenaires"></div></a>
          <div class="links">
            <router-link to="/legal" title="mentions légales"> {{$t('footer.legal')}} </router-link>
          </div>
        </div>
        <div class="clearfix"></div>
      </div>
    </section>
  </div>
</template>
