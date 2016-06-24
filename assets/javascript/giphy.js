$(function(){
	populateButtons(sports, 'sportButton', '#sportButtons');
});

var sports = ["Giants", "Yankees", "Nets", "Devils", "Knicks", "Dodgers", "Patiots", "Cowboys", "Rangers", "Islanders"];


function populateButtons(arrayToUse, classToAdd, areaToAddTo){
    $(areaToAddTo).empty();

    for (var i = 0; i < arrayToUse.length; i++){
        var a = $('<button>')
        a.addClass(classToAdd);
        a.attr('data-type', arrayToUse[i]);
        a.text(arrayToUse[i]);
        $(areaToAddTo).append(a);
    }

}			

$(document).on('click', '.sportButton', function(){
    $('#sports').empty();
    $('.sportButton').removeClass('active');
    $(this).addClass('active');

    var type = $(this).data('type');
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({url: queryURL, method: 'GET'})
     .done(function(response) {
         var results = response.data;

         for(var i=0; i < results.length; i++){
             var sportDiv = $('<div class="sport-item">')

             var rating = results[i].rating;

             var p = $('<p>').text( "Rating: " + rating);

             var animated = results[i].images.fixed_height.url;
             var still = results[i].images.fixed_height_still.url;

             var sportImage = $('<img>');
             sportImage.attr('src', still);
             sportImage.attr('data-still', still);
             sportImage.attr('data-animate', animated);
             sportImage.attr('data-state', 'still')
             sportImage.addClass('sportImage');

             sportDiv.append(p)
             sportDiv.append(sportImage)

             $('#sports').append(sportDiv);
         }
        
    }); 
});                         

$(document).on('click', '.sportImage', function(){
    var state = $(this).attr('data-state'); //.data('state') won't work the way we expect
    
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})

$('#addSport').on('click', function(){
    var newSport = $('input').eq(0).val();

    if (newSport.length > 2){
        sports.push(newSport);
    }

    populateButtons(sports, 'sportButton', '#sportButtons');

    return false;
});

