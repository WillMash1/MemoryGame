//create a timer
// Create a function with a for loop
// inside the for loop have a setTimeout of 1 second and have a variable decrease by 1 for each loop
// if the varibale strated at 10 then it would count down for ten seconds
//When the variable gets to zero have the game progress




//shuffles the contents of an array
const shuffle =  function(a) {
for (let i = a.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (a.length));
       [a[i], a[j]] = [a[j], a[i]];
   }
   return a;
}


//Makes an array of a given length
const makeArray = function (num) {
    let array = [];
    for(let i = 0; i<num;i++){
        array[i] = i+1;
    }
    return array;
}

//Hide the numbers but not the buttons after a certain amount of time is passed
//also changes the h1 text to 'Test Your Memory'
const hideNumbers = ()=> {
    const h2 = document.querySelector('h2');
    level = getLevel();
    console.log('Ready?')
    let time = 3000
    if(level===6){
        time = 6000;
    } else if(level===8) {
        time = 10000;

    }  else {
        time = 3000;
    }

    setTimeout( ()=> {
        console.log('Begin!')
        for(let i = 1; i<= level;i++){
            console.log(level)
            console.log(`#btn${i}`)
            h2.innerText = 'Click from lowest to highest';
            let currentBtn = document.querySelector(`#btn${i}`);
            currentBtn.classList.add('text-hidden');
            currentBtn.classList.add('text-hidden:hover');
            currentBtn.disabled = false;
        }
    }, time);
}


//check if the value of the button pressed is 1 higher than the current correct answers
//Correct answer starts at 0, so if at this point the user picks the button with value 1, it will be the correct answer
checkAnswerImproved = (buttonPressed, level)=> {
    const button = document.querySelector(`#btn${buttonPressed}`);    
    if(buttonPressed===correctAnswers+1) {
        button.disabled = true;
        button.classList.remove('text-hidden');
        correctAnswers++;
        if(correctAnswers==level){
            youWin();
        }
        return true;
    } else {
        youLose();
        return false;
    }
}