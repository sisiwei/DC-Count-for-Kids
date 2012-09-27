indicatorData = [
	{
		name:'High poverty',
		dataTag: 'ConcPov',
		label: 'Poverty rate: ',
		multiplier: 100,
		labelEnd: '%',
		mapURL: 'dcaction.poverty2-dc',
		cutPoints: { // from most conc. to less conc
			0: 0.38,
			1: 0.3,
			2: 0.17,
			3: 0.1
		},
		cutPointLabel: '%'
	},
	{
		name:'Access to healthy food', 
		dataTag: 'Grocery_St', 
		label: 'Number of grocery stores: ',
		multiplier: 1,
		labelEnd: '',
		mapURL: 'dcaction.grocery-dc',
		cutPoints: {
			0: null,
			1: null,
			2: null,
			3: null
		},
		cutPointLabel: '%'
	}, 
	{
		name:'Recreation centers',
		dataTag: 'Rec_Center',
		label: 'Number of recreation centers: ',
		multiplier: 1,
		labelEnd: '',
		mapURL: 'dcaction.recreation-dc',
		cutPoints: {
			0: null,
			1: null,
			2: null,
			3: null
		},
		cutPointLabel: '%'
	}, 
	{
		name:'Education (25+)', 
		dataTag: 'noHSDegree25', 
		mapURL: 'dcaction.no-hs-degree-25-dc',
		cutPoints: {
			0: .23,
			1: .19,
			2: .14,
			3: .06
		},
		cutPointLabel: '%'
	}, 
	{
		name:'Education (18-24)',
		dataTag: 'noHSDegree18',
		mapURL: 'dcaction.no-hs-degree-18to24-dc',
		cutPoints: {
			0: .07, 
			1: .04, 
			2: .025, 
			3: .013
		},
		cutPointLabel: '%'
	},
	{
		name:'Homeownership', 
		dataTag: 'HomeOwn',
		label: 'Homeownership: ',
		multiplier: 100,
		labelEnd: '%',
		mapURL: 'dcaction.owner-occupied-homes-dc',
		cutPoints: {
			0: .75, 
			1: .55,
			2: .42,
			3: .3
		},
		cutPointLabel: '%'
	},
	{
		name:'Youth ready to work', 
		dataTag: 'Employ1624', 
		label: 'Employment (ages 16-24): ',
		multiplier: 100,
		labelEnd: '%',
		mapURL: 'dcaction.youth-employed2-dc',
		cutPoints: {
			0: .34, 
			1: .21, 
			2: .16, 
			3: .1
		},
		cutPointLabel: '%'
	},
	{
		name:'Environmental health', 
		dataTag: 'Rate_Asthm', 
		label: 'Asthma rate: ',
		multiplier: 1,
		labelEnd: ' per 10,000 children',
		mapURL: 'dcaction.asthma-dc',
		cutPoints: {
			0: 875, 
			1: 675,
			2: 425,
			3: 225
		},
		cutPointLabel: ' per 10,000 children'
	},
	{
		name:'Violent crime', 
		dataTag: 'Crime_rate',
		label: 'Crime rate: : ',
		multiplier: 1,
		labelEnd: '%',
		mapURL: 'dcaction.crime-dc',
		cutPoints: {
			0: 22, 
			1: 15, 
			2: 10, 
			3: 6
		},
		cutPointLabel: ' per 1,000 pop'
	},
	{
		name:'Libraries',
		dataTag: 'Library',
		label: 'Libraries: ',
		multiplier: 1,
		labelEnd: '',
		mapURL: 'dcaction.libraries-dc',
		cutPoints: {
			0: null,
			1: null,
			2: null,
			3: null
		},
		cutPointLabel: '%'
	},
	// {
	// 	name:'Neighborhood Assets',
	// 	dataTag: 'instAssets',
	// 	mapURL: 'dcaction.owner-occupied-homes-dc,dcaction.institutional_assets-crime',
	// 	cutPoints: {
	// 		0: null,
	// 		1: null,
	// 		2: null,
	// 		3: null,

	// 	},
	//	cutPointLabel: '%'
	// },
	{
		name:'School locations', 
		dataTag: 'schools', 
		mapURL: 'dcaction.school-locations',
		cutPoints: {
			0: null,
			1: null,
			2: null,
			3: null
		},
		cutPointLabel: '%'
	},
	{
		name:'Single mother families', 
		dataTag: 'SingleMomF', 
		label: 'Percent single mother families: ',
		multiplier: 100,
		labelEnd: '%',
		mapURL: 'dcaction.single_mother',
		cutPoints: {
			0: .37, 
			1: .2,
			2: .15,
			3: .12
		},
		cutPointLabel: '%'
	},
	{
		name:'Math scores', 
		dataTag: 'math', 
		mapURL: 'dcaction.math_scores',
		cutPoints: {
			0: .66,
			1: .5,
			2: .33,
			3: .2
		},
		cutPointLabel: '%'
	},
	{
		name:'Reading scores', 
		dataTag: 'reading', 
		mapURL: 'dcaction.reading_scores',
		cutPoints: {
			0: .66,
			1: .5,
			2: .33,
			3: .2
		},
		cutPointLabel: '%'
	},
	{
		name:'Graduation rates', 
		dataTag: 'graduation', 
		mapURL: 'dcaction.graduation_rates',
		cutPoints: {
			0: .89,
			1: .78,
			2: .67,
			3: .5
		},
		cutPointLabel: '%'
	}
];