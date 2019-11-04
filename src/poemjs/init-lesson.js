var $ = require('jquery')
import axios from 'axios'
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/link'
import 'tinymce/plugins/image'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/lists'

import {messageInfo, messageWarn, notifyInfo} from 'src/poemjs/init-notif-and-messages'

var V = {}
var methods = {}
export default methods

/* COPA algorithm parameters */
var maxGrade = 20
var successRate = (2 / 3) // represent the share of item that could be rated at maximal grade
export var stage2Size = 3
export var stage3Size = 3 * stage2Size

methods.initLesson = (vueInstance, lessonId) => {
  V = vueInstance

  getLesson(lessonId)

  if (!V.userId) {
    messageInfo('messages.limitedAccess')
  } else {
    getParticipation(lessonId)
  }

  $('#etapes').tabs()
    .tabs('option', {'active': 4, 'disabled': [1, 2, 3]})
  $('#no-distraction').puiswitch({
    onLabel: vueInstance.$t('yes'),
    offLabel: vueInstance.$t('no'),
    change () {
      $('#poem-navbar').slideToggle()
      $('#lesson .header').slideToggle()
      $('#poem-footer').slideToggle()
      $('#ligthbox').fadeToggle()
    }
  })

  initSliders('.etape2', stage2Size)
  initSliders('.etape3', stage3Size)
}

function initSliders (stageClass, stageSize) {
  var pointsToAllocate = maxGrade * (successRate * stageSize)
  $(stageClass + ' .bar').slider({
    min: 0,
    max: maxGrade,
    create (e, ui) {
      $(stageClass + ' .totalRemaining span').html(pointsToAllocate)
    },
    slide (e, ui) {
      var total = 0
      $(stageClass + ' .bar').not(this).each(function () {
        total += $(this).slider('value')
      })
      // Need to do this because apparently jQuery UI does not update value until this event completes
      total += ui.value

      var remainingPoints = pointsToAllocate - total
      if (remainingPoints < 0) {
        ui.value = $(this).slider('value')
        return false
      }

      $(stageClass + ' .totalRemaining span').html(remainingPoints)
      $(this).parent().find('.circle').html(ui.value)
    }
  })
}

function initEditor (selector, content = '', editbars = true) {
  tinymce.init({
    selector,
    height: 200,
    menubar: false,
    statusbar: editbars,
    readonly: content != '',
    plugins: 'lists charmap link image codesample fullscreen',
    toolbar: editbars && 'undo redo | styleselect bold italic underline bullist numlist outdent indent | charmap link image codesample | fullscreen',
    init_instance_callback: (editor) => editor.setContent(content)
  })
}

function getLesson (lessonId) {
  var requestFilter = JSON.stringify({include: [{'speciality': 'domain'}, 'course_material']})
  axios.get('lessons/' + lessonId + '?filter=' + requestFilter)
    .then(res => {
      V.lesson = res.data
      V.specialityText = res.data.speciality.label
      V.domainText = res.data.speciality.domain.label
      V.course_materialUrl = res.data.course_material.path

      // if (!res.data.questions || res.data.questions.length < 3) {
      //   messageInfo('Évaluation non disponible', 'Cette leçon n\'a pas d\'évaluation disponible pour l\'instant.')
      //   V.participationId = -1
      // }
    })
}

