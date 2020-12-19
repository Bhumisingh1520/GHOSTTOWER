var PLAY=1;
var END=0;
var gameState=PLAY;
var tower,towerImage;
var door,doorImage,doorGroup;
var porch,porchImage,porchGroup;
var ghost,ghostImage;
var invisibleBlock,invisibleBlockGroup;
var spooky;
var SURVIVALTIME=0;

function preload(){
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  porchImage = loadImage("climber.png");
  ghostImage = loadImage ("ghost-standing.png")
  spooky = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600)
  
  tower=createSprite(300,300,10,12);
  tower.addImage(towerImage)
  tower.velocityY=3;
  
  ghost=createSprite(300,300,10,12);
  ghost.addImage(ghostImage);
  ghost.scale=0.35;
  
  porchGroup = new Group();
  doorGroup = new Group();
  invisibleBlockGroup = new Group();
  
  //spooky.loop();
}

function draw(){
  background("black")
  
  if(gameState=== PLAY){
    
  
  
  if (tower.y>600){
    tower.y= 300; }
  
  if(keyDown("space")){
    ghost.velocityY=-3;
  }
  ghost.velocityY= ghost.velocityY+0.6;
  
  if(keyDown("right_arrow")){
    ghost.x= ghost.x+3  
  }
  
  if(keyDown("left_arrow")){
    ghost.x = ghost.x-3;
  }
  if(ghost.isTouching(porchGroup)){
    ghost.velocityY=0;
  }
  
  if(ghost.isTouching(invisibleBlockGroup)|| ghost.y>600) {
    ghost.destroy();
    gameState=END;}
  
  spawnDoor();
  
  drawSprites();  
  fill("white");
  SURVIVALTIME = SURVIVALTIME+1  
  text ("SURVIVALTIME:"+SURVIVALTIME,120,50) }
  
  else if(gameState===END){
    stroke("red");
    fill("yellow");
    strokeWeight(4);
    textSize(30);
    text ("GAMEOVER",200,250);  }
} 


function spawnDoor(){
  if(frameCount % 180===0 ){
  var randomnumber=Math.round(random(200,500))
  var door=createSprite(300,0,10,12);
  door.addImage(doorImage) 
  door.velocityY=3;  
  door.x= randomnumber;
  door.lifetime=600;
  doorGroup.add(door);  
    
    ghost.depth = door.depth+1;
    
  var porch=createSprite(300,0,10,12);
   porch.y=door.y+50; 
   porch.addImage(porchImage);
   porch.x=door.x;
   porch.lifetime=600;
   porch.velocityY=3; 
   porchGroup.add(porch) ;
    
   var invisibleBlock= createSprite(300,0,10,2);
   invisibleBlock.y = porch.y+10; 
   invisibleBlock.x = porch.x;
   invisibleBlock.lifetime=600;
   invisibleBlock.velocityY=3;
   // invisibleBlock.debug= true;
   invisibleBlock.width = porch.width ;
   invisibleBlock.visible= false; 
   invisibleBlockGroup.add(invisibleBlock) ;  
   }
  
}