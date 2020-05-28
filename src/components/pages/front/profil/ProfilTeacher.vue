<template>
  <poem-main :page-name="authenticated ? 'profile' : 'registration'">
  <div id="po-main-container" class="po-container">
      <div class="po-row">
        <div class="po-col-2 text-center">
          <img src="~assets/img/profil.png" class="po-img-profile" alt="image">
          <p>
            <a href="">supprimer</a><span>|</span><a href="">ajouter</a>
          </p>
        </div>
        <div class="po-col-8 ">
          <div id="" class="">
            <h2 class="primary">John DOE</h2>
            <div class="bbtm">
              <ul class="po-nav secondary text-maj ">
                <li class="po-item po-tab" v-bind:class="{ active: isActiveTab('information') }" v-on:click="switchTab('information')">Informations</li>
                <li class="po-item po-tab" v-bind:class="{ active: isActiveTab('message') }" v-on:click="switchTab('message')">Messages</li>
                <li class="po-item po-tab" v-bind:class="{ active: isActiveTab('notification') }" v-on:click="switchTab('notification')">Notifications</li>
                <li class="po-item po-tab" v-bind:class="{ active: isActiveTab('edit') }" v-on:click="switchTab('edit')">Éditer</li>
              </ul>
            </div>
          </div>
          <div v-show="isActiveTab('information')" class="po-row">
              <div class="po-col-12">
                <div class="po-form-group po-row text-capitalized">
                  <div class="po-col-2 po-col-form-label">nom</div>
                  <div class="po-col-10">
                      <div class="po-form-control-readonly" readonly > john </div>
                  </div>
                </div>
                <div class="po-form-group po-row text-capitalized">
                  <div class="po-col-2 po-col-form-label">prenom</div>
                  <div class="po-col-10">
                      <div class="po-form-control-readonly" readonly > doe </div>
                  </div>
                </div>
                <div class="po-form-group po-row">
                  <div class="po-col-2 po-col-form-label text-capitalized">adresse email</div>
                  <div class="po-col-10">
                      <div class="po-form-control-readonly" readonly > adresse email </div>
                  </div>
                </div>
                <div class="po-form-group po-row text-capitalized">
                  <div class="po-col-2 po-col-form-label">institution</div>
                  <div class="po-col-10">
                      <div class="po-form-control-readonly" readonly > institution </div>
                  </div>
                </div>
                <div class="po-form-group po-row">
                  <div class="po-col-2 po-col-form-label text-capitalized">site web</div>
                  <div class="po-col-10">
                      <div class="po-form-control-readonly" readonly > http </div>
                  </div>
                </div>
                <div class="po-form-group po-row text-capitalized">
                  <div class="po-col-2 po-col-form-label">mot de passe</div>
                  <div class="po-col-10">
                      <div class="po-form-control-readonly" readonly > ****** </div>
                  </div>
                </div>
              </div>

          </div>
          <div v-show="isActiveTab('message')" class="po-row"></div>
          <div v-show="isActiveTab('notification')" class="po-row"></div>
          <div v-show="isActiveTab('edit')" class="po-row">
            <div class="po-col-12">
                <div class="po-form-group po-row text-capitalized">
                  <div class="po-col-2 po-col-form-label">nom</div>
                  <div class="po-col-10">
                      <input type="text" class="po-form-control" aria-placeholder="" placeholder=""/>
                  </div>
                </div>
                <div class="po-form-group po-row text-capitalized">
                  <div class="po-col-2 po-col-form-label">prenom</div>
                  <div class="po-col-10">
                      <input type="text" class="po-form-control" aria-placeholder="" placeholder=""/>
                  </div>
                </div>
                <div class="po-form-group po-row">
                  <div class="po-col-2 po-col-form-label text-capitalized">adresse email</div>
                  <div class="po-col-10">
                      <input type="mail" class="po-form-control" aria-placeholder="" placeholder=""/>
                  </div>
                </div>
                <div class="po-form-group po-row text-capitalized">
                  <div class="po-col-2 po-col-form-label">institution</div>
                  <div class="po-col-10">
                    <select name="" >
                      <option value="">empty</option>
                    </select>
                  </div>
                </div>
                <div class="po-form-group po-row">
                  <div class="po-col-2 po-col-form-label text-capitalized">site web</div>
                  <div class="po-col-10">
                      <input type="text" class="po-form-control" aria-placeholder="" placeholder=""/>
                  </div>
                </div>
                <div class="po-form-group po-row text-capitalized">
                  <div class="po-col-2 po-col-form-label">mot de passe</div>
                  <div class="po-col-10">
                      <input type="password" class="po-form-control" aria-placeholder="" placeholder=""/>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <dif class="po-col-2">
          <div class="po-list-card">
            <div class="po-list-header secondary text-maj">nombre de cours</div>
            <span class="po-label text-maj"> cours <span class="po-badge">10</span></span>
          </div>
          <div class="po-list-card">
            <div class="po-list-header secondary text-maj">domaine(s) d'enseignement</div>
            <span class="po-label text-maj"> mathématiques </span>
            <span class="po-label text-maj"> langues </span>
          </div>

        </dif>
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
      poem_user: [],
      tab_choice: 'information'
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
    },
    switchTab (val) {
      this.tab_choice = val
    },
    isActiveTab (val) {
      return this.tab_choice === val
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


