var dog,sadDog,happyDog, database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;
var Garden, Bedroom, Washroom;
var currentTime;
var backgroundImg;
var bg = "Garden.png";

function preload(){
sadDog=loadImage("dogImg.png");
happyDog=loadImage("dogImg1.png");
Garden=loadImage("Garden.png");
Bedroom=loadImage("Bed Room.png");
Washroom=loadImage("Wash Room.png");
getBackgroundImg()
}

function setup() {
  database=firebase.database();
  createCanvas(550,500);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(250,400,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  feed=createButton("Feed the dog");
  feed.position(500,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(600,95);
  addFood.mousePressed(addFoods);

}

function draw() {

  background(backgroundImg)
  // background("green");

  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}
function getBackgroundImg(){
  currentTime = hour();
  if(currentTime==(lastFed+1)){
    bg = Garden
  }else if(currentTime==(lastFed+2)){
    bg = Bedroom
  }else if(currentTime==(lastFed+3)){
    bg = Washroom
  }
  backgroundImg = loadImage(bg);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

// function garden(){
//   background("green")
// }

// function bedroom(){
//   background(Bedroom)
// }

// function washroom(){
//   background(Washroom)
// }