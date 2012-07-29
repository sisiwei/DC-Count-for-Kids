jQuery(document).ready(function ($) {
	var mouseX = 0, mouseY = 0,
		sidebar = $('#info');

	$(document).mousemove(function(e){
    	mouseX = e.pageX - 0;
		mouseY = e.pageY - 170;
	});

	var indicators = $('#indicators').find('ul'),
		selected = $('#indicators').find('.selected');
	
	selected.html(indicators.children('li.active').html());

	selected.click(function(){
		indicators.show();
	}).siblings('ul').find('li:not(.active)').click(function(){
		indicators.hide();
		selected.html($(this).html());
		$(this).siblings('.active').removeClass('active');
		$(this).addClass('active');
	});

	var mm = com.modestmaps;
//	var url = 'http://a.tiles.mapbox.com/v3/newamerica.dc-kids6.jsonp';
	//var url = 'http://a.tiles.mapbox.com/v3/newamerica.map-y2lhm4ps.jsonp';
	//var url = 'http://a.tiles.mapbox.com/v3/dcaction.conc-child-poverty-rank.jsonp';
	var url = 'http://a.tiles.mapbox.com/v3/dcaction.map-7j45adj0.jsonp';
	
    wax.tilejson(url, function(tilejson) {
        var tooltip = new wax.tooltip();
        var m = new mm.Map('mainMap', 
        	new wax.mm.connector(tilejson),
            new mm.Point(690, 750));
            
        m.setCenterZoom(new mm.Location(
			38.908, //tilejson.center[1], lon
			-77.020), //tilejson.center[0]), lat
            12); // zoom

        wax.mm.zoomer(m).appendTo(m.parent);

		wax.mm.interaction()
			.map(m)
			.tilejson(tilejson)
			.on({
				on: function(feature) {
					if (feature){
						var d = feature.data;
						console.log(d);
						if (d.NBH_NAMES != undefined){
							var neighborhoodNames = d.NBH_NAMES,
								pop = d.PopTotal,
								childPop = d.PopU18,
								babyPop = d.PopU5,
								pctWhite = d.PopNHW,
								pctWhite18 = d.PopNHW18,
								pctBlack = d.PopNHB,
								pctBlack18 = d.PopNHB18,
								pctOther = d.PopNHO,
								pctOther18 = d.PopNHO18,
								pctHisp = d.PopHisp,
								pctHisp18 = d.PopHisp18,
								//pctAsian = 
								childPov = d.ChildPov,
								medianFamilyIncome = d.MedFamIncR,
								singleMotherFamilies = d.SingleMomF;

								// schoolHexArray = d.chco,
								// schoolValueArray = d.chd;
								// $('#school-perf').show();
								$('#nbh-name').html(neighborhoodNames);
								//$('#race-pie-chart').html('<strong>Demographics:</strong><br/><center><img src="http://chart.apis.google.com/chart?chs=200x120&cht=p&chco=0000FF|6633FF|6699FF|66FFFF&chds=0,700&chd=t:'+ pctWhite +','+ pctBlack +','+ pctHisp +','+ pctAsian +'&chdl=White|Black|Hispanic|Asian&chma=|2&chf=bg,s,67676700" width="200" height="120" /></center>');
								$('#avg-income').html('<strong>Avg. family income:</strong> $' + medianFamilyIncome);
								//$('#unemployment').html('<strong>Unemployment:</strong> ' + pctUnemployment + '%');
								$('#poor-children').html('<strong>Children in poverty:</strong> ' + childPov + '%');

								// INVESTIGATE DATA:
								// $('#school-perf-chart').html('<strong>Percentage Proficient and Above</strong><br/><center><img style="padding-top: 5px" src="http://chart.googleapis.com/chart?chxt=x,y&chxl=0:|Reading|Math&chxp=0,25,75&chs=290x240&cht=s&chd=t:25,' + schoolValueArray + '&chco=' + schoolHexArray + '&chdl=DC+Average|Nbhd+Schools&chf=bg,s,67676700" width="290" height="240" /></center>')
						} else {
							var schoolName = d.Name,
								address = d.StreetAddress,
								la = d.Latitude,
								lo = d.Longitude,
								countFreeLunch = d.Count_FreeLunch,
								countRedPriceLunch = d.Count_RedPriceLunch,
								countFreeOrReduced = d.Count_FreeOrRedPriceLunch,
								totalStudents = d.TotalStudents,
								pctFreeOrReduced = d.Pct_FreeOrRedPriceLunch,
								countNonFreeOrReduced = d.Count_NonFreeOrRedPriceLunch,
								elemOrSec = d.ElemOrSec,
								mathPct = d.Math_Pct_ProficientOrAdvanced,
								readingPct = d.Read_Pct_ProficientOrAdvanced;
							$('#school-data').show();
							$('#school-data').html('<strong>School details</strong><br/><strong>Lunches</strong><center><img src="http://chart.apis.google.com/chart?chs=200x120&cht=p&chco=0000FF|6633FF|6699FF|66FFFF&chds=0,700&chd=t:'+ countFreeLunch +','+ countRedPriceLunch +','+ countNonFreeOrReduced +'&chdl=Free|Reduce|Other&chma=|2&chf=bg,s,67676700" width="175" height="100" /></center><strong>Percentage Proficient and Above</strong><center><img style="padding-top:5px" src="http://chart.googleapis.com/chart?chxt=x,y&chxl=0:|Reading|Math&chxp=0,25,75&chs=190x100&cht=s&chd=t:25,75|'+ mathPct +','+ readingPct +'&chco=9970AB&chf=bg,s,67676700" width="190" height="100" /></center>');
							$('#school-data').fadeIn(150);
							$('#school-tooltip').html('<strong>' + schoolName + '</strong><br/>Total students: '+ totalStudents);
							$('#school-tooltip').css({"top": mouseY, "left": mouseX-225})
							$('#school-tooltip').fadeIn(150);
						}							
					}
				},
				off: function(feature) {
					$('#school-tooltip').fadeOut(100);
					$('#school-data').fadeOut(100);
				}
			});
    });
    
});
