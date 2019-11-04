var $ = require('jquery')
require('jquery-ui-bundle')
require('jquery-ui-bundle/jquery-ui.min.css')
require('primeui')
require('jquery-mousewheel')
require('font-awesome/css/font-awesome.min.css')
require('primeui/primeui.min.css')
require('assets/css/primeui-theme-front.css')
require('assets/js/tagcloud-trackball.js')

import {initDropdown, updateDropdown} from './poem-init-dropdown'

var vueInstance = null

export default function initExplorer (vue) {
  vueInstance = vue
  $('#tagcloud').tagoSphere(tagCloudsettings)
  getLessons()
  initFilters()
}

var tagCloudsettings = {
  height: 48.95, // height of sphere container rem
  width: 48.95, // width of sphere container rem
  radius: 17.94, // radius of sphere
  speed: 3, // rotation speed
  slower: 0.7, // sphere rotations slower
  // timer: 40, OBSOLETE AVEC requestAnimationFrame // 40 = 25img/seconde // delay between up<a href="http:// www.jqueryscript.net/time-clock/">date</a> position
  fontMultiplier: 1.1, // dependence of a font size on axis Z
  tagMaxWidth: 20, // max width tag in %
  hoverStyle: { // tag css stylies on mouse over
    cursor: 'pointer',
    textDecoration: 'underline'
  },
  mouseOutStyle: { // tag css stylies on mouse out
    textDecoration: 'none'
  },
  // previously defined in poem.js
  maxtags: 80, // maximum of visible tags
  fontZoomHover: 1
}

function getLessons () {
  initDropdown('specialities', ['dropdown2'], data => { vueInstance.specialities = data }, specialitySelected)

  initDropdown('domains', ['dropdown1'], data => { vueInstance.domains = data }, domainSelected)

  initDropdown('lessons', ['dropdown3'], data => {
    vueInstance.lessons = data
    data.forEach(d => addTag(d.label, d.id))
  }, lessonClicked)
}

function initFilters () {
  var elo = $('#elo-slider')
  var language = $('#language')
  var text = $('#filter')

  elo.slider({
    range: true,
    min: 1000,
    max: 9999,
    values: [ 2500, 4500 ],
    slide: function (event, ui) {
      $('#elo-min').val('min=' + ui.values[ 0 ])
      $('#elo-max').val('max=' + ui.values[ 1 ])
      // Faire la requete et lancer la fonction poem_update_explorer
    }
  })
  $('#elo-min').val('min=' + elo.slider('values', 0))
  $('#elo-max').val('max=' + elo.slider('values', 1))

  language.puiswitch({
    onLabel: vueInstance.$t('yes'),
    offLabel: vueInstance.$t('no'),
    change: function (e) {
      // Faire la requete et lancer la fonction poem_update_explorer
    }
  })

  text.click(function (e) {
    e.preventDefault()
    // Faire la requete et lancer la fonction poem_update_explorer
  })
}

function domainSelected (event, item) {
  var textDomain = item[0].textContent.toUpperCase()
  var idDomain = vueInstance.domains.find(d => d.label.toUpperCase() === textDomain).id
  var specialitiesOfDomain = vueInstance.specialities.filter(s => s.id_domain == idDomain)
  var specialitiesId = specialitiesOfDomain.map(spe => spe.id)
  clearAllTags()
  vueInstance.lessons.forEach(l => {
    if (specialitiesId.includes(l.id_speciality)) {
      addTag(l.label, l.id)
    }
  })
  updateDropdown('dropdown2', specialitiesOfDomain, specialitySelected)
}

function specialitySelected (event, item) {
  var textSpeciality = item[0].textContent.toUpperCase()
  var idSpeciality = vueInstance.specialities.find(s => s.label.toUpperCase() === textSpeciality).id
  var lessonsOfSpeciality = vueInstance.lessons.filter(l => l.id_speciality == idSpeciality)
  console.log(lessonsOfSpeciality)
  clearAllTags()
  lessonsOfSpeciality.forEach(l => addTag(l.label, l.id))
}

function lessonClicked (event) {
  var lessonId = event.target.dataset.lessonId
  var l = vueInstance.lessons.find(l => l.id == lessonId)
  var s = vueInstance.specialities.find(s => s.id == l.id_speciality)
  var d = vueInstance.domains.find(d => d.id == s.id_domain)
  vueInstance.selection.domain = d.label
  vueInstance.selection.speciality = s.label
  vueInstance.selection.title = l.label
  vueInstance.selection.lessonId = lessonId
}

function addTag (label, id) {
  var li = '<li data-lesson-id="' + id + '">' + label + '</li>'
  li = $(li).click(lessonClicked)
  $('#tag-list').append(li)
  $('#tagcloud').tagoSphere(tagCloudsettings)
}

function clearAllTags () {
  $('#tag-list').empty()
}
