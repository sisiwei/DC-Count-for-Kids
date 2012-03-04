jQuery(document).ready(function ($) {
	var mm = com.modestmaps;
//	var url = 'http://a.tiles.mapbox.com/v3/newamerica.dc-kids6.jsonp';
	var url = 'http://a.tiles.mapbox.com/v3/newamerica.map-kk5ruz44.jsonp';
	
    wax.tilejson(url, function(tilejson) {
        var tooltip = new wax.tooltip();
        var m = new mm.Map('mainMap', new wax.mm.connector(tilejson),
            new mm.Point(995,700));

        m.setCenterZoom(new mm.Location(
			38.905, //tilejson.center[1], lon
			-76.956), //tilejson.center[0]), lat
            12); // zoom

        wax.mm.zoomer(m).appendTo(m.parent);
		//wax.mm.interaction(m, tilejson);

		wax.mm.interaction(m, tilejson, {
		  		callbacks:
					{	// Show a tooltip.
						over: function(feature, context) {
                            /* tooltip.over(feature, context); */
							if (feature){
								var featureItem = $(feature);
								if ($(feature).length == 29){	//CHANGE ME IF TOTAL CHANGES
									var neighborhoodNames = $(featureItem[0]).html(),
										averageFamilyIncome = $(featureItem[2]).html(),
										pctPoorChildren = $(featureItem[4]).html(),
										pctUnemployment = $(featureItem[6]).html(),
										pctBirths = $(featureItem[8]).html(),
										pctBirthsL = $(featureItem[10]).html(),
										averagePop = $(featureItem[12]).html(),
										pctBlackNo = $(featureItem[14]).html(),
										pctWhiteNo = $(featureItem[16]).html(),
										pctHisp_20 = $(featureItem[18]).html(),
										pctAsianPI = $(featureItem[20]).html(),
										childCareF = $(featureItem[22]).html(),
										libraryNum = $(featureItem[24]).html(),
										policeStat = $(featureItem[26]).html();

										// schools in the neighborhood?
										$('#nbh-name').html(neighborhoodNames);
										$('#race-pie-chart').html('<strong>Demographics:</strong><br/><center><img src="http://chart.apis.google.com/chart?chs=200x120&cht=p&chco=0000FF|6633FF|6699FF|66FFFF&chds=0,700&chd=t:'+ pctWhiteNo +','+ pctBlackNo +','+ pctHisp_20 +','+ pctAsianPI +'&chdl=White|Black|Hispanic|Asian&chma=|2&chf=bg,s,67676700" width="200" height="120" /></center>');
										$('#avg-income').html('<strong>Avg. family income:</strong> $' + averageFamilyIncome);
										$('#poor-children').html('<strong>Poor Children:</strong> ' + pctPoorChildren + '%');
										$('#unemployment').html('<strong>Unemployment:</strong> ' + pctUnemployment + '%');

								} else {
									var schoolName = $(featureItem[0]).html(),
										address = $(featureItem[2]).html(),
										la = $(featureItem[4]).html(),
										lo = $(featureItem[6]).html(),
										countFreeLunch = $(featureItem[8]).html(),
										countRedPriceLunch = $(featureItem[10]).html(),
										countFreeOrReduced = $(featureItem[12]).html(),
										totalStudents = $(featureItem[14]).html(),
										pctFreeOrReduced = $(featureItem[16]).html(),
										countNonFreeOrReduced = $(featureItem[18]).html(),
										elemOrSec = $(featureItem[20]).html(),
										mathPct = $(featureItem[22]).html(),
										readingPct = $(featureItem[24]).html();								
								}
																
								
											
							}							
						},
						out: function(context) {
                            tooltip.out(context);
						}
					}
				});
    });

});