function getParticipation (lessonId) {
  var requestFilter = JSON.stringify({where: { id_lesson: lessonId, id_student: V.userId }, include: ['proposed_question', 'asked_questions', 'submitted_answers', {'evaluated_answers': 'question'}]})
  axios.get('lesson_participations/findOne?filter=' + requestFilter,
    { validateStatus: null })
    .then(({data, status}) => {
      if (status != 200) {
        initEditor('.etape1 textarea')
        return
      }

      V.participationId = data.id
      V.stage = data.stage

      data.submitted_answers.forEach(a => {
        data.asked_questions.find(q => a.id_question == q.id).submitted_answer = a.text
      })
      V.submitted_answers_id = data.submitted_answers.map(a => a.id)
      // prevent items to be order by database id,
      // so teacher question is not always first
      V.asked_questions = shuffle(data.asked_questions)
      V.evaluated_answers = shuffle(data.evaluated_answers)

      if (data.proposed_question) {
        initEditor('#stage1-question', data.proposed_question.text)
        initEditor('#stage1-answer', data.proposed_question.expected_answer)
      } else {
        initEditor('.etape1 textarea')
      }

      data.asked_questions.forEach((q, i) => {
        q.editor_id = (i + 1)
        initEditor('#stage2-question' + q.editor_id, q.text, false)
        initEditor('#stage2-answer' + q.editor_id, q.submitted_answer)
      })

      data.evaluated_answers.forEach((a, i) => {
        a.editor_id = (i + 1)
        initEditor('#stage3-question' + a.editor_id, a.question.text, false)
        initEditor('#stage3-answer' + a.editor_id, a.text, false)
        initEditor('#stage3-expectation' + a.editor_id, a.question.expected_answer, false)
      })

      $('#etapes').tabs('enable', 1)
      if (data.stage >= 2) {
        $('#etapes').tabs('enable', 2)
      }
      if (data.stage >= 3) {
        $('#etapes').tabs('enable', 3)
      }

      checkNewDataStage(2, V.asked_questions, assignPhase2questions)
      checkNewDataStage(3, V.evaluated_answers, assignPhase3answers)
    })
}

function checkNewDataStage (stage, data, assignFunction) {
  if (V.stage == stage && !data.length) {
    assignFunction(isAvailable => {
      if (isAvailable) {
        $('#etapes').tabs('enable', stage)
        notifyInfo('messages.nextStageAvailable')
      } else {
        $('#etapes').tabs('disable', stage)
        messageWarn('messages.nextStageUnavailable')
      }
    })
  }
}

methods.seeLesson = () => {
  $('#etapes').tabs('option', 'active', 0)
}
methods.cancelNoDistrac = () => {
  $('#poem-navbar').slideDown()
  $('#lesson .header').slideDown()
  $('#poem-footer').slideDown()
  $('#ligthbox').fadeOut()
}

methods.joiningLesson = () => {
  var requestParam = { id_lesson: V.lesson.id, id_student: V.userId, stage: 1 }
  axios.post('lesson_participations/', requestParam)
    .then(res => {
      V.participationId = res.data.id
      V.stage = res.data.stage
      initEditor('.etape1 textarea')
      notifyInfo('messages.registrationSaved')
      $('#etapes').tabs('enable', 1).tabs('option', {'active': 1})
    })
}

/*
 validation première phase d'évaluation
*/
export function validate1 () {
  if (V.stage != 1) {
    return
  }
  V.stage1QuestionEditor = tinymce.get('stage1-question').getContent() /* Récupération question */
  V.stage1AnswerEditor = tinymce.get('stage1-answer').getContent() /* Récupération réponse */
  tinymce.get('stage1-question').setMode('readonly')
  tinymce.get('stage1-answer').setMode('readonly')
  var requestParam = {text: V.stage1QuestionEditor, expected_answer: V.stage1AnswerEditor, status: 'proposed', id_lesson: V.lesson.id, id_author: V.userId}
  axios.post('lesson_participations/' + V.participationId + '/proposed_question/', requestParam)
  assignPhase2questions(goToNextStage)
}

