jQuery(document).ready(function ($) {
	var mouseX = 0, mouseY = 0,
		sidebar = $('#info'),
		banner = $('#banner');

	var baseURL = 'dcaction.map-7j45adj0',
		indicatorData = [
			{name:'High poverty neighborhoods', dataTag: 'pov', mapURL: 'dcaction.neigh-pov-dc'},
			{name:'Access to healthy food', dataTag: 'grocery', mapURL: 'dcaction.grocery-dc'}, 
			{name:'Recreation centers', dataTag: 'rec', mapURL: 'dcaction.recreation-dc'}, 
			{name:'Educational attainment (25+)', dataTag: 'noHSDegree25', mapURL: 'dcaction.no-hs-degree-25-dc'}, 
			{name:'Educational attainment (18-24)', dataTag: 'noHSDegree18', mapURL: 'dcaction.no-hs-degree-18to24-dc'},
			{name:'Homeownership', dataTag: 'homeownership', mapURL: 'dcaction.owner-occupied-homes-dc'},
			{name:'Youth ready to enter the workforce', dataTag: 'youth-emp', mapURL: 'dcaction.youth-employed-dc'},
			{name:'Environmental health', dataTag: 'envHealth', mapURL: 'dcaction.asthma-dc'},
			{name:'Violent crime', dataTag: 'crime', mapURL: 'dcaction.crime-dc'},
			{name:'Libraries', dataTag: 'lib', mapURL: 'dcaction.libraries-dc'},
			{name:'Institutional assets', dataTag: 'instAssets', mapURL: 'dcaction.owner-occupied-homes-dc,dcaction.institutional_assets-crime'},
			{name:'School locations', dataTag: 'schools', mapURL: 'dcaction.school-locations'},
			{name:'Single mother households', dataTag: 'singlemother', mapURL: 'dcaction.single_mother'},
		];

	//=======================
	// 	DROPDOWN NAV
	//========================

	// Bulid the dropdown
	$.each(indicatorData, function(k,v){
		if (k == 0) {
			$('#indicator-list').append('<li class="active" data-map="' + v.dataTag + '">' + v.name + '</li>');
		} else {
			$('#indicator-list').append('<li data-map="' + v.dataTag + '">' + v.name + '</li>');
		}
	})

	var indicators = $('#indicator-list'),
		selected = $('#indicators').find('.selected'),
		iMax = indicators.find('li').length,
		toggleTime = 250,
		arrow = $('.arrow'),
		prevBtn = $('.arrow-left'),
		nextBtn = $('.arrow-right');

	// INIT LOAD
	selected.html(indicators.find('li.active').html());
	buildMap(baseURL, indicatorData[indicators.find('li').index(indicators.find('li.active'))].mapURL);

	selected.click(function(){
		indicators.slideToggle(toggleTime);
	})

	indicators.find('li').click(function(){
		indicators.slideUp(toggleTime);
		if ('li:not(.active)'){
			selected.html($(this).html());
			$(this).siblings('.active').removeClass('active');
			$(this).addClass('active');

			var sIdx = indicators.find('li').index(this);
			buildMap(baseURL, indicatorData[sIdx].mapURL);
			
			sIdx == 0 ? prevBtn.addClass('fade') : prevBtn.removeClass('fade');
			sIdx == iMax - 1 ? nextBtn.addClass('fade') : nextBtn.removeClass('fade');
		}
	});

	arrow.click(function(){
		if ($(this).hasClass('fade') == false){

			var currIdx = indicators.find('li.active').index(),
				newIdx = $(this).hasClass('arrow-left') ? currIdx - 1 : currIdx + 1 ;

			if (newIdx != -1){
				indicators.find('li').get(newIdx).click();
			}

			newIdx == 0 ? prevBtn.addClass('fade') : prevBtn.removeClass('fade');
			newIdx == iMax - 1 ? nextBtn.addClass('fade') : nextBtn.removeClass('fade');
		}
	});

	//=======================
	// 	MAP
	//========================

	var indicatorArray = [];

	for (i = 0; i < iMax; i++){
		var elementId = indicators.find('li').get(i).id;
		indicatorArray.push(elementId);
	}

	//====================
	// STICKY NAV
	//====================

	$(document).mousemove(function(e){
    	mouseX = e.pageX - 0;
		mouseY = e.pageY - 170;

		//when scroll
        $(window).scroll(function(){
	        var bannerHeight = banner.height();

            if ($(window).scrollTop() > bannerHeight){
            	banner.find('#big').hide();
            	banner.find('#small').show();

	            banner.addClass('fixed').css('top','0').next()
	            .css('padding-top','60px');

            } else {
            	banner.find('#small').hide();
				banner.find('#big').show();
            	
	            banner.removeClass('fixed').next()
	            .css('padding-top','0');
            }
        });
	});

	//=========================
	// SCROLL TO 
	//==========================

	banner.find('li').children('a').click(function(){
		var thisId = $(this).attr('href'),
			object = $(thisId);

		$.scrollTo( object, 500, {
			axis:'y',
			offset: -(banner.find('#small').height() + 10)
		});
	});

	
});
	
