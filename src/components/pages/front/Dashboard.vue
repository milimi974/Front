<template>
  <poem-main page-title="Mon tableau de bord" page-name="dashboard">
    <div class="list">
      <h1>Mes leçons</h1>
      <table>
        <thead>
          <tr>
            <th>Titre de la leçon</th>
            <th>Inscription</th>
            <th>Progression</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="l in attendedLessons">
            <td>{{ l.label }}</td>
            <td> {{ l.date }} </td>
            <td>{{ l.stage }} / 3</td>
            <td v-if="l.grade">{{ l.grade }} / 20</td>
            <td v-else><i>non disponible</i></td>
            <td><router-link :to="'/lesson/' + l.id" class="btn" title="Continuer cette leçon">continuer</router-link></td>
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

export default {
  components: {
    PoemMain
  },
  data () {
    return {
      userId: auth.getUser().id,
      attendedLessons: []
    }
  },
  mounted () {
    var requestFilter = JSON.stringify({
      where: { id_student: this.userId },
      include: 'lesson'
    })
    this.fetchUrl = 'lesson_participations/?filter=' + requestFilter
    axios.get(this.fetchUrl)
      .then(res => {
        res.data.forEach(l => {
          this.attendedLessons.push({
            id: l.id_lesson,
            label: l.lesson.label,
            date: new Date(l.enrollment_date).toLocaleDateString(),
            stage: l.stage,
            grade: l.grade})
        })
      })
  }
}
</script>
