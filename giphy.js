
var sports = ["Giants", "Yankees", "Nets", "Devils", "Knicks", "Dodgers", "Patiots", "Cowboys", "Rangers", "Islanders"];


function makeButtons(){ 

		$('#sportButtons').empty();
		for (var i = 0; i < sports.length; i++){
		    var a = $('<button>')
		    a.addClass('sport');
		    a.attr('data-name', sports[i]);
		    a.text(sports[i]);
		    $('#sportButtons').append(a);

		}
	}			
	makeButtons();


			$('#sportButtons').on('click', function(){

			var sport = $('#sport-input').val().trim();
			sports.push(sport);
			makeButtons(sport);
			$('#sport-input').val("");
			return false;

			});		

		$('.sport').on('click', function() {
			$('#sportsGif').empty();
        	var sport = $(this).data('name');
        	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + sport + "&api_key=dc6zaTOxFJmzC&limit=10";

$.ajax({
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {                      
            var results = response.data;

	        for (var i = 0; i < results.length; i++) {

            var sportDiv = $('<div>');

            var p = $('<p>').text("Rating: " + results[i].rating);
			var sportImage = $('<img>');
            sportImage.attr('src', results[i].images.fixed_height.url);
			sportImage.attr('data-still', results[i].images.fixed_height_still.url);
			sportImage.attr('data-animate', results[i].images.fixed_height.url);					sportImage.attr('data-state', 'animate');
			sportImage.attr('class', "sportImage");


            sportDiv.append(p);
            sportDiv.append(sportImage);
            $('#sportsGif').prepend(sportDiv);
                   
                }  


            $('.sport').on('click', function() {			
            	var state = $(this).attr('data-state');

				if (state == 'still') {
					$(this).attr('src', $(this).data('animate'));
					$(this).attr('data-state', 'animate');
				}else{
					$(this).attr('src', $(this).data('still'));
					$(this).attr('data-state', 'still');
				}
	
	
           
			});
		
		});
	});                              


