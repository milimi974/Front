<template>
  <div id="poem-login">
    <form @submit.prevent='submit()'>
      <label for="email"> {{$t('login.email')}}: </label>
      <div class="input-group">
        <input type="email" name="email" id="email" required="" v-model='credentials.email'/>
      </div>
      <label for="passwd"> {{$t('login.pass')}}: </label>
      <div class="input-group">
        <!-- 2ieme patern ici : http://html5pattern.com/Passwords -->
        <!-- minlength="8"
        pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" -->
        <input type="password" id="passwd" name="passwd" required=""
        v-model='credentials.password'
        />
        <button type="button"><i class="fa fa-eye-slash" aria-hidden="true"></i></button>
        <div class="reveal"></div>
      </div>

      <input type="submit" class="btn" :value="$t('login.connect')" id="welcome"/>
    </form>
<!--     <div v-if="error" style="color: red;">
      <p>Echec de connexion</p>
    </div> -->
  </div>
</template>

<script>
import auth from 'src/auth'

// var $passwdInputs = $('input[type="password"]')
// $passwdInputs.each(function () {
//   var $input = $(this)
//   var $button = $input.siblings('button')
//   var $reveal = $input.siblings('div.reveal')
//   $button.on('mousedown', function (e) {
//     e.preventDefault()
//     $reveal.html($input.val())
//     $input.css({'color': 'transparent'})
//     $reveal.fadeIn()
//   })
//   $button.on('mouseup', function (e) {
//     e.preventDefault()
//     $reveal.html('')
//     $reveal.fadeOut()
//     $input.css({'color': ''})
//   })
// })

export default {
  data () {
    return {
      credentials: {
        email: '',
        password: ''
      }// ,
      // error: ''
    }
  },
  methods: {
    submit () {
      auth.login(this.credentials, 'Home')
    }
  }
}
</script>
