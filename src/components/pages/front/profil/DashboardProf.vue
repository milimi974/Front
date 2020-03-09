<template>
  <poem-main page-title="Mon tableau de bord" page-name="dashboard">
    <div class="list">
      <h1>Mes leçons</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Inscription</th>
            <th>Progression</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="l in attendedLessons">
            <td>{{ l.firstname }}</td>
            <td> <input type="text" v-model="l.firstname" > </td>
          </tr>
        </tbody>
      </table>
    </div>
  </poem-main>
</template>

<script>
  import PoemMain from 'components/PoemMain'
  import auth from 'src/auth'
  import axios from 'axios'

  /*
  import initProfile from 'src/poemjs/init-profile'
  */

  export default {
    components: {
      PoemMain
    },
    data () {
      return {
        authenticated: auth.getUser().authenticated,
        level: [],
        avatar: '',
        domains: [],
        specialities: [],
        email: '',
        username: '',
        firstname: '',
        lastname: '',
        password: '',
        confirm: '',
        userId: auth.getUser().id,
        attendedLessons: []
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
          password: this.password
        }, 'explorer')
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
          id: this.userId}
      })
      this.fetchUrl = 'poem_users/?filter=' + requestFilter
      axios.get(this.fetchUrl)
        .then(res => {
          res.data.forEach(l => {
            this.attendedLessons.push({
              id: l.id,
              firstname: l.name,
              lastname: l.surname,
              username: l.username,
              email: l.email,
              domain: l.domains,
              spe: l.specialities,
              lng_content: l.favoured_langage_content,
              lng_display: l.favoured_langage_display})
          })
        })
    }
  }
</script>
