<template>
  <poem-main :page-name="authenticated ? 'profile' : 'registration'">
    <div id="po-main-container" class="po-container">
      <div class="po-row">
        <div class="po-col-12">
          <div class="float-left">
            <select name="" id="">
              <option value="">trier</option>
            </select>
          </div>
          <div class="float-right">
            <div class="po-input-group">
              <div class="po-input-group-prepend"><img class="" src="~assets/img/search.png" alt=""></div>
              <input type="text" class="po-form-control" aria-placeholder="rechercher" placeholder="rechercher">
            </div>
          </div>
        </div>
      </div>
      <div class="po-row">
         <div class="po-card">
           <div class="po-card-header">
             <span class="secondary text-maj">cours 1</span>
             <a src="" class="float-right po-btn-menu">
               <img class="img-sm float-right"src="~assets/img/square.png" alt="">
               <ul class="po-list nav">
                 <li><a class="text-maj" href="">voir cours</a></li>
                 <li><a class="text-maj" href="">modifier cours</a></li>
                 <li><a class="text-maj" href="">désactiver cours</a></li>
               </ul>
             </a>
           </div>
           <div class="po-card-body">
             <div class="po-row">
               <div class="po-col-4">
                 <div class="po-col-2 po-label text-maj">domaine</div>
               </div>
               <div class="po-col-8">

               </div>
             </div>
             <div class="po-row">
               <div class="po-col-4">
                 <div class="po-col-2 po-label text-maj">sujet</div>
               </div>
               <div class="po-col-8"></div>
             </div>
             <div class="po-row">
               <div class="po-col-4">
                 <div class="po-col-2 po-label text-maj">domaine</div>
                 <div class="po-col-2 po-label text-maj">sujet</div>
               </div>
               <div class="po-col-8"></div>
             </div>
           </div>
           <div class="po-card-footer">
             footer
             <div class="separator"></div>
             footer
           </div>
         </div>
      </div>
      <div class="po-row"></div>
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

<style scoped>

</style>
