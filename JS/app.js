function getSelectionsListe (id) {
  const liste = document.getElementById(id)
  var lsSelections = ''
  for (var i = 0; i < liste.options.length; i++) {
    if (liste.options[i].selected) {
      lsSelections += liste.options[i].value + ', '
    }
  }
  return lsSelections
}

const spacer = {
  blank: function () {
    return ' '
  },

  newline: function () {
    return '\n'
  },

  line: function (length, character) {
    let s = ''
    for (var i = 0; i < length; i++) {
      s += character
    }
    return s
  },

  wrap: function (text, length, character) {
    var padLength = (length - text.length) / 2 - 1
    var wrapText = character + spacer.line(padLength, ' ') + text
    wrapText += spacer.line(padLength, ' ')
    return wrapText
  },

  box: function (text, character) {
    var boxText = spacer.newline()
    let length = text.length + 38
    if (character === '=') length = 25
    if (character === '*') length = 40

    boxText += spacer.line(length, character) + spacer.newline()
    boxText += spacer.wrap(text, length, character) + spacer.newline()
    boxText += spacer.line(length, character) + spacer.newline()
    return boxText
  }
}

window.onload = function () {
  $('.element-a-cacher').each(function () {
    $(this).hide()
  })
}

function affichage () {
  var bil = ''
  var esp = ' '
  var rtl = '\n'
  var egal = '='
  var nom = document.getElementById('nom').value
  var prenom = document.getElementById('prenom').value
  /* les chaines les plus longues de chaque rubrique expl: fonctionnelle */
  var marche = 'Marche (périmètre, aides techniques ...): '
  var lplfonc = marche.length
  var assis = 'Équilibre assis: '
  var debout = 'Équilibre debout: '
  var transferts = 'Transferts (lit vers fauteuil): '
  var doubletache = 'Double tâche: '
  var oedeme = 'Oedème: '
  var hematome = 'Hématome: '
  var inflamation = 'Inflammation: '
  var amyotrophie = 'Amyotrophie: '
  var mobilisation = 'A la mobilisation: '
  var repos = 'Au repos:'
  var lpldoul = mobilisation.length

  // bil += spacer.box("Bilan Kinésithérapique",fois);
  bil +=
  document.getElementById('civilite').value +
  esp +
  nom.charAt(0).toUpperCase() +
  nom.substring(1).toLowerCase() +
  esp +
  prenom.charAt(0).toUpperCase() +
  prenom.substring(1).toLowerCase()
  bil +=
  rtl +
  "Date de l'admission: " +
  frenchdate(document.getElementById('entree').value)
  if (document.getElementById('anamnese').value !== '') {
    bil += rtl + spacer.box('ANAMNÈSE', egal)
    bil += rtl + document.getElementById('anamnese').value
  }

  if (document.getElementById('histoire').value !== '') {
    bil += rtl + spacer.box('HISTOIRE DE LA MALADIE', egal)
    bil += rtl + document.getElementById('histoire').value
  }
  if (document.getElementById('modeDeVie').value !== '') {
    bil += rtl + spacer.box(' Mode de vie', egal)
    bil += rtl + document.getElementById('modeDeVie').value
  }
  if (document.getElementById('atcd').value !== '') {
    bil += rtl + spacer.box('Antécédents', egal)
    bil += rtl + document.getElementById('atcd').value
  }
  bil +=
  rtl +
  spacer.box(' Prescription médicale', egal) +
  rtl + document.getElementById('pec').value
  if (document.getElementById('operation').value !== '') {
    bil +=
    rtl +
    rtl +
    "Date de l'opération: " +
    frenchdate(document.getElementById('operation').value)
  }
  if (document.getElementById('appui').value !== '') {
    bil +=
    rtl +
    'Appui ( total/limité/sans appui ): ' +
    document.getElementById('appui').value
  }
  if (document.getElementById('immobilisation').value !== '') {
    bil +=
    rtl +
    'Immobilisation (plâtre/attelle...): ' +
    document.getElementById('immobilisation').value
  }
  bil += rtl + spacer.box(' Cotation de la Douleur EVS', egal)
  bil += rtl + 'Échelle de 0 à 4.'
  bil +=
  rtl +
  ' 0 = pas de douleur, 1 = faible, 2 = moyenne, 3 = forte, 4 = très forte.' +
  rtl
  bil +=
  rtl +
  repos +
  spacer.line(lpldoul - repos.length + 3, '.') +
  ' ' +
  document.getElementById('douleurRepos').value +
  '/4'
  bil +=
  rtl +
  mobilisation +
  ' ' +
  document.getElementById('douleurMob').value +
  '/4'
  bil +=
  rtl +
  'Type: ' +
  getSelectionsListe('typeDouleur') +
  document.getElementById('typeRepos').value
  bil += rtl + 'Localisation: ' + document.getElementById('localisation').value
  bil += rtl + spacer.box('FONCTIONNEL', egal)
  bil +=
  rtl +
  assis +
  spacer.line(lplfonc - assis.length + 5, '.') +
  ' ' +
  document.getElementById('assis').value
  bil +=
  rtl +
  debout +
  spacer.line(lplfonc - debout.length, '.') +
  spacer.line(2, '.') +
  ' ' +
  document.getElementById('debout').value
  bil +=
  rtl +
  transferts +
  spacer.line(lplfonc - transferts.length, '.') +
  ' ' +
  document.getElementById('transferts').value
  bil +=
  rtl +
  doubletache +
  spacer.line(lplfonc - doubletache.length + 1, '.') +
  spacer.line(3, '.') +
  ' ' +
  document.getElementById('doubleTache').value
  bil +=
  rtl + rtl + 'Autonomie AVJ: ' + document.getElementById('autonomie').value
  bil += rtl + rtl + marche + document.getElementById('marche').value
  bil += rtl + spacer.box('TROPHICITÉ', egal)
  bil +=
  rtl +
  oedeme +
  spacer.line(lplfonc - oedeme.length + 4, '.') +
  ' ' +
  document.getElementById('oedeme').value
  bil +=
  rtl +
  hematome +
  spacer.line(lplfonc - hematome.length, '.') +
  spacer.line(2, '.') +
  ' ' +
  document.getElementById('hematome').value
  bil +=
  rtl +
  amyotrophie +
  spacer.line(lplfonc - amyotrophie.length + 1, '.') +
  ' ' +
  document.getElementById('amyotrophie').value
  bil +=
  rtl +
  inflamation +
  spacer.line(lplfonc - inflamation.length + 1, '.') +
  ' ' +
  document.getElementById('inflamation').value
  if (document.getElementById('attitudeVicieuse').value !== '') {
    bil += rtl + spacer.box('ARTICULAIRE', egal)
    bil +=
    rtl +
    'Attitude vicieuse: ' +
    document.getElementById('attitudeVicieuse').value
    bil += rtl + 'Amplitude: ' + document.getElementById('amplitude').value
  }
  bil += rtl + spacer.box('MUSCULAIRE', egal)
  bil +=
  rtl +
  'Verrouillage quadriceps: ' +
  document.getElementById('verrouillage').value
  bil +=
  rtl +
  rtl +
  'Autres groupes musculaires: ' +
  document.getElementById('autres').value
  bil +=
  rtl +
  spacer.box(' Fonctions Supérieures', egal) +
  rtl +
  document.getElementById('fonctionsSuperieures').value
  bil +=
  rtl +
  spacer.box(' Fonctions Respiratoires', egal) +
  rtl +
  document.getElementById('fonctionsRespiratoires').value
  bil +=
  rtl +
  spacer.box(' Projet kiné du patient', egal) +
  rtl +
  document.getElementById('projetKine').value
  bil +=
  rtl +
  spacer.box(' Objectifs et prise en charge prévisionnelle', egal) +
  rtl +
  document.getElementById('priseEnChargePrev').value
  $('.element-a-cacher').each(function () {
    $(this).show()
  })
  var toCopy = document.getElementById('to-copy')
  toCopy.value = ''
  toCopy.value += '' + bil
  toCopy.select()
  document.execCommand('copy')
  return false
}

