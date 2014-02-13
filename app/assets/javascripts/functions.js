
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
			switch(this.node.id){
				case "Canada":
					options = {name: "The Lalondes", img: "/assets/Missionaries/the_lalondes.jpg", email: "tflqc1@total.net"};
	        		m.showPopover(e,'<h2>'+options.name+'</h2><h4><a href="mailto:'+options.email+'">'+options.email+'</a></h4><img src="'+options.img+'" style="height:150px;" />');
        		case "Australia":
        			options = {name: "The Pauls", img: "/assets/Missionaries/the_pauls.jpg", email: "dabpaul@hotmail.com", website: "www.bbfi-oceania.org/Paul/"};
	        		m.showPopover(e,'<h2>'+options.name+'</h2><h4><a href="mailto:'+options.email+'">'+options.email+'</a></h4><img src="'+options.img+'" style="height:150px;" />');
        		case "Togo":
        			options = {name: "The Medikors", img: "/assets/Missionaries/the_medikors.JPG", email: "kafjj@yahoo.com"};
	        		m.showPopover(e,'<h2>'+options.name+'</h2><h4><a href="mailto:'+options.email+'">'+options.email+'</a></h4><img src="'+options.img+'" style="height:150px;" />');
        		case "India":
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

$(function(){
	//Start the first sermon
	var sermon = new Audio();
	setSermon("#sermon0",sermon);
	$("#previous").on("click",function(){
		var count = parseInt($(control).attr("data-count"))-1;
		var track = $("#sermon"+count.toString());
		if(track.length === 0){
			track = $("#sermon"+$("#lastSermon").val());
		}
		setSermon(track, sermon);
	});
	$("#next").on("click",function(){
		var count = parseInt($(control).attr("data-count"))+1;
		var track = "#sermon"+count.toString();
		if(track.length === 0){
			track = $("#sermon0");
		}
		setSermon(track, sermon);
	});
	$(".sermons li a").on("click",function(){
		setSermon(this, sermon);
	});
	$("#control").on("click",function(){
		if($(this).hasClass("glyphicon-pause")){
    		sermon.pause();
    		$(this).attr("class", "glyphicon glyphicon-play");
    	}else if($(this).hasClass("glyphicon-play")){
    		sermon.play();
    		$(this).attr("class", "glyphicon glyphicon-pause");
    	}
	});
	
	$("#videoPlayer a").on("click", function(){
		$("#videoModal").find("iframe").attr("src", "//player.vimeo.com/video/"+$(this).attr("data-id"));
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

function setSermon(id, audio){
	//Remove the playing class from the current sermon
	$(".sermons li a").removeClass("playing");
	var count = $("#control").attr("data-count");
	var track = parseInt(count)+1;
	//Set the sermon title
	var container = $(id).closest(".seriesContainer");
    var title = $(container).children("h4");
    $("#sermonTitle").html($(title).html()+" - "+$(id).attr("data-name"));
	////////////////
	audio.pause();
	audio.type= 'audio/mpeg';
	audio.src = $(id).attr("href");
	audio.play();
	$("#seek").val("");
	audio.addEventListener('timeupdate',function (){
		//convert the seconds to readable minutes
		var curtime = convertTime(audio.currentTime);
		var endTime = convertTime(audio.duration);
		$("#currentTime").html(curtime);
		$("#finalTime").html(endTime);
		$("#seek").attr("max", audio.duration);
		$("#seek").attr("value", audio.currentTime);                       
    });
	console.log(audio.duration);
	$("#finalTime").html(audio.duration);
	$("#control").attr("data-count", $(id).attr("data-count"));
	$(id).addClass("playing");
}

function convertTime(time){
	var minutes = parseInt(Math.floor(time / 60), 10);
	var seconds = parseInt(time - minutes * 60, 10);
	seconds = ((seconds < "10"))? "0"+seconds : seconds;
	return minutes+":"+seconds;	
}