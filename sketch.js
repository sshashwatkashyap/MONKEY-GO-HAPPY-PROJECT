
var monkey , monkey_running;

var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;

var ground;

var survivalTime = 0;

function preload(){
  
monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(400, 400);

  monkey = createSprite(50, 365, 10, 10);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  //monkey.debug=true;
    
  ground = createSprite(300, 400, 600, 15);
  ground.velocityX = -3;
    
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
}


function draw() {
  
  background("white");
  
  monkey.collide(ground);
   
  stroke("black");
  fill("black");
  textSize(20);
  survivalTime = Math.ceil( frameCount / frameRate() );
  text(" Survival Time: " + survivalTime, 200, 25)
  
  if(ground.x < 300){
    
    ground.x = ground.width/2;

  }  
  
  if(keyDown("space")&& monkey.y >=361) {
        monkey.velocityY = -15;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  if(obstacleGroup.isTouching(monkey)){
     
     textSize(25);
     text(" GAMEOVER " , 150, 100);
     
     ground.velocityX = 0;
     monkey.velocityY = 0;
      
     
     //set lifetime of the game objects so that they are never                  destroyed
     obstacleGroup.setLifetimeEach(-1);
     FoodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);    
    
}
  
  spawnBanana();
  spawnObstacle();
  
  drawSprites();
  
}

function spawnBanana() {
  
  //write code here to spawn the clouds
 if (frameCount % 60 === 0) {
   
    var Banana = createSprite(405,20,40,10);
    Banana.y = Math.round(random(150,350));
    Banana.addImage(bananaImage);
    Banana.scale = 0.1;
    Banana.velocityX = -3;
    
     //assign lifetime to the variable
    Banana.lifetime = 200;
    
    //add each cloud to the group
    FoodGroup.add(Banana);
  }
  
}

function spawnObstacle() {
  
  //write code here to spawn the clouds
  if (frameCount % 150 === 0) {
    
    var Obstacle = createSprite(400,385,2,2);
    Obstacle.addImage(obstacleImage);
    Obstacle.scale = 0.15;
    Obstacle.velocityX = -3;
   // Obstacle.debug=true;
    Obstacle.setCollider("rectangle", 0, 0, 250, 400);
    
     //assign lifetime to the variable
    Obstacle.lifetime = 210;
    
    obstacleGroup.add(Obstacle);
    
  }
  
}