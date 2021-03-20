var database ,dog,dog1,dog2
var position
//var form
var feed,add
var foodobject
var Feedtime
var Lastfeed


function preload()

{
  dogimg1 = loadImage("dogImg.png")
  dogimg2 = loadImage("dogImg1.png")
}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();
  console.log(database);
 
  foodobject = new Food()
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.2
 
  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);
  feed = createButton("FEED ROSHIK")
  feed.position(500,15)
  feed.mousePressed(FeedDog)
  add = createButton("ADD FOOD")
  add.position(400,15)
  add.mousePressed(AddFood)

} 

function draw(){
 background(46,139,87);

 foodobject.display()
 
 drawSprites();
  
 fill(255,255,254);
 textSize(15);

drawSprites();
}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
}

function showError(){
  console.log("Error");
}

function writePosition(i){
  if(i>0){
    i=i-1
  }
  else{
    i=0
  }
  database.ref('/').set({
    'Food': i
  })

}
function AddFood(){
position++

database.ref('/').update({
  Food:position
}

)
}
function FeedDog(){

dog.addImage(dogimg2)
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
 })
}


