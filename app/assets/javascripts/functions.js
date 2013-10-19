
$(document).ready(function(){
	$(".middle .newsflash h4").click(function(){
		//display the  child ul
		$(".middle .newsflash h4").each(function(){
			var n = $(this).next('ul');
			n.slideUp();
		});
		var n = $(this).next('ul');
		if(n.css('display') == 'block') n.slideUp();
		else{n.slideDown();}
	});
	$(".topMenu ul li ul li:last-child a").each(function(){
		$(this).addClass('last-child');
	});
	//$("#videoOverlay").fancybox({
	//	centerOnScroll : true,
	//	modal : true	
	//});
	$("#contentWrapper .btn-group ul").first().addClass("dropdown-menu pull-right");
	//$("#videoOverlay").fancybox().trigger('click');
	var child = $(".topMenu .menu").children();
	list = $(child).children();
	$(list).each(function(){
		if($(this).hasClass("selected") ){
			$(this).children("ul").show();
		}
		var anchorTag = $(this).children()[0];
		$(anchorTag).bind("mouseenter", function(){
			if(!$(this).parent().hasClass("selected") ){
				if(!$(this).parent().hasClass("active") ){
					animateUp(this);
				}					
			}
				
			
		});
		$(anchorTag).bind("mouseleave", function(){
			if(!$(this).parent().hasClass("selected") ){
				if(!$(this).parent().hasClass("active") ){
					animateDown(this);
				}					
			}			
		});
		$(anchorTag).bind("click", function(){
			if($(this).next().is(":visible")){
				if(!$(this).parent().hasClass("selected") ){
					animateDown(this);
					$(this).next().slideUp();
					$(this).parent().removeClass("active");	
				}					
			}else{
				$(list).each(function(){
					if( !$(this).hasClass("selected") ){
						animateDown($(this).children()[0]);
					}
					$(this).removeClass("active");
				});
				var ul = $(".topMenu li ul");
				$(ul).slideUp("fast");
				$(this).parent().addClass("active");
				$(this).next().slideDown();				
				animateUp(this);				
				
				
				
			}
		});
		var w = $(window).width();
		console.log(w);
		if(w > 460){
			var childListItem = $(anchorTag).next().children();
			var percent = 100 / childListItem.length;
			$(childListItem).css("width", percent.toString() + "%");
		}
	});
	
	$("#homePageCarousel").flexslider({
		animation: "slide",
		directionNav: false,
		controlNav: false,
		animationLoop: true,
		slideshow: true,
		itemWidth: 210,
		itemMargin: 5,
		asNavFor: "#homePageSlider"
	});
	
	$("#homePageSlider").flexslider({
		animation: "slide",
		controlNav: false,
		animationLoop: true,
		slideshow: true,
		sync: "#homPageCarousel"
	});
	
	//$('.flexslider').flexslider({
	//    animation: "slide",
	//    smoothHeight: true,
	//    directionNav: true,
	//    controlNav: false,
	//    slideshow: false
	//});
	
	
	var a = $("#sideMenuButton");
	$(a).dropdown("toggle");	  
});

function animateDown(e){
	$(e).animate({ marginTop: '0px', paddingBottom: '9px'}, 100, "swing");
	$(e).css("borderTopColor", "#2a1f17");
}
function animateUp(e){
	$(e).animate({ marginTop: '-5px', paddingBottom: '14px'}, 100, "swing");
	$(e).css("borderTopColor", "#902f2a");
}
