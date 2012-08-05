
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



/*COMMENT: Concetrated neighborhood poverty
#nbhdataaug { 
  line-color:#fff;
  line-width:1.5;
  line-dasharray: 3, 3;
  polygon-opacity: .6;}
#nbhdataaug[ConcPov >= 0 ] { polygon-fill: #e5ffc7;}
#nbhdataaug[ConcPov >= 0.1 ] { polygon-fill: #d9fcb9;}
#nbhdataaug[ConcPov >= 0.17] { polygon-fill: #bbef8e;}
#nbhdataaug[ConcPov >= 0.27] { polygon-fill: #9ad363;}
#nbhdataaug[ConcPov >= 0.38] { polygon-fill: #6eb43f;}
*/

/*COMMENT: 18-24 without HS diploma*/
#nbhdataaug { 
  line-color:#fff;
  line-width:1.5;
  line-dasharray: 3, 3;
  polygon-opacity: .6;}
#nbhdataaug[woHSDiplom >= 0 ] { polygon-fill: #e5ffc7;}
#nbhdataaug[woHSDiplom >= 0.013 ] { polygon-fill: #d9fcb9;}
#nbhdataaug[woHSDiplom >= 0.025 ] { polygon-fill: #bbef8e;}
#nbhdataaug[woHSDiplom >= 0.040 ] { polygon-fill: #9ad363;}
#nbhdataaug[woHSDiplom >= 0.070 ] { polygon-fill: #6eb43f;}


/*COMMENT: 25+ without HS diploma
#nbhdataaug { 
  line-color:#fff;
  line-width:1.5;
  line-dasharray: 3, 3;
  polygon-opacity: .6;}
#nbhdataaug[Nr25OrOlde >= 0   ] { polygon-fill: #e5ffc7;}
#nbhdataaug[Nr25OrOlde >= 0.06] { polygon-fill: #d9fcb9;}
#nbhdataaug[Nr25OrOlde >= 0.14] { polygon-fill: #bbef8e;}
#nbhdataaug[Nr25OrOlde >= 0.19] { polygon-fill: #9ad363;}
#nbhdataaug[Nr25OrOlde >= 0.23] { polygon-fill: #6eb43f;}
*/

/*COMMENT: Grocery stores
#nbhdataaug { 
  line-color:#fff;
  line-width:1.5;
  line-dasharray: 3, 3;
  polygon-opacity: .6;}
#nbhdataaug[Grocery_St =  0 ] { polygon-fill: #e5ffc7;}
#nbhdataaug[Grocery_St >= 1 ] { polygon-fill: #d9fcb9;}
#nbhdataaug[Grocery_St >= 2 ] { polygon-fill: #bbef8e;}
#nbhdataaug[Grocery_St >= 3 ] { polygon-fill: #9ad363;}
#nbhdataaug[Grocery_St >= 4 ] { polygon-fill: #6eb43f;}

#grocerystores {
  [zoom <= 16] {point-file: url(maki/renders/grocery-12.png);}
  [zoom >= 17] {point-file: url(maki/renders/grocery-18.png);}
  [zoom >= 19] {point-file: url(maki/renders/grocery-24.png);} 
}
*/



/*COMMENT: Count of recreation centers
#nbhdataaug { 
  line-color:#fff;
  line-width:1.5;
  line-dasharray: 3, 3;
  polygon-opacity: .6;}
#nbhdataaug[Rec_Center = 0  ] { polygon-fill: #e5ffc7;}
#nbhdataaug[Rec_Center >= 1 ] { polygon-fill: #d9fcb9;}
#nbhdataaug[Rec_Center >= 2 ] { polygon-fill: #bbef8e;}
#nbhdataaug[Rec_Center >= 3 ] { polygon-fill: #9ad363;}
#nbhdataaug[Rec_Center >= 4 ] { polygon-fill: #6eb43f;}

#recpt {
  [zoom <= 16] {point-file: url(maki/renders/park2-12.png);}
  [zoom >= 17] {point-file: url(maki/renders/park2-18.png);}
  [zoom >= 19] {point-file: url(maki/renders/park2-24.png);} 
}
*/

