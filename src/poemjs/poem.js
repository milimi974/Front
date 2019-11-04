/* ********************************************************************************
/*** Librairie des fonctions JS de POEM
/***
/*** Cette librairie definit un objet nommé poem dans lequel sont repertoriés
/*** toutes les fonctions et attributs principaux employés dans une page poem
/***
/*** Exemple utilisation:
/***      Voir les fichiers poem-dashbord.js, poem-explorer.js poem-resultats
/***
/* *********************************************************************************/

var $ = require('jquery')

// objet POEM
export default {
  // var objet fixes
  container: $('body'), // global pas touche
  compteurAnimCard: 0, // global pas touche
  host: window.location.protocol + '//' + window.location.host, // global pas touche
  sessionListLessons: [], // global pas touche
  sessionListCollaborateurs: [], // global pas touche
  sessionListEleves: [], // global pas touche

  // var objet modifiables
  // imgTagCloudUrl: './css/assets/ball5.png', // image de fond de l'explorateur
  // maxTagInCloud: 80, // nombre de tags maxi de l'explorateur
  // tagZoomFontHover: 1, // zoom lors du survol des tags de l'explorateur
  tagfontMultiplier: 0.952, // taille initiale des fonts de l'explorateur rem
  delayAnimCards: 300 // delay animation entre chaque carte
  // notifsLife: 6000, // durée de vie des notifications
  // listOfInputResults: '/fake_remote_data/list-input-results.php', // AJAX url liste de l'input de la page "voir les resultats
  // collaborateursList: '/fake_remote_data/collaborateurs-list.php', // AJAX url liste collaborateurs pour ajouter leçon à un cours
  // elevesList: '/fake_remote_data/eleves-list.php', // AJAX url liste leçons pour ajouter leçon à un cours
  // questionProf: '/fake_remote_data/question-prof.php', // AJAX url page question du prof
  // responseProf: '/fake_remote_data/response-prof.php', // AJAX url page question du prof
  // reponseEleveEtape1: '/fake_remote_data/reponse-eleve-etape1.php', // AJAX url page question du prof
  // questionEleveEtape2: '/fake_remote_data/question-eleve-etape2.php', // AJAX url page question du prof

  // Fonctions objet utiles
  // ***********************
  // Back Office

  // animCard: poem_animCard,  // Animation d'une carte
  // animCards: poem_animCards, // Animation des cartes du tableau de bord et de la page liste des sessions
  // findEndAnimCards: poem_findEndAnimCards, //Recherche de fin de sequence animation carte
  // moreCards: poem_moreCards, // Affichage de plus de cartes dans le parent d'un bouton nommé
  // initResults: poem_init_results, // Init de l'input result de la page Voir les résultats
  // loadResults: poem_loadResults, // Chargement des résultats demandés de la page Voir les résultats
  // formLesson: poem_formLesson, // Init des UI de la page creer une leçon ou modifier une leçon
  // addCours: poem_addCours, // Ajouter un cours page creer session ou modifier session
  // addLesson: poem_addLesson, // Ajouter une leçon page creer session ou modifier session
  // addProf: poem_addProf, // Ajouter une leçon page creer session ou modifier session
  // addEleve: poem_addEleve, // Ajouter une leçon page creer session ou modifier session
  // addEventClickLesson: poem_addEventClickLesson, // Ajout de l'evenement en cas de click sur bouton ajouter leçon page creer sessions ou modifier session
  // initSessions: poem_init_sessions, // Init des UI de la page creer une session ou modifier une session

  // // Common
  // initNotifAndMessages, // Init des div #messages et #notification
  // initDropdown // Mise à jour des donnees dans un dropdown autocompletion
  // loadExplorer // Chargement de l'explorer

  // // Front Office
  // recommandations: poem_recommandations, // gere l'integration css background des imagettes recommandations
  // selections: poem_selection, // gere l'integration css background des imagettes selections
  // initDashboard: poem_init_dashboard, // init du dashboard front
  // init_lesson: poem_init_lesson, // init de la page des leçons
}
