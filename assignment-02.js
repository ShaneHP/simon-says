/*Shane Hyland Pierce*/
/*18409052*/
/*Works on Google Chrome*/
/*Used for reference: https://www.youtube.com/watch?v=n_ec3eowFLQ*/

let turn;   //turn counter   
let timer;  //timeout id checking if player has not hit signal for 5 seconds
let flash;  //keeps track on which index of the flashArray the ai is at
let correct;  //keeps track of if the player hit the right signal
let aiRound;  //checks if it's the ai's turn
let intervalId; //interval id for setting time between flashes
let active = false; //keeps track of when player is allowed/not allowed to hit buttons
let flashArray = []; //array filled with sequence of flashes
let playerArray = []; //array filled with sequence of buttons player has pressed

//declaring elements that have attributes we wish to change
const currentScore = document.getElementById("rightCount");
const highScore = document.getElementById("leftCount");
const green = document.getElementById("green");
const red = document.getElementById("red");
const blue = document.getElementById("blue");
const yellow = document.getElementById("yellow");
const startButton = document.getElementById("buttonA");
const light = document.getElementById("smallCircle");

//event listener to detect when the start button gets clicked
startButton.addEventListener('click', (event) => {
   light.style.background = "green";  //change small light to green
   setTimeout(() => {     //3 seconds after click, call play function to begin the game
        play();
      },1000);
});

function start(){     //function that gets called to reset the game when a player loses
  light.style.background = "red";   
  flashArray = [];  
  playerArray = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  currentScore.value = "00";
  correct = true;
}

function play(){    //function that begins the game 
  flashArray = [];  //set flash array to empty array
  playerArray = []; //set player array to empty array
  flash = 0;    
  intervalId = 0;
  turn = 1;   //start at turn 1
  currentScore.value = 1;   //set value in current score box to 1
  correct = true;     
  flashArray.push(Math.floor(Math.random()*4)+1);   //push random value between 1 and 4 onto the sequence of flashes array 
  aiRound = true;   //set ai to go first
  intervalId = setInterval(game, 800);  //call game function every 800ms until the interval is cleared
}

function game(){    
  active = false;   //disallow player to click color buttons during the ai's turn
  
  if (flash == turn){   //if the ai has flashed its last signal let the player play
    clearInterval(intervalId);  //clear interval that calls game function
    aiRound = false;    
    originalColor();    
    active = true;    //let the player click color buttons
    timer = setTimeout(() => {    //if player doesn't click a button in 5 seconds they lose
      outOfTime();
    }, 5000);
    
  }
  
  if(aiRound){    //if it is the ai's turn
    originalColor(); //set button of color from bright to original creating flash effect
    setTimeout(() => {
      /*these if statements check which number is in the flash array at the 
      flash index and based on that number run the function to light up a specific button*/
      if (flashArray[flash] == 1){    
        one(); 
        }
      if (flashArray[flash] == 2){
        two(); 
        }
      if (flashArray[flash] == 3){
        three(); 
        }
      if (flashArray[flash] == 4){
        four(); 
        }
      flash++;  //increment flash to allow the array to get bigger
      /*push another random number between 1 and 4 onto the array after each
      round to allow the sequence to increase by 1 each time*/
      flashArray.push(Math.floor(Math.random()*4)+1); 
    },200);
  }
}
/*these functions change the color of the buttons from original color to 
a brighter color*/
function one() {
  green.style.background = "#AFF684";
}

function two() {
  red.style.background = "#F68D84";
}

function three() {
  blue.style.background = "#84CDF6";
}

function four() {
  yellow.style.background = "#EFF684";
}
/*changes all buttons to original color at once*/
function originalColor(){
  green.style.background = "#286D05";
  red.style.background = "#F01010";
  blue.style.background = "#001EE2";
  yellow.style.background = "#D5CB09";
}
/*changes all buttons to bright color at once*/
function brightColor(){
    green.style.background = "#AFF684";
    red.style.background = "#F68D84";
    blue.style.background = "#84CDF6";
    yellow.style.background = "#EFF684";
}

/*the following functions are called when one of the colored buttons is clicked*/

