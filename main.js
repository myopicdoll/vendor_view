 var vendorView = function (e) {
    var element = document.querySelector('.mdl-stepper#vendor-view');
    if (!element) return false;
    var stepper = element.MaterialStepper;
    var steps = element.querySelectorAll('.mdl-step');
    var step;
    for (var i = 0; i < steps.length; i++) {
      step = steps[i];
      step.addEventListener('onstepnext', function (e) {
        stepper.next();
      });
    }
    element.addEventListener('onsteppercomplete', function (e) {
      var toast = document.querySelector('#snackbar-stepper-complete');
      if (!toast) return false;
      toast.MaterialSnackbar.showSnackbar({
        message: 'Stepper with editable step are completed',
        timeout: 4000,
        actionText: 'Ok'
      });
    });
    map.invalidateSize();
  };
  
  window.addEventListener('load', vendorView);
	
  var markets = ['Austin', 'Aspen', 'LA', 'Napa', 'NYC', 'SF', 'Santa Barbara'];
  var filters = ['Transportation', 'Food & Drink', 'Arts & Culture', 'Bars', 'Sports', 'Wine/Brewery/Pub Excursion', 'Nature', 'Event Tickets', 'Local Sightseeing', 'Services', 'Accommodations'];

	d3.select('#step-1-buttons')
  .selectAll('button')
		.data(markets)
		.enter()
		.append('button')
		.attr('class', 'mdl-button mdl-js-button market-button')
		.text(function(d){ return d;})
    .on('click', function(d){
      // clear all
      d3.selectAll('button').classed('chosen', false);
      d3.select(this).classed('chosen', true);
      d3.select('#step-1-summary')
        .text('market - ' + d);
      console.log(d);
    });

  d3.select('#step-1-buttons').on('click', function(){
      d3.selectAll('.market-button')
        .filter(function(d) { return !d3.select(this).classed('chosen'); })
        .attr('disabled', true);
  });

 // d3.select('#step-2-buttons')
 //  .selectAll('button')
 //    .data(filters)
 //    .enter()
 //    .append('button')
 //    .attr('class', 'mdl-button mdl-js-button filter-button')
 //    .text(function(d){ return d;})
 //    .on('click', function(d){
 //      // clear all
 //      d3.selectAll('button').classed('chosen', false);
 //      d3.select(this).classed('chosen', true);
 //      console.log(d);
 //    });

	var LatLngKeyValue = {
	  'Aspen': [39.195, -106.837],
	  'Austin': [30.3072, -97.756],
	  'Los Angeles': [34.0194, -118.412],
	  'Napa': [38.2979, -122.301],
	  'New York': [40.6642, -73.9385],
	  'Santa Barbara': [34.399, -119.713],
	  'San Francisco': [37.7272, -123.0322]
	};
	var smallIcon = new L.Icon({
	     // iconSize: [27, 27],
	     iconAnchor: [13, 27],
	     // popupAnchor:  [1, -24],
	     iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png'
 	});

	var map = L.map('map').setView([30.3072, -97.756], 4);
	var defaultTag = 'count';
	var CartoDB_Positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  	attribution:"&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> &copy; <a href='http://cartodb.com/attributions'>CartoDB</a>",
  	subdomains: 'abcd',
  	maxZoom: 19
	});

	CartoDB_Positron.addTo(map);
 	
 	var market;
 	for (var key in LatLngKeyValue) {
    	market = LatLngKeyValue[key];
    	L.circleMarker(market, {
	 		radius: 8,
	 		fillOpacity: 0.6,
	 		fillColor: '#1793E7'
 		}).addTo(map);
  };