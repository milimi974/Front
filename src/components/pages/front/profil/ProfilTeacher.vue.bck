<template>
  <poem-main :page-name="authenticated ? 'profile' : 'registration'">
  <div class="inputs">
    <h1 v-if="authenticated"> {{$t('menu.profile')}} </h1>
    <h1 v-else> {{$t('menu.registration')}} </h1>

    <!-- infos personnelles -->
    <div class="basics" v-for="l in poem_user">
      <h1> {{$t('profile.userAccount')}} </h1>
      <form id="form-profil" @submit.prevent='register'>
        <div class="col2">
          {{$t('login.email')}}
          <div class="input-group">
           {{l.email}}
          </div>
        </div>
        <div class="col2">
          {{$t('profile.username')}}
          <div class="input-group">
            {{l.username}}
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="col2">
          {{$t('profile.firstname')}}
          <div class="input-group">
            {{l.firstname}}
          </div>
        </div>
        <div class="col2">
          {{$t('profile.lastname')}}
          <div class="input-group">
            {{l.lastname}}
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="clearfix"></div>
        <div class="validate">
          <input v-if="authenticated" type="submit" class="btn" :value="$t('profile.save')" />
        </div>
      </form>
    </div>

    <!-- préférences et avatar -->
    <div class="prefs">
      <h1> {{$t('profile.preferences')}} </h1>
      <div class="col2">
        <form action="#" class="dropzone" id="avatar">
          <div class="fallback">
            <input type="file" id="input-avatar">
          </div>
        </form>
      </div>
      <div class="col2">
        <label for="presentation-language"> {{$t('profile.presentationLanguage')}} </label>
        <input type="text" id="presentation-language" name="presentation-language"/>
        <label for="content-language"> {{$t('profile.contentLanguage')}} </label>
        <input type="text" id="content-language" name="content-language"/>
      </div>
      <div class="clearfix"></div>
    </div>

    <!-- template du drag & drop -->
    <div id="preview-template" style="display: none;">
      <div class="dz-preview dz-file-preview">
        <div class="dz-image"><img data-dz-thumbnail=""></div>

        <div class="dz-details">
          <div class="dz-size"><span data-dz-size=""></span></div>
          <div class="dz-filename"><span data-dz-name=""></span></div>
        </div>
        <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress=""></span></div>
        <div class="dz-error-message"><span data-dz-errormessage=""></span></div>

        <div class="dz-success-mark"><i class="fa fa-check"></i> </div>
        <div class="dz-error-mark"><i class="fa fa-exclamation"></i></div>
      </div>
    </div>
  </div>
</poem-main>
</template>

<script>
import PoemMain from 'components/PoemMain'
import auth from 'src/auth'
import axios from 'axios'

export default {
  components: {
    PoemMain
  },
  data () {
    return {
      username: '',
      authenticated: auth.getUser().authenticated,
      level: [],
      avatar: '',
      domains: [],
      specialities: [],
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      confirm: '',
      userId: auth.getUser().id,
      poem_user: []
    }
  },
  computed: {
    defaultUsername () {
      if (this.firstname + this.lastname != '') {
        return this.firstname + '.' + this.lastname
      }
    }
  },
  methods: {
    register () {
      axios.put('poem_users/1', {username: this.firstname})
    },
    checkMatching (event) {
      if (this.password != this.confirm) {
        event.target.setCustomValidity(this.$t('profile.confirmHint'))
      } else {
        event.target.setCustomValidity('')
      }
    }
  },
  mounted: function () {
    var requestFilter = JSON.stringify({
      where: {
        id: this.userId
      }
    })
    this.fetchUrl = 'poem_users/?filter=' + requestFilter
    axios.get(this.fetchUrl)
      .then(res => {
        res.data.forEach(l => {
          this.poem_user.push({
            id: l.id,
            firstname: l.name,
            lastname: l.surname,
            username: l.username,
            email: l.email,
            domain: l.domains,
            spe: l.specialities,
            lng_content: l.favoured_langage_content,
            lng_display: l.favoured_langage_display,
            status: l.status
          })
        })
      })
  },
  updated: function () {
    axios.put('poem_users/1', {username: this.username})
  }
}
</script>

<style>
  .ui-autocomplete-list, .ui-autocomplete input {
    text-transform: capitalize;
  }
</style>
