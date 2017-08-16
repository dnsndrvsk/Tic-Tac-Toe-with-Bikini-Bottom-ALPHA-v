'use strict';

var AutoTurnSave,
    turn = 1,
    turnsCounter = 0,
    isAutoTurnFinished = true,
    tds = document.querySelectorAll('td'),
    infoBox = document.querySelector('.game-info'),
    restartBtn = document.querySelector('.game-restart'),
    nextBtn = document.querySelector('.game-next'),
    reloadBtn = document.querySelector('.game-scratch'),
    improveBtn = document.querySelector('.game-improve'), 
    playersNames = [],
    playersColors = [],
    playerPhrases = {},
    currentLevel = 1,
    previousLevel = currentLevel,
    isDiffChosen = false,
    character,
    fixedCharName,
    gameLives,
    time,
    music = new Audio();

helper.playMusic();

helper.chooseDifficulty();



/************************************
*************EVENT SOUNDS************
*************************************/
var clickSound = new Audio('sounds/click.mp3');
var winSound = new Audio('sounds/applause.mp3');
var loseSound = new Audio('sounds/sympathy.mp3');
var matchedSound = new Audio('sounds/matched.mp3');
var btnPressSound = new Audio('sounds/btn_press.mp3');
var endGameSound = new Audio('sounds/end_game.mp3');
var drawSound = new Audio('sounds/draw.mp3');
/************************************
*************EVENT SOUNDS************
*************************************/


// Our data
var loadedCharsData;

// Returns object loadedCharsData
function getCharsData() {
  var xhr = new XMLHttpRequest();
  
  xhr.open('GET', 'data/charData.json');
  
  xhr.onload = function(e) {
    var rawData = e.target.response;
    var loadedData = JSON.parse(rawData);
    
    if ( xhr.readyState === 4 ) {
      dataHandler.updateCharsData(loadedData);
      loadedCharsData = loadedData;
      
      helper.changePlayerName();

      helper.updateLvlInfo();

      character.changeMood('wait');
      character.say('wait');
    }
  };
  
  xhr.send();
}



function restartTheGame() {
  btnPressSound.play();
  
  character.changeMood('wait');
  character.say('wait');
  character.continue();
  
  turnsCounter = 0;
  
  helper.resetCircles(handleClick);
  
  helper.whichTurn();
  
  if ( turn === 2 ) {
    character.handleTurn();
  }
  
  restartBtn.classList.remove('show');
  restartBtn.classList.add('hide');
}

function loadNextLevel() {
  btnPressSound.play();
  
  dataHandler.updateCharsData(loadedCharsData);
  
  helper.chooseCharacter();
  
  helper.updateLvlInfo();
  helper.changeLvlBg();
  helper.changePlayerName();
  
  character.changeMood('wait');
  character.say('wait');
  
  turnsCounter = 0;
  
  helper.resetCircles(handleClick);
  
  helper.whichTurn();
  
  if ( turn === 2 ) {
    character.handleTurn();
  }
  
  previousLevel = currentLevel;
  
  helper.playMusic();
  
  nextBtn.classList.remove('show');
  nextBtn.classList.add('hide');
}

function reloadTheGame() {
  btnPressSound.play();
  
  isDiffChosen = false;
  
  helper.playMusic();
  
  currentLevel = 1;
  turn = 1;
  turnsCounter = 0;
  isAutoTurnFinished = true;
  
  dataHandler.updateCharsData(loadedCharsData);
  
  helper.chooseCharacter();
  
  helper.changePlayerName();
  helper.updateLvlInfo();
  helper.changeLvlBg();
  
  character.changeMood('wait');
  character.say('wait');
  
  helper.resetCircles(handleClick);
  
  helper.whichTurn();
  
  if ( turn === 2 ) {
    character.handleTurn();
  }
  
  previousLevel = currentLevel;
  
  reloadBtn.classList.remove('show');
  reloadBtn.classList.add('hide');
  
  helper.chooseDifficulty();
}

function improveScore() {
  btnPressSound.play();
  
  isDiffChosen = false;
  
  helper.playMusic();
  
  currentLevel = 1;
  turn = 1;
  turnsCounter = 0;
  isAutoTurnFinished = true;
  
  dataHandler.updateCharsData(loadedCharsData);
  
  helper.chooseCharacter();
  
  helper.changePlayerName();
  helper.updateLvlInfo();
  helper.changeLvlBg();
  
  character.changeMood('wait');
  character.say('wait');
  
  helper.resetCircles(handleClick);
  
  helper.whichTurn();
  
  if ( turn === 2 ) {
    character.handleTurn();
  }
  
  previousLevel = currentLevel;
  
  improveBtn.classList.remove('show');
  improveBtn.classList.add('hide');
  
  helper.chooseDifficulty();
}


function handleClick(e) {
  
  if (e.target.id || e.target.tagName == 'IMG') {
    return;
  }
  
  if ( !isAutoTurnFinished ) {
    return;
  }
  
  isAutoTurnFinished = false;
  
  clickSound.play();
  
  
  character.changeMood('think');
  character.say('think');
  
  turnsCounter++;
  
  if (turn === 1) {
    
    turn = 2;
    
    var spangebob = document.createElement('img');
    spangebob.setAttribute('src', 'img/spangebob.png');
    
    e.target.appendChild(spangebob);
    e.target.setAttribute('id', 'x');
    e.target.classList.add('clicked');
    
    helper.getPositions(e.target.parentNode, e.target);
  }
  
  if ( turn === 2 ) {
    
    if ( currentLevel === 2 ) {
      setTimeout(character.handleTurn, 1750);
      return;
    }
    
    if ( currentLevel === 3 ) {
      setTimeout(character.handleTurn, 1500);
      return;
    }
    
    if ( currentLevel === 4 ) {
      setTimeout(character.handleTurn, 1000);
      return;
    }
    
    setTimeout(character.handleTurn, 2000);
  }
  
}

for ( var i = 0; i < tds.length; i++ ) {
  tds[i].addEventListener('click', handleClick);
}





// Our Data is now ready
getCharsData();

// Our character is now defined
helper.chooseCharacter();

helper.changeLvlBg();

helper.whichTurn();

character.say('wait');


restartBtn.addEventListener('click', restartTheGame);

nextBtn.addEventListener('click', loadNextLevel);

reloadBtn.addEventListener('click', reloadTheGame);

improveBtn.addEventListener('click', improveScore);


document.addEventListener('keydown', function(e) {
  
  if ( e.keyCode === 27 ) {
    reloadTheGame();
    
    if (restartBtn.classList.contains('show')) {
      restartBtn.classList.remove('show');
      restartBtn.classList.add('hide');
    }
    
    if (improveBtn.classList.contains('show')) {
      improveBtn.classList.remove('show');
      improveBtn.classList.add('hide');
    }
    
    if (nextBtn.classList.contains('show')) {
      nextBtn.classList.remove('show');
      nextBtn.classList.add('hide');
    }
    
  } 
  
});




