function replaceSelection (idfield, idoption) {
  const d = document.getElementById(idoption)
  var elem = document.getElementById(idfield)
  d.addEventListener('keyup', (e) => {
    // d.preventDefault()
    // e.stopPropagation

    if (e.code === 'Space' || e.code === 'Enter') {
      var word = d.options[d.selectedIndex].value
      document.getElementById(idoption).size = 1
      word = word.replace(/\s\s+/g, ' ')
      const from = elem.selectionStart
      const to = elem.selectionEnd
      elem.value = elem.value.slice(0, from) + word + elem.value.slice(to)
      elem.selectionStart = from + word.length
      elem.selectionEnd = from + word.length
      document.getElementById(idoption).selectedIndex = 0
      elem.focus()
    }
  }, false)

  d.addEventListener('click', (e) => {
    e.preventDefault()
    var word = d.options[d.selectedIndex].value
    document.getElementById(idoption).size = 1
    word = word.replace(/\s\s+/g, ' ')
    const from = elem.selectionStart
    const to = elem.selectionEnd
    elem.value = elem.value.slice(0, from) + word + elem.value.slice(to)
    elem.selectionStart = from + word.length
    elem.selectionEnd = from + word.length
    document.getElementById(idoption).selectedIndex = 0
    elem.focus()
  }, false)
}

