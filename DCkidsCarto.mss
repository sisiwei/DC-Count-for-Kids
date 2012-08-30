
/*
Map {
  background-color: #b8dee6;
}



#countries {
  ::outline {
    line-color: #85c5d3;
    line-width: 2;
    line-join: round;
  }
  polygon-fill: #fff;
}
*/

/*COMMENT: Percent housing units that are owner-occupied
#nbhddata { 
  line-color:#fff;
  line-width:1.5;
  line-dasharray: 3, 3;
  polygon-opacity: .6;}
#nbhddata[HomeOwn >= 0.00 ]   { polygon-fill: #e5ffc7;}
#nbhddata[HomeOwn >= 0.30 ] { polygon-fill: #d9fcb9;}
#nbhddata[HomeOwn >= 0.42 ] { polygon-fill: #bbef8e;}
#nbhddata[HomeOwn >= 0.55 ] { polygon-fill: #9ad363;}
#nbhddata[HomeOwn >= 0.75 ] { polygon-fill: #6eb43f;}
*/

/*COMMENT: Percent youth employed (among age 16-24)
#nbhddata { 
  line-color:#fff;
  line-width:1.5;
  line-dasharray: 3, 3;
  polygon-opacity: .6;}
#nbhddata[Employ1624 >= 0.0 ]   { polygon-fill: #e5ffc7;}
#nbhddata[Employ1624 >= 0.2 ] { polygon-fill: #d9fcb9;}
#nbhddata[Employ1624 >= 0.5 ] { polygon-fill: #bbef8e;}
#nbhddata[Employ1624 >= 0.7 ] { polygon-fill: #9ad363;}
#nbhddata[Employ1624 >= 0.84 ] { polygon-fill: #6eb43f;}
*/

/*COMMENT: Number of asthma-related ER visits per 10,000 children
#nbhddata { 
  line-color:#fff;
  line-width:1.5;
  line-dasharray: 3, 3;
  polygon-opacity: .6;}
#nbhddata[Rate_Asthm >= 0.0 ]   { polygon-fill: #e5ffc7;}
#nbhddata[Rate_Asthm >= 225.0 ] { polygon-fill: #d9fcb9;}
#nbhddata[Rate_Asthm >= 425.0 ] { polygon-fill: #bbef8e;}
#nbhddata[Rate_Asthm >= 675.0 ] { polygon-fill: #9ad363;}
#nbhddata[Rate_Asthm >= 875.0 ] { polygon-fill: #6eb43f;}
*/

/*COMMENT: Number of violent crime incidents per 1,000 pop*/
#nbhddata { 
  line-color:#fff;
  line-width:1.5;
  line-dasharray: 3, 3;
  polygon-opacity: .6;}
#nbhddata[Crime_rate >= 0 ] { polygon-fill: #e5ffc7;}
#nbhddata[Crime_rate >= 6 ] { polygon-fill: #d9fcb9;}
#nbhddata[Crime_rate >= 10 ] { polygon-fill: #bbef8e;}
#nbhddata[Crime_rate >= 15 ] { polygon-fill: #9ad363;}
#nbhddata[Crime_rate >= 22 ] { polygon-fill: #6eb43f;}



/*COMMENT: 18-24 without HS diploma
#nbhddata { 
  line-color:#fff;
  line-width:1.5;
  line-dasharray: 3, 3;
  polygon-opacity: .6;}
#nbhddata[woHSDiplom >= 0 ] { polygon-fill: #e5ffc7;}
#nbhddata[woHSDiplom >= 0.013 ] { polygon-fill: #d9fcb9;}
#nbhddata[woHSDiplom >= 0.025 ] { polygon-fill: #bbef8e;}
#nbhddata[woHSDiplom >= 0.040 ] { polygon-fill: #9ad363;}
#nbhddata[woHSDiplom >= 0.070 ] { polygon-fill: #6eb43f;}
*/


