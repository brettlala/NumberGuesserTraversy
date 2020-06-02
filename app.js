
//Game Values
let min = 1,
    max = 10,
    winningNum = getWinningNum(min, max),
    guessesLeft = 3;

//UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

//Play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
})

//Assign UI min & max
minNum.textContent = min;
maxNum.textContent = max;

//Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

//Validate
if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
}

//Check if won
if(guess === winningNum){
    gameOver(true, `${winningNum} is correct, YOU WIN!`);
} else {
    //Wrong number
    guessesLeft -= 1;

    if(guessesLeft === 0){
        //Game over -lost
        gameOver(false, `Game OVER, you lost. The correct number was ${winningNum}`)
    } else{
        //Game continues - answer wrong
        //Change border color
        guessInput.style.borderColor = 'red';
        //Tell user the answer is wrong and notify of remaining guesses
        setMessage(`${guess} was not correct you have ${guessesLeft} guesses left`, 'red');
        //Clear input
        guessInput.value = '';
    }
}
});

//Game over
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';
    //Disable input
    guessInput.disabled = true;
    //Change border & text color
    guessInput.style.borderColor = color;
    message.style.color = color;
    //Set message 
    setMessage(msg);
    //Play again?
    guessBtn.value = 'Play Again?';
    guessBtn.className += 'play-again';
}

//Set message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}

//Set winning number
function getWinningNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}