<template>
   <poem-main :page-name="authenticated ? 'profile' : 'registration'">
    <div id="po-main-container" class="po-container">
      <div class="po-row">
        <div class="po-col-10">
          <form action="">
            <div class="po-row">
              <div class="po-col-6">
                  <div class="po-form-group po-row text-capitalized">
                    <div class="po-col-2 po-col-form-label">langues</div>
                    <div class="po-col-10">
                        <select name="" >
                          <option value="">empty</option>
                        </select>
                    </div>
                </div>
              </div>
            </div>
            <div class="po-row">
              <div class="po-col-6">
                <div class="po-form-group po-row text-capitalized">
                    <div class="po-col-2 po-col-form-label">université(s)</div>
                    <div class="po-col-10">
                      <select name="" >
                        <option value="">empty</option>
                      </select>
                    </div>
                </div>
                <div class="po-form-group po-row text-capitalized">
                    <div class="po-col-2 po-col-form-label">domaine(s)</div>
                    <div class="po-col-10">
                      <select name="" >
                        <option value="">empty</option>
                      </select>
                    </div>
                </div>
                <div class="po-form-group po-row text-capitalized">
                    <div class="po-col-2 po-col-form-label">cours</div>
                    <div class="po-col-10">
                        <input type="text" class="po-form-control" aria-placeholder="" placeholder=""/>
                    </div>
                </div>
              </div>
              <div class="po-col-6">
                <div class="po-form-group po-row text-capitalized">
                    <div class="po-col-2 po-col-form-label">faculté(s)</div>
                    <div class="po-col-10">
                        <select name="" >
                          <option value="">empty</option>
                        </select>
                    </div>
                </div>
                <div class="po-form-group po-row text-capitalized">
                    <div class="po-col-2 po-col-form-label">semestre</div>
                    <div class="po-col-10">
                        <select name="" >
                          <option value="">empty</option>
                        </select>
                    </div>
                </div>
                <div class="po-form-group po-row text-capitalized">
                    <div class="po-col-2 po-col-form-label">spécialité(s)</div>
                    <div class="po-col-10">
                        <input type="text" class="po-form-control" aria-placeholder="" placeholder=""/>
                    </div>
                </div>
              </div>
            </div>
            <div class="po-row">
              <div class="po-col-12">
                <div class="po-form-group po-row text-capitalized">
                    <div class="po-col-1 po-col-form-label">leçon</div>
                    <div class="po-col-11">
                      <input type="text" class="po-form-control" aria-placeholder="" placeholder=""/>
                    </div>
                </div>
              </div>
            </div>
            <div class="po-row">
              <div class="po-col-12">
                <div class="po-form-group po-row text-capitalized">
                    <div class="po-col-12 po-header">description</div>
                    <div class="po-col-12">
                      <textarea name="" id="" ></textarea>
                    </div>
                </div>
              </div>
              <div class="po-col-12">
                <div class="po-form-group po-row text-capitalized">
                    <div class="po-col-12 po-header">renseigner trois questions</div>
                    <div class="po-col-12">
                      <div class="po-form-group po-row text-capitalized">
                          <div class="po-col-1 po-col-form-label">question</div>
                          <div class="po-col-11">
                            <input type="text" class="po-form-control" aria-placeholder="" placeholder=""/>
                          </div>
                      </div>
                      <div class="po-form-group po-row text-capitalized">
                          <div class="po-col-1 po-col-form-label">reponse</div>
                          <div class="po-col-11">
                            <textarea name="" id="" ></textarea>
                          </div>
                      </div>
                    </div>
                    <div class="po-col-12">
                      <div class="po-form-group po-row text-capitalized">
                          <div class="po-col-1 po-col-form-label">question</div>
                          <div class="po-col-11">
                            <input type="text" class="po-form-control" aria-placeholder="" placeholder=""/>
                          </div>
                      </div>
                      <div class="po-form-group po-row text-capitalized">
                          <div class="po-col-1 po-col-form-label">reponse</div>
                          <div class="po-col-11">
                            <textarea name="" id="" ></textarea>
                          </div>
                      </div>
                    </div>
                    <div class="po-col-12">
                      <div class="po-form-group po-row text-capitalized">
                          <div class="po-col-1 po-col-form-label">question</div>
                          <div class="po-col-11">
                            <input type="text" class="po-form-control" aria-placeholder="" placeholder=""/>
                          </div>
                      </div>
                      <div class="po-form-group po-row text-capitalized">
                          <div class="po-col-1 po-col-form-label">reponse</div>
                          <div class="po-col-11">
                            <textarea name="" id="" ></textarea>
                          </div>
                      </div>
                    </div>
                    <div class="po-col-12">
                      <div class="po-form-group po-row text-capitalized">
                          <div class="po-col-1 po-col-form-label">question</div>
                          <div class="po-col-11">
                            <input type="text" class="po-form-control" aria-placeholder="" placeholder=""/>
                          </div>
                      </div>
                      <div class="po-form-group po-row text-capitalized">
                          <div class="po-col-1 po-col-form-label">reponse</div>
                          <div class="po-col-11">
                            <textarea name="" id="" ></textarea>
                          </div>
                      </div>
                    </div>
                    <div class="po-col-12">
                      <a href="" class="po-btn po-btn-primary text-upper">ajouter question/reponse</a>
                    </div>
                    <div class="po-col-12">
                     <button class="po-btn po-btn-green float-right text-upper">sauvegarger</button>
                    </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <dif class="po-col-2">
            <ul class="po-list">
              <li><a href=""><img class="po-icon" src="~assets/img/afficher.png" alt="" data-toggle="tooltip" data-placement="bottom" title="aperçu"></a></li>
              <li><a href=""><img class="po-icon" src="~assets/img/delete.png" alt="" data-toggle="tooltip" data-placement="bottom" title="annuler"></a></li>
            </ul>

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
