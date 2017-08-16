var helper = (function(){
  
  function updateLvlInfo() {
    var lvlinfo = document.querySelector('.level-info');
    
    if ( currentLevel === 1 ) {
      lvlinfo.innerHTML = '';
      
      for ( var i = 1; i < playersNames.length + 1; i++ ) {
        
        var p = document.createElement("p");
        var span = document.createElement("span");
        
        if ( i === currentLevel ) {
          p.classList.add('current');
        }
        
        p.textContent = "Level ";

        span.textContent = i;
        span.style.color = playersColors[i - 1];

        p.appendChild(span);
        
        if ( i === 1 ) {
          p.innerHTML += ' (Easy)';
        }
        
        if ( i === 2 ) {
          p.innerHTML += ' (Normal)';
        }
        
        if ( i === 3 ) {
          p.innerHTML += ' (Hard)';
        }
        
        if ( i === 4 ) {
          p.innerHTML += ' (Nightmare)';
        }

        lvlinfo.appendChild(p);
      }
      
      return;
    }
    
    if ( currentLevel > previousLevel ) {
      lvlinfo.children[previousLevel - 1].classList.add('beaten');
    }
    
    if ( currentLevel > previousLevel ) {
      lvlinfo.children[currentLevel - 1].classList.add('current');
      lvlinfo.children[previousLevel - 1].classList.add('beaten');
    }
  }
  
  function changePlayerName() {
    var nameBox = document.querySelector('.char-name');
    var name = playersNames[currentLevel - 1];

    var first = name[0].toUpperCase();
    var rest = '';

    for (var i = 1; i < name.length; i++) {
      rest += name[i];
    }

    fixedCharName = first + rest;

    if ( fixedCharName === 'Krabs' ) {
      nameBox.textContent = 'Mr. ' + fixedCharName;
      nameBox.style.color = playersColors[currentLevel -1];

      fixedCharName = 'Mr. ' + fixedCharName;

      return;
    }

    nameBox.textContent = fixedCharName;
    nameBox.style.color = playersColors[currentLevel -1];
  }
  
  function changeLvlBg() {
    var page = document.querySelector('.page-wrap');

    if ( currentLevel === 1 ) {
      page.classList.remove('lvl-two');
      page.classList.remove('lvl-three');
      page.classList.remove('lvl-four');
      page.classList.add('lvl-one');
      return;
    }

    if ( currentLevel === 2 ) {
      page.classList.remove('lvl-one');
      page.classList.remove('lvl-three');
      page.classList.remove('lvl-four');
      page.classList.add('lvl-two');
      return;
    }

    if ( currentLevel === 3 ) {
      page.classList.remove('lvl-one');
      page.classList.remove('lvl-two');
      page.classList.remove('lvl-four');
      page.classList.add('lvl-three');
      return;
    }

    if ( currentLevel === 4 ) {
      page.classList.remove('lvl-one');
      page.classList.remove('lvl-two');
      page.classList.remove('lvl-three');
      page.classList.add('lvl-four');
      return;
    }
  }
  
  function increaseLevel() {
    currentLevel++;
  }
  
  function whichTurn() {
    if (turn === 1) {
      infoBox.innerHTML = "It's <span>Your</span> turn";
    } else {
      infoBox.innerHTML = "It's <span style=\"color:" + 
                          playersColors[currentLevel - 1] + 
                          "\">" + fixedCharName + 
                          "</span>'s turn";
    }
  }
  
  function resetCircles(clickHandler) {
    
    for ( var i = 0; i < tds.length; i++ ) {
    
      if ( tds[i].classList.contains('animated') ) {
        tds[i].classList.remove('animated');
      } else {
        tds[i].classList.add('animated');
      }

      if ( tds[i].classList.contains('matched') ) {
        tds[i].classList.remove('matched');
      }

      tds[i].textContent = '';
      tds[i].classList.remove('clicked');
      tds[i].removeAttribute('id');

      tds[i].addEventListener('click', clickHandler);
    }
    
  }
  
  function chooseCharacter() {
    if ( currentLevel === 1 ) {
      character = new Patrick();
      return;
    }

    if ( currentLevel === 2 ) {
      character = new Squidward();
      return;
    }

    if ( currentLevel === 3 ) {
      character = new Krabs();
      return;
    }

    if ( currentLevel === 4 ) {
      character = new Plankton();
      return;
    }
  }
  
  function chooseDifficulty() {
    var popup = document.querySelector('.pop-up');
    
    popup.style.display = 'block';

    var btns = document.querySelectorAll('.pop-up .difficulty');
    
    for ( var i = 0; i < btns.length; i++ ) {
      btns[i].addEventListener('click', function(e){
        e.preventDefault();
        
        btnPressSound.play();
        
        isDiffChosen = true;
        
        helper.playMusic();
        
        
        var value = e.target.textContent;

        if ( value === 'Easy' ) {
          gameLives = 3;
          updateLives();

          popup.style.display = 'none';
          time = helper.getTime();
          return;
        }

        if ( value === 'Hard' ) {
          gameLives = 1;
          updateLives();

          popup.style.display = 'none';
          time = helper.getTime();
          return;
        }

        if ( value === 'Insane' ) {
          gameLives = 0;
          updateLives();

          popup.style.display = 'none';
          time = helper.getTime();
          return;
        }
      });
    }

  }
  
  function updateLives() {
    var livesBoxWrap = document.querySelector('.player-lives p');
    var livesBox = document.querySelector('.lives-count');
    
    var text = document.createElement('span');
    text.classList.add('last');
    
    if ( gameLives > 1 || gameLives === 0 ) {
      livesBox.textContent = gameLives;
      text.textContent = ' lives left'
      
      if ( livesBoxWrap.lastElementChild.classList.contains('last') ) {
        livesBoxWrap.removeChild(livesBoxWrap.lastElementChild);
      }
      
      livesBoxWrap.appendChild(text);
      return;
    }
    
    if ( gameLives === 1 ) {
      livesBox.textContent = gameLives;
      text.textContent = ' life left'
      
      if ( livesBoxWrap.lastElementChild.classList.contains('last') ) {
        livesBoxWrap.removeChild(livesBoxWrap.lastElementChild);
      }
      
      livesBoxWrap.appendChild(text);
      return;
    }
    
    if ( gameLives < 0 ) {
      return;
    }
    
    
  }
  
  function playMusic() {
    
    if ( !isDiffChosen ) {
      music.pause();
      music = new Audio('sounds/menu.mp3');
      music.play();
      return;
    }
    
    
    if ( currentLevel === 1 && isDiffChosen ) {
      music.pause();
      music = new Audio('sounds/level_one.mp3');
      music.play();
      return;
    }
    
    if ( currentLevel === 2 ) {
      music.pause();
      music = new Audio('sounds/level_two.mp3');
      music.play();
      return;
    }
    
    if ( currentLevel === 3 ) {
      music.pause();
      music = new Audio('sounds/level_three.mp3');
      music.play();
      return;
    }
    
    if ( currentLevel === 4 ) {
      music.pause();
      music = new Audio('sounds/level_four.mp3');
      music.play();
      return;
    }
  }
  
  //returns time
  //changeDifficulty and saveResult will call it
  function getTime() {
    var date = new Date();
    return date.getTime();
  }
  
  function saveResult() {
    var container = document.querySelector('.game-results');

    var best = document.querySelector('.game-results .best-number');
    var prev = document.querySelector('.game-results .prev-number');

    var prevResult = best.children[0].textContent;

    var curTime = helper.getTime();

    var seconds = (curTime - time) / 1000;


    if ( seconds < 60 ) {
      seconds = seconds.toFixed(0);

      if ( prevResult === '' ) {
        best.children[0].textContent = seconds;
        prev.children[0].textContent = seconds;
        best.children[1].textContent = ' seconds';
        prev.children[1].textContent = ' seconds';
        return;
      }

      if ( best.children[2].textContent !== '' ) {
        best.children[2].textContent = '';
        best.children[3].textContent = '';

        best.children[0].textContent = seconds;
        best.children[1].textContent = ' seconds';
      }

      if ( Number(seconds) < Number(prevResult) ) {
        best.children[0].textContent = seconds;
        best.children[1].textContent = ' seconds';
      }

      if ( prev.children[2].textContent !== '' ) {
        prev.children[2].textContent = '';
        prev.children[3].textContent = '';
      }

      prev.children[0].textContent = seconds;
      prev.children[1].textContent = ' seconds';

      return;
    }

    var minutes = 0;

    while ( seconds >= 60 ) {

      seconds = seconds - 60;

      minutes++;

    }

    seconds = seconds.toFixed(0);

    if ( prevResult === '' ) {
      best.children[0].textContent = minutes;
      best.children[1].textContent = ' minutes '
      best.children[2].textContent = seconds;
      best.children[3].textContent = ' seconds';

      prev.children[0].textContent = minutes;
      prev.children[1].textContent = ' minutes '
      prev.children[2].textContent = seconds;
      prev.children[3].textContent = ' seconds';

      if ( minutes === 1 ) {
        prev.children[1].textContent = ' minute '
        best.children[1].textContent = ' minute '
      }

      return;
    }

    if ( Number(best.children[0].textContent) >= minutes ) {

      if ( best.children[2].textContent !== '' && Number(best.children[2].textContent) > seconds ) {

        best.children[0].textContent = minutes;
        best.children[1].textContent = ' minutes '
        best.children[2].textContent = seconds;
        best.children[3].textContent = ' seconds';

        if ( minutes === 1 ) {
          best.children[1].textContent = ' minute '
        }
      }
    }

    prev.children[0].textContent = minutes;
    prev.children[1].textContent = ' minutes '
    prev.children[2].textContent = seconds;
    prev.children[3].textContent = ' seconds';

    if ( minutes === 1 ) {
      prev.children[1].textContent = ' minute '
    }
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // will call the rest functions
  function getPositions(row, cell) {
    var rowID = '#' + row.id;
    var cellPosition = 0;
    var rowCells = row.children;

    for ( var i = 0; i < rowCells.length; i++ ) {
      var previousSibling;

      if ( previousSibling ) {
        if ( previousSibling.previousElementSibling ) {
          previousSibling = previousSibling.previousElementSibling;
          cellPosition++;
          continue;
        } else {
          continue;
        }
      }

      if ( cell.previousElementSibling ) {
        previousSibling = cell.previousElementSibling;
        cellPosition++;
      }
    }

    cellPosition++;

    isWin(rowID, cellPosition);
  }
  
  
  /************************************
  *************************************
  *******USING ONLY BY getPositions****
  *************************************
  *************************************/
  function isWin(rowID, cellPosition) {
  
    var rowNum = 0;

    for ( var i = 0; i < rowID.length; i++ ) {
      if ( typeof parseInt(rowID[i]) === 'number' ) {
        rowNum = parseInt(rowID[i]);
      } else {
        continue;
      }
    }

    var row = document.querySelector(rowID);
    var cells = row.children;
    var cell = row.children[cellPosition -1];

    var cellValue = cell.id;

    if ( hMatch(row, cells, cell, cellPosition, cellValue) ) {
      return;
    }

    if ( vMatch(row, cells, cell, cellPosition, cellValue) ) {
      return;
    }

    if ( dlMatch(row, cells, cell, cellPosition, cellValue) ) {
      return;
    }

    if ( drMatch(row, cells, cell, cellPosition, cellValue) ) {
      return;
    }

    if ( turnsCounter === 9 ) {
      handleDraw();
      return;
    }

    whichTurn();
  }
  
  function hMatch(row, cells, cell, cellPosition, cellValue) {
  
    cellPosition--;


    var matches = [];

    matches.push(cells[cellPosition]);


    if (cells[cellPosition - 1]) {
      if ( cells[cellPosition - 1].id == cellValue ) {

        matches.push(cells[cellPosition - 1]);

        if (cells[cellPosition - 2]) {
          if ( cells[cellPosition - 2].id == cellValue ) {

            matches.push(cells[cellPosition - 2]);

            matches.forEach(function(item){
              hgMatches(item)
            });

            handleWin(cellValue);
            return true;
          }
        }
      }
    }


    matches.splice(1);


    if (cells[cellPosition + 1]) {
      if ( cells[cellPosition + 1].id == cellValue ) {

        matches.push(cells[cellPosition + 1]);

        if (cells[cellPosition + 2]) {
          if ( cells[cellPosition + 2].id == cellValue ) {

            matches.push(cells[cellPosition + 2]);

            matches.forEach(function(item){
              hgMatches(item)
            });

            handleWin(cellValue);
            return true;
          }
        }
      }
    }


    matches.splice(1);


    if ( cells[cellPosition - 1] && cells[cellPosition + 1] ) {
      if ( cells[cellPosition - 1].id == cellValue && 
           cells[cellPosition + 1].id == cellValue ) {

        matches.push(cells[cellPosition - 1]);
        matches.push(cells[cellPosition + 1]);

        matches.forEach(function(item){
          hgMatches(item)
        });

        handleWin(cellValue);
        return true;
      }
    }
  }
  
  function vMatch(row, cells, cell, cellPosition, cellValue) {
    cellPosition--;


    var matches = [];

    matches.push(cells[cellPosition]);


    var rowID = row.id;
    var rowNum = 0;

    var rowPrevious = row.previousElementSibling;
    var rowNext = row.nextElementSibling;



    for ( var i = 0; i < rowID.length; i++ ) {
      if ( typeof parseInt(rowID[i]) === 'number' ) {
        rowNum = parseInt(rowID[i]);
      } else {
        continue;
      }
    }

    if ( rowPrevious ) {
      if ( rowPrevious.children[cellPosition].id == cellValue ) {

        matches.push(rowPrevious.children[cellPosition]);

        if ( rowNext ) {
          if ( rowNext.children[cellPosition].id == cellValue ) {

            matches.push(rowNext.children[cellPosition]);

            matches.forEach(function(item){
              hgMatches(item);
            });

            handleWin(cellValue);
            return true;
          }
        }
      }
    }


    matches.splice(1);


    if ( rowPrevious ) {
      if ( rowPrevious.children[cellPosition].id == cellValue ) {

        matches.push(rowPrevious.children[cellPosition]);

        if ( rowPrevious.previousElementSibling ) {
          if ( rowPrevious.previousElementSibling.children[cellPosition].id == cellValue ) {

            matches.push(rowPrevious.previousElementSibling.children[cellPosition]);

            matches.forEach(function(item){
              hgMatches(item);
            });

            handleWin(cellValue);
            return true;
          }
        }
      }
    }


    matches.splice(1);


    if ( rowNext ) {
      if ( rowNext.children[cellPosition].id == cellValue ) {

        matches.push(rowNext.children[cellPosition]);

        if ( rowNext.nextElementSibling ) {
          if ( rowNext.nextElementSibling.children[cellPosition].id == cellValue ) {

            matches.push(rowNext.nextElementSibling.children[cellPosition]);

            matches.forEach(function(item){
              hgMatches(item);
            });

            handleWin(cellValue);
            return true;
          }
        }
      }
    }
  }
  
  function dlMatch(row, cells, cell, cellPosition, cellValue) {
    cellPosition--;


    var matches = [];

    matches.push(cells[cellPosition]);


    var rowID = row.id;
    var rowNum = 0;

    var rowPrevious = row.previousElementSibling;
    var rowNext = row.nextElementSibling;

    for ( var i = 0; i < rowID.length; i++ ) {
      if ( typeof parseInt(rowID[i]) === 'number' ) {
        rowNum = parseInt(rowID[i]);
      } else {
        continue;
      }
    }

    if ( rowPrevious && rowPrevious.children[cellPosition + 1]) {
      if ( rowPrevious.children[cellPosition + 1].id === cellValue ) {

        matches.push(rowPrevious.children[cellPosition + 1]);

        if ( rowPrevious.previousElementSibling && rowPrevious.previousElementSibling.children[cellPosition + 2] ) {
          if ( rowPrevious.previousElementSibling.children[cellPosition + 2].id === cellValue ) {

            matches.push(rowPrevious.previousElementSibling.children[cellPosition + 2]);

            matches.forEach(function(item){
              hgMatches(item);
            });

            handleWin(cellValue);
            return true;
          }
        }
      }
    }


    matches.splice(1);


    if ( rowNext && rowNext.children[cellPosition - 1] ) {
      if ( rowNext.children[cellPosition - 1].id === cellValue ) {

        matches.push(rowNext.children[cellPosition - 1]);

        if ( rowNext.nextElementSibling && rowNext.nextElementSibling.children[cellPosition - 2] ) {
          if ( rowNext.nextElementSibling.children[cellPosition - 2].id === cellValue ) {

            matches.push(rowNext.nextElementSibling.children[cellPosition - 2]);

            matches.forEach(function(item){
              hgMatches(item);
            });

            handleWin(cellValue);
            return true;
          }
        }
      }
    }


    matches.splice(1);


    if ( rowNext && rowNext.children[cellPosition - 1] ) {
      if ( rowNext.children[cellPosition - 1].id === cellValue ) {

        matches.push(rowNext.children[cellPosition - 1]);

        if ( rowPrevious && rowPrevious.children[cellPosition + 1]) {
          if ( rowPrevious.children[cellPosition + 1].id === cellValue ) {

            matches.push(rowPrevious.children[cellPosition + 1]);

            matches.forEach(function(item){
              hgMatches(item);
            });

            handleWin(cellValue);
            return true;
          }
        }
      }
    }
  }
  
  function drMatch(row, cells, cell, cellPosition, cellValue) {
    cellPosition--;


    var matches = [];

    matches.push(cells[cellPosition]);


    var rowID = row.id;
    var rowNum = 0;

    var rowPrevious = row.previousElementSibling;
    var rowNext = row.nextElementSibling;

    for ( var i = 0; i < rowID.length; i++ ) {
      if ( typeof parseInt(rowID[i]) === 'number' ) {
        rowNum = parseInt(rowID[i]);
      } else {
        continue;
      }
    }

    if ( rowPrevious && rowPrevious.children[cellPosition - 1]) {
      if ( rowPrevious.children[cellPosition - 1].id === cellValue ) {

        matches.push(rowPrevious.children[cellPosition - 1]);

        if ( rowPrevious.previousElementSibling && rowPrevious.previousElementSibling.children[cellPosition - 2] ) {
          if ( rowPrevious.previousElementSibling.children[cellPosition - 2].id === cellValue ) {

            matches.push(rowPrevious.previousElementSibling.children[cellPosition - 2]);

            matches.forEach(function(item){
              hgMatches(item);
            });

            handleWin(cellValue);
            return true;
          }
        }
      }
    }


    matches.splice(1);


    if ( rowNext && rowNext.children[cellPosition + 1] ) {
      if ( rowNext.children[cellPosition + 1].id === cellValue ) {

        matches.push(rowNext.children[cellPosition + 1]);

        if ( rowNext.nextElementSibling && rowNext.nextElementSibling.children[cellPosition + 2] ) {
          if ( rowNext.nextElementSibling.children[cellPosition + 2].id === cellValue ) {

            matches.push(rowNext.nextElementSibling.children[cellPosition + 2]);

            matches.forEach(function(item){
              hgMatches(item);
            });

            handleWin(cellValue);
            return true;
          }
        }
      }
    }


    matches.splice(1);


    if ( rowNext && rowNext.children[cellPosition + 1] ) {
      if ( rowNext.children[cellPosition + 1].id === cellValue ) {

        matches.push(rowNext.children[cellPosition + 1]);

        if ( rowPrevious && rowPrevious.children[cellPosition - 1]) {
          if ( rowPrevious.children[cellPosition - 1].id === cellValue ) {

            matches.push(rowPrevious.children[cellPosition - 1]);

            matches.forEach(function(item){
              hgMatches(item);
            });

            handleWin(cellValue);
            return true;
          }
        }
      }
    }
  }
  
  function handleWin(cellValue) {
    
    if ( turn === 2 ) {
      if ( currentLevel < 5 ) {
        winSound.play();
      }
      
      infoBox.innerHTML = "<span>You</span> won the game!";
      character.changeMood('lose');
      character.say('lose');
      
      helper.increaseLevel();
      
    } else {
      loseSound.play();
      
      gameLives--;
      updateLives();
      
      infoBox.innerHTML = "<span style=\"color:" + 
                          playersColors[currentLevel - 1] + 
                          "\">" + 
                          fixedCharName + 
                          "</span> won the game!";
      
      character.changeMood('win');
      character.say('win');
    }

    for ( var i = 0; i < tds.length; i++ ) {
      tds[i].removeEventListener('click', handleClick);
    }

    character.stop();
    
    if ( gameLives < 0 ) {
      reloadBtn.classList.add('show');
      return;
    }
    
    if ( currentLevel === 5 ) {
      endGameSound.play();
      
      helper.saveResult();
      
      improveBtn.classList.add('show');
      return;
    }

    if ( currentLevel === previousLevel ) {
      restartBtn.classList.add('show');
      return;
    }
    
    if ( currentLevel !== previousLevel ) {
      nextBtn.classList.add('show');
      return;
    }
  }
  
  function handleDraw() {
    infoBox.textContent = "Draw! <3";

    drawSound.play();
    
    character.changeMood('draw');
    character.say('draw');

    for ( var i = 0; i < tds.length; i++ ) {
      tds[i].removeEventListener('click', handleClick);
    }

    character.stop();

    restartBtn.classList.add('show');
  }
  
  function hgMatches(item) {
    matchedSound.play();
    
    item.classList.remove('clicked');
    item.classList.add('matched');
  }
  /************************************
  *************************************
  *******USING ONLY BY getPositions****
  *************************************
  *************************************/
  
  
  
  return {
    saveResult       : saveResult,
    getTime          : getTime,
    playMusic        : playMusic,
    updateLvlInfo    : updateLvlInfo,
    changePlayerName : changePlayerName,
    changeLvlBg      : changeLvlBg,
    increaseLevel    : increaseLevel,
    
    chooseCharacter  : chooseCharacter,
    chooseDifficulty : chooseDifficulty,
    resetCircles     : resetCircles,
    whichTurn        : whichTurn,
    getPositions     : getPositions
  }
  
  
  
}());