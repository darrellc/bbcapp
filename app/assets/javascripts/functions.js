
$(document).ready(function(){
	//Show the select menu items submenu
	$("#menu li.selected ul").show();
	//Flex slider home page slideshow
	var ul = $("#menu").children();
	var listItems = $(ul).children();
	
	$(listItems).each(function(){
		var anchor = $(this).children("a");
		var siblings = $(this).siblings();
		var subMenuItems = $(anchor).next().children();
		$(subMenuItems).each(function(){
			$(this).css("width", (100/subMenuItems.length).toString()+"%");
		});
		$(anchor).bind("click", function(){			
			var subMenu = $(this).next();
			if($(this).parent().hasClass("selected")){
				$("#menu ul li ul").slideUp("fast");
				$(subMenu).slideDown("fast");
				return;
			}
			if(subMenu.length === 0){
				return true;
			}else{
				if($(subMenu).is(":visible")){animateDown(this);$(subMenu).slideUp();return;}				
				$("#menu ul li ul").slideUp("fast");
				$(listItems).children("a").removeClass("active");
				animateUp(this);
				$(siblings).children("a").each(function(){
					if($(this).parent().hasClass("selected")){return;}
					animateDown(this);
					$(this).removeClass("active");
				});
				$(subMenu).slideDown("fast");
				$(this).addClass("active");
				return false;	
			}
		});
		$(anchor).bind("mouseenter",function(){
			if($(this).parent().hasClass("selected")){return;}
			animateUp(this);
		});
		$(anchor).bind("mouseleave", function(){
			if($(this).parent().hasClass("selected") || $(this).hasClass("active")){return;}
			animateDown(this);
		});
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
 	
	$("#menuPanelButton").click(function(){
		var menu = $("#sideBar");
		$("#menuPanel").css("height", $(window).height());
		if($(menu).css("marginLeft") === "0px"){
			$(menu).animate({marginLeft: "-220px"}, 300);
			$("#page_container").animate({marginLeft: "0px"}, 300);
		}else{
			$(menu).animate({marginLeft: "0px"}, 300);
			$("#page_container").css("position", "absolute");
			$("#page_container").animate({marginLeft: "220px"}, 300);
		}
	});
	$(document).click(function (e) {
		var p = $("#sideBar");
        if ($(e.target).closest('#menuPanelButton').length > 0 || $(e.target).closest(p).length > 0) return;
        	$(p).animate({marginLeft: "-220px"},300);
        	$("#page_container").animate({marginLeft: "0px"}, 300);
    });
	//Missions map
	$('#missions-map').mapSvg({
		source: '/assets/maps/world_high.svg',
		width: "968",
		height: "501",
		responsive: true,
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