green.addEventListener('click', (event) => {
  if(active){   //if it is the players turn
    playerArray.push(1);   //push 1 into the players array as 1 is the number in the flash array which makes the green button light up
    check();  //check function checks if player was correct
    one();  //make the clicked button flash
    if(correct){
      setTimeout(() => {    //after 200ms set the color of the clicked button back to normal
          originalColor();
        },200)
    }
  }
});

red.addEventListener('click', (event) => {
  if(active){
    playerArray.push(2);
    check();
    two();
     if(correct){
        setTimeout(() => {
          originalColor();
        },200)
    }
  }
});

blue.addEventListener('click', (event) => {
  if(active){
    playerArray.push(3);
    check();
    three();
     if(correct){
      setTimeout(() => {
        originalColor();
      },200)
    }
  }
});

yellow.addEventListener('click', (event) => {
  if(active){
    playerArray.push(4);
    check();
    four();
     if(correct){
      setTimeout(() => {
        originalColor();
      },200)
    }
  }
});


function outOfTime(){   //function to reset game if a signal has not been clicked in 5 seconds
  active = false;     //player is no longer playing
    if(currentScore.value > highScore.value){   //set high score value equal to score of current game if it is bigger than previous high score
      highScore.value = currentScore.value;
    }
    
    /*timeouts which make the buttons flash 5 times
    when player loses (attempted to shorten code by adding for loop but 
      could not get this to work)*/
    brightColor();
    setTimeout(() => {
      originalColor();
    }, 400);
    setTimeout(() => {
      brightColor();
    }, 800);
    setTimeout(() => {
      originalColor();
    }, 1200);
    setTimeout(() => {
      brightColor();
    }, 1600);
    setTimeout(() => {
      originalColor();
    }, 2000);
    setTimeout(() => {
      brightColor();
    }, 2400);
    setTimeout(() => {
      originalColor();
    }, 2800);
    setTimeout(() => {
      brightColor();
    }, 3200);
    setTimeout(() => {
      start();
      originalColor();
    }, 3600);
  console.log("out of time");
}

/*This function is called everytime a color button is pressed 
and checks if the player has clicked the correct button*/
function check(){
clearTimeout(timer);  //reset the 5 second timer as a button has just been pressed 
timer = setTimeout(() => {  //start the 5 second timer again
  outOfTime();
}, 5000);

/*checks if the button just clicked matches up with the sequence by comparing
the player array at the last index with the flash array at the last index*/
if(playerArray[playerArray.length - 1] != flashArray[playerArray.length - 1]){ 
    correct = false;    //sets correct to false if they do no match
}

if(correct == false){     //if the player has clicked the wrong button
    clearTimeout(timer);  //stop the timer
    active = false;       //don't allow players to click anymore buttons
    if(currentScore.value > highScore.value){
      highScore.value = currentScore.value;
    }
    brightColor();
    setTimeout(() => {
      originalColor();
    }, 400);
    setTimeout(() => {
      brightColor();
    }, 800);
    setTimeout(() => {
      originalColor();
    }, 1200);
    setTimeout(() => {
      brightColor();
    }, 1600);
    setTimeout(() => {
      originalColor();
    }, 2000);
    setTimeout(() => {
      brightColor();
    }, 2400);
    setTimeout(() => {
      originalColor();
    }, 2800);
    setTimeout(() => {
      brightColor();
    }, 3200);
    setTimeout(() => {
      start();
      originalColor();
    }, 3600);
  }
  
  /*checks if the player has clicked the last button in the sequence correctly*/
  if(turn == playerArray.length && correct){
    clearTimeout(timer);
    turn++;     //increment turn to go to next round
    playerArray = [];   //reset the array that tracks the player's button presses
    aiRound = true;   //changes from player's turn to the ai's turn
    flash = 0;    //put this to zero so the ai can show the entire sequence from the beginning 
    currentScore.value = turn;    //display the current score in the right text box

    /*speed up the game after the 5th, 9th and 13th round*/
    if(turn < 6){
        intervalId = setInterval(game, 800);
      }
    else if(turn >= 6 && turn < 10){
      intervalId = setInterval(game, 600);
    }
    else if(turn >= 10 && turn < 14){
      intervalId = setInterval(game, 450);
    }
    else{
      intervalId = setInterval(game, 350);
    }
  }
}