function buildMap(baseURL, map){
	$('#mainMap').html();

	var mm = com.modestmaps;
	var mapurl = 'http://a.tiles.mapbox.com/v3/'+ baseURL +',' + map + '.jsonp';

	wax.tilejson(mapurl, function(tilejson) {
	    var tooltip = new wax.tooltip();
	    var m = new mm.Map('mainMap', 
	    	new wax.mm.connector(tilejson),
	        new mm.Point(680, 750));
	        
	    m.setCenterZoom(new mm.Location(
			38.900, //tilejson.center[1], lon
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
						if (d.NBH_NAMES != undefined){
							$('.indicator-floats').show();

							var neighborhoodNames = d.NBH_NAMES,
								pop = d.PopTotal,
								childPop = (d.PopU18).toFixed(0),
								babyPop = d.PopU5,
								pctWhite = (d.PopNHW * 100).toFixed(1),
								pctWhiteLegend = "White: " + pctWhite + "%",
								pctWhite18 = (d.PopNHW18 * 100).toFixed(1),
								pctWhite18Legend = "White: " + pctWhite18 + "%",

								pctBlack = (d.PopNHB * 100).toFixed(1),
								pctBlackLegend = "Black: " + pctBlack + "%",
								pctBlack18 = (d.PopNHB18 * 100).toFixed(1),
								pctBlack18Legend = "Black: " + pctBlack18 + "%",

								pctOther = (d.PopNHO * 100).toFixed(1),
								pctOtherLegend = "Other: " + pctOther + "%",
								pctOther18 = (d.PopNHO18 * 100).toFixed(1),
								pctOther18Legend = "Other: " + pctOther18 + "%",

								pctHisp = (d.PopHisp * 100).toFixed(1),
								pctHispLegend = "Hispanic: " + pctHisp + "%",
								pctHisp18 = (d.PopHisp18 * 100).toFixed(1),
								pctHisp18Legend = "Hispanic: " + pctHisp18 + "%",

								childPov = d.ChildPov,
								medianFamilyIncome = d.MedFamIncR,
								singleMotherFamilies = (d.SingleMomF * 100).toFixed(1);

								// schoolHexArray = d.chco,
								// schoolValueArray = d.chd;
								// $('#school-perf').show();
								$('#nbh-name').html(neighborhoodNames);
								$('#total-pop .value').html(addCommas(pop));
								$('#child-pop .value').html(addCommas(childPop));
								$('#avg-income .value').html('$' + addCommas(medianFamilyIncome));
								$('#poor-children .value').html((childPov * 100).toFixed(1) + '%');
								$('#single-mother-families .value').html(singleMotherFamilies + '%');
								$('#adult-race-pie-chart').html('<strong>Race & ethnicity (18 and over):</strong><br/><img src="http://chart.apis.google.com/chart?chs=220x120&cht=p&chco=3182bd|6baed6|bdd7e7|eff3ff&chds=0,700&chd=t:'+ pctWhite +','+ pctBlack +','+ pctHisp +','+ pctOther +'&chdl='+ pctWhiteLegend +'|' + pctBlackLegend + '|'+ pctHispLegend +'|'+ pctOtherLegend+'&chma=|2&chf=bg,s,67676700" width="220" height="120" />');
								$('#child-race-pie-chart').html('<strong>Race & ethnicity (under 18):</strong><br/><img src="http://chart.apis.google.com/chart?chs=220x120&cht=p&chco=e34a33|fc8d59|fdcc8a|fef0d9&chds=0,700&chd=t:'+ pctWhite18 +','+ pctBlack18 +','+ pctHisp18 +','+ pctOther18 +'&chdl='+ pctWhite18Legend +'|' + pctBlack18Legend + '|'+ pctHisp18Legend +'|'+ pctOther18Legend+'&chma=|2&chf=bg,s,67676700" width="220" height="120" />');

								// INVESTIGATE DATA:
								// $('#school-perf-chart').html('<strong>Percentage Proficient and Above</strong><br/><center><img style="padding-top: 5px" src="http://chart.googleapis.com/chart?chxt=x,y&chxl=0:|Reading|Math&chxp=0,25,75&chs=290x240&cht=s&chd=t:25,' + schoolValueArray + '&chco=' + schoolHexArray + '&chdl=DC+Average|Nbhd+Schools&chf=bg,s,67676700" width="290" height="240" /></center>')
						} else {
							console.log('here');
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
};

function addCommas(nStr){
	nStr += '';
	var x = nStr.split('.');
	var x1 = x[0];
	var x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	
	while (rgx.test(x1))
	{
	x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	
	return x1 + x2;
}