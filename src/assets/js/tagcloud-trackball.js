/**
 * jQuery TagCloud plugin
 *
 * @version 1.2.2 (12-MAY-2009)
 * @author Nurul Ferdous <nurul_ferdous@yahoo.com>
 * @requires jQuery v1.4.3 or later Examples and documentation at:
 * http://dynamicguy.com/ Dual licensed under the MIT and GPL
 * licenses: http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id$
 */

;(function ($) {
  var tags
  var mathAssets = {
    halfHeight: null,
    halfWidth: null,
    hwratio: null,
    dtr: null,
    diameter: null,
    speedX: null,
    speedY: null,
    tLength: null
  }
  var settings = {
        // height of sphere container
    height: 43.95,
        // width of sphere container
    width: 43.95,
        // radius of sphere
    radius: 16.11,
        // maximum tag
    maxtags: 80,
        // rotation speed
    speed: 3,
        // sphere rotations slower
    slower: 0.9,
        // dependence of a font size on axis Z
    fontMultiplier: 1.1,
        // zoom font on mouseover
    fontZoomHover: 1.5,
        // tag max-width %
    tagMaxWidth: 20,
    //     // imgBackUrl
    // imgBackUrl: '',
        // tag css stylies on mouse over
    hoverStyle: {
      border: '0.073rem solid #935C26',
      color: '#935C26'
    },
        // tag css stylies on mouse out
    mouseOutStyle: {
      border: 'none',
      color: 'red'
    }
  }

  var curState = {
    mouseOver: null,
    mouseDown: null,
    lastFy: null,
    lastFx: null,
    sy: null,
    cy: null,
    sx: null,
    cx: null,
    mouseX: null,
    mouseY: null
  }

  var options = {}
  var $intervalCalcSpeed = 100

  jQuery.fn.tagoSphere = function (opt) {
    if (opt == 'cancelAnim') {
      options.requestAnimationFrameId ? window.cancelAnimationFrame(options.requestAnimationFrameId) : null
    } else {
      options = jQuery.extend(settings, opt)
      options.rootFontSize = getRootElementFontSize()
      options.zIndexInit = 10000
      initContainer(this)
      initTags(this)
      initMaths()
      deployTags()
      options.requestAnimationFrameId ? window.cancelAnimationFrame(options.requestAnimationFrameId) : null
      window.requestAnimationFrame(updateTags)
      return this
    }
  }

  function initMaths () {
    mathAssets.halfHeight = options.height / 2
    mathAssets.halfWidth = options.width / 2
    mathAssets.speedX = options.speed / mathAssets.halfWidth
    mathAssets.speedY = options.speed / mathAssets.halfHeight
    mathAssets.dtr = Math.PI / 180
    mathAssets.diameter = options.radius * 2
    mathAssets.hwratio = options.height / options.width
    mathAssets.whratio = options.width / options.height
    mathAssets.tLength = tags.length - 1
        // curState.mouseOver = false;
    curState.lastFx = options.speed
    curState.lastFy = options.speed
    curState.lastX = 0
    curState.lastY = 0
    curState.timeStart = 0
    curState.timeStop = 0
    curState.startX = 0
    curState.startY = 0
    curState.stopX = 0
    curState.stopY = 0
    curState.vectorX = 0
    curState.vectorY = 0
    curState.speed = 0
    curState.timer = null
    curState.pan = false
    curState.panDeltaX = 0
    curState.panDeltaY = 0
    curState.panSpeedX = 0
    curState.panSpeedY = 0
  }

  function getOffsetLeft (elem) {
    var offsetLeft = 0
    do {
      if (!isNaN(elem.offsetLeft)) {
        offsetLeft += elem.offsetLeft
      }
    } while ((elem = elem.offsetParent))
    return convertRem(offsetLeft)
  }

  function getOffsetTop (elem) {
    var offsetTop = 0
    do {
      if (!isNaN(elem.offsetTop)) {
        offsetTop += elem.offsetTop
      }
    } while ((elem = elem.offsetParent))
    return convertRem(offsetTop)
  }

  function getRootElementFontSize () {
    // Returns a number
    return parseFloat(
      // of the computed font-size, so in px
      window.getComputedStyle(
        // for the root <html> element
        document.documentElement
      ).fontSize
    )
  }

  function convertRem (value) {
    return value / options.rootFontSize
  }

  var $html = document.querySelector('html')
  var observer = new window.MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      mutation.attributeName == 'style' ? options.rootFontSize = getRootElementFontSize() : null
    })
  })
    // configuration of the observer:
  var config = { attributeFilter: ['style'] }

    // pass in the target node, as well as the observer options
  observer.observe($html, config)

  function initContainer (tagContainer) {
    tagContainer.height(options.height + 'rem')
    tagContainer.width(options.width + 'rem')
    tagContainer.css({
      'position': 'relative',
      'border-radius': options.height / 2 + 'rem',
      'z-index': options.zIndexInit
    })

    if (!options.init) {
// if pour ne pas recreer les events

            //* **********************
            // Mouse move ou touch move
            //* ***********************
      tagContainer.mousemove(function (e) {
                // correction bug coordonnées Sylvain GAGNOT
        if (curState.mouseDown) {
          curState.mouseX = (e.pageX) - getOffsetLeft(this)
          curState.mouseY = (e.pageY) - getOffsetTop(this)
        }
                // curState.mouseX = e.pageX - this.offsetLeft();
                // curState.mouseY = e.pageY - this.offsetTop();
      })

      document.getElementById('tagcloud').addEventListener('touchmove', function (e) {
        e.preventDefault()
        var touch = e.touches[0]
        curState.mouseX = (touch.pageX) - getOffsetLeft(this)
        curState.mouseY = (touch.pageY) - getOffsetTop(this)
      }, false)

            //* ***********************
            // mousedown ou touch start
            //* ***********************
      tagContainer.mousedown(function (e) {
        e.preventDefault()
        curState.mouseX = (e.pageX) - getOffsetLeft(this)
        curState.mouseY = (e.pageY) - getOffsetTop(this)
        mouseDownOrTouchStart()
      })

      document.getElementById('tagcloud').addEventListener('touchstart', function (e) {
        e.preventDefault()
        curState.mouseX = (e.touches[0].pageX) - getOffsetLeft(this)
        curState.mouseY = (e.touches[0].pageY) - getOffsetTop(this)
        mouseDownOrTouchStart()
      }, false)

      function mouseDownOrTouchStart ($touch, e) {
                // init calcul de la vitesse instantanée
        curState.startX = curState.mouseX
        curState.startY = curState.mouseY
        setTimeout(function () {
          curState.timer = setInterval(calcSpeed, $intervalCalcSpeed)
        }, $intervalCalcSpeed)

                // init position de départ
        curState.lastX = curState.startX
        curState.lastY = curState.startY

                // propogation de l'evenement mouseDown
        curState.mouseDown = true

                // lancement du calcul de position
        options.requestAnimationFrameId = window.requestAnimationFrame(updateTags)
      }

            //* ******************
            // mouseup ou touchend
            //* ******************
      tagContainer.mouseup(function (e) {
        e.preventDefault()
        mouseUpOrTouchEnd()
      })

      document.getElementById('tagcloud').addEventListener('touchend', function (e) {
        e.preventDefault()
        mouseUpOrTouchEnd()
      }, false)

      function mouseUpOrTouchEnd () {
                // propagation du mouseDowm
        curState.mouseDown = false

                // arret du calcul de la vitesse instantanée
        if (curState.timer) {
          clearInterval(curState.timer)
          curState.timer = null
        }
      }

            //* ************************
            // mouseleave ou touchleave
            //* ************************
      tagContainer.mouseleave(function (e) {
        e.preventDefault()
        mouseLeaveOrTouchLeave()
      })

      document.getElementById('tagcloud').addEventListener('touchleave', function (e) {
        e.preventDefault()
        mouseLeaveOrTouchLeave()
      }, false)

      function mouseLeaveOrTouchLeave () {
        curState.mouseDown = false
                // arret du calcul de la vitesse instantanée
        if (curState.timer) {
          clearInterval(curState.timer)
          curState.timer = null
        }
      }

      function calcSpeed () {
        curState.stopX = curState.mouseX
        curState.stopY = curState.mouseY

        var dx = curState.stopX - curState.startX
        var dy = curState.stopY - curState.startY
        var vectorLength = Math.sqrt(Math.abs(dx) * Math.abs(dx) + Math.abs(dy) * Math.abs(dy))

        curState.speed = vectorLength / $intervalCalcSpeed

        curState.vectorX = -dx / vectorLength
        curState.vectorY = dy / vectorLength

        curState.startX = curState.mouseX
        curState.startY = curState.mouseY
      }
    }

    // if (!$('#imgcloud').length) {
    //   tagContainer.append('<img src="' + options.imgBackUrl + '" id="imgcloud"/>')
    // }

    var $topImg = (70 * options.height / 100) / 2

    $('#imgcloud').css({
      'display': 'block',
      'margin': '0 auto',
      'width': (70 * options.height / 100) + 'rem',
      'height': (70 * options.height / 100) + 'rem',
      'position': 'absolute',
      'top': 'calc(50% - ' + $topImg + 'rem)',
      'left': 'calc(50% - ' + $topImg + 'rem)',
      'z-index': options.zIndexInit
    })
    tagContainer.find('h3').css({
      'z-index': options.zIndexInit
    })

    options.init = true
  }

  function initTags (tagContainer) {
    tags = tagContainer.children('ul').children()
    while (tags.length > options.maxtags) {
      tagContainer.children('ul').children(':nth-of-type(' + Math.round(Math.random() * tags.length) + ')').remove()
      tags = tagContainer.children('ul').children()
    }
    tags.css({
      'position': 'absolute',
      'top': '0',
      'left': '0',
      'list-style-type': 'none',
      'list-style-position': 'outside',
      'list-style-image': 'none',
      'max-width': options.tagMaxWidth + '%',
      'word-wrap': 'break-word',
      'border-radius': '0.5em'
    })
    for (var i = 0; i < tags.length; i++) {
      var jTag = jQuery(tags[i])
      // var link = jQuery(jTag.children()[0])
      tags[i] = jTag
      jTag.data('hover', '0')
      jTag.hover(function () {
        jQuery(this).css(options.hoverStyle)
        jQuery(this).data('hover', '1')
      }, function () {
        jQuery(this).css(options.mouseOutStyle)
        jQuery(this).data('hover', '0')
      })
    }
  }

  function deployTags () {
    var phi = 0
    var theta = 0
    var max = mathAssets.tLength + 1
    var i = 0
    while (i++ < max) {
      phi = Math.acos(-1 + (2 * i - 1) / max)
      theta = Math.sqrt(max * Math.PI) * phi
      tags[i - 1].cx = options.radius * Math.cos(theta) * Math.sin(phi)
      tags[i - 1].cy = options.radius * Math.sin(theta) * Math.sin(phi)
      tags[i - 1].cz = options.radius * Math.cos(phi)
      tags[i - 1].h = convertRem(jQuery(tags[i - 1]).height() / 4)
      tags[i - 1].w = convertRem(jQuery(tags[i - 1]).width() / 4)
      tags[i - 1].zoomFont = 1
    }
    options.deploy = true
  }

  function calcRotation (dY, dX) {
    curState.sy = Math.sin(dY * mathAssets.dtr)
    curState.cy = Math.cos(dY * mathAssets.dtr)
    curState.sx = Math.sin(dX * mathAssets.dtr)
    curState.cx = Math.cos(dX * mathAssets.dtr)
  }

  function updateTags () {
    var distX
    var distY

        // si je track
    if (curState.mouseDown) {
      distX = (curState.lastX - curState.mouseX) / (2 * Math.PI)
      distY = (curState.mouseY - curState.lastY) / (2 * Math.PI)
    }

        // si je relache le track avec une certaine vitesse => elasticite

    if (!curState.mouseDown && curState.speed) {
      if (curState.speed < 0.0000001) {
        curState.speed = 0
      } else {
        curState.speed -= (curState.speed / 10)
      }

      distX = curState.speed * curState.vectorX * 5
      distY = curState.speed * curState.vectorY * 5
    }

        // calcul des positions dans les 2 derniers cas (track et relache elastique)
    if (distX || distY) {
      calcRotation(distY, distX)
      curState.lastY = curState.mouseY
      curState.lastX = curState.mouseX
    }

        // uniquement au deploiement des tags
    if (options.deploy) {
      distX = 1
      distY = 1
      curState.speed = Math.random()
      curState.vectorX = Math.random()
      curState.vectorY = Math.random()
      calcRotation(distY, distX)
    }

        // Mise à jour de la position des tags
    if (Math.abs(distY) > 0.00001 || Math.abs(distX) > 0.00001) {
      var j = -1
      while (j++ < mathAssets.tLength) {
        var rx1 = tags[j].cx
        // var ry1 = tags[j].cy * curState.cy + tags[j].cz * -curState.sy
        var rz1 = tags[j].cy * curState.sy + tags[j].cz * curState.cy
        tags[j].cx = rx1 * curState.cx + rz1 * curState.sx
        tags[j].cy = tags[j].cy * curState.cy + tags[j].cz * -curState.sy
        tags[j].cz = rx1 * -curState.sx + rz1 * curState.cx
        var per = mathAssets.diameter / (mathAssets.diameter + tags[j].cz)
        tags[j].x = tags[j].cx * per
        tags[j].y = tags[j].cy * per
        tags[j].alpha = per / 2
        tags[j].data('hover') == 1 ? tags[j].zoomFont = options.fontZoomHover : tags[j].zoomFont = 1
        tags[j].tagMaxWidth = options.tagMaxWidth * options.fontZoomHover
        var left = mathAssets.whratio * (tags[j].x - tags[j].w * per) + mathAssets.halfWidth
        var top = mathAssets.hwratio * (tags[j].y - tags[j].h * per) + mathAssets.halfHeight
        tags[j][0].style.transform = 'translateX(' + left + 'rem) translateY(' + top + 'rem)'
        tags[j][0].style.fontSize = options.fontMultiplier * tags[j].zoomFont * tags[j].alpha + 'rem'
        tags[j][0].style.maxWidth = tags[j].tagMaxWidth * tags[j].alpha + '%'
        tags[j][0].style.zIndex = Math.round(-tags[j].cz) + options.zIndexInit
        tags[j][0].style.opacity = tags[j].alpha
      }
      options.deploy = false
    }

        // Appel à recalcul de la position
    (curState.mouseDown || curState.speed) ? options.requestAnimationFrameId = window.requestAnimationFrame(updateTags) : null
  }
})(jQuery)
