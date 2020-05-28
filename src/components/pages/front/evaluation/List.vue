<template>
  <poem-main :page-name="authenticated ? 'profile' : 'registration'">
  <div id="po-main-container" class="po-container">
      <div class="po-row mb-10">
        <div class="po-col-2">
          <form action="">
            <select name="" id="">
              <option value="">liste des cours</option>
            </select>
          </form>
        </div>
      </div>
      <div class="po-row">
          <div class="po-col-8">
            <div class="po-row">
              <form class="po-col-6" action="">
                <div class="po-form-group po-row text-capitalized">
                  <div class="po-col-2 po-col-form-label text-maj">promotion</div>
                  <div class="po-col-10">
                     <select name="" id="">
                        <option value="">2019/20</option>
                     </select>
                  </div>
                </div>
              </form>
              <form  class="po-col-6" action="">
                <div class="po-form-group po-row text-capitalized">
                  <div class="po-col-2 po-col-form-label text-maj">étudiant</div>
                  <div class="po-col-10">
                     <select name="" id="">
                        <option value="">étudiant 1</option>
                     </select>
                  </div>
                </div>
              </form>
            </div>

          </div>
          <div class="po-col-4">
            <span class="po-label text-center border">terminé à <span>45%</span></span>
          </div>
      </div>
      <div class="po-row">
          <div class="po-col-4">
            <div class="po-label text-upper text-bold bg-primary white">étudiants</div>
            <div class="text-upper bg-gray mb-5">
              <span class="po-btn">tout afficher</span>
            </div>
            <ul class="po-list">
              <li class="mb-5">
                <div class="text-upper bg-label">
                  <span class="po-btn w-100 text-left black">étudiant 1 <span class="po-badge">40%</span></span>
                </div>
              </li>
              <li class="mb-5">
                <div class="text-upper bg-label">
                  <span class="po-btn w-100 text-left black">étudiant 1 <span class="po-badge">40%</span></span>
                </div>
              </li>
            </ul>
          </div>
          <div class="po-col-8 pt-5 bg-label">
            <div class="po-row mb-5">
              <div class="po-col-10">
                <ul class="po-nav secondary text-maj ">
                  <li class="po-item po-tab" v-bind:class="{ active: isActiveTab('phase1') }" v-on:click="switchTab('phase1')">Phase 1</li>
                  <li class="po-item po-tab" v-bind:class="{ active: isActiveTab('phase2') }" v-on:click="switchTab('phase2')">Phase 2</li>
                  <li class="po-item po-tab" v-bind:class="{ active: isActiveTab('phase3') }" v-on:click="switchTab('phase3')">Phase 3</li>
                  <li class="po-item po-tab" v-bind:class="{ active: isActiveTab('phase4') }" v-on:click="switchTab('phase4')">Résultats/Notations </li>
                </ul>
              </div>
              <div class="po-col-2">
                <select name="" id="" class="float-right">
                    <option value="">trier</option>
                </select>
              </div>
            </div>
            <div  v-show="isActiveTab('phase1')" class="po-row">
              <div class="po-card po-col-6">
               <div class="po-card-header">
                 <div class="po-row">
                   <div class="po-col-4"><span class="text-maj"><span class="text-bold">Q1</span>: <span>étudiant 1</span></span></div>
                   <div class="po-col-4 text-center"><span class="text-maj"><span class="text-bold">N°</span><span>000000</span></span></div>
                   <div class="po-col-4 text-right"><time datetime="2018-07-07"><span class="text-maj">19 avril 2020 à 15h00</span></time></div>
                 </div>
               </div>
               <div class="po-card-body">
                 <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>
               </div>
               <div class="po-card-footer bg-gray">
                 <div class="po-row p-5">
                   <div class="po-col-4"><input class="hide" type="checkbox"/></div>
                   <div class="po-col-4 text-center"><span class="text-maj">Question enseignant</span></div>
                   <div class="po-col-4 text-right"><span class="text-maj">note: </span><span>5</span></div>
                 </div>
               </div>
              </div>
            </div>
            <div  v-show="isActiveTab('phase2')" class="po-row">
              <div class="po-card po-col-6">
               <div class="po-card-header">
                 <div class="po-row">
                   <div class="po-col-4"><span class="text-maj"><span class="text-bold">Q1</span>: <span>étudiant 1</span></span></div>
                   <div class="po-col-4 text-center"><span class="text-maj"><span class="text-bold">N°</span><span>000000</span></span></div>
                   <div class="po-col-4 text-right"><time datetime="2018-07-07"><span class="text-maj">19 avril 2020 à 15h00</span></time></div>
                 </div>
               </div>
               <div class="po-card-body">
                  <div class="po-row mb-5">
                     <div class="po-col-4"><span class="text-maj"><span class="text-bold">Question: </span>: <span>étudiant 1</span></span></div>
                     <div class="po-col-4 text-center"><span class="text-maj"><span class="text-bold">N°</span><span>000000</span></span></div>
                     <div class="po-col-4 text-right"><span class="text-maj">note: </span><span>5</span></div>
                  </div>
                  <p>
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
                  </p>
               </div>
               <div class="po-card-footer p-5 bg-gray">
                  <div class="po-row mb-5">
                     <div class="po-col-8"><span class="text-maj"><span class="text-bold">Réponse apprenant: </span>: <span>étudiant 1</span></span></div>
                     <div class="po-col-4 text-right"><span class="text-maj"><span class="text-bold">N°</span><span>000000</span></span></div>
                  </div>
                  <p>
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
                  </p>
               </div>
              </div>

            </div>
            <div  v-show="isActiveTab('phase3')" class="po-row">
              <div class="po-col-6">
                <div class="po-label-white">Question</div>
                <div class="po-card po-col-12">
                 <div class="po-card-header">
                   <div class="po-row">
                     <div class="po-col-4"><span class="text-maj"><span class="text-bold">Q1</span>: <span>étudiant 1</span></span></div>
                     <div class="po-col-4 text-center"><span class="text-maj"><span class="text-bold">N°</span><span>000000</span></span></div>
                     <div class="po-col-4 text-right"><time datetime="2018-07-07"><span class="text-maj">19 avril 2020 à 15h00</span></time></div>
                   </div>
                 </div>
                 <div class="po-card-body">
                    <div class="po-row mb-5">
                       <div class="po-col-4"><span class="text-maj"><span class="text-bold">Question: </span>: <span>étudiant 1</span></span></div>
                       <div class="po-col-4 text-center"><span class="text-maj"><span class="text-bold">N°</span><span>000000</span></span></div>
                       <div class="po-col-4 text-right"><span class="text-maj">note: </span><span>5</span></div>
                    </div>
                    <p>
                      At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
                    </p>
                 </div>
                 <div class="po-card-footer p-5 bg-gray">
                    <div class="po-c">
                      <div class="po-row mb-5">
                         <div class="po-col-4"><span class="text-maj"><span class="text-bold">Corrigé: </span>: <span>étudiant 1</span></span></div>
                         <div class="po-col-4 text-center"><span class="text-maj"><span class="text-bold">N°</span><span>000000</span></span></div>
                         <div class="po-col-4 text-right"><span class="text-maj text-bold">note: </span><span>5</span></div>
                      </div>
                      <p>
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
                      </p>
                    </div>
                    <div class="separator"></div>
                    <div class="po-c">
                      <div class="po-row mb-5">
                         <div class="po-col-4"><span class="text-maj"><span class="text-bold">Corrigé: </span>: <span>étudiant 1</span></span></div>
                         <div class="po-col-4 text-center"><span class="text-maj"><span class="text-bold">N°</span><span>000000</span></span></div>
                         <div class="po-col-4 text-right"><span class="text-maj text-bold">note: </span><span>5</span></div>
                      </div>
                      <p>
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
                      </p>
                    </div>

                 </div>
                </div>
              </div>
              <div class="po-col-6">
                <div class="po-label-white">Réponse(s)</div>
                <div class="po-card po-col-12">
                 <div class="po-card-body">
                    <div class="po-c">
                      <div class="po-row mb-5">
                         <div class="po-col-4"><span class="text-maj"><span class="text-bold">Question: </span>: <span>étudiant 1</span></span></div>
                         <div class="po-col-4 text-center"><span class="text-maj"><span class="text-bold">N°</span><span>000000</span></span></div>
                         <div class="po-col-4 text-right"><span class="text-maj">note: </span><span>5</span></div>
                      </div>
                      <p>
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
                      </p>
                    </div>
                    <div class="separator"></div>
                    <div class="po-c">
                      <div class="po-row mb-5">
                         <div class="po-col-4"><span class="text-maj"><span class="text-bold">Question: </span>: <span>étudiant 1</span></span></div>
                         <div class="po-col-4 text-center"><span class="text-maj"><span class="text-bold">N°</span><span>000000</span></span></div>
                         <div class="po-col-4 text-right"><span class="text-maj">note: </span><span>5</span></div>
                      </div>
                      <p>
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
                      </p>
                    </div>
                 </div>
                </div>
              </div>
            </div>
            <div  v-show="isActiveTab('phase4')" class="po-row">
              <div class="po-col-6">
                <div class="po-label-white">Cours</div>
                <div class="po-card po-col-12">
                 <div class="po-card-header">
                   <div class="po-row">
                     <div class="po-col-4 "><span class="text-maj"><span class="text-bold">N°</span><span>000000</span></span></div>
                     <div class="po-col-4 text-center"><span class="text-maj"><span class="text-bold">Q1</span>: <span>étudiant 1</span></span></div>
                     <div class="po-col-4 text-right"><span class="text-bold">Note:</span><span>5</span></div>
                   </div>
                 </div>
                 <div class="po-card-body">
                    <div><span class="text-bold">Note:</span><span>L1</span>: <span>15</span> </div>
                    <div><span class="text-bold">Note:</span><span>L2</span>: <span>13</span> </div>
                    <div><span class="text-bold">Note:</span><span>L3</span>: <span>13</span> </div>
                 </div>
                </div>
              </div>
              <div class="po-col-6">
                <div class="">
                  <select name="" id="">
                      <option value="">Leçon: L1</option>
                  </select>
                </div>

              </div>
            </div>
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
      poem_user: [],
      tab_choice: 'phase1'
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


