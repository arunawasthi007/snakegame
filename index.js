//game constants and variables
let inputDir ={x:0 , y:0};
const foodSound= new Audio("food.wav");
const gameoversound=new Audio("gameover.wav");
const movesound = new Audio("move.wav");
const music= new Audio("music.wav");
let speed =5;
let score = 0;
let lastPaintTime=0;
let snakeArr = [
    { x: 13, y: 15}
]
food = {x:6, y:7};


//game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000<1/speed) 
    {
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
    
}
function isCollide(snake){
   // if you collide with your self
   for(let i =1; i< snakeArr.length;i++)
   {
    if(snakeArr[i].x === snake[0].x&&snakeArr[i].y === snake[0].y){
        return true;
    }
}
   //if you collide to wall
    if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >=18 || snake[0].y <= 0)
    {
        return true;
    }
   
}

function gameEngine(){
    //part 1: updateing the snake array &food;
    if(isCollide(snakeArr)){
        gameoverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("game over. press any key to play again!");
        snakeArr= [{x:13 , y:15}];
        musicSound.play();
        score =0;

    }

    //if you have eaten the food , increament the score and regenerate the food;
    if(snakeArr[0].y == food.y &&snakeArr[0].x ==food.x){
        foodSound.play();
        score+= 1;
        if(score>hiscoreval){
            hiscoreval = score;
        localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
        hiscoreBox.innerHTML = " Best Score: "+hiscore;
        }
        scoreBox.innerHTML = "Score: "+score;
        snakeArr.unshift({x: snakeArr[0].x+inputDir.x , y : snakeArr[0].y+inputDir.y});
        let a=2;
        let b=16;
        food={x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())};

    }
    //moving the snake
    for(let i=snakeArr.length - 2 ;i >=0 ;i--){
        //const element =array[i];
        snakeArr[i+1]= {...snakeArr[i]};

    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //part 2: display the snake and food;
    //display the snake
    board.innerHTML ="";
    snakeArr.forEach((e, index)=>{
        
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart =e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(index == 0){
            snakeElement.classList.add('head');
        }
        else
        {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //dispay the food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart =food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
        


}



















//main logic start here
let hiscore= localStorage.getItem("hiscore");
if(hiscore ===null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))  
}
else{
    hiscoreval =JSON.parse(hiscore);
    hiscoreBox.innerHTML = " Best Score: " + hiscoreval;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDir = { x:0, y:1}  //start the game
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("arrowUp");
            inputDir.x= 0;
            inputDir.y= -1;
            break;
        case "ArrowDown":
            console.log("arrowDown");
            inputDir.x= 0;
            inputDir.y= 1;
            break;
        
        case "ArrowLeft":
            console.log("arrowLeft");
            inputDir.x= -1;
            inputDir.y= 0;
            break;

        case "ArrowRight":
            console.log("arrowRight");
            inputDir.x= 1;
            inputDir.y= 0;
            break;

        default:
        break;
    }
})