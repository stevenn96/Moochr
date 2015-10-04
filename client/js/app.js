$(document).ready(function() {
	$('#search').fadeOut(0);
	$('.center').fadeOut(0);
	$('.center').fadeIn(1000);

	$('.center button').click(function() {
		// Query from landing.
		var query = $('.center input').val();
		$('.center input').val('');
		$('#landing').fadeOut(0);
		$('#search').fadeIn(0);

		$('#search input').val(query);
		showResults(query);
	});

	$('#search button').click(function() {
		var query = $('#search input').val();
		$('#search input').val('');
		showResults(query);
	});
});

function showResults(query) {
	$('#results').empty();
	window.fbAsyncInit = function() {
		FB.init({
			appId      : '690302597771507',
			xfbml      : true,
			version    : 'v2.4'
		});
		FB.api(
			'/search',
			'GET',
			{ "q": query, "limit": 1000, "type": "event", "access_token": "CAACEdEose0cBAHAUZCv8wLZC5nIs5mjVZCwnl4OAccstjKbil9HC1p6Q3DCQTcOZALPZAWYMvytA1o7QsSONKJBZCt0nku648BUK4684RKilmSE4vV907SLrZAZAoLZArUZBAMx6PWlmFQhLxNKr7vHMqEPY3CbY84X9SdeZAWfA6gWy7cCMQcyuZCYdjpujkDuxJKZCMmOdm5bae8k1VrPcuBf1J" },
			function (response) {
				var currDate = new Date();
				var events = response.data;
				for (i = 0; i < events.length; ++i) {
					var descr = events[i].description;
					var eventDate = new Date(events[i].start_time);
					if ((descr != null && descr.indexOf("food") > -1) && (currDate < eventDate)) {
						var date = parseInt(eventDate.getMonth(), 10) + 1 + '/' + parseInt(parseInt(eventDate.getDate(), 10) + 1, 10) + '/' + parseInt(eventDate.getFullYear(), 10);
						var time = [ eventDate.getHours(), eventDate.getMinutes(), eventDate.getSeconds() ];
						var suffix = ( time[0] < 12 ) ? "AM" : "PM";
						time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
						time[0] = time[0] || 12;
						for ( var a = 1; a < 3; a++ ) {
    						if ( time[a] < 10 ) {
        						time[a] = "0" + time[a];
   							}
  						}
						addResult(events[i].name, date, time.join(':') + ' ' + suffix, events[i].place.location.city + ', ' + events[i].place.location.country);
					}
				}
			}
		)
	};

	(function (d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) { return; }
		js = d.createElement(s); js.id = id;
		js.src = "https://connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
};

function addResult(name, date, time, location) {
	var child = '<div class="result"><p class="event-name">' + name + '</p><p class="event-date">' + date + '</p><p class="event-time">' + time + '</p><p class="event-location">' + location + '</p></div>';
	$('#results').append(child);
}