export function validate2 () {
  if (V.stage != 2) {
    return
  }
  V.asked_questions.forEach((q, i) => {
    q.submitted_answer = tinymce.get('stage2-answer' + q.editor_id).getContent()
    tinymce.get('stage2-answer' + q.editor_id).setMode('readonly')
    var requestParam = {text: q.submitted_answer, lessonId: V.lesson.id, id_question: q.id, id_author: V.userId}
    axios.post('lesson_participations/' + V.participationId + '/submitted_answers/', requestParam)

    var grade = $('#stage2-grade' + q.editor_id).slider('value')
    var gradeRequestParam = {value: grade, id_evaluator: V.userId}
    axios.post('questions/' + q.id + '/evaluations', gradeRequestParam)
  })
  assignPhase3answers(goToNextStage)
}

export function validate3 () {
  if (V.stage != 3) {
    return
  }
  V.evaluated_answers.forEach(a => {
    var grade = $('#stage3-grade' + a.editor_id).slider('value')
    var requestParam = {value: grade, id_evaluator: V.userId}
    axios.post('submitted_answers/' + a.id + '/evaluations/', requestParam)
  })
  goToNextStage(true)
  messageInfo('messages.evaluationCompleted')
}

function goToNextStage (isAvailable) {
  V.stage++
  axios.put('lesson_participations/' + V.participationId, {stage: V.stage})
    .then(response => {
      if (isAvailable) {
        notifyInfo('messages.progressionSaved')
        $('#etapes').tabs('enable', V.stage).tabs('option', {'active': V.stage})
      } else {
        messageWarn('messages.nextStageUnavailable')
      }
    })
}

function assignPhase2questions (cb) {
  var requestFilter = JSON.stringify({ fields: ['id', 'status', 'text', 'id_author'], include: 'evaluations' })
  axios.get('lessons/' + V.lesson.id + '/questions?filter=' + requestFilter)
    .then(res => {
      if (res.data.length < 3) {
        notifyInfo('messages.test')
        cb(false)
        return
      }

      shuffle(res.data)
      V.asked_questions = subTab(res.data, 1, q => q.status == 'proposed' || q.status == 'validated' && (V.userId != q.id_author) && (!q.evaluations.length))
      if (!V.asked_questions.length) {
        cb(false)
        notifyInfo('messages.test2')
        return
      }

      subTab(res.data, 2, q => q.status == 'validated').forEach(q => V.asked_questions.push(q))

      shuffle(V.asked_questions)
      V.asked_questions.forEach((q, i) => {
        initEditor('#stage2-question' + (i + 1), q.text, false)
        q.editor_id = (i + 1)
        initEditor('#stage2-answer' + q.editor_id, q.submitted_answer)

        axios.put('lesson_participations/' + V.participationId + '/asked_questions/rel/' + q.id)
        notifyInfo('messages.test3')
      })
      cb(true)
    })
}

function assignPhase3answers (cb) {
  var requestFilter = JSON.stringify({include: ['question', 'evaluations'], where: {id_author: {'neq': V.userId}}})
  axios.get('lessons/' + V.lesson.id + '/submitted_answers?filter=' + requestFilter)
  .then(res => {
    res.data = res.data.filter(a => a.evaluations.length < 3)
    if (res.data.length < 9) {
      cb(false)
      notifyInfo('messages.test4')
      return
    }

    V.evaluated_answers = shuffle(res.data)
      .sort((a, b) => b.evaluations.length - a.evaluations.length)
      .slice(0, 9)

    V.evaluated_answers.forEach((a, i) => {
      a.editor_id = (i + 1)
      initEditor('#stage3-question' + a.editor_id, a.question.text, false)
      initEditor('#stage3-answer' + a.editor_id, a.text, false)
      initEditor('#stage3-expectation' + a.editor_id, a.question.expected_answer, false)

      axios.put('lesson_participations/' + V.participationId + '/evaluated_answers/rel/' + a.id)
    })
    cb(true)
  })
}

/** Shuffles array in place. ES6 version */
function shuffle (a) {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]]
  }
  return a
}
/** Return the first `n` elements that check a condition. Could be empty Array if no elements match. */
function subTab (a, n, predicate) {
  return a.filter(predicate).splice(0, n)
}
