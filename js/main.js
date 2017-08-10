$(document).ready(function(){
	
	var intervalo;
	
	function addColor(){
		var cuenta = $('.color').length+1;
		$("#colors>div").append('<span class="color">Color '+cuenta+': <input type="color" id="color'+cuenta+'" value="#FFFFFF"> </span>');
		
	};
	function resetColors(){
		$("body").css('background-color', 'white');
		$("#colors>div").html('<span class="color">Color 1: <input type="color" id="color1" value="#FFFFFF"> </span>'+
		'<span class="color">Color 2: <input type="color" id="color2" value="#000000"> </span>');
	};
	function giveMeTheColors(){
		var arrayColors = $('input[type="color"]').map(function () {
					return $(this).val(); 
				}).get();
		return arrayColors;
	};
	function goParty(arrayColors, velocity){
		if(checkTheBox()){
			hideThings();
		}else{
			hideThings();
			setTimeout(function(){
				showThings();
			}, 500);
		}
		
			var x=0;
			intervalo = setInterval(function(){
						$("body").css('background-color', arrayColors[x]);
						x++;
						if(x==arrayColors.length){x=0;}
					}, velocity);
			return intervalo;
			
			
	};
	function giveMeVelocity(){
		return $("input[type=range]").val();
	}
	function checkTheBox(){
		if($('#checkboxHide').prop('checked')) {
				return true;
			} else {
				return false;
			}
	}
	function checkTheBoxLoop(){
		if($('#checkboxLoop').prop('checked')) {
				return true;
			} else {
				return false;
			}
	}
	function hideThings(){
			$("nav").hide();
			$("#yourParty").hide();
			$("#options").hide();
	}
	function showThings(){
			$("nav").show();
			$("#yourParty").show();
			$("#options").show();
	}
	function prepareVideo(){
		var videoUrl = $("#youtubeUrl").val();
		var videoId = videoUrl.split('?v=');
		$('#video').attr('src', 'https://www.youtube.com/embed/'+videoId[1]+'?rel=0&autohide=0');	
	}
	$('#goParty').on('click', function(ev) {
		var videoUrl = $("#youtubeUrl").val();
		var videoId = videoUrl.split('?v=');
		if(checkTheBoxLoop()){
			$('#video').attr('src', 'https://www.youtube.com/v/'+videoId[1]+'?version=3&playlist='+videoId[1]+
			'&autoplay=1&loop=1');
		}
		
		var velocity = giveMeVelocity()*1000;
		intervalo = goParty(giveMeTheColors(), velocity);
		$("#goParty").hide();
		$("#stop").removeClass("hide");
	});
	$('#stop').click(function(){
		$("body").css('background-color', 'white');
		$("#stop").addClass("hide");
		$("#goParty").show();
		clearInterval(intervalo);
		showThings();
	});
	$('#addColorButton').click(function(){
		addColor();
	});
	$('#resetColors').click(function(){
		resetColors();
	});
	$("input[type=range]").change(function(){
		$("#valueVelocity").html(giveMeVelocity());
	});
	
//MUSIC*****************************************
	$('#addMusicButton').click(function(){
		$("#music").removeClass("hide");
	});
	$('#resetMusic').click(function(){
		$("#youtubeUrl").val('');
		$('#video').attr('src', '');
		$('#checkboxLoop').attr('checked', false)
		$("#msjUrl").addClass('hide')
		$('#divMusic').show();
	});
		
	$('#okMusic').click(function(){
		if($("#youtubeUrl").val()!=""){
			if($("#youtubeUrl").val().length>25){
				$("#msjUrl").addClass('hide')
				prepareVideo();
				$('#divMusic').hide();
			}else{
				$("#msjUrl").removeClass('hide')
			}
		}else{
			$("#msjUrl").removeClass('hide')
		}
	});
	  
	

});
