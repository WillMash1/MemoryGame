const quiz = document.querySelector('.quiz');
const startBtn = document.querySelector('#startBtn');
const difficulty = document.querySelector('#difficulty');
const level1 = document.querySelector('#level1');
const level2 = document.querySelector('#level2');
const level3 = document.querySelector('#level3');
const novice = document.querySelector('#novice');
const formCheck = document.querySelectorAll('.form-check')
const increaseLevel = document.querySelector('#right');
const decreaseLevel = document.querySelector('#left');
const levelSelector = document.querySelector('.level-selector')
const levelSelectorDifficulty = document.querySelector('#level');
const quizSection = document.querySelector('.quiz')
let correctAnswers = 0;
let item = 1;

const streakDisplay = document.createElement('h2');

quiz.innerHTML = `
    <div class="quiz-quiz">
        <h2 class="instructions"> </h2>
        <div class="quiz-options"> </div>
    </div>
`;

const quizOptions = document.querySelector('.quiz-options');

let start = true;



increaseLevel.addEventListener('click', ()=> {
    
})


right.addEventListener('click', ()=> {
    if(levelSelectorDifficulty.innerText !== 'Hard') {
        levelSelectorDifficulty.classList.add('fadeOutAnimation') 
        setTimeout(()=> {
        
        
            if(levelSelectorDifficulty.innerText === 'Medium') {
    
                levelSelectorDifficulty.innerText = 'Hard'
            } else if(levelSelectorDifficulty.innerText === 'Easy') {
                levelSelectorDifficulty.innerText = 'Medium'
            }
        }, 250)
       
    
        setTimeout(()=> {
            levelSelectorDifficulty.classList.remove('fadeOutAnimation')
            
        }, 500)
    }
})

left.addEventListener('click', ()=> {
    if(levelSelectorDifficulty.innerText !== 'Easy') {
        levelSelectorDifficulty.classList.add('fadeOutAnimation') 
        setTimeout(()=> {
        
        
            if(levelSelectorDifficulty.innerText === 'Medium') {
                levelSelectorDifficulty.innerText = 'Easy'
            } else if(levelSelectorDifficulty.innerText === 'Hard') {
                levelSelectorDifficulty.innerText = 'Medium'
            }
        }, 250)
       
    
        setTimeout(()=> {
            levelSelectorDifficulty.classList.remove('fadeOutAnimation')
            
        }, 500)
    }
    
})

const allLevels = document.querySelectorAll('.form-check');

//Adds an event listener to each of the difficulty labels, i.e. if novice is clicked, change level1.disable = false, 
for(let i =0; i<allLevels.length;i++ ) {
    allLevels[i].addEventListener('click', ()=> {
        allLevels[0].classList.remove('chosen-level');
        allLevels[1].classList.remove('chosen-level');
        allLevels[2].classList.remove('chosen-level');
        allLevels[i].classList.add('chosen-level');
    })
}

// Function below uses a for loop to iterate over the labels, check for the label with the chosen level class added to it. Then return a number based on that
getLevel = ()=> {
    console.log(formCheck)
    console.log(formCheck[0])
    if((window.getComputedStyle(novice).display === 'none')) {
        console.log('Option one')
        if(levelSelectorDifficulty.innerText === 'Hard') {
            return 8
        } else if(levelSelectorDifficulty.innerText === 'Medium') {
            return 6
        } else {
            return 4
        }
    } else {
        console.log('Option two')
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
    
}

const ready = document.querySelector('.ready');

const startGame = function(){
    quizSection.style.height = '100vh'
    for(let i =0; i<allLevels.length;i++ ) {
        
            allLevels[i].classList.add('disableButton');
            
 
    }
    startBtn.classList.remove('active')
    startBtn.classList.add('inactive')
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
        button.outerHTML = `<button class="btn numberBtn inactive " id="btn${randArr[i]}" onClick="onNumSelected(${randArr[i]})" disabled > ${randArr[i]}  </button>`;
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
    quizSection.style.height = '100%'
    for(let i =0; i<allLevels.length;i++ ) {
        
            allLevels[i].classList.remove('disableButton');
          
       
    }
    startBtn.classList.add('active')
    startBtn.classList.remove('inactive')
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
    quizSection.style.height = '100%'
    for(let i =0; i<allLevels.length;i++ ) {
        
            allLevels[i].classList.remove('disableButton');
          
       
    }
    startBtn.classList.add('active')
    startBtn.classList.remove('inactive')
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