function frenchdate (strDate) {
  var ch = strDate.split('-').reverse().join('/')
  return ch
}

const efface = document.getElementById('reinitialise')
efface.addEventListener('click', (e) => location.reload(true), false)

// var chtext = document.querySelectorAll('textarea')
// var tab = Array.from(chtext)
// tab.forEach((elem) =>
//   elem.addEventListener(
//     'focus',
//     (event) => {
//       event.target.style.backgroundColor = '#EEEEEE'
//       event.target.style.borderColor = 'green'
//     },
//     true
//   )
// )

// tab.forEach((elem) =>
//   elem.addEventListener(
//     'blur',
//     (event) => {
//       event.target.style.backgroundColor = ''
//       event.target.style.borderColor = '#dbe4bc'
//     },
//     true
//   )
// )

// select on focus on deroule
var chselect = document.querySelectorAll('select')
var seltab = Array.from(chselect)
seltab.forEach((elem) => {
  elem.addEventListener('focus', function (event) {
    event.target.size = elem.options.length
  }
  , false)
})

seltab.forEach((elem) =>
  elem.addEventListener('blur', function (event) {
    event.target.size = 1
  }, false)
)

function heure () {
  var h = new Date()
  document.getElementById('temps').innerHTML =
  (h.getHours() < 10 ? '0' + h.getHours() : h.getHours()) +
  ':' +
  (h.getMinutes() < 10 ? '0' + h.getMinutes() : h.getMinutes()) +
  ':' +
  (h.getSeconds() < 10 ? '0' + h.getSeconds() : h.getSeconds())
  setTimeout(heure, 1000)
}

heure()

function date () {
  var date = new Date()
  var nday = date.getDate() + 1 < 10 ? '0' + date.getDate() : date.getDate()
  var month =
  date.getMonth() + 1 < 10
    ? '0' + (date.getMonth() + 1)
    : date.getMonth() + 1
  var year = date.getFullYear()
  var laDate = nday + '/' + month + '/' + year
  document.getElementById('laDate').innerHTML = laDate
}

date()

document.addEventListener('DOMContentLoaded', function () {
  var textareas = document.getElementsByTagName('textarea')
  for (var i = 0; i < textareas.length; i++) {
    textareas[i].onkeyup = function (e) {
      if (e.key == 'Escape') {
        var rtl = '\n'
        e.target.value += rtl
      }
    }
  }
}, false)
