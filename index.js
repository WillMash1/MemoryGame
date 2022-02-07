const quiz = document.querySelector('.quiz');
const startBtn = document.querySelector('#startBtn');
const difficulty = document.querySelector('#difficulty');
const level1 = document.querySelector('#level1');
const level2 = document.querySelector('#level2');
const level3 = document.querySelector('#level3');

let correctAnswers = 0;
let item = 1;

const streakDisplay = document.createElement('h2');

quiz.innerHTML = `
    <div class="quiz-quiz">
        <h2> </h2>
        <div class="quiz-options"> </div>
    </div>
`;

const quizOptions = document.querySelector('.quiz-options');

let start = true;

const allLevels = document.querySelectorAll('.form-check');

//Add an event listener to each of the difficulty labels, if novice is clicked, change level1.disable = false, 
for(let i =0; i<allLevels.length;i++ ) {
    allLevels[i].addEventListener('click', ()=> {
        allLevels[0].classList.remove('chosen-level');
        allLevels[1].classList.remove('chosen-level');
        allLevels[2].classList.remove('chosen-level');
        allLevels[i].classList.add('chosen-level');
    })
}

//Add an event listener to each of the difficulty labels, when one is clicked add a chosen level clas, and remove that class from the other two
//Edit function below to use a for loop to iterate over the labels, check for the label with the chosen level class added to it. Then return a number based on that
getLevel = ()=> {
    
    let chosenLevel;
    for(let i=0;i<allLevels.length;i++) {
        if(allLevels[i].classList.contains('chosen-level')) {
           
            chosenLevel = allLevels[i].dataset.level
            
        }
        
    }

     console.log(`Chosen level ${chosenLevel}`);

     if(!chosenLevel) {
         return 4;
     }

    return chosenLevel;
}

const ready = document.querySelector('.ready');

const startGame = function(){
    ready.classList.add('disappear');
    quiz.classList.remove('disappear');
    level = getLevel();
    console.log(level);
    newArr = makeArray(level);
    randArr = shuffle(newArr);
    
    const h2 = document.querySelector('h2');
    h2.innerText = 'Memorise The Numbers';
    ready.innerText = '';
    
    quizOptions.innerHTML = '';
    for(let i = 0; i<level;i++){
        const button = document.createElement('Button');
        quizOptions.appendChild(button);
        button.outerHTML = `<button class="btn btn-dark mx-2 px-5 quiz-btn my-4" id="btn${randArr[i]}" onClick="onNumSelected(${randArr[i]})" disabled > ${randArr[i]}  </button>`;
        item++;
        console.log(i);
    }
}





startBtn.addEventListener('click', event => {
    startBtn.disabled = true;
    if(event){
        if(start) {
            startGame();
            hideNumbers();
        }
        start = false;
    }
})

ready.addEventListener('click', event => {
    startBtn.disabled = true;
    if(event){
        if(start) {
            
            startGame();
            hideNumbers();
        }
        start = false;
    }
})

function onNumSelected(btnNum) {
    level = getLevel();
    const id = `btn${btnNum}`;
    const currentBtn = document.querySelector(`#${id}`);
    checkAnswerImproved(parseInt(currentBtn.innerText), level);
}


const wins = document.querySelector('#wins');
let losingStreak = 0;
const youLose = () => {
    level = getLevel();
    streak = 0;
    wins.innerText = streak;
    correctAnswers = 0;
    for(let i = 1; i<= level;i++){
        const h2 = document.querySelector('h2');
        h2.innerText = 'Sorry You Lose! Try Again?'
        let currentBtn = document.querySelector(`#btn${i}`);
        currentBtn.classList.remove('text-hidden');
        currentBtn.disabled = true;
    }
    start = true;
    startBtn.disabled = false;
    quizOptions.innerHTML = `
    <div class="quiz-quiz">
        <div class="quiz-options"> </div>
    </div>
`;
}

//Change the title when the user wins and add a restart button for the user
let streak = 0;

const youWin = () => {
    correctAnswers = 0;
    streak++;
    wins.innerText = streak;
  //  quiz.appendChild(streakDisplay);
    console.log('You win!');
    const h2 = document.querySelector('h2');
    h2.innerText = 'You Win! Why not go for a streak?';
    quizOptions.innerHTML = `
    <div class="quiz-quiz">
        <div class="quiz-options"> </div>
    </div>
`;
start = true;
startBtn.disabled = false;
}