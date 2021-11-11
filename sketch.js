var bg;
var boyimg,boyrunning,boy;
var tiger,fox, trunning, foxrunning,foxCollided,tigercollided,plantcollided;
var plant;
var animalgroup;
var gameState = "play";
var score = 0;
var invisiblegrd;


function preload(){
 bg = loadImage("background4.jpg");
 boyimg = loadAnimation("boy1.png");
boyrunning = loadAnimation("boy1.png","boy2.png","boy3.png");
boycollided = loadAnimation("boy2.png");
tiger= loadAnimation("tiger1.png","tiger2.png","tiger3.png");
tigercollided = loadAnimation("tiger1.png");
fox = loadAnimation("fox1.png","fox2.png","fox3.png");
foxCollided = loadAnimation("fox1.png");
plant = loadAnimation("plant1.png","plant2.png","plant3.png");
plantCollided = loadAnimation("plant1.png");
}


function setup() {
  createCanvas(windowWidth,windowHeight);
  ground = createSprite(windowWidth/2,windowHeight/2,width*2,height*2);
  ground.addImage(bg);
  ground.scale = 3.0;
  ground.velocityX = -2;

 
  
  boy = createSprite(110, height-250, 50, 60);
  boy.scale = 0.6;
  boy.addAnimation("running",boyrunning);
  boy.addAnimation("collided",boycollided);
  //boy.debug = true;
  boy.setCollider("rectangle",0,0,30,boy.height);
  
  animalgroup = new Group();
  invisiblegrd = createSprite(windowWidth/2,height-140,width*2,3);
  invisiblegrd.visible = false;


}

function draw() {
  background("black"); 
  textSize(60);
  fill("red");
  text("SCORE = "+score,300,60);
  console.log(score);
  boy.collide(invisiblegrd);

  if(gameState==="play"){
    ground.velocityX = -(8+ score/500);
    if(ground.x<0){
      ground.x = windowWidth/2;
    }
    
    if(keyDown("space")){
      boy.velocityY = -10;
      
    }
    boy.velocityY = boy.velocityY + 1;
    score = score+ Math.round(getFrameRate()/60);


    animals();
    
    if(animalgroup.isTouching(boy)){
      gameState = "end";
    }
   
}
else if (gameState === "end") {
  //gameOver.visible = true;
  //restart.visible = true;
  
  //set velcity of each game object to 0
  ground.velocityX = 0;
  boy.velocityY = 0;
  animalgroup.setVelocityXEach(0);
  
  //change the trex animation
  boy.changeAnimation("collided",boycollided);
  tiger.changeAnimation("tcollided",tigercollided);
  fox.changeAnimation("fcollided",foxCollided);
  plant.changeAnimation("pcollided",plantcollided);
  
  //set lifetime of the game objects so that they are never destroyed
  animalgroup.setLifetimeEach(-1);
  
 // if(mousePressedOver(restart)) {
 //   reset();
 // }
}
 // }
//  else {
   // text("GAME OVER",windowWidth/2-50,windowHeight/2);
  //   boy.changeAnimation("standing",boyimg);
  //   animalgroup.setVelocityXEach(0);
  //   ground.velocityX = 0;
  // }
  
  
   drawSprites();

}
function animals(){
  if(frameCount%400 === 0){
    var animal = createSprite(width,height-170,50,60);
    
    animal.addAnimation("tiger", tiger);
    animal.addAnimation("fox", fox);
    animal.addAnimation("plant", plant);
    animal.addAnimation("tcollided", tigercollided);
    animal.addAnimation("fcollided", foxCollided);
    animal.addAnimation("pcollided", plantcollided);
  
  
  
    animal.velocityX = -(8+ score/500);

    var rand = Math.round(random(1,3));
    
    switch(rand) {
      case 1: animal.changeAnimation("tiger",tiger);
              animal.scale= 0.4;
              console.log(rand);
              break;
      case 2: animal.changeAnimation("fox",fox);
              animal.scale = 1.3;
              console.log(rand);
              break;
      case 3: animal.changeAnimation("plant",plant);
              animal.scale = 0.5;
              console.log(rand);
              break;
      default: break;
    }
    animal.lifetime= windowWidth/2;
    animalgroup.add(animal);
  }}
  
  function reset(){
    gameState = "play";
   // gameOver.visible = false;
   // restart.visible = false;
    
    animalgroup.destroyEach();
    
    boy.changeAnimation("running",boyrunning);
    
   
    
    score = 0;
    
  }

  