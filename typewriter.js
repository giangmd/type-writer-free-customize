// typewriter
// giangmd93@gmail.com
(function($, w, d, undefined) {

  function typewriter() {

    // Globals 
    var self = this, speed;

    function init(element, options) {
      var str;
      var indice = -1;
      var runer = 0;

      self.options = $.extend( {}, $.fn.typewriter.options, options );
      $currentElement = $(element);

      
      dataSpeed  = $currentElement.data("speed") || self.options.speed;
      dataDelay  = $currentElement.data("delay") || self.options.delay;
      dataFadeOut  = $currentElement.data("fadeOut") || self.options.fadeOut;

      str = [$currentElement.data("word1"), $currentElement.data("word2"), $currentElement.data("word3")]

      function fader() {
        $currentElement.fadeOut(dataFadeOut, function() { 
            $(this).empty().show()

            var _t = str[runer]

            elementStr = _t.replace(/\s+/g, ' ');

            if (elementStr.length==0) {
              indice=0
              runer=0
              setTimeout(fader, dataDelay);
            }

              var showText = setInterval(
              function(){
                if (indice++ < elementStr.length) {
                  // console.log('indice: '+indice)
                  $currentElement.append(elementStr[indice]);
                } else {
                  // console.log('done', runer)
                  indice=-1
                  runer++
                  if (runer == str.length) {
                    runer = 0
                  }

                  clearInterval(showText);
                  setTimeout(fader, dataDelay);
                }
              }, dataSpeed);
        });
      }

      setTimeout(fader, dataDelay);

    }
    
    // Metodos publicos
    return {
      init: init
    }
  }

  // Plugin jQuery
  $.fn.typewriter = function(options) {
    return this.each(function () {
        var writer =  new typewriter();
      writer.init(this, options);
      $.data( this, 'typewriter', writer);
    });
  };

  $.fn.typewriter.options = {
    'speed' : 300,
    'delay' : 1000,
    'fadeOut' : 300,
  };

})(jQuery, window, document);