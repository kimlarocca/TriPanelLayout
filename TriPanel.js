/*!
* FitText.js 1.2
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/

(function( $ ){
  $.fn.fitText = function( kompressor, options ) {
    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);
    return this.each(function(){
      // Store the object
      var $this = $(this);
      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };
      // Call once to set.
      resizer();
      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);
    });
  };
})( jQuery );

/*!
* Tri Panel Layout
*/

// setup FitText
$(".twd_leftTitle h2").fitText(.5);
$(".twd_centerTitle h2").fitText(.5);
$(".twd_rightTitle h2").fitText(.5);
$(".twd_leftText p").fitText(2);
$(".twd_centerText p").fitText(2);
$(".twd_rightText p").fitText(2);

//position level 2 sections
w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
y = w.innerHeight || e.clientHeight || g.clientHeight;
$('.twd_leftSection').css('top',y); 
$('.twd_centerSection').css('top',y); 
$('.twd_rightSection').css('top',y); 

// expand panel
$(".twd_leftPanelOverlay, .twd_centerPanelOverlay, .twd_rightPanelOverlay").click(function(e) {
	e.preventDefault();
	$("#twd_leftPanel, #twd_centerPanel, #twd_rightPanel").removeClass();
	$(".twd_leftPanelOverlay, .twd_centerPanelOverlay, .twd_rightPanelOverlay").hide();
	$(".twd_leftTitle, .twd_centerTitle, .twd_rightTitle").fadeOut("fast");
	if($(this).hasClass('twd_leftPanelOverlay')){
		$("#twd_leftPanel").addClass('expandPanel');
		$(".twd_closeLeftPanel").delay(500).fadeIn("fast");
		$(".twd_leftText p").delay(750).show().addClass("fadeInUpBig");
		$(".twd_leftDown").delay(750).fadeIn("fast");
	}
	if($(this).hasClass('twd_centerPanelOverlay')){
		$("#twd_centerPanel").addClass('expandCenterPanel');
		$(".twd_closeCenterPanel").delay(500).fadeIn("fast");
		$(".twd_centerText p").delay(750).show().addClass("fadeInUpBig");
		$(".twd_centerDown").delay(750).fadeIn("fast");
	}
	if($(this).hasClass('twd_rightPanelOverlay')){
		$("#twd_rightPanel").addClass('expandPanel');
		$(".twd_closeRightPanel").delay(500).fadeIn("fast");
		$(".twd_rightText p").delay(750).show().addClass("fadeInUpBig");
		$(".twd_rightDown").delay(750).fadeIn("fast");
	}
	e.stopPropagation();
});

//close panel
$(".twd_closeLeftPanel, .twd_closeCenterPanel, .twd_closeRightPanel").click(function(e) {
	e.preventDefault();
	$(".twd_leftText p, .twd_centerText p, .twd_rightText p").removeClass("fadeInUpBig").fadeOut("fast");
	$(this).fadeOut("fast");
	$(".twd_leftDown, .twd_centerDown, .twd_rightDown").fadeOut("fast");
	if($(this).hasClass('twd_closeLeftPanel')){
		$("#twd_leftPanel").delay(250).addClass('contractPanel');
	}
	if($(this).hasClass('twd_closeCenterPanel')){
		$("#twd_centerPanel").delay(250).addClass('contractCenterPanel');
	}
	if($(this).hasClass('twd_closeRightPanel')){
		$("#twd_rightPanel").delay(250).addClass('contractPanel');
	}
	$(".twd_leftPanelOverlay, .twd_centerPanelOverlay, .twd_rightPanelOverlay").show();
	$(".twd_leftTitle, .twd_centerTitle, .twd_rightTitle").delay(500).fadeIn("slow");
	e.stopPropagation();
});

//go down - slide panel container up, reveal level 2
$(".twd_leftDown, .twd_centerDown, .twd_rightDown").click(function(e) {
	$(".twd_leftDown, .twd_centerDown, .twd_rightDown, .twd_closeLeftPanel, .twd_closeCenterPanel, .twd_closeRightPanel").fadeOut("fast");
	$(".twd_panelContainer").addClass('slideUp').removeClass('slideDown');
	if($(this).hasClass('twd_leftDown')){
		$(".twd_leftSection").show().addClass('slideUp');
	}
	if($(this).hasClass('twd_centerDown')){
		$(".twd_centerSection").show().addClass('slideUp');
	}
	if($(this).hasClass('twd_rightDown')){
		$(".twd_rightSection").show().addClass('slideUp');
	}
});

//go up - slide panel container down
$(".twd_leftUp, .twd_centerUp, .twd_rightUp").click(function(e) {
	$(".twd_leftSection, .twd_centerSection, .twd_rightSection").fadeOut("fast");
	$(".twd_panelContainer").addClass('slideDown').removeClass('slideUp');
	if($(this).hasClass('twd_leftUp')){
		$(".twd_closeLeftPanel").delay(500).fadeIn("fast");
		$(".twd_leftDown").delay(500).fadeIn("fast");
	}
	if($(this).hasClass('twd_centerUp')){
		$(".twd_closeCenterPanel").delay(500).fadeIn("fast");
		$(".twd_centerDown").delay(500).fadeIn("fast");
	}
	if($(this).hasClass('twd_rightUp')){
		$(".twd_closeRightPanel").delay(500).fadeIn("fast");
		$(".twd_rightDown").delay(500).fadeIn("fast");
	}
});