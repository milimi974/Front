var $ = require('jquery')
var Dropzone = require('dropzone')
import {initDropdown, updateDropdown} from './poem-init-dropdown'

export default function (context) {
  initDropdowns(context)
  initDropzone()
}

function initDropzone () {
  Dropzone.options.avatar = {
    previewTemplate: document.querySelector('#preview-template').innerHTML,
    maxFiles: 1,
    parallelUploads: 1,
    thumbnailHeight: 200,
    thumbnailWidth: 170,
    maxFilesize: 1,
    filesizeBase: 1000,
    uploadMultiple: false,
    addRemoveLinks: true,
    acceptedFiles: 'image/png, image/jpeg',
    dictCancelUpload: 'stoper le téléchargement',
    dictRemoveFile: 'supprimer cet avatar',
    thumbnail: function (file, dataUrl) {
      if (file.previewElement) {
        file.previewElement.classList.remove('dz-file-preview')
        var images = file.previewElement.querySelectorAll('[data-dz-thumbnail]')
        for (var i = 0; i < images.length; i++) {
          var thumbnailElement = images[i]
          thumbnailElement.alt = file.name
          thumbnailElement.src = dataUrl
        }
        setTimeout(function () { file.previewElement.classList.add('dz-image-preview') }, 1)
      }
    },
    accept: function (file, done) {
      if (this.files.length > this.options.maxFiles) {
        this.removeFile(this.files[0])
      }
      done()
      $('.dropzone').css({'background-image': 'none'})
      $('.dz-message').hide()
    },
    error: function (file) {
      if (this.files.length > this.options.maxFiles) {
        this.removeFile(this.files[0])
      }
    },
    reset: function () {
      $('.dropzone').css({'background-image': ''})
      $('.dz-message').show()
    }
  }
}

function initDropdowns (context) {
  initDropdown('languages', ['presentation-language', 'content-language'])

  initDropdown('studies_levels', ['levelbefore', 'levelafter'])

  initDropdown('specialities', ['speciality-before', 'speciality-after'], data => { context.specialities = data })

  function updateSpecialities (event, item) {
    var textDomain = item[0].textContent.toUpperCase()
    var idDomain = context.domains.find(d => d.label.toUpperCase() === textDomain).id
    var specialitiesOfDomain = context.specialities.filter(s => s.id_domain == idDomain)
    if (event.target.name == 'domainbefore') {
      updateDropdown('speciality-before', specialitiesOfDomain)
    } else {
      updateDropdown('speciality-after', specialitiesOfDomain)
    }
  }

  initDropdown('domains', ['domainbefore', 'domainafter'], data => { context.domains = data }, updateSpecialities)
}
