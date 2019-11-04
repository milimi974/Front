<template>
  <div class="row">
    <div class="left">
      <div class="question">
        <div class="title">Question {{number}} </div>
        <textarea class="tinymce" :id="'stage2-question' + number"></textarea>
        <!--$('<div class="data">' + data + '</div>').appendTo($divToUpdate);
                    $('<p class="signal">signaler cette question comme: <a href="#">non-pertinente</a> <a href="#">redondante</a> <a href="#">inappropriée</a></p>').appendTo($divToUpdate);-->
      </div>
      <div class="reponse">
        <div class="title">Votre réponse {{number}} </div>
        <textarea class="tinymce" :id="'stage2-answer' + number"></textarea>
      </div>
    </div>
    <div class="right">
      <p>Merci de <strong>noter cette question</strong> pour accéder à l’étape suivante</p>
      <div class="slider">
        <div class="bar" :id="'stage2-grade' + number"></div>
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