/*COMMENT:  neighborhood poverty
#nbhddata { 
  line-color:#fff;
  line-width:1.5;
  line-dasharray: 3, 3;
  polygon-opacity: .6;}
#nbhddata[ConcPov >= 0 ] { polygon-fill: #e5ffc7;}
#nbhddata[ConcPov >= 0.1 ] { polygon-fill: #d9fcb9;}
#nbhddata[ConcPov >= 0.17] { polygon-fill: #bbef8e;}
#nbhddata[ConcPov >= 0.27] { polygon-fill: #9ad363;}
#nbhddata[ConcPov >= 0.38] { polygon-fill: #6eb43f;}
*/

/*COMMENT: 18-24 without HS diploma
#nbhddata { 
  line-color:#fff;
  line-width:1.5;
  line-dasharray: 3, 3;
  polygon-opacity: .6;}
#nbhddata[woHSDiplom >= 0 ] { polygon-fill: #e5ffc7;}
#nbhddata[woHSDiplom >= 0.013 ] { polygon-fill: #d9fcb9;}
#nbhddata[woHSDiplom >= 0.025 ] { polygon-fill: #bbef8e;}
#nbhddata[woHSDiplom >= 0.040 ] { polygon-fill: #9ad363;}
#nbhddata[woHSDiplom >= 0.070 ] { polygon-fill: #6eb43f;}
*/

/*COMMENT: 25+ without HS diploma
#nbhddata { 
  line-color:#fff;
  line-width:1.5;
  line-dasharray: 3, 3;
  polygon-opacity: .6;}
#nbhddata[Nr25OrOlde >= 0   ] { polygon-fill: #e5ffc7;}
#nbhddata[Nr25OrOlde >= 0.06] { polygon-fill: #d9fcb9;}
#nbhddata[Nr25OrOlde >= 0.14] { polygon-fill: #bbef8e;}
#nbhddata[Nr25OrOlde >= 0.19] { polygon-fill: #9ad363;}
#nbhddata[Nr25OrOlde >= 0.23] { polygon-fill: #6eb43f;}
*/

/*COMMENT: Grocery stores
#nbhddata { 
  line-color:#fff;
  line-width:1.5;
  line-dasharray: 3, 3;
  polygon-opacity: .6;}
#nbhddata[Grocery_St =  0 ] { polygon-fill: #e5ffc7;}
#nbhddata[Grocery_St >= 1 ] { polygon-fill: #d9fcb9;}
#nbhddata[Grocery_St >= 2 ] { polygon-fill: #bbef8e;}
#nbhddata[Grocery_St >= 3 ] { polygon-fill: #9ad363;}
#nbhddata[Grocery_St >= 4 ] { polygon-fill: #6eb43f;}

#grocerystores {
  [zoom <= 16] {point-file: url(maki/renders/grocery-12.png);}
  [zoom >= 17] {point-file: url(maki/renders/grocery-18.png);}
  [zoom >= 19] {point-file: url(maki/renders/grocery-24.png);} 
}
*/



/*COMMENT: Count of recreation centers
#nbhddata { 
  line-color:#fff;
  line-width:1.5;
  line-dasharray: 3, 3;
  polygon-opacity: .6;}
#nbhddata[Rec_Center = 0  ] { polygon-fill: #e5ffc7;}
#nbhddata[Rec_Center >= 1 ] { polygon-fill: #d9fcb9;}
#nbhddata[Rec_Center >= 2 ] { polygon-fill: #bbef8e;}
#nbhddata[Rec_Center >= 3 ] { polygon-fill: #9ad363;}
#nbhddata[Rec_Center >= 4 ] { polygon-fill: #6eb43f;}

#recpt {
  [zoom <= 16] {point-file: url(maki/renders/park2-12.png);}
  [zoom >= 17] {point-file: url(maki/renders/park2-18.png);}
  [zoom >= 19] {point-file: url(maki/renders/park2-24.png);} 
}
*/
