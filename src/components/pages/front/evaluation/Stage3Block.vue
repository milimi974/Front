<template>
  <div class="row">
    <div class="left">
      <div class="question etape3">
        <div class="title">Question {{number}} </div>
        <textarea class="tinymce" :id="'stage3-question' + number"></textarea>
        <!--$('<div class="data">' + data + '</div>').appendTo($divToUpdate);
                    $('<p class="signal">signaler cette question comme: <a href="#">non-pertinente</a> <a href="#">redondante</a> <a href="#">inappropriée</a></p>').appendTo($divToUpdate);-->
      </div>
      <div class="reponse etape3">
        <div class="title">Réponse donnée {{number}} </div>
        <textarea class="tinymce" :id="'stage3-answer' + number"></textarea>
      </div>
      <div class="prof-response">
        <div class="title">Réponse attendue {{number}} </div>
        <textarea class="tinymce" :id="'stage3-expectation' + number"></textarea>
      </div>
    </div>

    <div class="right">
      <p>Merci d'<strong>évaluer la réponse apportée</strong> à la question posée.</p>
      <div class="slider">
        <div class="bar" :id="'stage3-grade' + number"></div>
        <div class="bar2"></div>
        <div class="circle">0</div>
        <p class="totalRemaining">
          Points restants : 
          <span></span>
        </p>
      </div>
    </div>
    <div class="clearfix"></div>
  </div>

</template>

<script>
  export default {
    props: {
      number: Number
    }
  }
</script>
