var PLAY = 1;
var END = 0;
var gameState = PLAY;
var runner, runner_running, runner_collided;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var bulletGroup;
var bulletGroup1;
var astroGroup;
var score=0;
var  restart;
var bgImg,bg,bgsound;
var bulletImg;
var ebulletImg;
var pause;
localStorage["HighestScore"] = 0;

function preload(){
    runner_running =   loadImage("images/batman.png");
    bulletImg = loadImage("images/b.png");
    ebulletImg = loadImage("images/astronats.png");
    obstacle1 = loadImage("images/spaceship.png");
    obstacle2 = loadImage("images/spaceship3.png");
    obstacle3 = loadImage("images/spaceship4.png");
    obstacle4 = loadImage("images/spaceship3.png");
    obstacle5 = loadImage("images/spaceship4.png");
    obstacle6 = loadImage("images/spaceship.png");
    restartImg = loadImage("images/restartimag.png");
    bgImg = loadImage("images/space.jpg");
    bgsound = loadSound("bgs.mp3");
}

function setup() {
    createCanvas(windowWidth-600,windowHeight/2);
    bg = createSprite(width/2,height/2,width,height);
    bg.addImage("background",bgImg);
    bg.velocityX = -5;
    bg.x = bg.width/2;

    runner = createSprite(100,height/2,20,50);
    runner.addAnimation("running", runner_running);
    runner.scale = 0.2;
    
    restart = createSprite(width/2,height/2);
    restart.addImage(restartImg);
    restart.scale = 0.2;
    restart.visible = false;
    
    obstaclesGroup = new Group();
    bulletGroup = new Group();
    bulletGroup1 = new Group();
    astroGroup= new Group();
    score = 0;
}

function draw() {
  background(bgImg);
 
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    bg.velocityX = -(6 + 3*score/100);
    runner.y=mouseY;
   
        if( bg.x < 0){
           bg.x =bg.width/2;
           bgsound.play();
        }
        if (keyDown("space")) {
            spawnBullet();
        }
        if (bulletGroup.isTouching(obstaclesGroup)) {
            obstaclesGroup.destroyEach();
            bulletGroup.destroyEach();
        }
   
   spawnObstacles();
   spawnEbullet();
   spawnAstro();

          if(obstaclesGroup.isTouching(runner)|| bulletGroup1.isTouching(runner)|| astroGroup.isTouching(runner)|| bulletGroup .isTouching(astroGroup)){
              gameState = END;
          }
  }

  else if (gameState === END) {
    restart.visible = true;
    bgsound.stop();
    bulletGroup.destroyEach();
    bulletGroup1.destroyEach();
    obstaclesGroup.destroyEach();
    astroGroup.destroyEach();
    runner.velocityY = 0;
    bg.velocityX = 0; 
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    
        if(mousePressedOver(restart)) {
              reset();
        }
  }
  
  drawSprites();

  textSize(25);
  stroke("red");
  strokeWeight(5);
  fill("white");
  text("SCORE: "+ score, width-200,25);
  textSize(25);
  text("HIGH SCORE: "+ localStorage["HighestScore"], 10,25);
    if(frameCount < 100){
         textSize(30);
         text("SAVE ASTRONAUTS AND KILL THE ALIENS", width/2-200,height/2);
    }
}

function spawnObstacles() {
  if(frameCount % 120 === 0) {
    var obstacle = createSprite(width,random(0,height-50),10,40);
    obstacle.velocityX = -(6 + 3*score/100);

    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
             
    obstacle.scale = 0.1;
    obstacle.lifetime = displayWidth-100/obstacle.velocityX;
    obstaclesGroup.add(obstacle);
  }
}


function spawnBullet() {
    var bullet= createSprite(100, 100, 5, 10);
    bullet.addImage(bulletImg);
    bullet.scale = 0.1
    bullet.y =  runner.y-10;
    bullet.x = runner.x+50;                                           
    bullet.velocityX = 40;
    bullet.lifetime = 1000;
    bulletGroup.add(bullet);
} 


function spawnEbullet() {
  if(frameCount % 90 === 0 && frameCount > 1000) {
        var bullet= createSprite(width,random(0,height-50), 20, 10);                                          
        bullet.shapeColor = "yellow";
        bullet.velocityX = -40;
        bullet.lifetime = 1000;
        bulletGroup1.add(bullet);
  } 
}


function spawnAstro() {
  if(frameCount % 150 === 0) {
      var astro= createSprite(width,random(0,height), 20, 10);
      astro.addImage(ebulletImg);                                          
      astro.velocityX =   -(6 + 3*score/100);
      astro.scale = 0.1;
      astro.lifetime = 1000;
      astroGroup.add(astro);
  } 
}

function reset(){
  gameState = PLAY;
  restart.visible = false;
  obstaclesGroup.destroyEach();
 
   if(localStorage["HighestScore"]<score){
       localStorage["HighestScore"] = score;
   }

  console.log(localStorage["HighestScore"]);
  text("HighestScore:"+localStorage["HighestScore"],500,100)
  score = 0;

}