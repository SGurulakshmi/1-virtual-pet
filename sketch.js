//Creating variables here
var dog;
var sidogImage;
var stdogImage;
var database; 
var foodS;
var foodStock;

function preload()
{
//loading images here
  sidogImage = loadImage("images/dogsit.png");
  stdogImage = loadImage("images/dogstand.png");
}

function setup() 
{
  createCanvas(500, 500);
  
  database = firebase.database();

  dog = createSprite(280,300);
  dog.addImage(sidogImage);
  dog.scale = 0.4

  foodStock = database.ref("food");
  foodStock.on("value",readStock);
 

}

function draw() {  

  background("lightBlue")
  drawSprites();
  textSize(20);
  fill("blue");
  text("Note - Press Up arow to feed milk for the PUPPY",50,50);
  text("Food Remaining:"+ foodS,150,150);
  // if(foodS!== undefined)
  // {
    
  // }
// key commands
  if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage(stdogImage);
  }
  else
  {
   dog.addImage(sidogImage);
   }
//restoring foods
  if(foodS === 0)
  {
    foodS = 20;
  }
  
  //add styles here

}
//function to read from the database
function readStock(data)
{
      foodS = data.val();
}
//function to write from the database
function writeStock(x)
{

  if(x<=0){
    x = 0;
  }
  else {
    x = x - 1;
  }

  database.ref('/').update({
    food : x
  })

}

