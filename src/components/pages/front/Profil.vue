<template>
  <poem-main :page-name="authenticated ? 'profile' : 'registration'">
  <div class="inputs">
    <h1 v-if="authenticated"> {{$t('menu.profile')}} </h1>
    <h1 v-else> {{$t('menu.registration')}} </h1>
    <!-- infos personnelles -->
    <div class="basics">
      <h1> {{$t('profile.userAccount')}} </h1>
      <form id="form-profil" @submit.prevent='register'>
        <div class="col2">
          <label for="student">{{$t('login.student')}}</label>
          <input type="radio" id="student" name="role" v-model="role"/>
          <label for="teacher">{{$t('login.teacher')}}</label>
          <input type="radio" id="teacher" name="role" v-model="role"/>
        </div>
        <div class="col2">
          <label for="email"> {{$t('login.email')}} </label>
          <div class="input-group">
            <input type="email" id="email" name="email" required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" :title="$t('profile.emailHint')"
              v-model="email"
            />
          </div>
        </div>
        <div class="col2">
          <label for="username"> {{$t('profile.username')}} </label>
          <div class="input-group">
            <input type="text" id="username" name="username" :placeholder="defaultUsername"
              v-model="username"
            />
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="col2">
          <label for="firstname"> {{$t('profile.firstname')}} </label>
          <div class="input-group">
            <input type="text" id="firstname" name="firstname" required
              v-model="firstname"
            />
          </div>
        </div>
        <div class="col2">
          <label for="name"> {{$t('profile.lastname')}} </label>
          <div class="input-group">
            <input type="text" id="name" name="name" required
              v-model="lastname"
            />
          </div>
        </div>
        <div class="clearfix"></div>
        <div class="col2">
          <label for="passwd"> {{$t('login.pass')}} </label>
          <div class="input-group">
            <input type="password" id="passwd" name="passwd" minlength="8" required
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              :title="$t('profile.passwordHint')"
              v-model="password"
            />
            <button type="button"><i class="fa fa-eye-slash" aria-hidden="true"></i></button>
            <div class="reveal"></div>
          </div>
        </div>
        <div class="col2">
          <label for="confirm"> {{$t('profile.confirmation')}} </label>
          <div class="input-group">
            <input type="password" id="passwd" name="passwd" required @input="checkMatching"
              v-model="confirm"
            />
            <button type="button"><i class="fa fa-eye-slash" aria-hidden="true"></i></button>
            <div class="reveal"></div>
          </div>

        </div>
        <div class="clearfix"></div>
        <div class="validate">
          <input v-if="authenticated" type="submit" class="btn" :value="$t('profile.save')" />
          <input v-else type="submit" class="btn" :value="$t('profile.create')" />
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
        <input type="text" id="presentation-language" name="presentation-language" v-model="interface_lng"/>
        <label for="content-language"> {{$t('profile.contentLanguage')}} </label>
        <input type="text" id="content-language" name="content-language" v-model="content_lng"/>
      </div>
      <div class="clearfix"></div>
    </div>

    <!-- Compléments -->
    <div class="complement">
      <h1> {{$t('profile.studyLevel')}} </h1>
      <form action="#">
        <div class="col2">
          <h2> {{$t('profile.currentLevel')}} </h2>
        </div>
        <div class="col2">
          <h2> {{$t('profile.desiredLevel')}} </h2>
        </div>
        <div class="clearfix"></div>
        <div class="col2">
          <label for="levelbefore"> {{$t('level')}} </label>
          <input type="text" id="levelbefore" name="levelbefore"/>
        </div>
        <div class="col2">
          <label for="levelafter"> {{$t('level')}} </label>
          <input type="text" id="levelafter" name="levelafter"/>
        </div>
        <div class="clearfix"></div>
        <div class="col2">
          <label for="domainbefore"> {{$t('domain')}} </label>
          <input type="text" id="domainbefore" name="domainbefore"/>
        </div>
        <div class="col2">
          <label for="domainafter"> {{$t('domain')}} </label>
          <input type="text" id="domainafter" name="domainafter"/>
        </div>
        <div class="clearfix"></div>
        <div class="col2">
          <label for="speciality-before"> {{$t('speciality')}} </label>
          <input type="text" id="speciality-before" name="speciality-before"/>
        </div>
        <div class="col2">
          <label for="speciality-after"> {{$t('speciality')}} </label>
          <input type="text" id="speciality-after" name="speciality-after"/>
        </div>
        <div class="clearfix"></div>
      </form>
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

import initProfile from 'src/poemjs/init-profile'

export default {
  components: {
    PoemMain
  },
  data () {
    return {
      authenticated: auth.getUser().authenticated,
      domains: [],
      specialities: [],
      email: '',
      username: '',
      firstname: '',
      lastname: '',
      password: '',
      confirm: '',
      role: '',
      statu: 'student',
      content_lng: '',
      interface_lng: ''
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
      auth.signup({
        email: this.email,
        username: this.username,
        name: this.firstname,
        surname: this.lastname,
        password: this.password,
        status: this.statu
      }, 'Home')
    },
    checkMatching (event) {
      if (this.password != this.confirm) {
        event.target.setCustomValidity(this.$t('profile.confirmHint'))
      } else {
        event.target.setCustomValidity('')
      }
    }
  },
  mounted () {
    initProfile(this)
  }
}
</script>

<style>
  .ui-autocomplete-list, .ui-autocomplete input {
    text-transform: capitalize;
  }
</style>
