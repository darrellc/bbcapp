
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
	for(i=0;i<list.length;i++){
		if($(list[i]).hasClass("selected")){
			console.log($(list[i]).children("ul"));
			$(list[i]).children("ul").show();
		}
		anchorTag = $(list[i]).children()[0];
		$(anchorTag).bind("mouseleave", function(){
			if(!$(this).parent().hasClass("selected")){
				animateDown(this);
			}
		});
		$(anchorTag).bind("mouseenter", function(){
			animateUp(this);
		});
		$(anchorTag).bind("click", function(){
			if($(this).next().is(":visible")){
				animateDown(list[i]);
				$(this).next().slideUp();
				$(this).removeClass("selected");
			}else{
				var ul = $(".topMenu li ul");
				$(ul).slideUp("fast");
				$(this).next().slideDown();
				$(this).addClass("selected");					
			}
			return false;
		});
		var childListItem = $(anchorTag).next().children();
		var percent = 100 / childListItem.length;
		$(childListItem).css("width", percent.toString() + "%");	
	}
	
	$("#homePageCarousel").flexslider({
		animation: "slide",
		directionNav: false,
		controlNav: false,
		animationLoop: true,
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
	
	$('.flexslider').flexslider({
	    animation: "slide",
	    smoothHeight: true,
	    directionNav: true,
	    controlNav: false,
	    slideshow: false
	});
	
	
	var a = $("#sideMenuButton");
	$(a).dropdown("toggle");	  
});

function animateDown(e){
	$(e).animate({ marginTop: '0px', paddingBottom: '10px'}, 100, "swing");
	$(e).css("borderTopColor", "#111111");
}
function animateUp(e){
	$(e).animate({ marginTop: '-5px', paddingBottom: '15px'}, 100, "swing");
	$(e).css("borderTopColor", "#902f2a");
}
