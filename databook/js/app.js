jQuery(document).ready(function ($) {
	var mouseX = 0, mouseY = 0;

	$(document).mousemove(function(e){
    	mouseX = e.pageX - 0;
		mouseY = e.pageY - 170;
	});

	var mm = com.modestmaps;
//	var url = 'http://a.tiles.mapbox.com/v3/newamerica.dc-kids6.jsonp';
	var url = 'http://a.tiles.mapbox.com/v3/newamerica.map-y2lhm4ps.jsonp';
	
    wax.tilejson(url, function(tilejson) {
        var tooltip = new wax.tooltip();
        var m = new mm.Map('mainMap', new wax.mm.connector(tilejson),
            new mm.Point(995,700));

        m.setCenterZoom(new mm.Location(
			38.905, //tilejson.center[1], lon
			-76.956), //tilejson.center[0]), lat
            12); // zoom

        wax.mm.zoomer(m).appendTo(m.parent);

		wax.mm.interaction(m, tilejson, {
		  		callbacks:
					{	// Show a tooltip.
						over: function(feature, context) {
                            /* tooltip.over(feature, context); */
							if (feature){
								var featureItem = $(feature);
								if ($(feature).length == 33){	//CHANGE ME IF TOTAL CHANGES
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
										policeStat = $(featureItem[26]).html(),
										indicator = $(featureItem[28]).html(),
										schoolHexArray = $(featureItem[30]).html(),
										schoolValueArray = $(featureItem[32]).html();
										$('#school-perf').show();
										$('#nbh-name').html(neighborhoodNames);
										$('#race-pie-chart').html('<strong>Demographics:</strong><br/><center><img src="http://chart.apis.google.com/chart?chs=200x120&cht=p&chco=0000FF|6633FF|6699FF|66FFFF&chds=0,700&chd=t:'+ pctWhiteNo +','+ pctBlackNo +','+ pctHisp_20 +','+ pctAsianPI +'&chdl=White|Black|Hispanic|Asian&chma=|2&chf=bg,s,67676700" width="200" height="120" /></center>');
										$('#avg-income').html('<strong>Avg. family income:</strong> $' + averageFamilyIncome);
										$('#police').html('<strong>Police stations:</strong> ' + policeStat);
										$('#library').html('<strong>Libraries:</strong> ' + libraryNum);
$('#unemployment').html('<strong>Unemployment:</strong> ' + pctUnemployment + '%');
										$('#poor-children').html('<strong>Children in poverty:</strong> ' + pctPoorChildren + '%');
										$('#child-care').html('<strong>Child care facilities:</strong> ' + childCareF);
	
										// INVESTIGATE DATA:
										$('#school-perf-chart').html('<strong>Percentage Proficient and Above</strong><br/><center><img style="padding-top: 5px" src="http://chart.googleapis.com/chart?chxt=x,y&chxl=0:|Reading|Math&chxp=0,25,75&chs=290x240&cht=s&chd=t:25,' + schoolValueArray + '&chco=' + schoolHexArray + '&chdl=DC+Average|Nbhd+Schools&chf=bg,s,67676700" width="290" height="240" /></center>')
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
									$('#school-data').show();
									$('#school-data').html('<strong>School details</strong><br/><strong>Lunches</strong><center><img src="http://chart.apis.google.com/chart?chs=200x120&cht=p&chco=0000FF|6633FF|6699FF|66FFFF&chds=0,700&chd=t:'+ countFreeLunch +','+ countRedPriceLunch +','+ countNonFreeOrReduced +'&chdl=Free|Reduce|Other&chma=|2&chf=bg,s,67676700" width="175" height="100" /></center><strong>Percentage Proficient and Above</strong><center><img style="padding-top:5px" src="http://chart.googleapis.com/chart?chxt=x,y&chxl=0:|Reading|Math&chxp=0,25,75&chs=190x100&cht=s&chd=t:25,75|'+ mathPct +','+ readingPct +'&chco=9970AB&chf=bg,s,67676700" width="190" height="100" /></center>');
									$('#school-data').fadeIn(150);
									$('#school-tooltip').html('<strong>' + schoolName + '</strong><br/>Total students: '+ totalStudents);
									$('#school-tooltip').css({"top": mouseY, "left": mouseX-225})
									$('#school-tooltip').fadeIn(150);
								}
							}							
						},
						out: function(context) {
							$('#school-tooltip').fadeOut(100);
							$('#school-data').fadeOut(100);
                            /* tooltip.out(context); */
						}
					}
				});
    });

});
