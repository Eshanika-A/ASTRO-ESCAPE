var astro, A1, A2, form, formImg, next, nextImg;
var restart, gameoverImg, bg, gameover, restartImg;
var bgImage, wall1, wall2, bgImage2;
var ob1,ob2, ob3, ob4, ob1Img, ob2Img, ob3Img, ob4Img;
var obstaclesGroup, obstacle1;
var START = 0;
var PLAY = 1;
var END = 2;
var WIN=3;
var score=0;
var gameState = START;
var energy, E1;
var points=0;
var earth, earthImg;
var lives = 3;
var HighScore;
localStorage["HighScore"] = 0;


function preload(){
   formImg = loadImage("Form.jpg");
   nextImg = loadImage("next.png");
   bgImage = loadImage("bg mars.jpg");
   A1 = loadImage("astro1.png");
   A2 = loadImage("astro2.png");
   gameoverImg = loadImage("gameOver.png");
   restartImg = loadImage("restart.png");
   ob1Img = loadImage("ob1.png");
   ob2Img = loadImage("ob2.png");
   ob3Img = loadImage("ob3.png");
   ob4Img = loadImage("ob4.png");
   bgImage2 = loadImage("bg1.jpg");
   earthImg = loadImage("earth.png");
   E1 = loadImage("energy2.png");
}

function setup() {
createCanvas(windowWidth,windowHeight);

form = createSprite(width/2,height/2,windowWidth,windowHeight);
form.addImage(formImg);
form.scale = 0.45;
// form.visible = false;

next = createSprite(850,430,10,10);
next.addImage(nextImg);
next.scale = 0.4;
// next.visible = false;

bg = createSprite(width/2,height/2,windowWidth,windowHeight);
bg.addImage(bgImage);
bg.visible = false;

earth=createSprite(900,400,50,50);
earth.visible= false;
earth.addImage(earthImg);

wall1 = createSprite(500,height-1,windowWidth,1);
//wall1.visible = false;
wall2 = createSprite(500,0,windowWidth,1);
//wall2.visible = false;

astro = createSprite(100,height-200,20,30);
astro.addImage(A1);
astro.scale = 0.25;
astro.setCollider("rectangle",0,0,10,astro.height -200);
//astro.debug=true;


 gameover  = createSprite(width/2,height/2);
 gameover.addImage(gameoverImg);
 gameover.scale = 0.5;
 gameover.visible = false;

 restart = createSprite(width/2,height-220);
 restart.addImage(restartImg);
 restart.scale = 0.09;
 restart.visible = false;

 obstaclesGroup = new Group();
 energyGroup = new Group();
 


}

function draw() {
background("skyblue");

if (gameState=== START){
  astro.visible = false;
  form.visible= true;
  next.visible= true;
  
  // if(keyDown("S")){
  //   gameState=PLAY;
  // }
  if(mousePressedOver(next)) {
    gameState=PLAY
  }
}

else if (gameState === PLAY){
astro.visible = true;
bg.visible = true;
bg.velocityX=-4
 if(bg.x<450) {
 bg.x=500
 }

 if(score >= 50){
  bg.addImage(bgImage2);
  }

  if(score <= 1){
    astro.velocityY=0;
    }

 if(astro.isTouching(wall1)){
  gameState = END;
  gameover.visible = true;
  restart.visible = true;
 }

 if(astro.isTouching(wall2)){
  gameState = END;
  gameover.visible = true;
  restart.visible = true;
 }

if(touches.length>0 || keyDown("space")) {
  astro.velocityY = -5.5; 
  touches = []
}
  astro.velocityY = astro.velocityY + 0.25;

  score = score + Math.round(getFrameRate()/20);
  console.log("score")

 

  if(obstaclesGroup.isTouching(astro)){
    gameState = END;
  }

  if(energyGroup.isTouching(astro)){
   points = points+ 10;
    energyGroup.destroyEach();
    
  }

  if(score >= 100){
    earth.visible= true;
    earth.velocityX=-3
//     if(keyDown("right")) {
//      astro.velocityX=3;
//  }
     if(astro.isTouching(earth)){
       gameState = WIN;
     }
   }
   if(lives<=0){
      gameState=START;
      bg.addImage(bgImage);
      bg.visible = false;
      earth.visible = false;
      score=0;
      lives=3;
     }
   

  spawnObstacles();
  spawnEnergy();

  

}

else if(gameState === END){
  bg.velocityX = 0;
  earth.velocityX=0;
  earth.visible = false;
  gameover.visible = true;
  restart.visible = true;
  astro.velocityY = 0; 
  astro.addImage(A2);
  bg.addImage(bgImage2);
  astro.scale= 0.25;
  obstaclesGroup.destroyEach();
  energyGroup.destroyEach();
  obstaclesGroup.setLifetimeEach(-1);
  energyGroup.setLifetimeEach(-1);
  bg.visible = true;
  astro.visible = true;
  //astro.velocityX=0;
  

  if(mousePressedOver(restart)) {
    obstaclesGroup.destroyEach();
    restart.visible = false;
    gameover.visible = false;
    astro.addImage(A1);
    bg.addImage(bgImage2);
   //score = 0;
    //points = 0;
    gameState = PLAY;
    astro.y = 170;
    lives= lives-1;
    
}

// if(touches.length>0|| keyDown("space")) {  
//   touches = []
// }
  
}

else if (gameState === WIN) {
  bg.velocityX = 0;
  earth.velocityX=0;
  earth.visible = false;
  obstaclesGroup.destroyEach();
  energyGroup.destroyEach();
  obstaclesGroup.setLifetimeEach(-1);
  energyGroup.setLifetimeEach(-1);
  astro.velocityY = 0; 
  astro.y = 170;
  gameover.visible = false;
  restart.visible = false;

}




drawSprites(); 

if(gameState === PLAY || gameState === END || gameState === WIN){
  textSize(17);
  stroke("violet");
  fill("lightpink")
  text("Score: "+ score,850,60);
  text("Energy Level: "+points,850,30);
  text("Lives: "+lives,850,90);
 
  if(localStorage["HighScore"] < score){
    localStorage["HighScore"] = score;
    HighScore = localStorage["HighScore"]
  
  }
  text("HighScore: " + Math.round(HighScore), 100, 30);

}

  if(gameState === WIN){
    textSize(30);
    stroke("white");
    fill("red");
    text("Congragulations! You win the game!", 300,250);
   }
   
   
  
}

function spawnObstacles(){
    if (frameCount%120 === 0){
      
      var  obstacle = createSprite(camera.position.x+400,350,50,50);
      obstacle.velocityX = -(6 + 3*score/100); 
      obstacle.y=Math.round(random(90,height-150));
   
      var rand = Math.round(random(1,4));
      switch(rand) {
        case 1: obstacle.addImage(ob1Img);
                obstacle.scale = 0.3;
                break;
        case 2: obstacle.addImage(ob2Img);
                obstacle.scale = 0.12;
                break;
        case 3: obstacle.addImage(ob3Img);
                obstacle.scale = 0.3;  
                break;
        case 4: obstacle.addImage(ob4Img);
               obstacle.scale = 0.3;
                break;
        default: break;
      }
      obstacle.lifetime = 300;
      obstaclesGroup.add(obstacle);
        
    }
}

function spawnEnergy() {
  if(frameCount % 1000=== 0) {

    var energy = createSprite(camera.position.x+700,150,10,10);
    energy.addImage(E1);
    energy.velocityX = -5
    energy.y= Math.round(random(50,300));
    energy.scale = 0.09;    
    energy.lifetime = 300;
    energyGroup.add(energy);
    
  }
}

