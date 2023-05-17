const snake = document.getElementById("pixel1");
const gameContainer = document.getElementById("gameContainer");
const score = document.getElementById("score");

let row=1,column=1;
let foodItems = [];

let intervalId = setInterval(moveSnakeToRight,1000);

function moveSnakeToRight(){
  eatFood();
   let leftOffSet = column*10 +"px";
   snake.style.left = leftOffSet;
   column++;
   if(column===41){
    column=1;
    snake.style.left = "0px";
   }
}

function  moveSnakeToLeft(){
    eatFood();
    let leftOffSet = (column-1)*10 +"px";
    snake.style.left = leftOffSet;
    column--;
    if(column===-1){
        column=39;
        snake.style.left="390px";
    }
}

function moveSnakeToDown(){
  eatFood();
    let topOffSet = (row*10)+"px";
    snake.style.top = topOffSet;
    row++; 
    if(row===41){
      row=1;
      snake.style.top="0px";
    }
}

function moveSnakeToUp(){
    eatFood();
    let topOffSet = (row-1)*10+"px";
    snake.style.top = topOffSet;
    row--;
    if(row===-1){
      row=1;
      snake.style.top="0px";
    }
}

function getRandomOffset(){
    return Math.ceil(Math.random()*39)*10;
}

function eatFood(){
  // here i have array of food object
  // i have to iterate and check if row and column of snake is equal to food elements of foodItems
  // if it become equals then remove that food item from UI and foodIems also and increase score
  for(let i=0 ; i<foodItems.length ; i++){
    let foodItemLeftOffset,foodItemTopOffset,snakeLeftOffset,snakeTopOffset;
    let foodItem =foodItems[i];
    foodItemLeftOffset = foodItem.left;
    foodItemTopOffset = foodItem.top;
    
    snakeLeftOffset= (column-1)*10;
    snakeTopOffset=(row-1)*10;

    if(foodItemLeftOffset==snakeLeftOffset && foodItemTopOffset==snakeTopOffset){
      gameContainer.removeChild(document.getElementById(foodItem.id));
      score.innerText = parseInt(score.innerText)+10;
      foodItems = foodItems.filter((ele)=>{
        return ele.id != foodItem.id;
      });
    }
  }
}


// ArrowUp,ArrowLeft,ArrowDown,ArrowRight
document.addEventListener('keydown',(event)=>{
  let keyStroke = event.key;
  if(["ArrowUp","ArrowLeft","ArrowDown","ArrowRight" ].includes(keyStroke)){
    clearInterval(intervalId);
  }
    if(keyStroke === "ArrowRight"){
      intervalId = setInterval(moveSnakeToRight,1000);
    }
    else if(keyStroke==="ArrowLeft"){
      intervalId = setInterval(moveSnakeToLeft,1000)
    }
    else if(keyStroke==="ArrowDown"){
      intervalId = setInterval(moveSnakeToDown,1000)
    }
    else if(keyStroke==="ArrowUp"){
      intervalId = setInterval(moveSnakeToUp,1000)
    }
});

/* <div id="pixel0" class="food"></div> */
// creating food
for(let i=1 ; i<=1 ; i++){
  const foodItem = document.createElement("div");
  let id = "pixel"+(1+i);
  foodItem.id = id;  
  foodItem.className="food";
  let left = getRandomOffset();  //0-390
  let top = getRandomOffset();
  foodItem.style.left = left+"px";
  foodItem.style.top = top+"px";
  let foodObj = {
    id:id,
    left:left,
    top:top
  };
  foodItems.push(foodObj);
  // console.log(foodItem);
  gameContainer.appendChild(foodItem);
}


