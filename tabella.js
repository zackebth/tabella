(function($) {

	$.fn.tabella = function() {
    var images = this;

      // INITIATE THE GALLERY
      init = function(img) {

		//CREATE DIVS
		$('#overlay, #tabella-gallery').remove();

        $('<div id="tabella-gallery"></div>')
          .appendTo('body');

        $('<div id="tg-overlay"></div>')
          .appendTo('#tabella-gallery')
		  .click(exit);

        $('<div id="tg-selected-img"></div>')
			.delay()
			.appendTo('#tabella-gallery');

        $('<div id="tg-preview-img"></div>')
			.appendTo('#tabella-gallery');

        // LOAD ALL THE IMAGES
        $.each(images, function() {
			$('<img>')
            .attr('src', $(this).attr('src'))
            .hide()
            .load(function() {
              $(this)
                .fadeIn();
            })
            .appendTo('#tg-preview-img')
            .click(function() {
              initImage(this);
            });
        });
        $('<div class="navUp">&lt;</div><div class="navDown">&gt;</div>')
          .hide()
          .fadeIn()
          .appendTo('#tg-preview-img')
          .hover(function() {
            previews(this);
          });
        if(img) {initImage(img);}
      } // END OF INIT GALLERY

      // EXIT HAKUGALLERY
      exit = function() {
        $('#tabella-gallery').fadeOut('fast', function() {
          $(this).remove();
        });
      }

      initImage = function(img) {
        $('#tg-selected-img')
          .fadeOut(function() {
            $('#tg-selected-img img')
            .remove();

            $('<img>')
            .attr('src', $(img).attr('src'))
            .css({
              'max-height': $(window).height() * 0.95,
              'max-width': $(window).width() * 0.8,
            })
            .load(function() {
            $('#tg-selected-img')
            .css({
				'top': $(window).height() * 0.01,
				'left': $(window).width() * 0.15,
				'top': $(window).height() * 0.5
            })
                .fadeIn();
            })
            .appendTo('#tg-selected-img');
          });

		$('#tg-preview-img')
		.css({
			'left': $(window).width() * 0.03
		});
      }

      previews = function(elements) {
		var pos = $('#tg-preview-img').scrollTop();
        var dir = $(elements).hasClass('navUp') ? -1 : 1;
        var newp = pos + dir * $(window).height();
        var endp = $('#tg-preview-img')[0].scrollHeight - $(window).height();
        var move = dir === -1 ? (newp > 0 ? newp : 0) : (newp < endp ? newp : endp);

        if(pos !== move) {
          $('#tg-preview-img').animate({scrollTop: move}, 500);
        }
      };

    // CHANGE CURSOR TO POINTER
    images.css('cursor', 'pointer');

    // ON IMAGE CLICK
    images.click(function() {
      init(this);
    });

  };

})(jQuery);
