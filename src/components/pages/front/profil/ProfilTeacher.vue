<template>
  <poem-main :page-name="authenticated ? 'profile' : 'registration'">
  <div id="po-main-container" class="po-container">
      <div class="po-row">
        <div class="po-col-8">
          <div class="po-row">
            <div class="po-col">Avatar</div>
            <div class="po-col">Onglet
              <ul class="po-nav">
                <li class="po-item" data-target="#po-information-table" data-event="po-onglet">Information</li>
                <li class="po-item" data-target="#po-message-table" data-event="po-onglet">Messages</li>
                <li class="po-item" data-target="#po-notification-table" data-event="po-onglet">Notifications</li>
                <li class="po-item" data-target="#po-edit-table" data-event="po-onglet">Éditer</li>
              </ul>
            </div>
          </div>
          <div id="po-information-table" class="po-row">
              <div class="po-col-12">
                <div class="po-form-group po-row">
                  <div class="po-col-2 po-col-form-label">Password</div>
                  <div class="po-col-10">
                      <div class="po-form-control-plaintext" readonly > Password </div>
                  </div>
                </div>
                <div class="po-form-group po-row">
                  <div class="po-col-2 po-col-form-label">Password</div>
                  <div class="po-col-10">
                      <div class="po-form-control-readonly" readonly > Password </div>
                  </div>
                </div>
                <div class="po-form-group po-row">
                  <div class="po-col-2 po-col-form-label">Password</div>
                  <div class="po-col-10">
                      <div class="po-form-control-readonly" readonly > Password </div>
                  </div>
                </div>
                <div class="po-form-group po-row">
                  <div class="po-col-2 po-col-form-label">Password</div>
                  <div class="po-col-10">
                      <div class="po-form-control-readonly" readonly > Password </div>
                  </div>
                </div>
                <div class="po-form-group po-row">
                  <div class="po-col-2 po-col-form-label">Password</div>
                  <div class="po-col-10">
                      <div class="po-form-control-readonly" readonly > Password </div>
                  </div>
                </div>
                <div class="po-form-group po-row">
                  <div class="po-col-2 po-col-form-label">Password</div>
                  <div class="po-col-10">
                      <div class="po-form-control-readonly" readonly > Password </div>
                  </div>
                </div>
              </div>

          </div>
          <div id="po-message-table" class="po-row"></div>
          <div id="po-notification-table" class="po-row"></div>
          <div id="po-edit-table" class="po-row"></div>
        </div>
        <dif class="po-col-4"></dif>
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


