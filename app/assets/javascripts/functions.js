
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
	$("nav#menu").children("ul").addClass("clearfix");
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
			return false;
		});
		var w = $(window).width();
		console.log(w);
		if(w > 460){
			var childListItem = $(anchorTag).next().children();
			var percent = 100 / childListItem.length;
			$(childListItem).css("width", percent.toString() + "%");
		}
	});
	
	$("#homePageSlider").flexslider({
		animation: "slide",
		controlNav: false,
		prevText: "",
		nextText: "",
		touch: true		
	});	
	
	$('.photoAlbumSlider').flexslider({
	    animation: "slide",
	    smoothHeight: true,
	    directionNav: true,
	    controlNav: false,
	    slideshow: false
	});
	
	var a = $("#sideMenuButton");
	$(a).dropdown("toggle");
	
	$("#menuPanelButton").hover(function(){
		var b = $(this).find(".bar");
		$(b).animate({width: "25px"}, 100);
		$(this).animate({right: "-35px"},100);
	},function(){
		$(this).animate({right: "-30px"}, 100);
		$(this).find(".bar").animate({width: "20px"}, 100);
		
	});
	$("#menuPanelButton").popover();
	$("#menuPanelButton").click(function(){
		var menu = $("#menuPanel");
		$(menu).css("height", $(window).height());
		var p = $(this).parent();
		if($(p).css("left") === "0px")
			$(p).animate({left: "-220px"}, 300);
		else
			$(p).animate({left: "0px"}, 300);
	});
	
	
	$(document).click(function (e) {
		var p = $("#menuPanelButton").parent();
        if ($(e.target).closest('#menuPanelButton').length > 0 || $(e.target).closest(p).length > 0) return;
        	$(p).animate({left: "-220px"},300);
    });
	
	
	//Missions map
	$('#missions-map').mapSvg({
		source: '/assets/maps/world_high.svg',
		width: "953",
		height: "501",
		tooltipsMode: 'custom',
		onClick: function(e,m){
			var options = {};
	        if(this.node.id === 'Canada'){
	        	options = {name: "The Lalondes", img: "/assets/Missionaries/the_lalondes.jpg", email: "tflqc1@total.net"};
	        	m.showPopover(e,'<h2>'+options.name+'</h2><h4><a href="mailto:'+options.email+'">'+options.email+'</a></h4><img src="'+options.img+'" style="height:150px;" />');m.showPopover(e,'<h2>'+options.name+'</h2><h4><a href="mailto:'+options.email+'">'+options.email+'</a></h4><img src="'+options.img+'" style="height:150px;" />');
	        }else if(this.node.id === 'Australia'){
	        	options = {name: "The Pauls", img: "/assets/Missionaries/the_pauls.jpg", email: "dabpaul@hotmail.com", website: "www.bbfi-oceania.org/Paul/"};
	        	m.showPopover(e,'<h2>'+options.name+'</h2><h4><a href="mailto:'+options.email+'">'+options.email+'</a></h4><img src="'+options.img+'" style="height:150px;" />');
	        }else if(this.node.id === 'Togo'){
	        	options = {name: "The Medikors", img: "/assets/Missionaries/the_medikors.JPG", email: "kafjj@yahoo.com"};
	        	m.showPopover(e,'<h2>'+options.name+'</h2><h4><a href="mailto:'+options.email+'">'+options.email+'</a></h4><img src="'+options.img+'" style="height:150px;" />');
	        }else if(this.node.id === 'India'){
	        	options = {name: "The Thompsons", img: "/assets/Missionaries/the_thompsons.jpg", email: "thomsonthakadiel@yahoo.co.in"};
	        	m.showPopover(e,'<h2>'+options.name+'</h2><h4><a href="mailto:'+options.email+'">'+options.email+'</a></h4><img src="'+options.img+'" style="height:150px;" />');
	        }
	        
	        
	    },
		regions: {			
			'Australia':{tooltip: "Click Here",attr: {fill: '#F7D5BA'}},
			'Canada':{tooltip: "Click Here", attr: {fill: '#F9DD7B'}},
			'Togo':{tooltip: "Click Here", attr: {fill: '#333333'}},
			'India':{tooltip: "Click Here", attr: {fill: '#ad84ff'}}				
		}
    });
				
});

function animateDown(e){
	$(e).animate({ marginTop: '0px', paddingBottom: '9px'}, 100, "swing");
	$(e).css("borderTopColor", "#2a1f17");
}
function animateUp(e){
	$(e).animate({ marginTop: '-5px', paddingBottom: '14px'}, 100, "swing");
	$(e).css("borderTopColor", "#902f2a");
}
