/*
This contains the basic functions for initializing a Wax map 
and a flot graph that is tied to the map tooltips.
Data sources are mapbox hosting urls.

url = the url of the tileset to be rendered
mapContainer = the div that will hold the map
startLat = latitude of the starting center point for the map
startLng = longtitude of the starting cetner point for the map
minZoom = minimum zoom level for the map
maxZoom = maximum zoom level for the map
graph = flot graph object
graphData = main data array from flot
graphLabels = labels for the flot data array

Last Updated 02/06/12 by Andy Hull
*/

function newWaxMapGraph(url, mapContainer, startLat, startLng, minZoom, maxZoom, graph, graphData, graphLabels){
	//Optional variables	
	if(!graph){
		graph ='';
	};
	if(!graphData){
		graphData ='';
	};
	if(!graphLabels){
		graphLabels ='';
	};

	minZoom = minZoom || 2;
	maxZoom = maxZoom || 10;
	startLat = startLat || 0;
	startLng = startLng || 0;
	var m;	
	wax.tilejson(url, function(tilejson) {
		tilejson.minzoom = minZoom;
		tilejson.maxzoom = maxZoom;
		var mm = com.modestmaps;
		m = new mm.Map(mapContainer,
			new wax.mm.connector(tilejson));
	
		wax.mm.interaction(m, tilejson, {
		  callbacks:
					{	// Show a tooltip.
						over: function(feature, context) {
							if(feature){
							var jFeature = $(feature)[0]
							for(country in graphLabels){
								if($(jFeature).text() == graphLabels[country][1]){
									graph.highlight(0, graphLabels[country][0]);
									}
								}
							}
						},
						out: function(context) {
							graph.unhighlight();
						}
					}
				});
			
	    wax.mm.interaction(m, tilejson);
		wax.mm.legend(m, tilejson).appendTo(m.parent);
		wax.mm.zoomer(m, tilejson).appendTo(m.parent);	
		m.setCenterZoom(new mm.Location(startLat, startLng), minZoom);
	
		// Share
		$('a.share').click(function(e){
			e.preventDefault();
			//This iframe is hardcoded, so change if it is pointing to the wrong place
			$('#embed-code-field textarea').attr('value',"<iframe width='500' height='300' frameBorder='0' src='http://a.tiles.mapbox.com/v3/newamerica.mobile_v_fixed.html#2/0/0.000'></iframe>");
			$('.wax-share').css('display', 'block');
			$('#embed-code')[0].tabindex = 0;
			$('#embed-code')[0].select();
		});

		$('a.close').click(function(e) {closer(e)});

		function closer(e) {
		        if (e) {e.preventDefault();}
		        $('.wax-share').css('display', 'none');
		}

	});
}; //end newWaxMapGraph